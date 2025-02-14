"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { FileText, Sparkles, Check } from "lucide-react"
import { FloatingPaper } from "@/components/floating-paper"
import { ResponsiveTable } from "@/components/responsive-table"

export default function Hero() {
    return (
        <div className="flex-grow relative flex flex-col items-center">
            {/* Floating papers background */}
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
                            Upload Paper
                        </Button>
                        <Button size="lg" variant="outline" className="text-white rounded border-purple-500 hover:bg-purple-500/20">
                            <Sparkles className="mr-2 h-5 w-5" />
                            See Examples
                        </Button>
                    </motion.div>
                </div>

                {/* Pricing Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="grid md:grid-cols-2 gap-8 md:w-[800px] mb-12 mx-auto flex justify-center"
                >

                    {/* Free Plan */}
                    <div className="bg-white/10 backdrop-blur-sm rounded p-6 border border-purple-500/20">
                        <h3 className="text-2xl font-bold text-white mb-4">Free Plan</h3>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center text-gray-300">
                                <Check className="mr-2 h-5 w-5 text-green-500" />
                                Basic AI-powered summaries
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="mr-2 h-5 w-5 text-green-500" />
                                Limited paper uploads (5/month)
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="mr-2 h-5 w-5 text-green-500" />
                                Standard support
                            </li>
                        </ul>
                        <Button className="w-full rounded bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-purple-900/30 backdrop-blur-sm rounded p-6 border border-purple-500/50">
                        <h3 className="text-2xl font-bold text-white mb-4">Premium Plan</h3>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center text-gray-300">
                                <Check className="mr-2 h-5 w-5 text-green-500" />
                                Advanced AI-powered summaries and insights
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="mr-2 h-5 w-5 text-green-500" />
                                Unlimited paper uploads
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="mr-2 h-5 w-5 text-green-500" />
                                Priority support
                            </li>
                            <li className="flex items-center text-gray-300">
                                <Check className="mr-2 h-5 w-5 text-green-500" />
                                Custom AI model training
                            </li>
                        </ul>
                        <Button className="w-full rounded bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                            Upgrade to Premium
                        </Button>
                    </div>
                </motion.div>

                {/* Responsive Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <h3 className="flex uppercase justify-center text-2xl font-bold text-white mb-4">Teaching Timetable</h3>
                    <ResponsiveTable />
                </motion.div>
            </div>
        </div>
    )
}

