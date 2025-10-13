import { Bot, Home } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from './ui/button'

const AssistantNavbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/20 bg-card/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all group"
            onClick={() => navigate('/')}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg group-hover:shadow-xl transition-shadow">
              <Bot className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Resume AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Multilingual • Scheduling • Smart Analysis</p>
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
