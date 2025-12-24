"use client"

import { Linkedin, Mail, Phone, MapPin, ExternalLink, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Create particles
    const particles: Particle[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    // Animation loop
    function animate() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.2 * (1 - distance / 150)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }} />
}

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
        <ParticleBackground />

        <div
          className={`container mx-auto px-4 py-20 relative z-10 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 text-balance bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Ayush Kumar
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-400 mb-6 font-medium">Software Engineer</p>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 text-pretty max-w-2xl mx-auto">
              A passionate full-stack developer crafting efficient, scalable solutions with the MERN stack. Focused on
              clean code, robust architecture, and creating meaningful digital experiences.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
              >
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushkumar07012005@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get in Touch
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-cyan-500/50 hover:bg-cyan-500/10 hover:border-cyan-500 text-cyan-400 hover:text-cyan-300 bg-transparent"
              >
                <a href="https://www.linkedin.com/in/ayush-vats-23689b202" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn
                </a>
              </Button>
            </div>

            <button
              onClick={() => scrollToSection("about")}
              className="mt-16 inline-flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors group"
              aria-label="Scroll to content"
            >
              <span className="text-sm">Explore More</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-b border-border bg-slate-900/50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-16 text-balance bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Building Digital Solutions
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-2 border-slate-800 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2 text-white">
                    <div className="h-1 w-12 bg-cyan-500 rounded-full" />
                    Career Objective
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed text-pretty">
                    To work as a Software Engineer applying my knowledge in the field of testing, designing, and
                    maintenance to cater to the specific needs of the people. I wish to work in a team of motivated
                    individuals who wish to work towards the advancement of the company and its goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2 text-white">
                    <div className="h-1 w-12 bg-purple-500 rounded-full" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <a
                      href="mailto:ayush.k2024@gmail.com"
                      className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group"
                    >
                      <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform">
                        <Mail className="h-4 w-4 text-cyan-400" />
                      </div>
                      <span>ayush.k2024@gmail.com</span>
                    </a>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Phone className="h-4 w-4 text-green-400" />
                      </div>
                      <span>+91 8002811937</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <MapPin className="h-4 w-4 text-purple-400" />
                      </div>
                      <span>Naugachhia, Bihar (853204)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">Experience</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-16 text-balance bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Professional Journey
            </h3>
            <Card className="border-2 border-slate-800 border-l-4 border-l-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all bg-slate-900/80">
              <CardHeader>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <CardTitle className="text-3xl mb-2 text-white">Full-Stack Intern</CardTitle>
                    <CardDescription className="text-lg text-slate-400">Robo Genious</CardDescription>
                  </div>
                  <Badge className="shrink-0 bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950 border-0 text-base px-4 py-1.5 font-semibold">
                    MERN Stack
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed text-lg">
                  Developed a full-featured Note App using the MERN stack (MongoDB, Express.js, React.js, Node.js).
                  Implemented RESTful APIs, user authentication, and responsive UI components for seamless note-taking
                  experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="border-b border-border bg-slate-900/50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">Projects</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-16 text-balance bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Featured Work
            </h3>
            <div className="grid gap-8">
              <Card className="border-2 border-slate-800 hover:border-cyan-500/50 transition-all hover:shadow-2xl hover:shadow-cyan-500/10 group bg-slate-900/80">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <CardTitle className="text-2xl group-hover:text-cyan-400 transition-colors text-white">
                      Note App - Full Stack Application
                    </CardTitle>
                    <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-500/20 text-green-400 border-0">MongoDB</Badge>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-0">Express.js</Badge>
                    <Badge className="bg-blue-500/20 text-blue-400 border-0">React</Badge>
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-0">Node.js</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-0">C Language</Badge>
                    <Badge className="bg-teal-500/20 text-teal-400 border-0">Arduino</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Built a complete note-taking application with user authentication, CRUD operations, and real-time
                    updates. Implemented secure backend APIs and responsive frontend interface.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-cyan-400" />
                      </div>
                      <span className="text-slate-200">RESTful API design with Express.js and MongoDB integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-cyan-400" />
                      </div>
                      <span className="text-slate-200">User authentication and session management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-cyan-400" />
                      </div>
                      <span className="text-slate-200">Responsive React components with modern UI patterns</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/10 group bg-slate-900/80">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <CardTitle className="text-2xl group-hover:text-purple-400 transition-colors text-white">
                      Hotel Reservation System
                    </CardTitle>
                    <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-500/20 text-purple-400 border-0">SQL</Badge>
                    <Badge className="bg-pink-500/20 text-pink-400 border-0">Database Design</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Designed and implemented a comprehensive database management system for hotel operations with
                    normalized tables and efficient query optimization.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-purple-400" />
                      </div>
                      <span className="text-slate-200">
                        Well-structured database with normalized tables for Guests, Rooms, Reservations, and Payments
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-purple-400" />
                      </div>
                      <span className="text-slate-200">
                        Room availability tracking and booking logic to prevent double bookings
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-purple-400" />
                      </div>
                      <span className="text-slate-200">Real-time room status updates and reservation management</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-800 hover:border-orange-500/50 transition-all hover:shadow-2xl hover:shadow-orange-500/10 group bg-slate-900/80">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <CardTitle className="text-2xl group-hover:text-orange-400 transition-colors text-white">
                      Hotel Management System
                    </CardTitle>
                    <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-orange-400 transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-orange-500/20 text-orange-400 border-0">C Language</Badge>
                    <Badge className="bg-amber-500/20 text-amber-400 border-0">File Handling</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Developed a console-based hotel management application with customer record management and
                    administrative functions using C programming.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-orange-400" />
                      </div>
                      <span className="text-slate-200">
                        Room booking system with customer record storage using structures
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-orange-400" />
                      </div>
                      <span className="text-slate-200">
                        Admin functionality for managing room availability and customer data
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-orange-400" />
                      </div>
                      <span className="text-slate-200">File I/O operations for persistent data storage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-800 hover:border-green-500/50 transition-all hover:shadow-2xl hover:shadow-green-500/10 group bg-slate-900/80">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <CardTitle className="text-2xl group-hover:text-green-400 transition-colors text-white">
                      Vertical Farming Light Blinker
                    </CardTitle>
                    <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-green-400 transition-colors" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-teal-500/20 text-teal-400 border-0">Arduino</Badge>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-0">C Language</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-0">IoT</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Created an Arduino-based automated lighting system for vertical farming that simulates day-night
                    cycles to optimize plant growth.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                      </div>
                      <span className="text-slate-200">
                        Automated light control simulating natural day-night cycles
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                      </div>
                      <span className="text-slate-200">Energy-efficient timer and sensor integration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                      </div>
                      <span className="text-slate-200">
                        Reduced power consumption and operational costs for indoor farming
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">Technical Skills</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-16 text-balance bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Tech Stack
            </h3>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Updated card colors for dark theme */}
              <Card className="border-2 border-slate-800 hover:shadow-xl hover:shadow-cyan-500/10 transition-all bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-white">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      <div className="h-6 w-6 bg-cyan-500 rounded" />
                    </div>
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-cyan-500/10 dark:hover:bg-cyan-950 transition-colors text-cyan-400 border-cyan-500/50 hover:text-cyan-300 hover:border-cyan-500"
                    >
                      JavaScript
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors text-blue-400 border-blue-500/50 hover:text-blue-300 hover:border-blue-500"
                    >
                      Python
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-orange-50 dark:hover:bg-orange-950 transition-colors text-orange-400 border-orange-500/50 hover:text-orange-300 hover:border-orange-500"
                    >
                      C Language
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors text-purple-400 border-purple-500/50 hover:text-purple-300 hover:border-purple-500"
                    >
                      SQL
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-800 hover:shadow-xl hover:shadow-purple-500/10 transition-all bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3 text-white">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <div className="h-6 w-6 bg-purple-500 rounded" />
                    </div>
                    Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-pink-50 dark:hover:bg-pink-950 transition-colors text-pink-400 border-pink-500/50 hover:text-pink-300 hover:border-pink-500"
                    >
                      HTML & CSS
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors text-blue-400 border-blue-500/50 hover:text-blue-300 hover:border-blue-500"
                    >
                      React.js
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors text-emerald-400 border-emerald-500/50 hover:text-emerald-300 hover:border-emerald-500"
                    >
                      Node.js
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-yellow-50 dark:hover:bg-yellow-950 transition-colors text-yellow-400 border-yellow-500/50 hover:text-yellow-300 hover:border-yellow-500"
                    >
                      Express.js
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-green-50 dark:hover:bg-green-950 transition-colors text-green-400 border-green-500/50 hover:text-green-300 hover:border-green-500"
                    >
                      MongoDB
                    </Badge>
                    <Badge
                      variant="outline"
                      className="px-5 py-2.5 text-base hover:bg-teal-50 dark:hover:bg-teal-950 transition-colors text-teal-400 border-teal-500/50 hover:text-teal-300 hover:border-teal-500"
                    >
                      Arduino
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="border-b border-border bg-slate-900/50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">Education</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-16 text-balance bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
              Academic Background
            </h3>
            <div className="space-y-6">
              <Card className="border-2 border-slate-800 border-l-4 border-l-cyan-500 hover:shadow-xl hover:shadow-cyan-500/10 transition-all bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Master of Computer Applications (MCA)</CardTitle>
                  <CardDescription className="text-base mt-2 font-medium text-slate-300">
                    GIFT Autonomous College, Bhubaneswar
                  </CardDescription>
                  <CardDescription className="mt-1 text-slate-400">
                    Biju Patnaik University of Technology • Pursuing
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-slate-800 border-l-4 border-l-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Bachelor of Computer Applications (BCA)</CardTitle>
                  <CardDescription className="text-base mt-2 font-medium text-slate-300">
                    Marwari College, Bhagalpur
                  </CardDescription>
                  <CardDescription className="mt-1 text-slate-400">
                    Tilka Manjhi University, Bhagalpur, Bihar • 2023 • 65.31%
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-slate-800 border-l-4 border-l-green-500 hover:shadow-xl hover:shadow-green-500/10 transition-all bg-slate-900/80">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Intermediate</CardTitle>
                  <CardDescription className="text-base mt-2 font-medium text-slate-300">
                    City College, Bhagalpur, Bihar
                  </CardDescription>
                  <CardDescription className="mt-1 text-slate-400">2020 • 60%</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Strengths */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">Achievements</h2>
                <h3 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Recognition
                </h3>
                <div className="space-y-6">
                  {/* Updated card colors for dark theme */}
                  <Card className="border-2 border-slate-800 hover:shadow-xl hover:shadow-yellow-500/10 transition-all bg-slate-900/80">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-yellow-500/20 rounded-lg shrink-0">
                          <div className="text-3xl">🏆</div>
                        </div>
                        <div>
                          <p className="font-semibold text-lg mb-1 text-white">2nd Prize in Cricket</p>
                          <p className="text-slate-300">College Tournament</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-800 hover:shadow-xl hover:shadow-blue-500/10 transition-all bg-slate-900/80">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg shrink-0">
                          <div className="text-3xl">💻</div>
                        </div>
                        <div>
                          <p className="font-semibold text-lg mb-1 text-white">C Programming Workshop</p>
                          <p className="text-slate-300">Enhanced problem-solving and coding skills</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-purple-400 mb-4 tracking-wider uppercase">Strengths</h2>
                <h3 className="text-3xl font-bold mb-10 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Core Values
                </h3>
                <div className="space-y-4">
                  {/* Updated card colors and gradients for dark theme */}
                  <Card className="border-2 border-slate-800 hover:shadow-xl transition-all hover:border-cyan-500/50 bg-slate-900/80">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500" />
                        <span className="text-lg font-medium text-white">Discipline</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-800 hover:shadow-xl transition-all hover:border-purple-500/50 bg-slate-900/80">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                        <span className="text-lg font-medium text-white">Leadership</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-slate-800 hover:shadow-xl transition-all hover:border-green-500/50 bg-slate-900/80">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
                        <span className="text-lg font-medium text-white">Teamwork</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section id="contact" className="border-b border-border relative overflow-hidden">
        {/* Updated gradient for dark theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-transparent to-blue-950/50" />
        <ParticleBackground />

        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-cyan-400 mb-4 tracking-wider uppercase">Contact</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-balance bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Get In Touch
              </h3>
              <p className="text-lg text-black-300 max-w-2xl mx-auto text-pretty">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="flex justify-center mb-12">
              {/* Updated card colors and hover effects for dark theme */}
              <Card className="border-2 border-slate-800 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10 group max-w-md w-full bg-slate-900/80">
                <CardContent className="pt-6">
                  <a
                    href="https://www.linkedin.com/in/ayush-vats-23689b202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                      <Linkedin className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1 group-hover:text-purple-400 transition-colors text-white">
                        Connect on LinkedIn
                      </h4>
                      <p className="text-slate-300 mb-2">Let's connect professionally</p>
                      <p className="text-sm text-cyan-400 flex items-center gap-1">
                        View Profile
                        <ExternalLink className="h-3 w-3" />
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              {/* Updated card colors and gradient for dark theme */}
              <Card className="border-2 border-cyan-500/30 bg-gradient-to-br from-slate-950/50 to-blue-950/50">
                <CardContent className="pt-8 pb-8">
                  <h4 className="text-2xl font-bold mb-3 text-white">Ready to Start a Project?</h4>
                  <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                    I'm currently available for freelance work and full-time opportunities. Let's create something
                    amazing together!
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold shadow-lg shadow-cyan-500/30 transition-all hover:shadow-xl hover:shadow-cyan-500/40"
                    >
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushkumar07012005@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail className="mr-2 h-5 w-5" />
                        Start a Conversation
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-2 border-cyan-500/50 hover:bg-cyan-500/10 hover:border-cyan-500 text-cyan-400 hover:text-cyan-300 bg-transparent"
                    >
                      <a
                        href="https://www.linkedin.com/in/ayush-vats-23689b202"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="mr-2 h-5 w-5" />
                        View LinkedIn
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
              <div className="text-center md:text-left text-white">
                <h4 className="text-2xl font-bold mb-2">Ayush Kumar</h4>
                <p className="text-slate-300">Software Engineer</p>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.linkedin.com/in/ayush-vats-23689b202"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-500/20 rounded-full text-blue-400 hover:scale-110 transition-transform"
                >
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ayushkumar07012005@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-purple-500/20 rounded-full text-purple-400 hover:scale-110 transition-transform"
                >
                  <Mail className="h-6 w-6" />
                  <span className="sr-only">Email</span>
                </a>
                <a
                  href="tel:+918002811937"
                  className="p-3 bg-green-500/20 rounded-full text-green-400 hover:scale-110 transition-transform"
                >
                  <Phone className="h-6 w-6" />
                  <span className="sr-only">Phone</span>
                </a>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8">
              <p className="text-center text-sm text-slate-400">
                © 2025 Ayush Kumar. Built with Next.js and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
