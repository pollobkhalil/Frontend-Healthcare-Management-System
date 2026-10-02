import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Baby,
  Heart,
  Pill,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  Upload,
} from "lucide-react"
import Link from "next/link"

const categories = [
  { icon: Pill, title: "Prescription Medicines", description: "Upload your prescription and get medicines verified by pharmacists.", bg: "bg-blue-50", text: "text-blue-500" },
  { icon: Heart, title: "OTC & Wellness", description: "Vitamins, supplements, and everyday over-the-counter essentials.", bg: "bg-pink-50", text: "text-pink-500" },
  { icon: ShieldCheck, title: "Healthcare Devices", description: "BP monitors, glucometers, nebulizers, and thermometers.", bg: "bg-green-50", text: "text-green-500" },
  { icon: Baby, title: "Baby & Mother Care", description: "Trusted essentials for infants and new mothers.", bg: "bg-yellow-50", text: "text-yellow-500" },
]

const steps = [
  { icon: Upload, title: "Upload Prescription", description: "Snap a photo of your prescription or select medicines directly." },
  { icon: ShieldCheck, title: "Pharmacist Verification", description: "Our licensed pharmacists review every order for accuracy." },
  { icon: Truck, title: "Doorstep Delivery", description: "Get medicines delivered safely and on time, wherever you are." },
]

const trustBadges = [
  "100% Genuine Medicines",
  "Licensed Pharmacy Partners",
  "Secure Payments",
  "Easy Returns & Refunds",
]

const MedicinePage = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(125% 125% at 50% 10%, #fff 30%, #FEF9C3 100%)" }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <Sparkles className="size-4 text-primary" />
            <span className="text-sm font-medium">Genuine Medicines, Delivered</span>
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Order Medicines Online, Hassle-Free
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Upload your prescription, get it verified by our pharmacists, and receive your medicines at your
            doorstep.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/consultation">Get a Prescription</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/register">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-foreground">Shop by Category</h2>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Card key={category.title} className={category.bg}>
                <CardContent className="p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ${category.text}`}>
                    <category.icon size={22} />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{category.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-foreground">How Ordering Works</h2>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon size={24} />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                <ShoppingBag className="size-5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary/5 py-16">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground">Don&apos;t have a prescription yet?</h2>
          <p className="max-w-md text-muted-foreground">
            Book a quick consultation with one of our doctors and get one issued digitally.
          </p>
          <Button asChild size="lg">
            <Link href="/consultation">Consult a Doctor</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default MedicinePage
