import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import RobotSimulation from './views/RobotSimulation'
import RobotControl from './views/RobotControl'
import AIAssistantChat from './views/AIAssistantChat'
import Reports from './views/Reports'
import UserManagement from './views/UserManagement'
import UserProfile from './views/UserProfile'
import Settings from './views/Settings'
import { AlertCircle, ShieldAlert, Sparkles, X, Wifi } from 'lucide-react'

export default function App() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [toast, setToast] = useState({ show: false, message: '' })
  const [panic, setPanic] = useState(false)

  const triggerToast = (message) => {
    setToast({ show: true, message })
    setTimeout(() => {
      setToast({ show: false, message: '' })
    }, 3500)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setActiveTab('dashboard')
    triggerToast(`Authenticated as ${userData.name}. Connecting to drone network...`)
  }

  const handleLogout = () => {
    setUser(null)
    setPanic(false)
  }

  const handleDeployFleet = () => {
    triggerToast('Fleet deployed! Sending flight paths to all 14 units.')
  }

  const handlePanicStop = () => {
    setPanic(true)
    triggerToast('EMERGENCY COMMAND ISSUED: LOCKDOWN IN PROGRESS')
  }

  // Determine active view to render
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            onTabChange={setActiveTab} 
            onTriggerToast={triggerToast} 
            onPanic={handlePanicStop}
          />
        )
      case 'simulation':
        return <RobotSimulation onTriggerToast={triggerToast} />
      case 'control':
        return <RobotControl onTriggerToast={triggerToast} />
      case 'chat':
        return <AIAssistantChat onTriggerToast={triggerToast} />
      case 'reports':
        return <Reports onTriggerToast={triggerToast} />
      case 'users':
        return <UserManagement onTriggerToast={triggerToast} />
      case 'profile':
        return <UserProfile user={user} onTriggerToast={triggerToast} />
      case 'settings':
        return <Settings onTriggerToast={triggerToast} />
      default:
        return (
          <div className="p-8 text-center text-on-surface-variant font-bold bg-white rounded-xl border border-outline-variant">
            View Not Implemented Yet
          </div>
        )
    }
  }

  // Get human readable title of active tab
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Operational Overview'
      case 'simulation': return 'Robot Simulation & Telemetry'
      case 'control': return 'Robot Control Center'
      case 'chat': return 'AgroAI Fleet Support'
      case 'reports': return 'Historical Reports & Diagnostics'
      case 'users': return 'Operator Account Management'
      case 'profile': return 'Operator Profile'
      case 'settings': return 'ML Configuration Preference'
      default: return 'AgroTech Control Center'
    }
  }

  // Render Login page if not authenticated
  if (!user) {
    return <Login onLoginSuccess={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md relative overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout}
        onDeploy={handleDeployFleet}
      />

      {/* Main Container Wrapper */}
      <div className="ml-64 flex flex-col min-h-screen relative">
        <Header 
          title={getTabTitle()} 
          user={user}
          onSearch={(val) => console.log('Searching:', val)}
          activeNotifications={1}
          onOpenNotifications={() => triggerToast('No new notifications today.')}
        />

        {/* Content Canvas */}
        <main className="mt-16 p-margin-page flex-1 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Dynamic Toast System */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl bg-white border border-primary text-on-surface font-bold text-sm ${
          toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0"></span>
        <span>{toast.message}</span>
      </div>

      {/* Emergency Panic Lockdown Dialog Modal */}
      {panic && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-error/95 backdrop-blur-md p-6 select-none animate-in fade-in duration-300">
          <div className="max-w-xl w-full text-center space-y-6 text-white">
            <ShieldAlert className="w-24 h-24 stroke-[1.5px] mx-auto animate-bounce" />
            <div className="space-y-2">
              <h2 className="font-display-lg text-3xl font-black uppercase tracking-wider">
                Fleet Lockdown Engaged
              </h2>
              <p className="text-sm opacity-80 leading-relaxed max-w-md mx-auto">
                All 14 autonomous robotic units have received the Emergency Stop Command. Drive systems locked, battery cores isolated.
              </p>
            </div>
            
            <div className="border border-white/20 rounded-xl p-4 bg-black/20 text-left font-label-sm text-xs space-y-1">
              <div className="flex gap-2">
                <span className="text-red-300 font-bold">&gt;</span>
                <p>SHUTDOWN COMMAND REGISTERED: TERM-094</p>
              </div>
              <div className="flex gap-2">
                <span className="text-red-300 font-bold">&gt;</span>
                <p>ISOLATING BATTERY CORE TELEMETRY...</p>
              </div>
              <div className="flex gap-2">
                <span className="text-red-300 font-bold">&gt;</span>
                <p>FLEET HARDWARE LOCK COMPLETED (14/14)</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button 
                onClick={() => {
                  setPanic(false)
                  triggerToast('Emergency Reset Command: Fleet returning to standby')
                }}
                className="bg-white text-error font-bold px-8 py-3 rounded-lg text-xs hover:bg-surface-bright active:scale-95 transition-all shadow-lg flex items-center gap-1.5"
              >
                <Wifi className="w-4 h-4" />
                <span>Reset Fleet System</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
