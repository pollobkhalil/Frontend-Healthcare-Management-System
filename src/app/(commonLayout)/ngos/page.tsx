import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Handshake, HeartHandshake, MapPin, Stethoscope, Users2 } from "lucide-react"
import Link from "next/link"

const partners = [
  {
    name: "Shastho Shurokkha Foundation",
    focus: "Rural Health Camps",
    description: "Runs free medical camps across rural districts, providing checkups and medicines to underserved communities.",
    bg: "bg-blue-50",
    text: "text-blue-500",
  },
  {
    name: "Grameen Health Initiative",
    focus: "Maternal & Child Care",
    description: "Focused on maternal health education and neonatal care support for low-income families.",
    bg: "bg-pink-50",
    text: "text-pink-500",
  },
  {
    name: "Care for All Trust",
    focus: "Chronic Disease Support",
    description: "Provides subsidized long-term care and medicine access for diabetes and hypertension patients.",
    bg: "bg-green-50",
    text: "text-green-500",
  },
  {
    name: "Rural Health Alliance",
    focus: "Telemedicine Outreach",
    description: "Connects remote villages with our doctor network through community telemedicine centers.",
    bg: "bg-yellow-50",
    text: "text-yellow-500",
  },
]

const impactStats = [
  { value: "50,000+", label: "Free Consultations" },
  { value: "120+", label: "Rural Health Camps" },
  { value: "300+", label: "Volunteer Doctors" },
  { value: "18", label: "Partner NGOs" },
]

const NgosPage = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ background: "radial-gradient(125% 125% at 50% 10%, #fff 30%, #EDE9FE 100%)" }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <HeartHandshake className="size-4 text-primary" />
            <span className="text-sm font-medium">Healthcare for Everyone</span>
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Partnering with NGOs to Reach Those Who Need It Most
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            We work alongside grassroots organizations to bring free and subsidized healthcare to underserved
            communities.
          </p>
        </div>
      </section>

      {/* Impact stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner NGOs */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-bold text-foreground">Our Partner Organizations</h2>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {partners.map((partner) => (
              <Card key={partner.name} className={partner.bg}>
                <CardContent className="p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ${partner.text}`}>
                    <Users2 size={22} />
                  </div>
                  <h3 className="mt-4 font-bold text-foreground">{partner.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                    <MapPin className="size-3" /> {partner.focus}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{partner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary/5 py-16">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center">
          <Handshake className="size-8 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Want to volunteer or partner with us?</h2>
          <p className="max-w-md text-muted-foreground">
            Doctors, NGOs, and healthcare organizations are welcome to join our mission of accessible healthcare
            for all.
          </p>
          <Button asChild size="lg">
            <Link href="/register">
              <Stethoscope className="size-4" />
              Join as a Volunteer Doctor
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}

export default NgosPage
