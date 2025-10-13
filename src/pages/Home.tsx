import { useNavigate } from 'react-router-dom'
import { Bot, MessageSquare, Mic, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import heroImage from '@/assets/hero-ai-assistant.jpg'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Agents',
      description: 'Intelligent AI agents that understand context and provide personalized resume assistance in real-time'
    },
    {
      icon: Mic,
      title: 'Schedule Meetings',
      description: 'Book consultations and meetings through voice commands with our AI scheduling assistant'
    },
    {
      icon: MessageSquare,
      title: 'Multilingual Support',
      description: 'Get your resume summary and suggestions in any language - supporting 100+ languages worldwide'
    },
    {
      icon: Sparkles,
      title: 'Smart Analysis',
      description: 'AI-driven resume analysis, optimization suggestions, and industry-specific recommendations'
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
              Transform Your Career with
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Resume Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Schedule meetings, get multilingual resume summaries, and receive expert guidance 
              through our advanced AI agents. Available 24/7 in over 100 languages.
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
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/30 rounded-3xl blur-3xl animate-pulse"></div>
            <img 
              src={heroImage} 
              alt="AI-powered resume assistant interface with voice and chat capabilities" 
              className="relative rounded-3xl shadow-2xl border border-primary/20 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Advanced AI Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powered by cutting-edge AI technology to revolutionize your resume building experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm group"
            >
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-20">
        <Card className="relative overflow-hidden p-12 text-center bg-gradient-to-br from-primary via-secondary to-accent border-0">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-primary-foreground mb-4">
              Start Building Your Future Today
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals using AI to create standout resumes. 
              Schedule meetings, get instant summaries in any language, and unlock your career potential.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg h-14 px-10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              onClick={() => navigate('/assistant')}
            >
              Launch AI Assistant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      </section>
    </div>
  )
}

export default Home
