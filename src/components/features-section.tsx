import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock, Target, Users, BarChart3, Shield } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description:
      "Advanced algorithms analyze candidate profiles and job requirements to provide intelligent recommendations.",
  },
  {
    icon: Clock,
    title: "Reduced HR Workload",
    description: "Automate initial screening and candidate evaluation, saving hours of manual review time.",
  },
  {
    icon: Target,
    title: "Personalized Recommendations",
    description: "Qualified candidates receive tailored job suggestions based on their skills and experience.",
  },
  {
    icon: Users,
    title: "Candidate Support",
    description: "Help deserving candidates who might be overlooked get the opportunities they deserve.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track hiring metrics, candidate success rates, and optimize your recruitment process.",
  },
  {
    icon: Shield,
    title: "Bias-Free Hiring",
    description: "Eliminate unconscious bias with objective, data-driven candidate evaluation.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Powerful Features for Modern Hiring
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Everything you need to transform your recruitment process and connect the right talent with the right
            opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
