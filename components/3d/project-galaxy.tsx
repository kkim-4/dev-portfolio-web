"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, X } from "lucide-react" // Added X for close button
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge" // Assuming you have a Badge component

// --- Project Data ---
const projectsData = [
  {
    id: 1,
    name: "Music Social Media App/Website",
    category: ["ai", "fullstack", "opensource"], // Updated to array for multiple categories
    position: [2, 1, 0],
    color: "#00ffff",
    description: "Built a full-stack application that uses a frontend hosted on Expo and a backend hosted on Vercel supports use on Android and Web. This social media app helps user look for songs, create playlists, and connect with other users with similar music tastes. The song database was made with the curation of opensource MusicBrainz and optimized search created using PostgreSQL and GIN index and fts word vectors. Developed a RandomForest-based model, optimized through cross-validation and hyperparameter tuning, for high-quality recommendations. The model was trained on the Spotify Million Playlist Challenge Dataset. This was incorporated into the home feed of my app.",
    technologies: ["React Native", "Javascript", "PostgreSQL", "Expo", "Python", "Pytorch", "TensorFlow"],
    github: "https://github.com",
    demo: "https://replayd--hd2ifnh7p5.expo.app/",
    image: "/music-app-app.png?height=200&width=300",
  },
  /*
  {
    id: 2,
    name: "E-commerce Platform",
    category: "frontend",
    position: [-2, -1, 1],
    color: "#ff00ff",
    description: "Modern e-commerce platform with advanced filtering and payment integration.",
    technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/placeholder.svg?height=200&width=300",
  },
*/
  {
    id: 3,
    name: "Short Story Website",
    category: ["ai", "fullstack", "opensource"], // Updated to array for multiple categories
    position: [0, 2, -2],
    color: "#ffff00",
    description: "Developed a full-stack web application to enable users to share interactive stories using AI. Implemented a post functionality using MongoDB and Firebase for data storage and image management, authentication using Prisma adapter and Next-Auth, and implemented RESTful API that uses SWR to fetch posts and comments from MongoDB. Developed a complex RAG model to generate high-quality short stories and created a robust vector database and query engine. Models were trained on public domain datasets to generate over 100 different creative short stories.",
    technologies: ["React", "HTML/CSS", "Javascript", "MongoDB", "Firebase"],
    github: "https://github.com",
    demo: "https://demo.com",
    image: "/book-app.png?height=200&width=300",
  },
  {
    id: 4,
    name: "Short Story Generator RAG Model",
    category: ["opensource", "ai"], // Updated to array for multiple categories (example of multiple)
    position: [-1, 0, 2],
    color: "#00ff00",
    description: "Developed a Retrieval-Augmented Generation (RAG) model for generating creative short stories using Python, PyTorch, and TensorFlow. The model leverages vector databases and advanced query engines to retrieve relevant information and generate high-quality, context-aware stories. Trained on public domain datasets to ensure diversity and creativity in generated content.",
    technologies: ["Python", "Pytorch", "TensorFlow"],
    github: "https://github.com",
    demo: "https://colab.research.google.com/drive/1PEDzm7MT-iS3HOodLv_SOEOWGVuU978z?usp=sharing",
    image: "/ml-model.png?height=200&width=300",
  },
]

// --- ProjectPlanet Component ---
function ProjectPlanet({ project, onClick, isSelected }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group position={project.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isSelected ? 0.2 : 0.05}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.6, 16]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.2} />
      </mesh>

      <Text position={[0, -0.8, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        {project.name}
      </Text>
    </group>
  )
}

// --- Fallback 2D Grid View ---
function FallbackProjectGrid({ projects, onProjectClick }: any) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: any) => (
        <motion.div
          key={project.id}
          whileHover={{ scale: 1.05 }}
          onClick={() => onProjectClick(project)}
          className="cursor-pointer"
        >
          <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
            <CardContent className="p-4">
              <div
                className="w-full h-32 rounded-lg mb-4 flex items-center justify-center text-4xl"
                style={{ backgroundColor: project.color + "20" }}
              >
                🚀
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
              {/* Display categories in fallback grid */}
              <div className="flex flex-wrap gap-1 mt-2">
                {project.category.map((cat: string) => (
                  <Badge key={cat} variant="secondary" className="text-xs bg-white/10 text-white/80">
                    {cat}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

// --- Main ProjectGalaxy Component ---
interface ProjectGalaxyProps {
  selectedFilter: string
}

export default function ProjectGalaxy({ selectedFilter }: ProjectGalaxyProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [webglSupported, setWebglSupported] = useState(true)
  const [canvasError, setCanvasError] = useState(false)

  // Filter projects based on the selected category (now supports arrays)
  const filteredProjects = projectsData.filter(
    (project) => selectedFilter === "all" || project.category.includes(selectedFilter)
  )

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  const handleCanvasError = () => {
    setCanvasError(true)
    setWebglSupported(false)
  }

  // --- Close button handler ---
  const closeProjectDetails = useCallback(() => {
    setSelectedProject(null)
  }, [])

  return (
    <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center">
      {webglSupported && !canvasError ? (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          onError={handleCanvasError}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff00ff" />

          {filteredProjects.map((project) => (
            <ProjectPlanet
              key={project.id}
              project={project}
              isSelected={selectedProject?.id === project.id}
              onClick={() => setSelectedProject(project)}
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} maxDistance={10} minDistance={3} />
        </Canvas>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6 text-center">
            Your browser does not support WebGL or an error occurred.
          </h3>
          <p className="text-white/70 text-center mb-8 max-w-xl">
            No worries! You can still explore my projects in this beautiful 2D grid view.
          </p>
          <FallbackProjectGrid projects={filteredProjects} onProjectClick={setSelectedProject} />
        </div>
      )}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-auto" // Increased z-index
            onClick={closeProjectDetails} // Close when clicking outside
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              className="glass-morphism rounded-lg p-6 max-w-2xl w-full relative border border-white/20 shadow-2xl" // Added relative for button positioning
              style={{ maxHeight: '90vh' }} // Limit max height
            >
              {/* --- CLOSE BUTTON ADDED HERE --- */}
              <Button
                variant="ghost"
                size="icon"
                onClick={closeProjectDetails}
                className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                aria-label="Close project details"
              >
                <X className="h-6 w-6" />
              </Button>
              {/* --- END CLOSE BUTTON --- */}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProject.image || "/placeholder.svg?height=200&width=300"}
                    alt={selectedProject.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  {/* Display categories in modal */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.category.map((cat: string) => (
                      <Badge key={cat} variant="secondary" className="text-sm bg-white/10 text-white/80">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.name}</h3>

                  <p className="text-white/80 mb-4">{selectedProject.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.technologies.map((tech: string) => (
                      <span key={tech} className="px-2 py-1 bg-white/10 rounded text-sm text-white">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="glass-morphism border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 bg-transparent"
                      asChild
                    >
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="glass-morphism border-purple-400 text-purple-400 hover:bg-purple-400/20 bg-transparent"
                      asChild
                    >
                      <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}