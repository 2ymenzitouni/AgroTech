import React, { useState, useRef, useEffect } from 'react'
import { Plus, Send, Image as ImageIcon, Paperclip, Mic, Sparkles, MessageSquare, AlertTriangle, Download, Calendar, ExternalLink } from 'lucide-react'

export default function AIAssistantChat({ onTriggerToast }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your AgroTech Precision AI Assistant. I have analyzed the latest telemetry from Fleet Unit 07. I've detected early signs of Puccinia polysora (Southern Rust) in Sector B-14.",
      attachment: {
        id: 'att-1',
        title: 'Southern Rust Detected',
        code: '#4492-B',
        desc: 'Location: Corn Field, Sector B-14',
        severity: 'LOW',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3xHRzL76PKAw699ewHzkEbzCoH9TVJspsBwL9_xkXhFJ1DA7esrN2v8L3XnhUAHGoHEzGYn0ryerWGtzWOZBk0pnP_XghrxzsBpGUHh-dcfzNavX-vLFvU3Mq5gt7-tmeOL9nhv3YNymQOCrIukHN4RiUqSJc_Bebr-zPL2yjpJFl_GiV0zz88B_dQu6wdyjvI_YcaEGGr9g0lEqpQWajx0QZRaRA7ABw7YX2ugC69P3fLkL4mMos'
      }
    },
    {
      id: 2,
      sender: 'user',
      text: "What is the recommended treatment plan for Sector B-14, and how does it affect the upcoming irrigation schedule?"
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  const chatSessions = [
    { id: 'session-1', title: 'Corn Leaf Rust Analysis', time: '2 mins ago', active: true },
    { id: 'session-2', title: 'Fleet Deployment Strategy', time: '1 hour ago' },
    { id: 'session-3', title: 'Irrigation Schedule Optimization', time: 'Yesterday' },
    { id: 'session-4', title: 'Tomato Blight Warning', time: 'Oct 24, 2023' }
  ]

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!inputText.trim()) return

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputText
    }

    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Based on Southern Rust severity (LOW) in Sector B-14, here is your action plan:
1. Apply targeted copper fungicide spray to the localized hotspot.
2. Reduce overhead irrigation for the next 48 hours to minimize humidity around leaf clusters.
3. Schedule ROVER-ALPHA-7 for a follow-up scan in 3 days.

