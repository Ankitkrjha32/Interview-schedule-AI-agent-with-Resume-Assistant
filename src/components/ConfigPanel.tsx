import { useState, useEffect } from 'react'
import { Settings, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'


interface ConfigPanelProps {
  onConfigChange: (apiKey: string, assistantId: string) => void
  isConfigured: boolean
}

export const ConfigPanel = ({ onConfigChange, isConfigured }: ConfigPanelProps) => {
  const [apiKey, setApiKey] = useState('')
  const [assistantId, setAssistantId] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isEditing, setIsEditing] = useState(!isConfigured)

 // Initialize with environment variables or localStorage on component mount
  useEffect(() => {
    const envApiKey = import.meta.env.VITE_VAPI_API_KEY || ''
    const envAssistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID || ''
    const storedApiKey = localStorage.getItem('vapi_api_key') || ''
    const storedAssistantId = localStorage.getItem('vapi_assistant_id') || ''

    // Prioritize localStorage, then environment variables
    const finalApiKey = storedApiKey || envApiKey
    const finalAssistantId = storedAssistantId || envAssistantId

    setApiKey(finalApiKey)
    setAssistantId(finalAssistantId)

    // If we have both values, notify parent and set as configured
    if (finalApiKey && finalAssistantId) {
      onConfigChange(finalApiKey, finalAssistantId)
    }
  }, [])


  const handleSave = () => {
    if (apiKey && assistantId) {
      localStorage.setItem('vapi_api_key', apiKey)
      localStorage.setItem('vapi_assistant_id', assistantId)
      onConfigChange(apiKey, assistantId)
      setIsEditing(false)
    }
  }

  if (!isEditing && isConfigured) {
    return (
      <Card className="p-4 bg-primary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-foreground">Assistant configured</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit Config
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="">
      <div className=" hidden">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Enter your Vapi credentials to get started
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Vapi API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk_..."
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assistantId">Assistant ID</Label>
            <Input
              id="assistantId"
              value={assistantId}
              onChange={(e) => setAssistantId(e.target.value)}
              placeholder="Enter your assistant ID"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={!apiKey || !assistantId}
            className="flex-1"
          >
            Save Configuration
          </Button>
          {isConfigured && (
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}