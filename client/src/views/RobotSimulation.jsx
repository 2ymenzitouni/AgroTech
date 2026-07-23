import React, { useState, useEffect } from 'react'
import { Edit3, Battery, Gauge, Thermometer, Upload, Sparkles, CheckCircle2, Save, Send } from 'lucide-react'

export default function RobotSimulation({ onTriggerToast }) {
  const [lat, setLat] = useState(38.2975)
  const [lng, setLng] = useState(-122.2869)
  const [battery, setBattery] = useState(84)
  const [speed, setSpeed] = useState(3.4)
  const [temp, setTemp] = useState(24.8)
  const [gridCoords, setGridCoords] = useState({ r: 2, c: 3 })
  const [diagnosticResult, setDiagnosticResult] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [logs, setLogs] = useState([
    'ROVER-ALPHA-7 initialized successfully.',
    'GPS Lock acquired. Satellites: 9',
    'Sensors calibrating...'
  ])

  // Random log simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const messages = [
        'Inspecting sector grid cell...',
        'Moisture levels nominal (58%)',
        'Rover battery usage: 0.12%/min',
        'Camera focal calibration updated',
        'Lidar scan complete for Sector D'
      ]
      const randomMsg = messages[Math.floor(Math.random() * messages.length)]
      setLogs(prev => [randomMsg, ...prev.slice(0, 10)])
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const handleGridClick = (r, c) => {
    setGridCoords({ r, c })
    // Simulate latitude and longitude updates based on click
    const newLat = (38.2900 + (r * 0.0025)).toFixed(4)
    const newLng = (-122.2900 + (c * 0.0025)).toFixed(4)
    setLat(parseFloat(newLat))
    setLng(parseFloat(newLng))
    onTriggerToast(`Target relocated to Cell [${r + 1}, ${c + 1}]`)
  }

  const handleUpdateCoords = () => {
    onTriggerToast(`Manual override applied: Lat ${lat}, Lng ${lng}`)
  }

  const runAnalysis = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setDiagnosticResult({
        disease: 'Puccinia polysora (Southern Rust)',
        severity: 'LOW',
        treatment: 'Targeted copper fungicide spray, prune infected lower leaves.'
      })
      setAnalyzing(false)
      onTriggerToast('AI Diagnostic Report Generated!')
    }, 1800)
  }

  return (
    <div className="space-y-gutter animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Robot Simulation</h2>
          <p className="text-on-surface-variant font-body-md">Real-time coordinate mapping and telemetry overrides.</p>
        </div>
        <span className="flex items-center gap-2 bg-primary-container/10 text-primary px-3 py-1 rounded-full font-label-sm text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-primary-container robot-pulse"></span>
          ROVER-ALPHA-7 LIVE
        </span>
      </div>

      {/* Manual Input Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
        <div className="p-4 bg-surface-container border-b border-outline-variant flex items-center gap-2">
          <Edit3 className="text-primary w-5 h-5" />
          <h3 className="font-title-md text-sm text-on-surface font-bold">Manual Telemetry Override</h3>
        </div>
        <div className="p-card-padding flex flex-col md:flex-row items-end gap-4">
          <div className="flex-1 space-y-1">
            <label className="font-label-sm text-[11px] text-outline uppercase tracking-wider block">Latitude</label>
            <input 
              type="number" 
              step="0.0001"
              value={lat}
              onChange={(e) => setLat(parseFloat(e.target.value))}
              className="w-full bg-surface border border-outline-variant rounded-lg font-label-sm text-on-surface py-2 px-3 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="font-label-sm text-[11px] text-outline uppercase tracking-wider block">Longitude</label>
            <input 
              type="number" 
              step="0.0001"
              value={lng}
              onChange={(e) => setLng(parseFloat(e.target.value))}
              className="w-full bg-surface border border-outline-variant rounded-lg font-label-sm text-on-surface py-2 px-3 focus:ring-primary focus:border-primary"
            />
          </div>
          <button 
            onClick={handleUpdateCoords}
            className="bg-secondary text-on-secondary px-6 py-2.5 rounded-lg font-bold hover:opacity-90 active:scale-98 transition-all shadow-md shrink-0"
          >
            Update Coordinates
          </button>
        </div>
      </div>

      {/* Map Matrix and Telemetry Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Map view (Grid of cells) */}
        <div className="lg:col-span-8 bg-white p-card-padding rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="font-title-md text-sm font-bold">Autonomous Field Mapping</h4>
            <p className="text-xs text-on-surface-variant">Select a grid node below to deploy coordinates.</p>
          </div>
          {/* Custom field grid */}
          <div className="grid grid-cols-6 gap-2 bg-surface-container-low p-4 rounded-xl border border-outline-variant aspect-[2/1] relative">
            {/* Grid overlay lines */}
            {Array.from({ length: 4 }).map((_, r) => (
              Array.from({ length: 6 }).map((_, c) => {
                const isRobot = gridCoords.r === r && gridCoords.c === c
                return (
                  <button 
                    key={`${r}-${c}`}
                    onClick={() => handleGridClick(r, c)}
                    className={`relative rounded border transition-all duration-300 flex items-center justify-center ${
                      isRobot 
                        ? 'bg-primary-container/20 border-primary shadow-inner scale-95' 
                        : 'bg-white hover:bg-surface-container-high border-outline-variant/40'
                    }`}
                  >
                    {isRobot ? (
                      <span className="w-4 h-4 rounded-full bg-primary-container robot-pulse border-2 border-white shadow-md relative z-10"></span>
                    ) : (
                      <span className="text-[10px] font-label-sm text-outline opacity-40">Grid {r+1}-{c+1}</span>
                    )}
                  </button>
                )
              })
            ))}
          </div>
        </div>

        {/* Telemetry parameters cards */}
        <div className="lg:col-span-4 space-y-4">
          {/* Battery status */}
          <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-sm border border-outline-variant flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <Battery className="text-primary w-6 h-6" />
              <span className="text-error font-bold text-xs">-1.2%/min</span>
            </div>
            <p className="text-outline font-label-sm text-xs uppercase tracking-widest">Battery Level</p>
            <h3 className="font-stats-lg text-stats-lg text-on-surface font-bold">
              {battery}<span className="text-sm ml-1">%</span>
            </h3>
            <div className="mt-4 flex items-center gap-4">
              <input 
                type="range"
                value={battery}
                min="0"
                max="100"
                onChange={(e) => setBattery(parseInt(e.target.value))}
                className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
          </div>

          {/* Speed Card */}
          <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-sm border border-outline-variant">
            <div className="flex items-center justify-between mb-4">
              <Gauge className="text-secondary w-6 h-6" />
              <span className="text-primary font-bold text-xs uppercase tracking-wider">NOMINAL</span>
            </div>
            <p className="text-outline font-label-sm text-xs uppercase tracking-widest">Current Speed</p>
            <h3 className="font-stats-lg text-stats-lg text-on-surface font-bold">
              {speed}<span className="text-sm ml-1">km/h</span>
            </h3>
            <div className="mt-4 flex items-end gap-1 h-6">
              <div className="w-full bg-secondary-container/20 h-2 rounded-t"></div>
              <div className="w-full bg-secondary-container/40 h-4 rounded-t"></div>
              <div className="w-full bg-secondary-container h-6 rounded-t"></div>
              <div className="w-full bg-secondary-container/60 h-3 rounded-t"></div>
              <div className="w-full bg-secondary-container h-5 rounded-t"></div>
            </div>
          </div>

          {/* Temperature Card */}
          <div className="bg-surface-container-lowest p-card-padding rounded-xl shadow-sm border border-outline-variant">
            <div className="flex items-center justify-between mb-4">
              <Thermometer className="text-tertiary w-6 h-6" />
              <span className="text-on-surface-variant font-bold text-xs">COOL</span>
            </div>
            <p className="text-outline font-label-sm text-xs uppercase tracking-widest">Core Temp</p>
            <h3 className="font-stats-lg text-stats-lg text-on-surface font-bold">
              {temp}<span className="text-sm ml-1">°C</span>
            </h3>
            <div className="mt-4 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary-fixed-dim w-[40%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics block & Console Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Leaf diagnostic upload panel */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden flex flex-col justify-between">
          <div className="p-4 bg-surface-container border-b border-outline-variant flex items-center justify-between">
            <h3 className="font-title-md text-sm text-on-surface flex items-center gap-2 font-bold">
              <Sparkles className="text-primary w-5 h-5" />
              AI Leaf Diagnostics
            </h3>
            {diagnosticResult && (
              <button 
                onClick={() => setDiagnosticResult(null)}
                className="text-xs text-error hover:underline"
              >
                Clear Report
              </button>
            )}
          </div>
          <div className="p-card-padding flex-1 flex flex-col justify-between gap-4">
            {!diagnosticResult ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center flex-1">
                <div 
                  onClick={runAnalysis}
                  className="border-2 border-dashed border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center gap-3 bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group h-full"
                >
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-title-md text-xs text-on-surface font-bold">Upload Sample Image</p>
                    <p className="text-[10px] text-outline mt-1">Click to analyze sample</p>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden border border-outline-variant h-full min-h-[160px]">
                  <img 
                    className="w-full h-full object-cover grayscale-[0.3] absolute inset-0" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCh4ST0-gFn0QNNGOnBs8SksFU-I9R8NoWIqKwq7Z4iXwqBqjF0AIUsgPlukP0IoTOhw06NOgWmOVH7-pIFJMyVaXt8enwdnPl6R3VlVcrOZ4qq1MErMMNWF6HhSnNNvTlkvRfmb_JYR1yN7Oo_yJXkxrhkWyk7d284HRgNbNQZeW0oQy0qDcOjpz03fKHW10Adw5-iFhcZVmGcUKlyLMQwMEavxKOk6UY5OepPTBdSgg_TGKQENiF"
                    alt="Active Vineyard sample leaf"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-3">
                    <div className="flex items-center gap-2 text-white">
                      <CheckCircle2 className="w-4 h-4 text-primary-fixed" />
                      <p className="text-[9px] font-bold uppercase tracking-wider">Sample: VINEYARD-NORTH-42.jpg</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant text-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-outline">Detected Pathology</span>
                  <p className="font-bold text-primary text-base">{diagnosticResult.disease}</p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-outline">Severity</span>
                    <p className="text-xs font-bold text-error bg-error-container/40 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      {diagnosticResult.severity}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-outline">Accuracy</span>
                    <p className="text-xs font-bold text-primary mt-0.5">94.8%</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-outline">Recommended Remedy</span>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{diagnosticResult.treatment}</p>
                </div>
              </div>
            )}
            
            <button 
              onClick={runAnalysis}
              disabled={analyzing}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all active:scale-[0.98] mt-2"
            >
              {analyzing ? 'Processing Telemetry...' : 'Analyze Sample Leaf'}
            </button>
          </div>
        </div>

        {/* Live log Console */}
        <div className="lg:col-span-6 bg-inverse-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="p-4 bg-surface-container-highest/20 border-b border-white/10 flex items-center justify-between text-white">
            <h3 className="font-title-md text-sm flex items-center gap-2 font-bold font-label-sm">
              Telemetry Terminal Logs
            </h3>
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
          </div>
          <div className="p-4 font-label-sm text-xs text-primary-fixed-dim bg-black/40 flex-1 min-h-[180px] overflow-y-auto space-y-2 select-text custom-scrollbar">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-outline">[{new Date().toLocaleTimeString()}]</span>
                <span className="text-white">&gt;</span>
                <p className="flex-1 break-all">{log}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
