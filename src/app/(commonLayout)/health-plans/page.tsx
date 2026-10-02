import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, HeartHandshake, ShieldCheck, Sparkles, Stethoscope, Users } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Basic",
    price: "৳499",
    period: "/ month",
    description: "Essential coverage for individuals.",
    features: ["2 free doctor consultations / month", "10% discount on lab tests", "24/7 chat support", "Digital health records"],
    highlighted: false,
  },
  {
    name: "Family",
    price: "৳1,299",
    period: "/ month",
    description: "Coverage for up to 4 family members.",
    features: [
      "Unlimited doctor consultations",
      "20% discount on lab tests",
      "Free annual full-body checkup",
      "Priority appointment booking",
      "24/7 priority support",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "৳2,499",
    period: "/ month",
    description: "Comprehensive plan with specialist access.",
    features: [
      "Everything in Family plan",
      "Specialist consultations included",
      "30% discount on lab tests & medicines",
      "Dedicated care coordinator",
      "Emergency ambulance assistance",
    ],
    highlighted: false,
  },
]

const benefits = [
  { icon: Stethoscope, title: "Cashless Treatment", description: "Consult and pay seamlessly with your plan credits.", bg: "bg-blue-50", text: "text-blue-500" },
  { icon: ShieldCheck, title: "Verified Doctors Only", description: "Every plan gives access to our vetted specialist network.", bg: "bg-green-50", text: "text-green-500" },
  { icon: HeartHandshake, title: "No Hidden Charges", description: "Transparent pricing with no surprise add-on fees.", bg: "bg-pink-50", text: "text-pink-500" },
  { icon: Users, title: "Family-Friendly", description: "Add dependents anytime and manage everyone from one account.", bg: "bg-yellow-50", text: "text-yellow-500" },
]

const HealthPlansPage = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(125% 125% at 50% 10%, #fff 30%, #DCFCE7 100%)" }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-medium">Affordable Healthcare Plans</span>
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Health Plans Built Around You
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Predictable monthly pricing for consultations, diagnostics, and medicines — for you and your family.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlighted ? "relative border-primary shadow-lg md:-translate-y-4" : "relative"}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="mt-6 w-full" variant={plan.highlighted ? "default" : "outline"}>
                    <Link href="/register">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-foreground">Why Choose Our Health Plans</h2>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className={benefit.bg}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${benefit.text}`}>
                    <benefit.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary/5 py-16">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground">Ready to protect your family&apos;s health?</h2>
          <p className="max-w-md text-muted-foreground">
            Sign up in minutes and activate your plan instantly — no paperwork, no waiting.
          </p>
          <Button asChild size="lg">
            <Link href="/register">Choose Your Plan</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default HealthPlansPage
