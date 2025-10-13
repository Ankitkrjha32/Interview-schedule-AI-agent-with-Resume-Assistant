import { useNavigate } from 'react-router-dom'
import { Bot, MessageSquare, Mic, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import heroImage from '@/assets/hero-ai-assistant.jpg'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Mic,
      title: 'Voice Chat',
      description: 'Natural voice conversations with AI assistant'
    },
    {
      icon: MessageSquare,
      title: 'Text Chat',
      description: 'Instant messaging for quick interactions'
    },
    {
      icon: Sparkles,
      title: 'Smart Responses',
      description: 'Intelligent AI-powered resume assistance'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Assistant</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Personal
              <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                AI Resume Assistant
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Experience the future of resume building with voice and chat AI assistance. 
              Get instant help, personalized suggestions, and professional guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg h-14 px-8"
                onClick={() => navigate('/assistant')}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg h-14 px-8"
                onClick={() => navigate('/assistant')}
              >
                <Mic className="mr-2 h-5 w-5" />
                Try Voice Chat
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in delay-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="AI Assistant Interface" 
              className="relative rounded-3xl shadow-2xl border border-border/50"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for an intelligent assistant experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-20">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Transform your resume experience with AI-powered voice and chat assistance
          </p>
          <Button 
            size="lg" 
            className="text-lg h-14 px-8"
            onClick={() => navigate('/assistant')}
          >
            Launch Assistant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </section>
    </div>
  )
}

export default Home
