import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance mb-6">
            Join the Future of Hiring Today
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 text-pretty leading-relaxed">
            Whether you're a talented candidate seeking opportunities or an HR professional looking to streamline your
            process, TalentFlow is here to transform your experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4">For Job Seekers</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-foreground/80" />
                  <span>Get personalized job recommendations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-foreground/80" />
                  <span>Access hidden opportunities</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-foreground/80" />
                  <span>Improve your profile visibility</span>
                </li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4">For HR Teams</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-foreground/80" />
                  <span>Reduce screening time by 85%</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-foreground/80" />
                  <span>Find better quality candidates</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-primary-foreground/80" />
                  <span>Eliminate hiring bias</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/70">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
