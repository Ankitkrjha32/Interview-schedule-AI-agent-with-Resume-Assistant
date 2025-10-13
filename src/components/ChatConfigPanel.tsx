import { useState, useEffect, useRef } from 'react'
import { Settings, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ChatConfigPanelProps {
  onConfigChange: (privateApiKey: string, assistantId: string) => void
  isConfigured: boolean
}

export const ChatConfigPanel = ({ onConfigChange, isConfigured }: ChatConfigPanelProps) => {
  const [privateApiKey, setPrivateApiKey] = useState('')
  const [assistantId, setAssistantId] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isEditing, setIsEditing] = useState(!isConfigured)
  const initializedRef = useRef(false)

  // Initialize with environment variables or localStorage on component mount
  useEffect(() => {
    // Prevent multiple initializations
    if (initializedRef.current) return

    const envApiKey = import.meta.env.VITE_VAPI_PRIVATE_API_KEY || ''
    const envAssistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || ''
    const storedApiKey = localStorage.getItem('vapi_private_api_key') || ''
    const storedAssistantId = localStorage.getItem('vapi_assistant_id') || ''

    // Prioritize localStorage, then environment variables
    const finalApiKey = storedApiKey || envApiKey
    const finalAssistantId = storedAssistantId || envAssistantId

    setPrivateApiKey(finalApiKey)
    setAssistantId(finalAssistantId)

    // If we have both values, notify parent and set as configured
    if (finalApiKey && finalAssistantId && !isConfigured) {
      onConfigChange(finalApiKey, finalAssistantId)
    }

    initializedRef.current = true
  }, []) // Empty dependency array - only run once

  const handleSave = () => {
    if (privateApiKey && assistantId) {
      localStorage.setItem('vapi_private_api_key', privateApiKey)
      localStorage.setItem('vapi_assistant_id', assistantId)
      onConfigChange(privateApiKey, assistantId)
      setIsEditing(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const isValidPrivateKey = privateApiKey.startsWith('sk-') || 
                            privateApiKey.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i) || 
                            privateApiKey.length === 0
  const isValidAssistantId = assistantId.length > 0

  if (!isEditing && isConfigured) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Configuration Active
              </span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit}
            >
              Edit Config
            </Button>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Private Key: {privateApiKey.substring(0, 8)}... | Assistant: {assistantId.substring(0, 8)}...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 hi">
          <Settings className="w-5 h-5" />
          Chat API Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Important Notice */}
          <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> Chat API requires your <strong>Private API Key</strong> (usually starts with "sk-" or UUID format), 
            not the Public Key used for voice calls.
          </AlertDescription>
        </Alert>        {/* Private API Key */}
        <div className="space-y-2">
          <Label htmlFor="privateApiKey">
            Private API Key <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="privateApiKey"
              type={showApiKey ? 'text' : 'password'}
              value={privateApiKey}
              onChange={(e) => setPrivateApiKey(e.target.value)}
              placeholder="sk-xxxxxxxx... or 6ca42eff-e6a8-41a2..."
              className={!isValidPrivateKey ? 'border-red-500' : ''}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {!isValidPrivateKey && privateApiKey.length > 0 && (
            <p className="text-xs text-red-600">
              Private API key should start with "sk-" or be a valid UUID format
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Find this in your Vapi dashboard under API Keys → Private Key
          </p>
        </div>

        {/* Assistant ID */}
        <div className="space-y-2">
          <Label htmlFor="assistantId">
            Assistant ID <span className="text-red-500">*</span>
          </Label>
          <Input
            id="assistantId"
            value={assistantId}
            onChange={(e) => setAssistantId(e.target.value)}
            placeholder="bebba535-30e2-4237-9cf0-a0518010f2f9"
            className={!isValidAssistantId && assistantId.length > 0 ? 'border-red-500' : ''}
          />
          <p className="text-xs text-muted-foreground">
            Find this in your Vapi dashboard under Assistants
          </p>
        </div>

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-1 bg-muted/50 p-3 rounded-md">
          <p><strong>How to get your keys:</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Go to <a href="https://dashboard.vapi.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Vapi Dashboard</a></li>
            <li>Navigate to "API Keys" section</li>
            <li>Copy your <strong>Private Key</strong> (starts with "sk-")</li>
            <li>Go to "Assistants" and copy your Assistant ID</li>
          </ol>
        </div>

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          disabled={!isValidPrivateKey || !isValidAssistantId}
          className="w-full"
        >
          Save Configuration
        </Button>
      </CardContent>
    </Card>
  )
}