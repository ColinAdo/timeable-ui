"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Pricing } from "@/components/common"
import { Button } from "@/components/ui/button"
import { FileText, Sparkles } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"

export default function Hero() {
    return (
        <div className="flex-grow relative flex flex-col items-center">
            {/* Floating papers background animation */}
            <div className="absolute inset-0 overflow-hidden">
                <FloatingPaper count={6} />
            </div>

            <div className="container mx-auto px-6 relative z-10 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                            Automatic timetable
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                {" "}
                                Generator
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
                    >

                        Upload an excel file containing unit code, unit name and academic year e.g year 1 semester 1 (Y1S1), and let our algorithm do the magic of transform it into a fully functional timetable with no collision.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <Button size="lg" className="bg-purple-600 rounded hover:bg-purple-700 text-white px-8">
                            <FileText className="mr-2 h-5 w-5" />
                            Upload excel file
                        </Button>
                        <Button size="lg" variant="outline" className="text-white rounded border-purple-500 hover:bg-purple-500/20">
                            <Sparkles className="mr-2 h-5 w-5" />
                            See Examples
                        </Button>
                    </motion.div>
                </div>

                {/* Pricing Section */}
                <Pricing />

                {/* Responsive Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <h3 className="flex uppercase justify-center text-2xl font-bold text-white mb-4">Teaching Timetable</h3>
                    <div className="lg:w-[880px] mx-auto flex justify-center w-full overflow-auto rounded backdrop-blur-sm border border-purple-400">
                        <Image src="/assets/timetable.png"
                            alt="Timetable"
                            width={880}
                            height={500}
                            className="rounded-lg shadow-lg">

                        </Image>
                    </div>

                </motion.div>
            </div>
        </div>
    )
}

