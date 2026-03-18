'use client'

import { MessageCircle, Hash } from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/923218344663?text=Hi%20ZeeTech%2C%20I%20need%20help%20with%20my%20university%20assignment!'
const DISCORD_URL = 'https://discord.com/users/zeetech_pro'

export default function ContactCTA() {
  return (
    <>
      {/* Floating sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 shadow-2xl">
        <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white text-sm font-medium text-center sm:text-left">
            🎓 <span className="text-yellow-400">Need help with this assignment?</span> Get expert assistance now!
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/30 hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/30 hover:scale-105"
            >
              <Hash className="w-4 h-4" />
              Discord
            </a>
          </div>
        </div>
      </div>
      {/* Spacer so footer doesn't get hidden behind the bar */}
      <div className="h-16" />
    </>
  )
}
