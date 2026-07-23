import React, { useState } from 'react'
import { User, ShieldAlert, Award, Compass, Key, Moon, Sun } from 'lucide-react'

export default function UserProfile({ user, onTriggerToast }) {
  const [darkMode, setDarkMode] = useState(false)

  const accessLogs = [
    { id: 'log-01', action: 'Fleet Command Auth', terminal: 'TERM-094', ip: '192.168.1.14', date: '2026-07-23 16:54' },
    { id: 'log-02', action: 'Telemetry Configuration Update', terminal: 'TERM-094', ip: '192.168.1.14', date: '2026-07-23 16:01' },
    { id: 'log-03', action: 'System Setup Calibration', terminal: 'TERM-012', ip: '10.0.4.155', date: '2026-07-20 09:30' },
    { id: 'log-04', action: 'Fungicide Target Deploy', terminal: 'TERM-094', ip: '192.168.1.14', date: '2026-07-17 14:12' }
  ]

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
    onTriggerToast(`Visual Theme set to ${!darkMode ? 'DARK' : 'LIGHT'} Mode (Simulated)`)
  }

  return (
    <div className="space-y-gutter animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Operator Profile</h2>
        <p className="text-on-surface-variant font-body-md">Personal settings and secure authentication logs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* User Card (Left) */}
        <div className="lg:col-span-4 bg-white p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between items-center text-center">
          <div className="relative mt-4">
            <img 
              className="w-28 h-28 rounded-full border-4 border-primary object-cover shadow-md"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAA5Uk0GKqmtwVe5Fg4WGM3h9jne6fptkWs0HFot0eqyd4QdenIWabWo-0K9NwRdLjOr0rrCCw2Yi8b2jQlRbfGcdX3A7wy2mH6Lja6OChFqpEHNgJ0z_l8zF7OfkABnxZE8VjPZF5RlV_b0uAqnnzBQ3PY6U5YjUpUWWAl-W9_Ily0kO55kd1C2KivEU_ljm7nqT2f1HBqbH1_bMJkwN0bmVIlu1KnyCvFg7G1VNWzdR7ZO5dhVKeV" 
              alt="Alex headshot"
            />
            <span className="absolute bottom-1.5 right-1.5 bg-primary p-1.5 rounded-full border-2 border-white text-white">
              <Award className="w-4 h-4 fill-current" />
            </span>
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="font-title-md text-lg font-bold text-on-surface">{user.name}</h3>
            <p className="text-xs text-on-surface-variant font-label-sm uppercase tracking-wider">{user.role}</p>
            <p className="text-xs text-outline">{user.email}</p>
          </div>

          <div className="w-full border-t border-outline-variant pt-6 mt-6 space-y-4 text-xs text-left">
            <div className="flex justify-between items-center bg-surface-container-low p-2.5 rounded-lg border border-outline-variant">
              <div className="flex items-center gap-2 font-medium">
                <ShieldAlert className="w-4 h-4 text-primary" />
                <span>Security Clearance</span>
              </div>
              <span className="font-bold text-primary">LEVEL 3 (ADMIRAL)</span>
            </div>

            <div className="flex justify-between items-center bg-surface-container-low p-2.5 rounded-lg border border-outline-variant">
              <div className="flex items-center gap-2 font-medium">
                <Compass className="w-4 h-4 text-secondary" />
                <span>Assigned Fleet</span>
              </div>
              <span className="font-bold">IOWA-NORTH-14</span>
            </div>
          </div>

          {/* Theme switcher */}
          <div className="w-full border-t border-outline-variant pt-6 mt-6">
            <button 
              onClick={toggleTheme}
              className="w-full flex items-center justify-between bg-surface hover:bg-surface-container-low p-3 rounded-lg border border-outline-variant transition-all font-medium text-xs text-on-surface-variant"
            >
              <span className="flex items-center gap-2">
                {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-500" /> : <Moon className="w-4.5 h-4.5 text-secondary" />}
                Theme Preference
              </span>
              <span className="font-bold">{darkMode ? 'DARK' : 'LIGHT'}</span>
            </button>
          </div>
        </div>

        {/* Security Access logs (Right) */}
        <div className="lg:col-span-8 bg-white p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div className="mb-4 flex items-center gap-2">
            <Key className="text-primary w-5 h-5" />
            <h3 className="font-title-md text-sm font-bold text-on-surface">Terminal Access Credentials Log</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface border-b border-outline-variant text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                  <th className="p-3">Log ID</th>
                  <th className="p-3">Security Action</th>
                  <th className="p-3">Terminal</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant text-on-surface">
                {accessLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3 font-bold text-secondary font-label-sm">{log.id}</td>
                    <td className="p-3 font-medium">{log.action}</td>
                    <td className="p-3 font-label-sm">{log.terminal}</td>
                    <td className="p-3 font-label-sm text-outline">{log.ip}</td>
                    <td className="p-3 text-right font-label-sm text-outline">{log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
