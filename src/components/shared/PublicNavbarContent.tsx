"use client"

import { getDefaultDashboardRoute, type UserRole } from "@/lib/authUtils"
import { LayoutDashboard, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet"

interface PublicNavbarContentProps {
  userInfo: { name?: string; role?: string } | null
}

const navItems = [
  { href: "/consultation", label: "Consultation" },
  { href: "/health-plans", label: "Health Plans" },
  { href: "/medicine", label: "Medicine" },
  { href: "/diagnostics", label: "Diagnostics" },
  { href: "/ngos", label: "NGOs" },
]

const PublicNavbarContent = ({ userInfo }: PublicNavbarContentProps) => {
  const dashboardHref = userInfo?.role ? getDefaultDashboardRoute(userInfo.role as UserRole) : null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">PH Doc</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link key={link.label} href={link.href} className="text-foreground hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {userInfo && dashboardHref ? (
            <Button asChild size="sm">
              <Link href={dashboardHref}>
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link key={link.label} href={link.href} className="text-lg font-medium">
                    {link.label}
                  </Link>
                ))}

                <div className="mt-2 flex flex-col gap-2 border-t pt-4">
                  {userInfo && dashboardHref ? (
                    <Button asChild>
                      <Link href={dashboardHref}>Dashboard</Link>
                    </Button>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/login">Log In</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default PublicNavbarContent
