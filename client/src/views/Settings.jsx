import React, { useState } from 'react'
import { BrainCircuit, Sliders, Cloud, Key, Copy, Trash2, CheckCircle2, Globe, ShieldAlert } from 'lucide-react'

export default function Settings({ onTriggerToast }) {
  const [activeSubTab, setActiveSubTab] = useState('ai-config')
  const [visionModel, setVisionModel] = useState('YOLOv8-Agriculture Optimized')
  const [hardware, setHardware] = useState('On-Board Edge TPU')
  const [confidence, setConfidence] = useState(85)
  const [autoTrain, setAutoTrain] = useState(true)
  const [lang, setLang] = useState('English (US)')
  const [units, setUnits] = useState('Metric')

  const [apiKeys, setApiKeys] = useState([
    { id: 'key-1', name: 'Fleet-Service-Alpha', code: 'ag_••••••••7r9p', lastUsed: '2 min ago' },
    { id: 'key-2', name: 'External-Report-Widget', code: 'ag_••••••••2v8k', lastUsed: '4 hours ago' }
  ])

  const handleGenerateKey = () => {
    const newKey = {
      id: `key-${Date.now()}`,
      name: `External-Integration-${apiKeys.length + 1}`,
      code: `ag_••••••••${Math.random().toString(36).substring(2, 6)}`,
      lastUsed: 'Never'
    }
    setApiKeys(prev => [...prev, newKey])
    onTriggerToast('New API key generated successfully.')
  }

  const handleDeleteKey = (id, name) => {
    setApiKeys(prev => prev.filter(key => key.id !== id))
    onTriggerToast(`API Key deleted: ${name}`)
  }

  const handleApplyChanges = () => {
    onTriggerToast('Configuration profiles updated across active drone fleets.')
  }

  return (
    <div className="space-y-gutter animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Settings</h2>
        <p className="text-on-surface-variant font-body-md">Modify machine learning thresholds and system integrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Sub-tab Navigation (Left) */}
        <nav className="col-span-12 lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
          <button 
            onClick={() => setActiveSubTab('ai-config')}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-title-md border transition-all text-left whitespace-nowrap w-full ${
              activeSubTab === 'ai-config' 
                ? 'bg-white border-outline-variant text-primary shadow-sm font-semibold' 
                : 'bg-transparent border-transparent text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <BrainCircuit className="w-5 h-5" />
            <span>AI Configuration</span>
          </button>
          
          <button 
            onClick={() => setActiveSubTab('system-prefs')}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-title-md border transition-all text-left whitespace-nowrap w-full ${
              activeSubTab === 'system-prefs' 
                ? 'bg-white border-outline-variant text-primary shadow-sm font-semibold' 
                : 'bg-transparent border-transparent text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <Sliders className="w-5 h-5" />
            <span>System Preferences</span>
          </button>
          
          <button 
            onClick={() => setActiveSubTab('storage-api')}
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-title-md border transition-all text-left whitespace-nowrap w-full ${
              activeSubTab === 'storage-api' 
                ? 'bg-white border-outline-variant text-primary shadow-sm font-semibold' 
                : 'bg-transparent border-transparent text-on-surface-variant hover:bg-surface-container-low'
            }`}
          >
            <Cloud className="w-5 h-5" />
            <span>Storage & API</span>
          </button>
        </nav>

        {/* Form Container (Right) */}
        <div className="col-span-12 lg:col-span-9 space-y-gutter">
          {/* AI Configuration Section */}
          {activeSubTab === 'ai-config' && (
            <section className="bg-white rounded-xl p-card-padding border border-outline-variant shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-outline-variant pb-4">
                <div>
                  <h3 className="font-title-md text-base font-bold text-on-surface">AI Diagnostics Models</h3>
                  <p className="text-xs text-on-surface-variant">Optimize visual classifiers and edge TPU thresholds.</p>
                </div>
                <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full font-label-sm text-xs font-bold">
                  High Precision Mode
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface block">Core Vision Model</label>
                  <select 
                    value={visionModel} 
                    onChange={(e) => setVisionModel(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="YOLOv8-Agriculture Optimized">YOLOv8-Agriculture Optimized</option>
                    <option value="Gemma-Vision 2B (Experimental)">Gemma-Vision 2B (Experimental)</option>
                    <option value="ResNet-50 Legacy">ResNet-50 Legacy</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface block">Inference Hardware</label>
                  <select 
                    value={hardware} 
                    onChange={(e) => setHardware(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="On-Board Edge TPU">On-Board Edge TPU</option>
                    <option value="Fleet Hub Server (Low Latency)">Fleet Hub Server (Low Latency)</option>
                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  </select>
                </div>
              </div>

              {/* Confidence Threshold */}
              <div className="space-y-3 pt-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-on-surface">Confidence Threshold</label>
                  <span className="font-stats-lg text-primary text-sm font-bold">{confidence}%</span>
                </div>
                <input 
                  type="range" 
                  value={confidence}
                  min="50"
                  max="99"
                  onChange={(e) => setConfidence(parseInt(e.target.value))}
                  className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant font-medium">
                  <span>Higher Speed (50%)</span>
                  <span>Zero False Positives (99%)</span>
                </div>
              </div>

              <hr className="border-outline-variant" />

              {/* Retraining Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-on-surface">Auto-Retraining Pipeline</h4>
                  <p className="text-[11px] text-on-surface-variant mt-0.5">Allow model updates based on operator feedback.</p>
                </div>
                <button 
                  onClick={() => setAutoTrain(!autoTrain)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${
                    autoTrain ? 'bg-primary' : 'bg-surface-container-high'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full block transition-transform duration-300 ${
                    autoTrain ? 'translate-x-6' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>
            </section>
          )}

          {/* System Preferences Section */}
          {activeSubTab === 'system-prefs' && (
            <section className="bg-white rounded-xl p-card-padding border border-outline-variant shadow-sm space-y-6">
              <h3 className="font-title-md text-base font-bold text-on-surface border-b border-outline-variant pb-4">
                System Preferences
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface block">Interface Language</label>
                  <select 
                    value={lang} 
                    onChange={(e) => setLang(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Spanish (ES)">Spanish (ES)</option>
                    <option value="Portuguese (BR)">Portuguese (BR)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface block">Measurement System</label>
                  <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant text-xs">
                    <button 
                      type="button"
                      onClick={() => setUnits('Metric')}
                      className={`flex-1 py-1.5 rounded-md font-bold transition-all ${
                        units === 'Metric' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      Metric
                    </button>
                    <button 
                      type="button"
                      onClick={() => setUnits('Imperial')}
                      className={`flex-1 py-1.5 rounded-md font-bold transition-all ${
                        units === 'Imperial' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      Imperial
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Storage & API Section */}
          {activeSubTab === 'storage-api' && (
            <section className="bg-white rounded-xl p-card-padding border border-outline-variant shadow-sm space-y-6">
              <h3 className="font-title-md text-base font-bold text-on-surface border-b border-outline-variant pb-4">
                Storage & API Keys
              </h3>

              {/* Storage Gauge */}
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant text-xs">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-outline">Cloud Storage Usage</span>
                    <p className="font-stats-lg text-sm font-black text-on-surface mt-0.5">
                      142.8 GB <span className="font-normal text-on-surface-variant">of 500 GB</span>
                    </p>
                  </div>
                  <button className="text-primary font-bold hover:underline">Upgrade Plan</button>
                </div>
                <div className="w-full h-2.5 bg-surface rounded-full overflow-hidden flex">
                  <div className="h-full bg-primary" style={{ width: '28%' }}></div>
                  <div className="h-full bg-secondary" style={{ width: '12%' }}></div>
                </div>
                <div className="flex gap-4 mt-2 text-[10px] text-on-surface-variant font-medium">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Telemetry Logs</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> Optical Media</div>
                </div>
              </div>

              {/* API Keys Table */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-on-surface">Active Application API Keys</h4>
                  <button 
                    onClick={handleGenerateKey}
                    className="bg-primary text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Generate Key</span>
                  </button>
                </div>

                <div className="border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden text-xs">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-4 bg-white hover:bg-surface-container-low/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary border border-outline-variant">
                          <Key className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{key.name}</p>
                          <p className="text-[10px] text-outline mt-0.5 uppercase tracking-wide">Last used: {key.lastUsed}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="font-label-sm bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant text-[11px]">
                          {key.code}
                        </code>
                        <button 
                          onClick={() => {
                            navigator.clipboard?.writeText(key.code)
                            onTriggerToast('API Key copied to clipboard.')
                          }}
                          className="p-1.5 hover:bg-surface-container rounded transition-colors text-on-surface-variant"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteKey(key.id, key.name)}
                          className="p-1.5 hover:bg-error-container/20 text-error rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Sticky footer actions */}
          <div className="flex items-center justify-end gap-stack-md pt-4 border-t border-outline-variant">
            <button 
              onClick={() => onTriggerToast('Settings modifications discarded.')}
              className="px-6 py-2.5 rounded-lg font-bold border border-outline text-on-surface-variant hover:bg-surface-container-low transition-all text-xs"
            >
              Cancel Changes
            </button>
            <button 
              onClick={handleApplyChanges}
              className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold hover:opacity-90 active:scale-95 transition-all shadow-md text-xs"
            >
              Apply Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
