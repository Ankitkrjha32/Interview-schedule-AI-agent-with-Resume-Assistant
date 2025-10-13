import { Bot } from 'lucide-react'

const AssistantNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Resume AI Assistant</h1>
              <p className="text-xs text-muted-foreground">Your Personal Voice & Chat AI</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AssistantNavbar
