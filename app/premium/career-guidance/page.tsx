"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CareerGuidancePage() {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedMentorType, setSelectedMentorType] = useState<string | null>(null)
  const [interests, setInterests] = useState("")
  const [experience, setExperience] = useState("")
  const [goals, setGoals] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const careerGuidancePlans = [
    {
      id: "single",
      name: "Single Session",
      price: 79,
      features: [
        "One 60-minute guidance session",
        "Career path assessment",
        "Personalized advice",
        "Follow-up email with resources"
      ]
    },
    {
      id: "monthly",
      name: "Monthly Mentorship",
      price: 199,
      features: [
        "Four weekly 45-minute sessions",
        "Skill gap analysis",
        "Personalized learning plan",
        "Weekly progress tracking",
        "Priority email support"
      ]
    },
    {
      id: "quarterly",
      name: "Quarterly Program",
      price: 499,
      features: [
        "12 weekly sessions (45 minutes each)",
        "Comprehensive career strategy",
        "Portfolio/GitHub review",
        "Mock interviews preparation",
        "Industry connections",
        "Full email and chat support" 
      ]
    }
  ]

  const mentorTypes = [
    { id: "frontend", name: "Frontend Development" },
    { id: "backend", name: "Backend Development" },
    { id: "fullstack", name: "Full Stack Development" },
    { id: "mobile", name: "Mobile Development" },
    { id: "ml", name: "Machine Learning/AI" }
  ]

  const handlePayment = async () => {
    if (!selectedPlan) {
      toast({
        title: "No plan selected",
        description: "Please select a guidance plan before proceeding.",
        variant: "destructive",
      })
      return
    }

    if (!interests || !experience || !goals) {
      toast({
        title: "Incomplete information",
        description: "Please fill out all the required fields to help us prepare for your session.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    try {
      // In a real app, you would integrate with Stripe or another payment processor here
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Booking successful!",
        description: "Your career guidance session has been scheduled. Check your email for confirmation.",
      })
      
      // Reset form
      setSelectedPlan(null)
      setSelectedMentorType(null)
      setInterests("")
      setExperience("")
      setGoals("")
    } catch {
      toast({
        title: "Payment failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const getSelectedPlan = () => {
    return careerGuidancePlans.find(plan => plan.id === selectedPlan)
  }

  return (
    <div className="container max-w-5xl py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Career Guidance Sessions</h1>
        <p className="text-xl text-muted-foreground mb-2">
          Expert guidance to advance your development career
        </p>
        <p className="text-muted-foreground">
          Get personalized advice from industry professionals to navigate your tech career path,
          identify skill gaps, and create a strategic plan for your professional growth.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-8">
        {careerGuidancePlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`cursor-pointer transition-all hover:shadow-md flex flex-col py-6 h-full ${selectedPlan === plan.id ? 'border-primary ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>₹{plan.price}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button 
                className="w-full"
                variant={selectedPlan === plan.id ? "default" : "outline"}
                onClick={() => setSelectedPlan(plan.id)}
              >
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPlan && (
        <div className="space-y-8">
          <Card className="py-6">
            <CardHeader>
              <CardTitle>Your Background & Goals</CardTitle>
              <CardDescription>Help us understand how we can best assist you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="interests">What areas of development are you most interested in?</Label>
                <Textarea 
                  id="interests" 
                  placeholder="E.g., Web development, mobile apps, machine learning, etc."
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="experience">What is your current experience level?</Label>
                <Textarea 
                  id="experience" 
                  placeholder="E.g., 2 years as a junior developer, self-taught for 1 year, computer science graduate, etc."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="goals">What are your main career goals?</Label>
                <Textarea 
                  id="goals" 
                  placeholder="E.g., Land first developer job, transition to senior role, move into management, etc."
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Preferred mentor specialization</Label>
                <RadioGroup 
                  value={selectedMentorType || ""} 
                  onValueChange={setSelectedMentorType}
                  className="grid grid-cols-2 gap-2 mt-2"
                >
                  {mentorTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.id} id={`mentor-${type.id}`} />
                      <Label htmlFor={`mentor-${type.id}`}>{type.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 py-6">
            <CardHeader>
              <CardTitle>Your Booking Summary</CardTitle>
              <CardDescription>Review your selection before booking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm mb-1">Selected Plan</h3>
                  <p>{getSelectedPlan()?.name} - ₹{getSelectedPlan()?.price}</p>
                </div>
                {selectedMentorType && (
                  <div>
                    <h3 className="font-medium text-sm mb-1">Preferred Specialization</h3>
                    <p>{mentorTypes.find(t => t.id === selectedMentorType)?.name}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-sm mb-1">What to Expect</h3>
                  <p>After booking, you&apos;ll receive an email with a link to schedule your session at a time convenient for you. Your mentor will review your background information before your first session.</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Book & Pay ₹{getSelectedPlan()?.price}</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold">How Our Career Guidance Works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="py-6">
            <CardHeader>
              <CardTitle>1. Book & Share Your Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Select a plan and tell us about your career aspirations and current situation. This helps us match you with the right mentor.</p>
            </CardContent>
          </Card>
          <Card className="py-6">
            <CardHeader>
              <CardTitle>2. Meet Your Mentor</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Connect with your mentor via video call. They&apos;ll provide personalized guidance based on their industry experience and your specific goals.</p>
            </CardContent>
          </Card>
          <Card className="py-6">
            <CardHeader>
              <CardTitle>3. Implement & Follow Up</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Put your action plan into practice with ongoing support from your mentor, adjusting as needed to help you achieve your career objectives.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 