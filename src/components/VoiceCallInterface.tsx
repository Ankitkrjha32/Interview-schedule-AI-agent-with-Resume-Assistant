import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface VoiceCallInterfaceProps {
  isConnected: boolean
  isSpeaking: boolean
  isListening: boolean
  callDuration: number
  onStartCall: () => void
  onEndCall: () => void
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const VoiceCallInterface = ({
  isConnected,
  isSpeaking,
  isListening,
  callDuration,
  onStartCall,
  onEndCall
}: VoiceCallInterfaceProps) => {
  return (
    <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex flex-col items-center space-y-8">
        {/* Status Indicator */}
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            relative w-32 h-32 rounded-full flex items-center justify-center
            ${isConnected ? 'bg-primary/10' : 'bg-muted'}
            transition-all duration-300
          `}>
            {/* Animated pulse ring when speaking */}
            {isSpeaking && (
              <>
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse" />
              </>
            )}
            
            <Phone 
              className={`
                w-12 h-12 z-10
                ${isConnected ? 'text-primary' : 'text-muted-foreground'}
                transition-colors duration-300
              `}
            />
          </div>

          {/* Status Text */}
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {isConnected ? 'Connected' : 'Ready to Call'}
            </h3>
            {isConnected && (
              <p className="text-3xl font-mono text-primary">
                {formatDuration(callDuration)}
              </p>
            )}
          </div>
        </div>

        {/* Mic Status */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {isListening ? (
            <>
              <Mic className="w-4 h-4 text-primary animate-pulse" />
              <span>Listening...</span>
            </>
          ) : (
            <>
              <MicOff className="w-4 h-4" />
              <span>Microphone inactive</span>
            </>
          )}
        </div>

        {/* Assistant Speaking Indicator */}
        {isSpeaking && (
          <div className="flex items-center gap-2 text-sm">
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-foreground">Assistant speaking...</span>
          </div>
        )}

        {/* Call Control Button */}
        <div className="pt-4">
          {!isConnected ? (
            <Button
              onClick={onStartCall}
              size="lg"
              className="w-20 h-20 rounded-full bg-primary hover:bg-primary/90"
            >
              <Phone className="w-8 h-8" />
            </Button>
          ) : (
            <Button
              onClick={onEndCall}
              size="lg"
              variant="destructive"
              className="w-20 h-20 rounded-full"
            >
              <PhoneOff className="w-8 h-8" />
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center max-w-sm">
          {isConnected 
            ? 'Tap the red button to end the call'
            : 'Tap the call button to start your voice conversation'
          }
        </p>
      </div>
    </Card>
  )
}