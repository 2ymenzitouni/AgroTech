import React, { useState } from 'react'
import { Plus, Trash2, Camera, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react'

export default function RobotControl({ onTriggerToast }) {
  const [robotId, setRobotId] = useState('AG-720-B')
  const [robotName, setRobotName] = useState('GreenStriker')
  const [status, setStatus] = useState('Active Inspection')
  const [battery, setBattery] = useState(85)
  const [speed, setSpeed] = useState(1.2)
  const [temp, setTemp] = useState(24)
  const [humidity, setHumidity] = useState(62)
  const [moisture, setMoisture] = useState(18)
  const [lat, setLat] = useState('34.0522')
  const [lng, setLng] = useState('-118.2437')
  const [fieldName, setFieldName] = useState('Sector 7G - Corn')

  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO106s1AxOfnUJJq0gQ_QRQNr48VBuy5A3JT48ZETWfRRvC8jAlKDmJA3VwNqypIaMdS1mpwS-a3G7dQdLNyhbWjuAqyl7FDfgC7EXa-8k85vXlBrgSX_VyszCjhALcno-SBN3qSlxhGyKritPzyS1LjAVEXidmoCxna6Ev1KWcsMbZNK1F5TeVdAIfgUIGWinSaU6muHre-rfQ8ZpPnJnfJ-vW16IuNDH_AFaU2-Yail0FAjQQ0UH',
      plant: 'Zea mays',
      category: 'Cereal',
      anomaly: 'Healthy',
      aiTag: true
    },
    {
      id: 2,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6vMUwW3K4duzAHLU3jNdXL3iGRnsKqT7KNVFxGeM9dz2OPScfij_OuZJ9479u5Di5_OH4R5HdWYhyFYDDBPt8mBgS1Po0F211Ip6eCz0r5s5frnPP4ldaUEeqR1VYLN65jxOD9tDa9so_R_FOY9J07nwKpOAY7_4rpN51Qe2dasvLuTMEluhw97eyvrsKZVZwFpolfPK-NfZ_KMJVsQOpFoM1WPPAU-1V0-owU3OD_eAKMWuO3Pfm',
      plant: 'Zea mays',
      category: 'Cereal',
      anomaly: 'None',
      aiTag: true
    },
    {
      id: 3,
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5jlqPOK4UJX_CJmSoJfCfjwSfRAW3ukp3ldnRNKtHNf7jE_8kbTUCfQR3jv-M-GDZESNYK9p30f3byKy9rdGYFO7JVoSTMxc_RKVpMhMB8SVnyRoVYM8rLvuYOhrLkehy3PAdSKVlPM-FwdScpSg3ssxWK2E8qCIxdAu67nJVyvU02vUR3ja9LziYXJlAD45bWS2uXd1VWIUNqAV9lZ3FHAfVvoELxwng9P2juW82pPXVEvI9DI6I',
      plant: 'Solanum lyc.',
      category: 'Nightshade',
      anomaly: 'Rust',
      aiTag: true
    }
  ])

  const handleDeleteImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
    onTriggerToast('Image deleted from diagnostic queue.')
  }

  const handleAddImage = () => {
    const newImg = {
      id: Date.now(),
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCh4ST0-gFn0QNNGOnBs8SksFU-I9R8NoWIqKwq7Z4iXwqBqjF0AIUsgPlukP0IoTOhw06NOgWmOVH7-pIFJMyVaXt8enwdnPl6R3VlVcrOZ4qq1MErMMNWF6HhSnNNvTlkvRfmb_JYR1yN7Oo_yJXkxrhkWyk7d284HRgNbNQZeW0oQy0qDcOjpz03fKHW10Adw5-iFhcZVmGcUKlyLMQwMEavxKOk6UY5OepPTBdSgg_TGKQENiF',
      plant: 'Vitis vinifera',
      category: 'Fruit',
      anomaly: 'Downy Mildew',
      aiTag: true
    }
    setImages(prev => [...prev, newImg])
    onTriggerToast('Mock sample image added successfully!')
  }

  const handleSaveData = () => {
    onTriggerToast('Telemetry parameters successfully synced with Rover base station.')
  }

  return (
    <div className="space-y-gutter animate-in fade-in duration-300">
      {/* Header */}
      <div className="text-center mb-stack-lg animate-in fade-in duration-500">
        <h1 className="font-headline-lg text-on-surface text-4xl mb-1">Agricultural Robot Control</h1>
        <p className="text-on-surface-variant text-sm">Configure parameter profiles and review optical field feeds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Robot Parameters Panel */}
        <section className="space-y-gutter lg:col-span-12">
          <div className="bg-white rounded-xl p-card-padding shadow-sm border border-outline-variant hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-stack-md border-b border-surface-variant pb-4">
              <Camera className="text-primary w-6 h-6" />
              <h2 className="font-title-md text-title-md font-bold text-on-surface">Robot Control Parameters</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md">
              {/* ID & Name */}
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  Robot ID
                </label>
                <input 
                  type="text" 
                  value={robotId} 
                  onChange={(e) => setRobotId(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg font-stats-lg text-stats-lg focus:ring-primary focus:border-primary px-3 py-2"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  Robot Name
                </label>
                <input 
                  type="text" 
                  value={robotName} 
                  onChange={(e) => setRobotName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-3 py-2"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  Status
                </label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-3 py-2"
                >
                  <option value="Active Inspection">Active Inspection</option>
                  <option value="Charging">Charging</option>
                  <option value="Maintenance Required">Maintenance Required</option>
                  <option value="Emergency Stop">Emergency Stop</option>
                </select>
              </div>

              {/* Battery */}
              <div className="space-y-1 md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  Battery Level ({battery}%)
                </label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    value={battery}
                    min="0"
                    max="100"
                    onChange={(e) => setBattery(parseInt(e.target.value))}
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="font-stats-lg text-stats-lg text-primary">{battery}%</span>
                </div>
              </div>

              {/* Speed */}
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  Speed (m/s)
                </label>
                <input 
                  type="number" 
                  step="0.1" 
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-3 py-2 font-stats-lg"
                />
              </div>

              {/* Environment parameters */}
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  Temp (°C)
                </label>
                <input 
                  type="number" 
                  value={temp}
                  onChange={(e) => setTemp(parseFloat(e.target.value))}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-3 py-2 font-stats-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  Humidity (%)
                </label>
                <input 
                  type="number" 
                  value={humidity}
                  onChange={(e) => setHumidity(parseFloat(e.target.value))}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-3 py-2 font-stats-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  Soil Moisture (%)
                </label>
                <input 
                  type="number" 
                  value={moisture}
                  onChange={(e) => setMoisture(parseFloat(e.target.value))}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-3 py-2 font-stats-lg"
                />
              </div>

              {/* Location parameters */}
              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  GPS Lat
                </label>
                <input 
                  type="text" 
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-3 py-2 font-stats-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  GPS Long
                </label>
                <input 
                  type="text" 
                  value={lng}
                  onChange={(e) => setLng(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-3 py-2 font-stats-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  Field Name
                </label>
                <input 
                  type="text" 
                  value={fieldName}
                  onChange={(e) => setFieldName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Visual Data Capture */}
          <div className="bg-white rounded-xl p-card-padding shadow-sm border border-outline-variant">
            <div className="flex items-center justify-between mb-stack-md border-b border-surface-variant pb-4">
              <div className="flex items-center gap-2">
                <Camera className="text-primary w-5 h-5" />
                <h2 className="font-title-md text-title-md font-bold text-on-surface">Visual Data Capture</h2>
              </div>
              <span className="text-label-sm font-label-sm text-on-surface-variant">
                {images.length} / 20 Images Uploaded
              </span>
            </div>

            <div 
              onClick={handleAddImage}
              className="border-2 border-dashed border-outline-variant rounded-xl p-stack-lg text-center hover:border-primary transition-colors cursor-pointer group bg-surface-container-low"
            >
              <RefreshCw className="w-10 h-10 text-on-surface-variant group-hover:text-primary mb-2 transition-transform group-hover:rotate-180 duration-500 mx-auto" />
              <p className="font-body-md text-on-surface-variant">
                Drag and drop field images or <span className="text-primary font-bold">click here to generate diagnostic sample</span>
              </p>
              <p className="text-[12px] text-on-surface-variant mt-1">Supports JPG, PNG, RAW (Max 25MB per file)</p>
            </div>

            {/* Grid of uploaded images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-stack-md mt-gutter">
              {images.map((img) => (
                <div 
                  key={img.id}
                  className="group relative bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant hover:shadow-md transition-shadow"
                >
                  <div 
                    className="aspect-square bg-cover bg-center relative" 
                    style={{ backgroundImage: `url(${img.url})` }}
                  >
                    {img.aiTag && (
                      <div className="absolute top-2 right-2 bg-primary/95 text-white text-[9px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 fill-current" />
                        AI Detected
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 space-y-1.5 bg-white border-t border-outline-variant">
                    <div className="flex flex-col gap-1 text-[11px]">
                      <div className="flex justify-between items-center bg-surface-container px-1.5 py-0.5 rounded">
                        <span className="uppercase text-on-surface-variant font-bold text-[9px]">Plant</span>
                        <span className="font-medium text-on-surface truncate max-w-[80px]">{img.plant}</span>
                      </div>
                      <div className="flex justify-between items-center bg-surface-container px-1.5 py-0.5 rounded">
                        <span className="uppercase text-on-surface-variant font-bold text-[9px]">Category</span>
                        <span className="font-medium text-on-surface">{img.category}</span>
                      </div>
                      <div className={`flex justify-between items-center px-1.5 py-0.5 rounded font-bold ${
                        img.anomaly === 'Healthy' || img.anomaly === 'None'
                          ? 'bg-primary-container/20 text-primary' 
                          : 'bg-error-container/20 text-error'
                      }`}>
                        <span className="uppercase text-[9px]">Anomaly</span>
                        <span>{img.anomaly}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onTriggerToast(`Previewing image frame #${img.id}`)}
                        className="flex-1 text-[10px] bg-secondary-container text-on-secondary-container py-1 rounded font-bold hover:brightness-95"
                      >
                        Preview
                      </button>
                      <button 
                        onClick={() => handleDeleteImage(img.id)}
                        className="p-1 text-error bg-error-container hover:bg-error-container/60 rounded"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Action Footer */}
      <footer className="bg-surface-container p-6 rounded-2xl border border-outline-variant shadow-lg flex flex-col sm:flex-row items-center justify-between gap-stack-md animate-in fade-in duration-700">
        <div className="flex flex-col">
          <span className="font-title-md text-title-md font-bold">Session Status: Draft</span>
          <span className="text-on-surface-variant font-label-sm text-label-sm">Last local autosave: 2 minutes ago</span>
        </div>
        <div className="flex flex-wrap items-center gap-stack-md w-full sm:w-auto justify-end">
          <button 
            onClick={() => onTriggerToast('Form parameters successfully reset.')}
            className="px-gutter py-3 rounded-xl border border-outline text-on-surface-variant font-bold hover:bg-surface-variant transition-colors active:scale-95 text-sm"
          >
            Clear Form
          </button>
          <button 
            onClick={handleSaveData}
            className="px-gutter py-3 rounded-xl bg-primary text-white font-bold shadow-md hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" /> 
            Save Robot Data
          </button>
        </div>
      </footer>
    </div>
  )
}
