"use client"

import Link from "next/link"
import type React from "react"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/50 border-b border-white/10"
        >
            <Link href="/" className="flex items-center space-x-2">
                <GraduationCap className="w-8 h-8 text-purple-500" />
            </Link>

            <div className="hidden md:flex items-center space-x-4">
                <Link href="/auth/login" className="text-white hover:text-purple-400">
                    Sign In
                </Link>
                <Button className="bg-purple-600 rounded hover:bg-purple-700 text-white">Get Started</Button>
            </div>

            <Button className="md:hidden bg-purple-600 rounded hover:bg-purple-700 text-white">
                Get Started
            </Button>
        </motion.nav>
    )
}