Would you like me to schedule the fleet scan now?`
      }
      setMessages(prev => [...prev, aiResponse])
      onTriggerToast('AgroAI response received.')
    }, 2000)
  }

  const handleQuickAction = (text) => {
    setInputText(text)
  }

  return (
    <div className="flex border border-outline-variant rounded-xl overflow-hidden bg-white shadow-sm h-[calc(100vh-140px)] animate-in fade-in duration-300">
      {/* Sidebar - Recent Chats */}
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant flex flex-col shrink-0">
        <div className="p-4 flex items-center justify-between border-b border-outline-variant">
          <h2 className="font-title-md text-sm text-on-surface font-bold">Recent Chats</h2>
          <button 
            onClick={() => {
              setMessages([
                {
                  id: Date.now(),
                  sender: 'ai',
                  text: 'New session started. How can I help you manage the fleet telemetry or crop health today?'
                }
              ])
              onTriggerToast('New chat session created.')
            }}
            className="p-1.5 rounded-lg hover:bg-surface-container-high text-primary transition-colors border border-outline-variant bg-white"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto chat-scrollbar p-2 space-y-1">
          {chatSessions.map((session) => (
            <div 
              key={session.id}
              className={`p-3 rounded-xl cursor-pointer transition-all ${
                session.active 
                  ? 'bg-surface-container-highest border border-primary/20 shadow-sm' 
                  : 'hover:bg-surface-container-high'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <MessageSquare className={`w-3.5 h-3.5 ${session.active ? 'text-primary' : 'text-outline'}`} />
                <span className={`font-label-sm text-[10px] uppercase font-bold ${session.active ? 'text-primary' : 'text-outline'}`}>
                  {session.active ? 'CURRENT SESSION' : 'HISTORICAL'}
                </span>
              </div>
              <p className="font-bold text-xs text-on-surface truncate">{session.title}</p>
              <p className="text-[10px] text-on-surface-variant mt-1">{session.time}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat View */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
        {/* Chat Header */}
        <div className="h-14 border-b border-outline-variant px-6 flex items-center justify-between bg-surface-bright sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-container/20 flex items-center justify-center border border-outline-variant">
              <Sparkles className="text-primary w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="font-title-md text-sm text-on-surface font-bold leading-none">AgroTech AI</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-[10px] font-label-sm text-primary uppercase font-bold">Precision Core Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto chat-scrollbar p-6 space-y-6 pb-28">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`flex gap-4 max-w-2xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
                msg.sender === 'user' 
                  ? 'bg-secondary text-white border-secondary' 
                  : 'bg-primary text-white border-primary'
              }`}>
                <span className="font-bold text-xs uppercase">{msg.sender === 'user' ? 'OP' : 'AI'}</span>
              </div>
              
              <div className="space-y-3">
                <div className={`rounded-2xl p-4 shadow-sm border text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-secondary-container text-white border-secondary-container rounded-tr-none'
                    : 'bg-surface-container-low text-on-surface border-outline-variant rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {msg.attachment && (
                  <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden shadow-md w-72">
                    <div className="h-36 bg-surface-container relative">
                      <img 
                        className="w-full h-full object-cover" 
                        src={msg.attachment.url} 
                        alt={msg.attachment.title}
                      />
                      <div className="absolute top-2 right-2 bg-error text-white px-2 py-0.5 rounded font-label-sm text-[9px] uppercase font-bold">
                        Severity: {msg.attachment.severity}
                      </div>
                    </div>
                    <div className="p-4 bg-surface-container-lowest text-xs">
                      <h4 className="font-bold text-sm text-on-surface">Detection ID: {msg.attachment.code}</h4>
                      <p className="text-on-surface-variant mt-1">{msg.attachment.desc}</p>
                      <button 
                        onClick={() => onTriggerToast('Loading detailed telemetry report')}
                        className="w-full mt-3 py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-1 shadow-sm"
                      >
                        <span>View Detection Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-4 max-w-2xl">
              <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 border border-primary">
                <span className="font-bold text-xs uppercase">AI</span>
              </div>
              <div className="bg-surface-container-low rounded-2xl rounded-tl-none p-4 border border-outline-variant shadow-sm">
                <div className="flex gap-1.5 items-center h-4">
                  <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-primary/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 border-t border-outline-variant backdrop-blur-md">
          <div className="max-w-3xl mx-auto flex items-end gap-2 bg-white border border-outline-variant rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary/25 focus-within:border-primary p-2 transition-all">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Ask about crops, diseases, or fleet status..."
              rows="1"
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 px-3 resize-none max-h-24 font-body-md"
            />
            <div className="flex items-center gap-1 shrink-0 pb-1 pr-1">
              <button 
                type="button"
                onClick={() => onTriggerToast('Visual file attachment opened.')}
                className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors"
              >
                <ImageIcon className="w-4.5 h-4.5" />
              </button>
              <button 
                type="button"
                onClick={() => onTriggerToast('Voice command activated.')}
                className="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors"
              >
                <Mic className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={handleSend}
                className="bg-primary text-white p-2 rounded-lg shadow hover:opacity-90 active:scale-95 transition-all ml-1"
              >
                <Send className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Context Sidebar (Right) */}
      <aside className="w-72 bg-surface-container-lowest border-l border-outline-variant flex flex-col shrink-0 p-6 overflow-y-auto custom-scrollbar">
        <h3 className="font-title-md text-sm font-bold text-on-surface mb-6">Sector Insights</h3>
        
        <div className="space-y-6">
          <div className="bg-surface-container rounded-xl p-4 border border-outline-variant">
            <p className="text-on-surface-variant font-label-sm text-[11px] uppercase font-bold mb-2">Field Health Score</p>
            <div className="flex items-center justify-between">
              <span className="font-stats-lg text-lg font-black text-primary">84%</span>
              <div className="w-20 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                <div className="w-[84%] h-full bg-primary"></div>
              </div>
            </div>
            <p className="text-[10px] text-on-surface-variant mt-1.5">Decreased 2% from yesterday</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-label-sm text-[11px] uppercase font-bold text-on-surface-variant tracking-wider">Active Threats</h4>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-error-container/30 border border-error/10 text-xs">
              <AlertTriangle className="w-4 h-4 text-error shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-on-error-container">Southern Rust</p>
                <p className="text-on-error-container/80 text-[10px] mt-0.5">Detected in 3 locations</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-container border border-outline-variant text-xs">
              <span className="w-2 h-2 rounded-full bg-secondary mt-1.5"></span>
              <div>
                <p className="font-bold text-on-surface">Low Moisture</p>
                <p className="text-on-surface-variant text-[10px] mt-0.5">Sector D-02 requires attention</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-outline-variant">
            <h4 className="font-label-sm text-[11px] uppercase font-bold text-on-surface-variant tracking-wider mb-3">Quick Actions</h4>
            <button 
              onClick={() => onTriggerToast('Report PDF scheduled for download')}
              className="w-full flex items-center justify-between p-3 rounded-lg border border-outline-variant hover:bg-surface-container text-xs font-semibold transition-all"
            >
              <span>Download Analysis PDF</span>
              <Download className="w-4 h-4 text-primary" />
            </button>
            <button 
              onClick={() => onTriggerToast('Scan scheduled with drone command')}
              className="w-full mt-2 flex items-center justify-between p-3 rounded-lg border border-outline-variant hover:bg-surface-container text-xs font-semibold transition-all"
            >
              <span>Schedule Fleet Scan</span>
              <Calendar className="w-4 h-4 text-primary" />
            </button>
          </div>

          {/* Mini map widget */}
          <div className="pt-4 border-t border-outline-variant">
            <div className="rounded-xl overflow-hidden h-36 relative group border border-outline-variant shadow-sm">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                style={{ 
                  backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB01HuV-vGVrwsnpa2zk8dVx6sJDO1nzJURCTB3t-EJVGHM9uXPk_SVVGVq8kJtaoKKbzne6dIArhKoFU8HoE4XGijRV7FG0U5d3qF2Ai9Fo3vTcp2H8jNz5qxAZ6oRQLUISUy4tzHlM8NxS7P2iJRwI5ptnV9OSSggvnSemV6SLagR_QPzfdIJAssKebHbgVqjONdNQ3lbLFKovFrfc3aMS_Ybk9FYYf7kaMHb6Z3L88eSg_po6CbG')" 
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                <div className="text-white text-[10px]">
                  <p className="font-bold uppercase tracking-wider">Iowa Facility - West</p>
                  <p className="opacity-80">Lat: 41.8780° N, Long: 93.0977° W</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
