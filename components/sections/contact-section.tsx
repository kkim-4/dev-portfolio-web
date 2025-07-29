"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Send, Mic, MicOff, Github, Linkedin, Twitter, Instagram, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactSection() {
  const [isRecording, setIsRecording] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [aiMessage, setAiMessage] = useState("")
  const { toast } = useToast()

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent! 🚀",
      description: "Thanks for reaching out. I'll get back to you soon!",
      variant: "default",
    })

    setFormData({ name: "", email: "", message: "" })
  }

  const toggleRecording = () => {
    setIsRecording((prev) => !prev)
    if (!isRecording) {
      toast({
        title: "Voice input activated 🎤",
        description: "Speak your message into the microphone.",
        variant: "default",
      })
      // Simulate voice input processing
      setTimeout(() => {
        setFormData((prev) => ({ ...prev, message: prev.message + " (Transcribed voice message here)" }))
        setIsRecording(false)
        toast({
          title: "Voice transcribed!",
          description: "Your message has been added to the text area.",
          variant: "success", // Assuming you have a 'success' variant for toast
        })
      }, 3000)
    } else {
      toast({
        title: "Voice input stopped",
        description: "Recording has been paused.",
        variant: "destructive", // Assuming you have a 'destructive' variant for toast
      })
    }
  }

  const handleAiQuery = (query: string) => {
    setAiMessage(`AI Assistant: ${query}`)
    toast({
      title: "AI Assistant Query",
      description: `You asked: "${query}"`,
      variant: "secondary",
    })
    // Simulate AI response
    setTimeout(() => {
      setAiMessage(`AI Assistant: Thanks for asking about "${query}". Kevin has extensive experience in web development, focusing on Next.js, React, and serverless architectures. He's also proficient in Three.js for interactive 3D experiences.`)
    }, 2000)
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background Gradients/Blobs - for visual flair */}
      <div className="absolute inset-0 z-0">
        <div className="w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob absolute top-0 left-0"></div>
        <div className="w-96 h-96 bg-gradient-to-l from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 absolute bottom-0 right-0"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white liquid-gradient font-sora">
            Let's Connect & Create
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Whether you have a project in mind, a question, or just want to say hi, I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Card className="glass-morphism border-white/20 shadow-lg backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-2xl">
                  <MessageSquare className="h-6 w-6 text-cyan-400" /> Send Me a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="glass-morphism border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400 focus:ring-cyan-400"
                      required
                      aria-label="Your Name"
                    />
                  </div>

                  <div>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="glass-morphism border-white/20 text-white placeholder:text-white/50 focus:border-cyan-400 focus:ring-cyan-400"
                      required
                      aria-label="Your Email"
                    />
                  </div>

                  <div className="relative">
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleFormChange}
                      className="glass-morphism border-white/20 text-white placeholder:text-white/50 min-h-32 focus:border-cyan-400 focus:ring-cyan-400 pr-12"
                      required
                      aria-label="Your Message"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={toggleRecording}
                      className={`absolute top-2 right-2 ${
                        isRecording ? "text-red-400 animate-pulse" : "text-white/60"
                      } hover:bg-white/10`}
                      aria-label={isRecording ? "Stop voice recording" : "Start voice recording"}
                    >
                      {isRecording ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                    size="lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: AI Assistant, Contact Info, Socials */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-8"
          >
            {/* AI Assistant */}
            <Card className="glass-morphism border-white/20 shadow-lg backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-2xl">
                  🤖 AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-green-400 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                      AI
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-base leading-relaxed">
                        {aiMessage || "Hello! I'm Kevin's AI assistant. I can quickly provide information about his projects, skills, or even help schedule a meeting. What can I assist you with today?"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge
                      variant="outline"
                      className="bg-white/10 text-white border-white/30 cursor-pointer hover:bg-white/20 transition-colors px-4 py-2"
                      onClick={() => handleAiQuery("Tell me about Kevin's experience")}
                    >
                      Tell me about Kevin's experience
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-white/10 text-white border-white/30 cursor-pointer hover:bg-white/20 transition-colors px-4 py-2"
                      onClick={() => handleAiQuery("What technologies does he specialize in?")}
                    >
                      What technologies does he specialize in?
                    </Badge>
                    <Badge
                      variant="outline"
                      className="bg-white/10 text-white border-white/30 cursor-pointer hover:bg-white/20 transition-colors px-4 py-2"
                      onClick={() => handleAiQuery("How can I schedule a meeting?")}
                    >
                      How can I schedule a meeting?
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information & Social Links combined */}
            <Card className="glass-morphism border-white/20 shadow-lg backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-2xl">
                  📞 Quick Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                    <a href="mailto:kevin.kim5@emory.edu" className="text-white/80 hover:text-cyan-300 transition-colors">
                      kevin.kim5@emory.edu
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-green-400 flex-shrink-0" />
                    <a href="tel:+14085155340" className="text-white/80 hover:text-green-300 transition-colors">
                      +1 (408)-515-5340
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-purple-400 flex-shrink-0" />
                    <span className="text-white/80">Bay Area, CA, USA</span>
                  </div>
                </div>

                {/* Social Links Sub-section */}
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Connect Online</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "GitHub", icon: Github, color: "hover:text-gray-400", link: "https://github.com/kkim-4" },
                      { name: "LinkedIn", icon: Linkedin, color: "hover:text-blue-400", link: "https://www.linkedin.com/in/kevin-kim4" },
                      {
                        name: "Twitter",
                        icon: (props: React.SVGProps<SVGSVGElement>) => (
                          <svg {...props} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.713-2.164-10.141-5.144-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.697 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.928-.086.627 1.956 2.444 3.377 4.6 3.417-1.68 1.318-3.809 2.105-6.102 2.105-.396 0-.787-.023-1.175-.069 2.179 1.397 4.768 2.213 7.557 2.213 9.054 0 14.002-7.496 14.002-13.986 0-.21 0-.423-.016-.634z"/>
                          </svg>
                        ),
                        color: "hover:text-cyan-400",
                        link: "https://x.com/moderndiogenes4"
                      },
                      { name: "Instagram", icon: Instagram, color: "hover:text-cyan-400", link: "https://www.instagram.com/kev.in.kim/" },
                      // If you have a Discord server/profile link
                      // { name: "Discord", icon: MessageSquare, color: "hover:text-purple-400", link: "https://discord.gg/your-invite" },
                    ].map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg glass-morphism border border-white/10 text-white/80 transition-all duration-200 ${social.color}`}
                        aria-label={`Connect on ${social.name}`}
                      >
                        <social.icon className="h-5 w-5" />
                        <span>{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 pt-8 border-t border-white/10 text-center relative z-10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/60 text-sm">© 2025 Kevin Kim. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
              <span className="text-white/40 text-xs">Built with Next.js & Framer Motion</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}