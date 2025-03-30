"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function MockInterviewsPage() {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const mockInterviewPlans = [
    {
      id: "single",
      name: "Single Interview",
      price: 49,
      features: [
        "One 60-minute mock interview",
        "Detailed feedback and assessment",
        "Focus on one specific role/technology",
        "Recording of the session"
      ]
    },
    {
      id: "pack",
      name: "Interview Pack",
      price: 129,
      features: [
        "Three 60-minute mock interviews",
        "Personalized improvement plan",
        "Coverage of multiple interview styles",
        "Post-interview coaching session",
        "Recording of all sessions"
      ]
    },
    {
      id: "mastery",
      name: "Interview Mastery",
      price: 299,
      features: [
        "Five 60-minute mock interviews",
        "Comprehensive improvement strategy",
        "Customized interview question bank",
        "Resume and LinkedIn profile review",
        "Two follow-up coaching sessions",
        "Recording of all sessions"
      ]
    }
  ]

  const availableDates = [
    "2024-04-15",
    "2024-04-16",
    "2024-04-17",
    "2024-04-18",
    "2024-04-19",
  ]

  const availableTimes = [
    "9:00 AM",
    "11:00 AM",
    "1:00 PM",
    "3:00 PM",
    "5:00 PM",
  ]

  const handlePayment = async () => {
    if (!selectedPlan || !selectedDate || !selectedTime) {
      toast({
        title: "Incomplete selection",
        description: "Please select a plan, date, and time before proceeding.",
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
        description: "Your mock interview has been scheduled. Check your email for confirmation.",
      })
      
      // Reset form
      setSelectedPlan(null)
      setSelectedDate(null)
      setSelectedTime(null)
      
      // In a real app, you might redirect to a confirmation page
      // router.push("/premium/mock-interviews/confirmation")
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
    return mockInterviewPlans.find(plan => plan.id === selectedPlan)
  }

  return (
    <div className="container max-w-5xl py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Mock Interview Sessions</h1>
        <p className="text-xl text-muted-foreground mb-2">
          Prepare for real-world interviews with professional feedback
        </p>
        <p className="text-muted-foreground">
          Our mock interviews simulate actual technical interviews for software development roles.
          Get detailed feedback and improve your interview skills with our experienced coaches.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-8">
        {mockInterviewPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`cursor-pointer transition-all hover:shadow-md flex flex-col h-full ${selectedPlan === plan.id ? 'border-primary ring-2 ring-primary' : ''}`}
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
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose your preferred interview date</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedDate || ""} onValueChange={setSelectedDate}>
                <div className="grid grid-cols-2 gap-4">
                  {availableDates.map((date) => (
                    <div key={date} className="flex items-center space-x-2">
                      <RadioGroupItem value={date} id={`date-${date}`} />
                      <Label htmlFor={`date-${date}`}>{new Date(date).toLocaleDateString(undefined, {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Time</CardTitle>
              <CardDescription>Choose your preferred interview time</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedTime || ""} onValueChange={setSelectedTime}>
                <div className="grid grid-cols-2 gap-4">
                  {availableTimes.map((time) => (
                    <div key={time} className="flex items-center space-x-2">
                      <RadioGroupItem value={time} id={`time-${time}`} />
                      <Label htmlFor={`time-${time}`}>{time}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedPlan && selectedDate && selectedTime && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Interview</CardTitle>
            <CardDescription>Review your selection before booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h3 className="font-medium text-sm mb-1">Selected Plan</h3>
                <p>{getSelectedPlan()?.name} - ${getSelectedPlan()?.price}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Date</h3>
                <p>{new Date(selectedDate).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm mb-1">Time</h3>
                <p>{selectedTime}</p>
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
                <>Book & Pay ${getSelectedPlan()?.price}</>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">How Our Mock Interviews Work</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>1. Book & Prepare</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Select a plan, choose your date and time, and complete your booking. You&apos;ll receive preparation materials and instructions via email.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>2. Attend Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Join the video call at your scheduled time. Your interviewer will conduct a realistic technical interview based on your target role.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>3. Get Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Receive detailed feedback immediately after your session, along with a recording and a written assessment within 24 hours.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 