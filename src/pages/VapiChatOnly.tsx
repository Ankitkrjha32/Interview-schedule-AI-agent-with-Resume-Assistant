import { useState, useCallback } from 'react'
import { MessageSquare, Trash2, RotateCcw } from 'lucide-react'
import { useVapiChat } from '@/hooks/useVapiChat'
import { ChatInterface } from '@/components/ChatInterface'
import { ChatConfigPanel } from '@/components/ChatConfigPanel'
import { ApiKeyGuide } from '@/components/ApiKeyGuide'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import AssistantNavbar from '@/components/AssistantNavbar'

const VapiChatOnly = () => {
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [assistantId, setAssistantId] = useState<string | null>(null)
  const [isConfigured, setIsConfigured] = useState(false)

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    resetChat,
    currentChatId
  } = useVapiChat(apiKey, assistantId)

  const handleConfigChange = useCallback((newApiKey: string, newAssistantId: string) => {
    setApiKey(newApiKey)
    setAssistantId(newAssistantId)
    setIsConfigured(true)
    // Reset chat when configuration changes
    resetChat()
  }, [resetChat])

  const handleSendMessage = useCallback(async (message: string) => {
    await sendMessage(message)
  }, [sendMessage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <AssistantNavbar />
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center pt-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Vapi Chat Assistant
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Text-only AI assistant powered by Vapi Chat API - No call credits used!
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Text Only
            </Badge>
            <Badge variant="outline">No Call Credits</Badge>
          </div>
        </div>

        {/* API Key Guide */}
        {!isConfigured && (
          <ApiKeyGuide />
        )}

        {/* Configuration Panel */}
        <div className="mb-6">
          <ChatConfigPanel 
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

        {/* Chat Interface */}
        {isConfigured ? (
          <div className="space-y-4">
            {/* Chat Controls */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Chat Session
                  </CardTitle>
                  <div className="flex gap-2">
                    {currentChatId && (
                      <Badge variant="outline" className="text-xs">
                        Session: {currentChatId.substring(0, 8)}...
                      </Badge>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearChat}
                      disabled={messages.length === 0}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={resetChat}
                      disabled={messages.length === 0}
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                //   disabled={isLoading}
                />
                {isLoading && (
                  <div className="text-center mt-2">
                    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      Assistant is thinking...
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Usage Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground space-y-2">
                  <h4 className="font-medium text-foreground">💡 How it works:</h4>
                  <ul className="space-y-1 ml-4">
                    <li>• Uses Vapi Chat API - no voice call credits consumed</li>
                    <li>• Maintains conversation context throughout the session</li>
                    <li>• Clear or reset to start a new conversation</li>
                    <li>• All messages are processed as text-only interactions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">Ready to start chatting!</p>
            <p>Please configure your Vapi credentials above to begin</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VapiChatOnly
