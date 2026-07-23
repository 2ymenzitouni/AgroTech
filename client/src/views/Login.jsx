import React, { useState } from 'react'
import { Cpu, Mail, Lock, Eye, EyeOff, Rocket, HelpCircle, Globe, Shield, RefreshCw, CheckCircle2 } from 'lucide-react'

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('operator@agrotech.precision')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [loginState, setLoginState] = useState('idle') // 'idle' | 'verifying' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return

    setLoginState('verifying')
    setTimeout(() => {
      setLoginState('success')
      setTimeout(() => {
        onLoginSuccess({
          name: 'Alex Rivera',
          role: 'Fleet Admiral',
          email: email
        })
      }, 800)
    }, 1500)
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center p-6 overflow-hidden bg-background text-on-background font-body-md select-none">
      {/* Background Aerial Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-45" 
          style={{ 
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxwSLUojkGof0VRTe3-TSj-c-wHcJhtWp6E9qjxt-b5BU7cACXLpYzjOT3qjDK09whXZ4eZ5FCCLhGSWxes6CwJCRjt2iwWDl9vtAXiJBSZk7v7ihZXWEv3JE9dz-mGrCxht177nC5gxNH5twAocZXgH-C8FESHF6q0siMrdce1m3ABB3OnQiRPRJv1Hl2218KkiP4iuGdXPmP58XksdmEYYX7A6ETCU_et00_SY-m8Q_UGooZyCWo')" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background/50"></div>
      </div>

      {/* Main Login Frame */}
      <div className="relative z-10 w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-2xl border border-outline-variant bg-surface-container-lowest animate-in fade-in duration-500">
        {/* Branding Side (Left) */}
        <div className="hidden md:flex flex-col justify-between p-stack-lg bg-inverse-surface text-on-primary-fixed relative overflow-hidden">
          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-stack-sm mb-stack-lg">
              <Cpu className="text-primary-fixed w-10 h-10" />
              <h1 className="font-headline-lg text-headline-lg text-white">AgroTech Precision</h1>
            </div>
            <div className="space-y-stack-md mt-12">
              <h2 className="font-display-lg text-display-lg text-primary-fixed-dim leading-tight">
                Empowering Global Fleet Autonomy.
              </h2>
              <p className="text-surface-variant font-body-md max-w-sm">
                Experience the next generation of industrial precision. Monitor, manage, and scale your autonomous agricultural operations from a single pane of glass.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-stack-lg border-t border-outline/30">
            <div className="flex items-center gap-stack-md">
              <div className="flex -space-x-4">
                <div className="w-10 h-10 rounded-full border-2 border-inverse-surface bg-primary-container flex items-center justify-center text-white font-bold text-xs">AG</div>
                <div className="w-10 h-10 rounded-full border-2 border-inverse-surface bg-secondary-container flex items-center justify-center text-white font-bold text-xs">BT</div>
                <div className="w-10 h-10 rounded-full border-2 border-inverse-surface bg-tertiary flex items-center justify-center text-white font-bold text-xs">TR</div>
              </div>
              <span className="font-label-sm text-label-sm text-surface-variant">Trusted by 500+ Fleet Operators</span>
            </div>
          </div>
        </div>

        {/* Login Form Side (Right) */}
        <div className="p-card-padding md:p-16 flex flex-col justify-center bg-white">
          <div className="md:hidden flex items-center gap-2 mb-stack-lg">
            <Cpu className="text-primary w-8 h-8" />
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">AgroTech</span>
          </div>

          <div className="mb-stack-lg">
            <h3 className="font-headline-lg text-headline-lg text-on-surface mb-unit">Fleet Authentication</h3>
            <p className="text-on-surface-variant font-body-md">Enter your secure credentials to access the command center.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block" htmlFor="email">
                Operator Identity
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                <input 
                  id="email"
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@agrotech.precision"
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-outline-variant font-label-sm text-label-sm transition-all focus:ring-0 focus:border-primary"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block" htmlFor="password">
                  Access Key
                </label>
                <a href="#forgot" className="font-label-sm text-label-sm text-secondary hover:underline transition-all">Forgot key?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
                <input 
                  id="password"
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-lg border border-outline-variant font-label-sm text-label-sm transition-all focus:ring-0 focus:border-primary"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-stack-sm py-unit">
              <input 
                id="remember"
                type="checkbox" 
                defaultChecked
                className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20"
              />
              <label htmlFor="remember" className="font-body-md text-body-md text-on-surface-variant cursor-pointer">
                Stay authenticated for this terminal
              </label>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={loginState !== 'idle'}
              className={`w-full font-title-md text-title-md py-5 rounded-lg shadow-lg transition-all flex items-center justify-center gap-stack-sm active:scale-[0.98] ${
                loginState === 'success' 
                  ? 'bg-secondary-container text-on-secondary shadow-secondary-container/20'
                  : 'bg-primary hover:bg-surface-tint text-on-primary shadow-primary/20'
              }`}
            >
              {loginState === 'idle' && (
                <>
                  <span>Authenticate & Launch</span>
                  <Rocket className="w-5 h-5 fill-current" />
                </>
              )}
              {loginState === 'verifying' && (
                <>
                  <span>Verifying Key...</span>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                </>
              )}
              {loginState === 'success' && (
                <>
                  <span>Access Granted</span>
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Actions */}
          <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              New operator? <a href="#request" className="text-secondary font-bold hover:underline">Request fleet access</a>
            </p>
            <div className="mt-stack-md flex justify-center gap-stack-md">
              <a href="#help" className="text-outline hover:text-secondary transition-colors">
                <HelpCircle className="w-6 h-6" />
              </a>
              <a href="#lang" className="text-outline hover:text-secondary transition-colors">
                <Globe className="w-6 h-6" />
              </a>
              <a href="#sec" className="text-outline hover:text-secondary transition-colors">
                <Shield className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="fixed bottom-6 z-10 text-center w-full">
        <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest">
          © 2026 AgroTech Precision Systems | Industrial Grade Reliability
        </p>
      </div>
    </div>
  )
}
