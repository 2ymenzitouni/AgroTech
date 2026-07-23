import React from 'react'
import { 
  LayoutDashboard, 
  Cpu, 
  History, 
  Eye, 
  Bot, 
  BarChart3, 
  BookOpen, 
  FileText, 
  Users, 
  Settings as SettingsIcon, 
  User, 
  LifeBuoy, 
  LogOut,
  Zap
} from 'lucide-react'

export default function Sidebar({ activeTab, onTabChange, onLogout, onDeploy }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'simulation', label: 'Robot Simulation', icon: Cpu },
    { id: 'reports', label: 'Detection History', icon: History },
    { id: 'control', label: 'Detection Details', icon: Eye },
    { id: 'chat', label: 'AI Chatbot', icon: Bot },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-64 z-50 bg-inverse-surface text-white shadow-lg flex flex-col py-6">
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
          <Zap className="text-on-primary-container w-6 h-6 fill-current" />
        </div>
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-black text-primary-fixed leading-none">AgroTech</h1>
          <p className="text-[10px] uppercase tracking-widest text-surface-variant/60 font-bold">Precision Fleet</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-[calc(100%-16px)] flex items-center gap-stack-md px-4 py-3 mx-2 rounded-lg transition-all duration-200 text-left ${
                isActive 
                  ? 'bg-secondary text-on-secondary shadow-md scale-98 font-semibold' 
                  : 'text-surface-variant hover:text-white hover:bg-tertiary-container/20'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'opacity-80'}`} />
              <span className="font-label-sm text-label-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto px-4 pt-6 space-y-1 border-t border-white/10">
        <button 
          onClick={onDeploy}
          className="w-full bg-primary-container text-on-primary-container font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-4 hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span className="text-sm">Deploy Fleet</span>
        </button>

        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-stack-md text-error hover:bg-error-container/20 px-4 py-3 rounded-lg transition-colors text-left"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-label-sm text-label-sm">Log Out</span>
        </button>
      </div>
    </aside>
  )
}
