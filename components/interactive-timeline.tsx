"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Briefcase } from "lucide-react"

const timelineData = [
  {
    id: 1,
    year: "January 2025 - Present",
    title: "Artificial Intelligence Researcher",
    company: "Emory Center for AI Learning",
    location: "Atlanta, GA",
    description: "Currently working on a project in collaboration with Emory’s Chemistry department on how to better improve their Chemistry Unbound curriculum. Using Rasch IRT analysis and sentiment analysis using NLP to decipher non-binary datasets on student assessment and gauge student feedback to study the efficacy of changes in the current Chemistry curriculum at Emory using Python, SQL, and models made in Google Colab",
    technologies: ["SQL" , "Excel", "Python", "R", "PyTorch", "TensorFlow"],
    achievements: ["Poster Presenetation", "Developed AI models"],
  },
  {
    id: 2,
    year: "September 2022 - Present",
    title: "Undergraduate Researcher",
    company: "Emory University",
    location: "Atlanta, GA",
    description: "Compiled data concerning mental health insurance payments to study mental health provider reimbursement rates and conducted research on nationwide mental health parity law databases. Written extensive reports and literature reviews on many topics such as the closing of the Wellstar Medical Center. Created various statistical models coded in R, Python, and SQL while using national databases such as MEPS or AHRF on health economics data. Currently working on a paper based on our research on insurance acceptance where I presented a poster presentation at the SRSA Conference 2024",
    technologies: ["R", "SQL", "Python"],
    achievements: ["Poster Presentation at SRSA Conference 2024", "worked with national health databases"],
  },
  {
    id: 3,
    year: "May 2023 - September 2023",
    title: "Oncology Research Assistant",
    company: "Nell Hodgson Woodruff School of Nursing",
    location: "Atlanta, GA",
    description: "Screened patients, collected/entered data, and performed qualitative analysis to develop a web-based intervention for psychoneurological symptoms of colorectal cancer patients. Second author of a paper based on the research published in Cancer Nursing (international cancer research journal)",
    technologies: ["Dedoose, Quality Analysis", "Data Collection", "Epic EMR"],
    achievements: ["Worked in cutting edge medical research", "Published research paper"],
  },
]

export default function InteractiveTimeline() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full" />

      <div className="space-y-12">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
          >
            {/* Content Card */}
            <div className={`w-5/12 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                className="cursor-pointer"
              >
                <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-cyan-400" />
                      <span className="text-cyan-400 font-semibold">{item.year}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>

                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="h-4 w-4 text-purple-400" />
                      <span className="text-white/80">{item.company}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="h-4 w-4 text-green-400" />
                      <span className="text-white/60">{item.location}</span>
                    </div>

                    <p className="text-white/70 mb-4">{item.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-white/10 text-white">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Timeline Node */}
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full border-4 border-black shadow-lg"
              />
            </div>

            {/* Spacer */}
            <div className="w-5/12" />
          </motion.div>
        ))}
      </div>

      {/* Expanded Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-morphism rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              {(() => {
                const item = timelineData.find((i) => i.id === selectedItem)
                if (!item) return null

                return (
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-white/80 mb-6">{item.description}</p>

                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">Key Achievements:</h4>
                    <ul className="space-y-2 mb-6">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-white/70 flex items-center">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-white/10 text-white">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
