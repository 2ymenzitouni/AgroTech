import React, { useState } from 'react'
import { 
  TrendingUp, 
  Leaf, 
  ShieldAlert, 
  Bug, 
  Image, 
  Calendar, 
  ChevronRight, 
  Bot, 
  Send, 
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  FileText
} from 'lucide-react'

export default function Dashboard({ onTabChange, onTriggerToast, onPanic }) {
  const [trendsPeriod, setTrendsPeriod] = useState('6months')
  const [hoveredMonth, setHoveredMonth] = useState(null)
  
  const stats = [
    { label: 'Inspections', value: '12,842', change: '+12%', color: 'secondary', icon: TrendingUp },
    { label: 'Healthy', value: '10,511', change: '82%', color: 'primary', icon: Leaf },
    { label: 'Diseased', value: '2,331', change: '18%', color: 'error', icon: ShieldAlert },
    { label: 'Varieties', value: '14', change: 'Stable', color: 'tertiary', icon: Bug },
    { label: 'Images', value: '45.2k', change: '+8%', color: 'neutral', icon: Image },
    { label: 'Today', value: '1,104', change: '+15%', color: 'secondary-container', icon: Calendar }
  ]

  const monthData = [
    { month: 'Jan', count: 450, height: '45%' },
    { month: 'Feb', count: 300, height: '30%' },
    { month: 'Mar', count: 650, height: '65%' },
    { month: 'Apr', count: 850, height: '85%' },
    { month: 'May', count: 550, height: '55%' },
    { month: 'Jun', count: 400, height: '40%', isCurrent: true }
  ]

  const recentInspections = [
    {
      id: 1,
      title: 'Late Blight Detected',
      desc: 'Tomato Cluster #B-12 • Sector 4',
      status: 'CRITICAL',
      statusColor: 'bg-error-container text-error',
      time: '2m ago',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANyPAdpIZtTR7Pdq8W1cBmEIptNpcV0VD2C8u-XQYLw-KWDl0vqRoSaxoG5sNIZnqQnOVT9ZpO2eiphdtgDO8fohDOZmO2SQYs1vYCRoMh7gid7KMw3uFTHkX7d3iLbPP1A_bapRnu6CZnYA5ThZToEDWtJ-6IxXKm6xeN4yCu1NoxobdSZqsCHDFlKsdh_3p2K63kSVgSYCIYoFmqQdZ75DKsSvJb-neg10vEERVn2pAzhnuHesgY'
    },
    {
      id: 2,
      title: 'Healthy Profile Verified',
      desc: 'Potato Crop #P-04 • Sector 2',
      status: 'HEALTHY',
      statusColor: 'bg-primary-container text-on-primary-container',
      time: '15m ago',
      icon: CheckCircle
    },
    {
      id: 3,
      title: 'Scan Complete',
      desc: 'Unit-09 • Corn Field North',
      status: 'INFO',
      statusColor: 'bg-secondary-fixed text-secondary',
      time: '1h ago',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYMXtxUdqeBFS9LX3iitj0uL_q_ALSGFdSScJoJ13_00ukN658B_gCPQjOZBSoyhCRZ1kphV_kjbWcmvwQ9Xm1rNrZDMLbZE3cLGGUxPqibs3i0FOtKycPDebOQMb8YD9hsDrVgXNJtziySwO0neqQWQTekD1SBxVKTm3cRP7helIBPrqx3g95ctcm1kts0TkMi495ozrZWl5W5ougQA28ZR5Vpn7HbjGYKFuChMwyzLjuA4L5wpZr'
    }
  ]

  return (
    <div className="space-y-gutter animate-in fade-in duration-300">
      {/* Header and Breadcrumbs */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Operational Overview</h2>
          <p className="text-on-surface-variant font-body-md">Real-time agricultural telemetry from 14 autonomous units.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-label-sm font-label-sm flex items-center gap-1.5">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Live Systems
          </span>
          <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-label-sm font-label-sm">
            Last Update: 2m ago
          </span>
        </div>
      </div>

      {/* Bento Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          let colorClass = 'bg-secondary-fixed text-secondary'
          if (stat.color === 'primary') colorClass = 'bg-primary-container/20 text-primary'
          if (stat.color === 'error') colorClass = 'bg-error-container text-error'
          if (stat.color === 'tertiary') colorClass = 'bg-tertiary-fixed text-tertiary'
          if (stat.color === 'neutral') colorClass = 'bg-surface-container-high text-on-surface'
          if (stat.color === 'secondary-container') colorClass = 'bg-secondary-container text-white'

          return (
            <div 
              key={idx}
              className="bg-white p-card-padding rounded-xl shadow-sm border border-outline-variant hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.change && (
                  <span className={`text-[11px] font-bold ${stat.color === 'error' ? 'text-error' : 'text-primary'}`}>
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <h3 className="font-stats-lg text-stats-lg text-on-surface font-bold">
                {stat.value}
              </h3>
            </div>
          )
        })}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Diseases Trends Bar Chart */}
        <div className="lg:col-span-8 bg-white p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-stack-lg">
            <h3 className="font-title-md text-title-md font-bold">Disease Trends</h3>
            <select 
              value={trendsPeriod}
              onChange={(e) => setTrendsPeriod(e.target.value)}
              className="bg-surface-container-low border border-outline-variant rounded-lg text-label-sm font-label-sm px-3 py-1.5 focus:ring-primary focus:border-primary"
            >
              <option value="6months">Last 6 Months</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-3 px-2 pt-8 relative">
            {monthData.map((data, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredMonth(idx)}
                onMouseLeave={() => setHoveredMonth(null)}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div 
                  className={`w-full rounded-t-lg relative transition-all duration-500 ${
                    data.isCurrent 
                      ? 'bg-error' 
                      : 'bg-error/20 group-hover:bg-error/30'
                  }`}
                  style={{ height: data.height }}
                >
                  <div className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-white text-[10px] px-2.5 py-1.5 rounded shadow-md whitespace-nowrap transition-opacity pointer-events-none ${
                    hoveredMonth === idx || data.isCurrent ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {data.count} {data.isCurrent ? '(Current)' : ''}
                  </div>
                </div>
                <span className="text-xs text-on-surface-variant font-label-sm">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Health Distribution Chart */}
        <div className="lg:col-span-4 bg-white p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <h3 className="font-title-md text-title-md font-bold mb-4">Health Distribution</h3>
          <div className="flex flex-col items-center justify-center h-60 relative">
            {/* SVG Donut */}
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#ffdad6" strokeWidth="3" />
              <circle 
                cx="18" 
                cy="18" 
                r="15.915" 
                fill="transparent" 
                stroke="#22c55e" 
                strokeWidth="3" 
                strokeDasharray="82 18" 
                strokeDashoffset="0" 
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-on-surface">82%</span>
              <span className="text-[10px] font-label-sm uppercase tracking-wider text-on-surface-variant">Optimum</span>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="flex justify-between items-center text-label-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                <span>Healthy Clusters</span>
              </div>
              <span className="font-bold">10,511</span>
            </div>
            <div className="flex justify-between items-center text-label-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error-container"></span>
                <span>Disease Hotspots</span>
              </div>
              <span className="font-bold">2,331</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feed and AI Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Live Diagnostics Feed */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="p-card-padding border-b border-outline-variant flex justify-between items-center bg-surface-bright">
            <h3 className="font-title-md text-title-md font-bold">Live Inspection Feed</h3>
            <button 
              onClick={() => onTabChange('reports')}
              className="text-primary text-label-sm font-bold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="divide-y divide-outline-variant flex-1">
            {recentInspections.map((item) => (
              <div 
                key={item.id}
                className="p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors duration-200 cursor-pointer"
              >
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-12 h-12 rounded-lg object-cover border border-outline-variant shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary shrink-0 border border-outline-variant">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-on-surface truncate">{item.title}</p>
                  <p className="text-xs text-on-surface-variant truncate">{item.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.statusColor}`}>
                    {item.status}
                  </span>
                  <p className="text-[10px] text-on-surface-variant mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Mini panel & Panic control */}
        <div className="lg:col-span-5 flex flex-col gap-gutter">
          {/* AI Panel */}
          <div className="bg-inverse-surface text-white p-card-padding rounded-xl shadow-lg relative overflow-hidden group flex-1 flex flex-col justify-between">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-title-md text-title-md leading-none font-bold">AgroAI Assistant</h3>
                  <p className="text-[11px] text-surface-variant opacity-70 mt-1">Expert agronomy support active</p>
                </div>
              </div>
              <p className="text-body-md text-surface-variant leading-relaxed mb-6">
                "Hello Alex. Based on today's data, I've noticed a 4% rise in moisture-related stress in Sector 4. Would you like a detailed briefing?"
              </p>

              <div className="space-y-2">
                {[
                  'Summarize today\'s inspections',
                  'Analyze Sector 4 anomalies',
                  'Project harvest yields'
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onTabChange('chat')
                      onTriggerToast('Forwarding context to AgroAI chat...')
                    }}
                    className="w-full bg-white/10 hover:bg-white/20 border border-white/10 p-3 rounded-lg text-left text-label-sm font-label-sm flex items-center justify-between group transition-all"
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-6 flex gap-2 border-t border-white/10 pt-4">
              <input 
                type="text"
                placeholder="Ask AgroAI anything..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onTabChange('chat')
                  }
                }}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg text-label-sm py-2.5 px-4 focus:ring-primary focus:border-primary placeholder:text-white/30 text-white"
              />
              <button 
                onClick={() => onTabChange('chat')}
                className="bg-primary px-4 rounded-lg flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-md"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Emergency Card */}
          <div className="bg-white p-6 rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
            <div>
              <h4 className="font-bold text-on-surface">Emergency Response</h4>
              <p className="text-xs text-on-surface-variant">Instant fleet lockdown & reporting</p>
            </div>
            <button 
              onClick={onPanic}
              className="w-12 h-12 bg-error text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 active:scale-90 transition-transform cursor-pointer"
            >
              <AlertTriangle className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
