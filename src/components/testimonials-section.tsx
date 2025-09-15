"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Tech Startup",
    content:
      "TalentFlow helped me discover opportunities I never would have found on my own. The personalized recommendations were spot-on!",
    rating: 5,
    type: "candidate",
  },
  {
    name: "Michael Rodriguez",
    role: "HR Director",
    company: "Fortune 500 Company",
    content:
      "We've reduced our screening time by 85% while finding better candidates. TalentFlow is a game-changer for our hiring process.",
    rating: 5,
    type: "hr",
  },
  {
    name: "Emily Johnson",
    role: "Marketing Manager",
    company: "Growing Agency",
    content:
      "After months of rejections, TalentFlow connected me with my dream job. The AI really understands what makes a good match.",
    rating: 5,
    type: "candidate",
  },
  {
    name: "David Park",
    role: "Talent Acquisition Lead",
    company: "Scale-up",
    content:
      "The quality of candidates we receive through TalentFlow is consistently higher. It's like having an expert recruiter on our team.",
    rating: 5,
    type: "hr",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Loved by Candidates and HR Teams
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            See how TalentFlow is transforming careers and streamlining hiring processes.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-card border-border">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl text-card-foreground mb-8 leading-relaxed text-pretty">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-semibold text-lg">
                      {testimonials[currentIndex].name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-card-foreground">{testimonials[currentIndex].name}</p>
                    <p className="text-muted-foreground">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        testimonials[currentIndex].type === "candidate"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {testimonials[currentIndex].type === "candidate" ? "Job Seeker" : "HR Professional"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
