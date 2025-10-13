import { useState, useCallback } from 'react'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatApiResponse {
  id: string
  assistantId: string
  messages: ChatMessage[]
  output: ChatMessage[]
  createdAt: string
  updatedAt: string
  orgId?: string
  sessionId?: string
  name?: string
}

interface ChatResponse {
  chatId: string
  response: string
  fullData: ChatApiResponse
}

interface TranscriptMessage {
  role: 'user' | 'assistant'
  text: string
  timestamp: Date
}

export const useVapiChat = (apiKey: string | null, assistantId: string | null) => {
  const [messages, setMessages] = useState<TranscriptMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  const sendChatMessage = useCallback(async (
    message: string, 
    previousChatId?: string
  ): Promise<ChatResponse> => {
    if (!apiKey || !assistantId) {
      throw new Error('API key and Assistant ID are required')
    }

    const response = await fetch('https://api.vapi.ai/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assistantId: assistantId,
        input: message,
        ...(previousChatId && { previousChatId })
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage = `HTTP error! status: ${response.status}`
      
      if (response.status === 401) {
        errorMessage = `Authentication failed (401). Please ensure you're using your PRIVATE API KEY from the Vapi dashboard, not the public key used for voice calls. Double-check that you copied the correct private key from the API Keys section.`
      } else {
        errorMessage += `, message: ${errorText}`
      }
      
      throw new Error(errorMessage)
    }

    const chat: ChatApiResponse = await response.json()
    
    // Enhanced response parsing - try multiple ways to extract content
    let responseText = 'No response received'
    
    if (chat.output && chat.output.length > 0) {
      const lastOutput = chat.output[chat.output.length - 1] // Get the last response
      
      // Try different possible content fields with proper type checking
      responseText = lastOutput.content || 
                   (lastOutput as any).message || 
                   (lastOutput as any).text ||
                   (typeof lastOutput === 'string' ? lastOutput : '') ||
                   'No response received'
    }
    
    console.log('Full chat response:', JSON.stringify(chat, null, 2))
    console.log('Output array:', chat.output)
    console.log('Output array length:', chat.output?.length)
    if (chat.output && chat.output.length > 0) {
      console.log('Last output item:', JSON.stringify(chat.output[chat.output.length - 1], null, 2))
    }
    console.log('Extracted response text:', responseText)
    
    return {
      chatId: chat.id,
      response: responseText,
      fullData: chat
    }
  }, [apiKey, assistantId])

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!apiKey || !assistantId) {
      setError('Please configure your API key and Assistant ID first')
      return
    }

    // Add user message immediately
    const userMsg: TranscriptMessage = {
      role: 'user',
      text: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)
    setError(null)

    try {
      console.log('Sending message to Vapi Chat API:', userMessage)
      const chatResponse = await sendChatMessage(userMessage, currentChatId)
      
      console.log('Received response:', chatResponse)
      
      // Update chat ID for conversation continuity
      setCurrentChatId(chatResponse.chatId)

      // Add assistant response
      const assistantMsg: TranscriptMessage = {
        role: 'assistant',
        text: chatResponse.response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMsg])

    } catch (err: any) {
      console.error('Chat error:', err)
      setError(err.message || 'Failed to send message')
      
      // Add error message to chat
      const errorMsg: TranscriptMessage = {
        role: 'assistant',
        text: `Sorry, I encountered an error: ${err.message}. Please check your API credentials and try again.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }, [apiKey, assistantId, currentChatId, sendChatMessage])

  const clearChat = useCallback(() => {
    setMessages([])
    setCurrentChatId(null)
    setError(null)
  }, [])

  const resetChat = useCallback(() => {
    setMessages([])
    setCurrentChatId(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    resetChat,
    currentChatId
  }
}