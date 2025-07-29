"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ExternalLink, Github, Star } from "lucide-react"
import React, { useState, useEffect } from "react" // Import useState and useEffect

// Placeholder data for blog posts
const blogPostsData = [
  /*
  {
    id: "blog-post-1",
    title: "Mastering React Server Components for Scalable Apps",
    excerpt: "Dive deep into React Server Components, exploring their benefits for performance and scalability in modern web applications.",
    date: "2025-07-20",
    readTime: "10 min read",
    tags: ["React", "Next.js", "SSR", "Performance"],
    imageUrl: "/images/blog/rsc-cover.jpg", // Assuming you'd place actual images here
  },
  {
    id: "blog-post-2",
    title: "Unlocking Creativity with WebGL Shaders: A Beginner's Guide",
    excerpt: "An introductory journey into the world of WebGL shaders, transforming static web pages into dynamic, visual experiences.",
    date: "2025-07-15",
    readTime: "15 min read",
    tags: ["WebGL", "Graphics", "Shaders", "Frontend"],
    imageUrl: "/images/blog/webgl-cover.jpg",
  },
  {
    id: "blog-post-3",
    title: "The Rise of AI in Code Generation: Opportunities and Challenges",
    excerpt: "Examining how AI tools are reshaping software development workflows and the ethical considerations involved.",
    date: "2025-07-10",
    readTime: "9 min read",
    tags: ["AI", "Developer Tools", "Automation"],
    imageUrl: "/images/blog/ai-code-cover.jpg",
  }, */
]

// Placeholder data for open-source projects
const openSourceProjectsData = [
  {
    id: "oss-1",
    name: "music-recommendation-and-playlist-generator-app",
    description: "A React Native app that generates personalized music playlists using Spotify API and machine learning.",
    stars: 4,
    language: "Javascript, MongoDB, React Native, Node.js, Express, Supabase",
    githubUrl: "https://github.com/kkim-4/react-native-glassmorphism", // Replace with your actual repo
  },
  /*
  {
    id: "oss-2",
    name: "nextjs-starter-template",
    description: "A highly optimized Next.js starter with Tailwind CSS and TypeScript.",
    stars: 312,
    language: "TypeScript",
    githubUrl: "https://github.com/kkim-4/nextjs-starter-template", // Replace with your actual repo
  },
  {
    id: "oss-3",
    name: "threejs-interactive-globe",
    description: "An interactive 3D globe visualization built with Three.js and React Fiber.",
    stars: 198,
    language: "JavaScript",
    githubUrl: "https://github.com/kkim-4/threejs-interactive-globe", // Replace with your actual repo
  },
  */
]

export default function BlogSection() {
  const [heatmapColors, setHeatmapColors] = useState<string[]>([]);

  useEffect(() => {
    // Generate random colors for the heatmap only on the client side
    const colors = Array.from({ length: 365 }).map(() => {
      const rand = Math.random();
      if (rand > 0.8) return "bg-green-500";
      if (rand > 0.6) return "bg-green-500/80";
      if (rand > 0.3) return "bg-green-500/40";
      return "bg-gray-700/20"; // Less active or default color
    });
    setHeatmapColors(colors);
  }, []); // Empty dependency array ensures this runs once after initial mount

  return (
    <section id="blog" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">
            Insights & Creations
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            My journey through tech, shared through articles and open-source contributions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Blog Posts Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-purple-400" /> Latest Articles
            </h3>

            <div className="space-y-8">
              {blogPostsData.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }} // Only animate once when in view
                >
                  <Card className="glass-morphism border-white/20 hover:border-purple-400/50 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="md:flex">
                        <div className="md:w-1/3 flex-shrink-0">
                          <img
                            src={post.imageUrl || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-48 md:h-full object-cover md:rounded-l-lg"
                          />
                        </div>
                        <div className="md:w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h4>
                            <p className="text-white/70 mb-4 line-clamp-3">{post.excerpt}</p>
                            <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(post.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {post.readTime}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-white/10 text-white border-white/30">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="glass-morphism border-purple-400 text-purple-400 hover:bg-purple-400/20 bg-transparent self-start"
                          >
                            Read Article
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Open Source Projects & Heatmap Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Github className="h-6 w-6 text-cyan-400" /> Open Source Projects
            </h3>

            <div className="space-y-6 mb-12">
              {openSourceProjectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }} // Only animate once when in view
                >
                  <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-white">{project.name}</h4>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star className="h-4 w-4" fill="currentColor" /> {project.stars}
                        </div>
                      </div>
                      <p className="text-white/70 mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <Badge variant="secondary" className="bg-white/10 text-white border-white/30">
                          {project.language}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            View on GitHub
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* GitHub Contribution Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }} // Only animate once when in view
            >
              <Card className="glass-morphism border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    📊 Contribution Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-20 sm:grid-cols-25 md:grid-cols-30 lg:grid-cols-35 xl:grid-cols-40 gap-1 overflow-x-auto p-2 border border-white/10 rounded-lg">
                    {heatmapColors.map((colorClass, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-sm flex-shrink-0 ${colorClass}`}
                        title={`Day ${i + 1} of the year`}
                      />
                    ))}
                  </div>
                  <p className="text-white/60 text-sm mt-4 text-center">
                    Simulated contributions in the last year (colors for visual effect)
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Call to Action for Collaboration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="mt-12 text-center"
            >
              <p className="text-white/80 text-lg mb-4">
                Have an idea for a collaboration or a project?
              </p>
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:from-purple-600 hover:to-blue-600"
              >
                Let's Connect!
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}