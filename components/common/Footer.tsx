import Link from "next/link";
import type React from "react";
import {
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black/[0.96] bg-grid-white/[0.02] backdrop-blur-md py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-300 text-sm">&copy; 2025 Timeable. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <SocialLink href="https://facebook.com" icon={<Facebook size={20} />} label="Facebook" />
            <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} label="Twitter" />
            <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} label="Instagram" />
            <SocialLink href="https://linkedin.com" icon={<Linkedin size={20} />} label="LinkedIn" />
            <SocialLink href="https://github.com/ColinAdo" icon={<Github size={20} />} label="GitHub" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors"
    >
      <span className="sr-only">{label}</span>
      {icon}
    </Link>
  )
}

