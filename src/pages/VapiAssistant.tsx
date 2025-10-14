import { useState } from 'react'
import { MessageSquare, Phone } from 'lucide-react'
import { useVapi } from '@/hooks/useVapi'
import { ChatInterface } from '@/components/ChatInterface'
import { VoiceCallInterface } from '@/components/VoiceCallInterface'
import { ConfigPanel } from '@/components/ConfigPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import AssistantNavbar from '@/components/AssistantNavbar'

const VapiAssistant = () => {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [assistantId, setAssistantId] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)

  const {
    isConnected,
    isSpeaking,
    isListening,
    transcript,
    error,
    callDuration,
    startCall,
    endCall,
    addTextMessage
  } = useVapi(apiKey, assistantId)

  const handleConfigChange = (newApiKey: string, newAssistantId: string) => {
    setApiKey(newApiKey)
    setAssistantId(newAssistantId)
    setIsConfigured(true)
  }

  const handleSendMessage = (message: string) => {
    addTextMessage(message, 'user')
    // In a real implementation, you might send this to the assistant
    // For now, it just adds to the transcript....
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <AssistantNavbar />
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center pt-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Resume AI Assistant
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Schedule meetings, get multilingual summaries, and receive expert guidance through AI-powered voice and chat
          </p>
        </div>

        {/* Configuration Panel */} 
         <div className="mb-6">
          <ConfigPanel 
            onConfigChange={handleConfigChange}
            isConfigured={isConfigured}
          />
        </div> 

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Interface */}
        {isConfigured && (
          <Tabs defaultValue="voice" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Voice Call
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voice" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <VoiceCallInterface
                  isConnected={isConnected}
                  isSpeaking={isSpeaking}
                  isListening={isListening}
                  callDuration={callDuration}
                  onStartCall={startCall}
                  onEndCall={endCall}
                />
                <ChatInterface
                  messages={transcript}
                  disabled={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="chat">
              <div className="max-w-3xl mx-auto">
                <ChatInterface
                  messages={transcript}
                  onSendMessage={handleSendMessage}
                  disabled={isConnected}
                />
                {isConnected && (
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Chat is disabled during an active voice call
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {!isConfigured && (
          <div className="text-center py-12 text-muted-foreground">
            <p>Please configure your Vapi credentials to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VapiAssistant