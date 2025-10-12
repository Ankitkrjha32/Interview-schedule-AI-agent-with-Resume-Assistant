import { useState, useEffect, useCallback } from 'react'
import Vapi from '@vapi-ai/web'

interface TranscriptMessage {
  role: 'user' | 'assistant'
  text: string
  timestamp: Date
}

export const useVapi = (apiKey: string | null, assistantId: string | null) => {
  const [vapi, setVapi] = useState<Vapi | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])
  const [error, setError] = useState<string | null>(null)
  const [callDuration, setCallDuration] = useState(0)
  const [callStartTime, setCallStartTime] = useState<number | null>(null)

  // Initialize Vapi
  useEffect(() => {
    if (!apiKey || !assistantId) return

    try {
      console.log('Initializing Vapi with:', { apiKey: apiKey?.substring(0, 8) + '...', assistantId })
      
      const vapiInstance = new Vapi(apiKey)
      setVapi(vapiInstance)

      // Event listeners
      vapiInstance.on('call-start', () => {
        console.log('Call started')
        setIsConnected(true)
        setError(null)
        setCallStartTime(Date.now())
      })

      vapiInstance.on('call-end', () => {
        console.log('Call ended')
        setIsConnected(false)
        setIsSpeaking(false)
        setIsListening(false)
        setCallStartTime(null)
        setCallDuration(0)
      })

      vapiInstance.on('speech-start', () => {
        console.log('Assistant started speaking')
        setIsSpeaking(true)
      })

      vapiInstance.on('speech-end', () => {
        console.log('Assistant stopped speaking')
        setIsSpeaking(false)
      })

      // Note: mic events may not be available in all Vapi versions
      // Using speech events as proxy for listening state
      vapiInstance.on('speech-start', () => {
        setIsListening(false) // When assistant speaks, user isn't being listened to
      })
      
      vapiInstance.on('speech-end', () => {
        if (isConnected) {
          setIsListening(true) // When assistant stops, user can speak
        }
      })

      vapiInstance.on('message', (message: any) => {
        console.log('Message received:', message)
        if (message.type === 'transcript' && message.transcript) {
          setTranscript(prev => [...prev, {
            role: message.role,
            text: message.transcript,
            timestamp: new Date()
          }])
        }
      })

      vapiInstance.on('error', (error: any) => {
        console.error('Vapi error:', error)
        setError(error.message || 'Connection error')
        setIsConnected(false)
      })

      return () => {
        vapiInstance?.stop()
      }
    } catch (err: any) {
      console.error('Initialization error:', err)
      setError('Failed to initialize: ' + err.message)
    }
  }, [apiKey, assistantId])

  // Update call duration
  useEffect(() => {
    if (!callStartTime || !isConnected) return

    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - callStartTime) / 1000)
      setCallDuration(duration)
    }, 1000)

    return () => clearInterval(interval)
  }, [callStartTime, isConnected])

  const startCall = useCallback(() => {
    if (vapi && assistantId) {
      vapi.start(assistantId)
    }
  }, [vapi, assistantId])

  const endCall = useCallback(() => {
    if (vapi) {
      vapi.stop()
    }
  }, [vapi])

  const addTextMessage = useCallback((text: string, role: 'user' | 'assistant') => {
    setTranscript(prev => [...prev, {
      role,
      text,
      timestamp: new Date()
    }])
  }, [])

  return {
    vapi,
    isConnected,
    isSpeaking,
    isListening,
    transcript,
    error,
    callDuration,
    startCall,
    endCall,
    addTextMessage
  }
}