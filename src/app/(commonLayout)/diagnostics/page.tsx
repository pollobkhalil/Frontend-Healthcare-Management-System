import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Activity,
  Bone,
  Droplet,
  FlaskConical,
  HeartPulse,
  Microscope,
  ScanLine,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"

const categories = [
  { icon: Droplet, title: "Blood Tests", description: "CBC, blood sugar, lipid profile, thyroid panel, and more.", bg: "bg-red-50", text: "text-red-500" },
  { icon: ScanLine, title: "Imaging", description: "X-Ray, Ultrasound, CT scan, and MRI at partner diagnostic centers.", bg: "bg-blue-50", text: "text-blue-500" },
  { icon: HeartPulse, title: "Cardiac Screening", description: "ECG, Echocardiogram, and cardiac risk assessment packages.", bg: "bg-pink-50", text: "text-pink-500" },
  { icon: Microscope, title: "Pathology", description: "Biopsy analysis, culture tests, and specialized lab diagnostics.", bg: "bg-green-50", text: "text-green-500" },
  { icon: Bone, title: "Orthopedic Tests", description: "Bone density scans and joint health assessments.", bg: "bg-yellow-50", text: "text-yellow-500" },
  { icon: FlaskConical, title: "Full Body Checkup", description: "Comprehensive packages covering 40+ health parameters.", bg: "bg-purple-50", text: "text-purple-500" },
]

const steps = [
  { title: "Book a Test", description: "Choose your test or package and consult a doctor for a referral if needed." },
  { title: "Sample Collection", description: "Visit a partner diagnostic center or opt for home sample collection." },
  { title: "Get Digital Reports", description: "Receive your verified reports online, shared securely with your doctor." },
]

const packages = [
  { name: "Basic Health Checkup", price: "৳1,200", tests: "18 parameters", tag: "Popular" },
  { name: "Diabetes Screening", price: "৳900", tests: "8 parameters", tag: null },
  { name: "Full Body Checkup", price: "৳3,500", tests: "42 parameters", tag: "Best Value" },
]

const DiagnosticsPage = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(125% 125% at 50% 10%, #fff 30%, #DBEAFE 100%)" }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <Microscope className="size-4 text-primary" />
            <span className="text-sm font-medium">Trusted Diagnostic Network</span>
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Lab Tests &amp; Diagnostics, Made Simple
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Book verified lab tests and imaging services with home sample collection and digital reports —
            reviewed by real doctors.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/consultation">Consult a Doctor First</Link>
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
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">Popular Diagnostic Categories</h2>
            <p className="mt-3 text-muted-foreground">
              From routine blood work to advanced imaging, all in one place.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <h2 className="text-center text-3xl font-bold text-foreground">How It Works</h2>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-foreground">Popular Test Packages</h2>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {packages.map((pkg) => (
              <Card key={pkg.name} className="relative">
                {pkg.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {pkg.tag}
                  </span>
                )}
                <CardContent className="p-6 text-center">
                  <Stethoscope className="mx-auto size-6 text-primary" />
                  <h3 className="mt-3 font-bold text-foreground">{pkg.name}</h3>
                  <p className="mt-1 text-2xl font-bold text-foreground">{pkg.price}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{pkg.tests}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary/5 py-16">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
          <Activity className="size-8 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Not sure which test you need?</h2>
          <p className="max-w-md text-muted-foreground">
            Talk to one of our doctors first and get a personalized test recommendation.
          </p>
          <Button asChild size="lg">
            <Link href="/consultation">Book a Consultation</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default DiagnosticsPage
