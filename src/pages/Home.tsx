import { useNavigate } from 'react-router-dom'
import { Bot, MessageSquare, Mic, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import heroImage from '@/assets/hero-ai-assistant.jpg'
import AssistantNavbar from '@/components/AssistantNavbar'

const Home = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Mic,
      title: 'Voice Assistant',
      description: 'Full interactive voice experience with real-time conversations, voice commands, and natural speech interaction'
    },
    {
      icon: MessageSquare,
      title: 'Text Chat Only',
      description: 'Cost-effective text-based conversations using Vapi Chat API - no call credits required'
    },
    {
      icon: Sparkles,
      title: 'Multilingual Support',
      description: 'Get your resume guidance in any language - supporting 100+ languages for global accessibility'
    },
    {
      icon: Bot,
      title: 'Smart AI Analysis',
      description: 'AI-driven resume analysis, optimization suggestions, and industry-specific career recommendations'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <AssistantNavbar />
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Bot className="h-4 w-4 text-black" />
              <span className="text-sm font-medium text-black">AI-Powered Assistant</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Transform Your Career
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI Assistant Platform
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Get personalized resume guidance through voice calls or text chat. Choose your preferred 
              interaction method - full voice experience or cost-effective text-only chat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg h-14 px-8"
                onClick={() => navigate('/assistant')}
              >
                <Mic className="mr-2 h-5 w-5" />
                Voice Assistant
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg h-14 px-8"
                onClick={() => navigate('/chat')}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Text Chat Only
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>💰 <strong>Voice Assistant:</strong> Full interactive experience (uses call credits)</p>
              <p>💬 <strong>Text Chat:</strong> Cost-effective text-only conversation (no call credits)</p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-fade-in delay-300">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/20 to-accent/30 rounded-3xl blur-3xl animate-pulse"></div>
            <img 
              src="https://bymilliepham.com/wp-content/uploads/2023/05/what-is-an-AI-meeting-assistant.jpg" 
              alt="AI-powered resume assistant interface with voice and chat capabilities" 
              // width={500}
              className="relative rounded-3xl shadow-2xl border border-primary/20 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Choose Your AI Experience
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Full voice interaction or cost-effective text chat - both powered by advanced Vapi AI technology
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

      {/* Carousel Section */}
      <section className="container mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Real People, Real Success Stories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how professionals worldwide are transforming their careers with AI-powered guidance
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <img 
                    src="/carousel/team-meeting.jpg" 
                    alt="Professional team collaborating on career development"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">Team Collaboration</h3>
                    <p className="text-muted-foreground">Empowering teams to achieve their career goals together</p>
                  </div>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <img 
                    src="/carousel/collaboration.jpg" 
                    alt="Professionals working together on resume optimization"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">Strategic Planning</h3>
                    <p className="text-muted-foreground">Building successful career strategies with AI insights</p>
                  </div>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <img 
                    src="/carousel/workplace.jpg" 
                    alt="Modern workplace with diverse professionals"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">Modern Workplace</h3>
                    <p className="text-muted-foreground">Adapting to the future of work with AI assistance</p>
                  </div>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <img 
                    src="/carousel/professionals.jpg" 
                    alt="Business professionals reviewing career documents"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">Professional Growth</h3>
                    <p className="text-muted-foreground">Accelerating career advancement with expert guidance</p>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
