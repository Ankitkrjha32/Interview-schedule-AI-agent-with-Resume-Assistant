import { Bot, Home } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from './ui/button'

const AssistantNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Resume AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Your Personal Voice & Chat AI</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {location.pathname === '/assistant' ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            ) : (
              <Button 
                size="sm"
                onClick={() => navigate('/assistant')}
                className="gap-2"
              >
                <Bot className="h-4 w-4" />
                Launch Assistant
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AssistantNavbar
