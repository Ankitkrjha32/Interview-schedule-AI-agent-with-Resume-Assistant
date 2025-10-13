import { AlertTriangle, Key, MessageSquare, Mic } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const ApiKeyGuide = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-5 h-5" />
          Vapi API Key Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Different features require different API keys!</strong>
          </AlertDescription>
        </Alert>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Voice Calls */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-600">
              <Mic className="w-4 h-4" />
              <span className="font-medium">Voice Calls</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p><strong>Uses:</strong> Public API Key</p>
              <p><strong>Format:</strong> Numbers and letters</p>
              <p><strong>Example:</strong> 34b69e77-d638...</p>
              <p><strong>Location:</strong> Dashboard → API Keys → Public Key</p>
            </div>
          </div>

          {/* Text Chat */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">Text Chat</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p><strong>Uses:</strong> Private API Key</p>
              <p><strong>Format:</strong> Starts with "sk-"</p>
              <p><strong>Example:</strong> sk-xxxxxxxxxxxxx</p>
              <p><strong>Location:</strong> Dashboard → API Keys → Private Key</p>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-md">
          <p><strong>Why the difference?</strong></p>
          <p>Voice calls run in the browser and use the public key for security. 
          Text chat uses server-side APIs that require private key authentication.</p>
        </div>
      </CardContent>
    </Card>
  )
}