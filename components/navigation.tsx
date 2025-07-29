"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme() // Get resolvedTheme
  const [mounted, setMounted] = useState(false) // State to track if component is mounted

  // Effect to set mounted to true after the component has mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ]

  // If not mounted, render a placeholder or null to avoid hydration mismatch
  // You might want to render a default moon/sun icon or nothing until mounted
  if (!mounted) {
    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-morphism" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold liquid-gradient font-sora">
              Kevin Kim
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {/* Render navigation links */}
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <motion.a
                      href={item.href}
                      whileHover={{ scale: 1.1 }}
                      className="text-white/80 hover:text-cyan-400 transition-colors"
                    >
                      {item.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
              {/* Render a default icon or just an empty button while waiting for mount */}
              <Button variant="ghost" size="icon" className="text-white">
                {/* You could render a default like <Moon /> or <Sun /> here, or nothing */}
                <Moon className="h-5 w-5" /> {/* Default to Moon as a placeholder */}
              </Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
          {/* Mobile menu (can also be conditionally rendered with mounted) */}
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 glass-morphism rounded-lg p-4"
            >
              <ul className="flex flex-col">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="block py-2 text-white/80 hover:text-cyan-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <li className="py-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/80 hover:text-cyan-400"
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark")
                      setIsOpen(false)
                    }}
                  >
                     {/* Placeholder for mobile theme toggle */}
                    <Moon className="h-5 w-5 mr-2" /> Dark Mode {/* Default to Dark Mode placeholder */}
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </motion.nav>
    );
  }

  // Once mounted, use resolvedTheme which correctly reflects the client's theme
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-morphism" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold liquid-gradient font-sora">
            Kevin Kim
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={item.href}
                    whileHover={{ scale: 1.1 }}
                    className="text-white/80 hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:text-cyan-400"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />} {/* Use resolvedTheme here */}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass-morphism rounded-lg p-4"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="block py-2 text-white/80 hover:text-cyan-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li className="py-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white/80 hover:text-cyan-400"
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark")
                    setIsOpen(false)
                  }}
                >
                  {resolvedTheme === "dark" ? ( // Use resolvedTheme here
                    <>
                      <Sun className="h-5 w-5 mr-2" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5 mr-2" /> Dark Mode
                    </>
                  )}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}