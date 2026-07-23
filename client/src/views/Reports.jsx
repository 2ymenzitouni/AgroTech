import React, { useState } from 'react'
import { FileText, Download, Filter, Search, ShieldAlert, CheckCircle2, Info } from 'lucide-react'

export default function Reports({ onTriggerToast }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sectorFilter, setSectorFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const historicalLogs = [
    { id: '#DET-1024', crop: 'Tomato', anomaly: 'Late Blight', severity: 'CRITICAL', sector: 'Sector 4', cell: 'B-12', date: '2026-07-23 16:50' },
    { id: '#DET-1023', crop: 'Potato', anomaly: 'None', severity: 'HEALTHY', sector: 'Sector 2', cell: 'P-04', date: '2026-07-23 16:38' },
    { id: '#DET-1022', crop: 'Corn', anomaly: 'Rust', severity: 'WARNING', sector: 'Sector 7', cell: 'C-08', date: '2026-07-23 15:10' },
    { id: '#DET-1021', crop: 'Tomato', anomaly: 'Spider Mites', severity: 'WARNING', sector: 'Sector 4', cell: 'A-01', date: '2026-07-23 14:05' },
    { id: '#DET-1020', crop: 'Corn', anomaly: 'None', severity: 'HEALTHY', sector: 'Sector 7', cell: 'D-02', date: '2026-07-23 12:45' },
    { id: '#DET-1019', crop: 'Soybean', anomaly: 'Aphids', severity: 'CRITICAL', sector: 'Sector 1', cell: 'S-06', date: '2026-07-23 11:15' }
  ]

  const filteredLogs = historicalLogs.filter(log => {
    const matchesSearch = log.crop.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.anomaly.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = sectorFilter === 'All' || log.sector === sectorFilter
    const matchesStatus = statusFilter === 'All' || log.severity === statusFilter
    return matchesSearch && matchesSector && matchesStatus
  })

  const handleExport = (type) => {
    onTriggerToast(`Exporting operational history as ${type.toUpperCase()}... File generated.`)
  }

  return (
    <div className="space-y-gutter animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Detection History & Reports</h2>
          <p className="text-on-surface-variant font-body-md">Consolidated history log files from precision agricultural drones.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleExport('csv')}
            className="bg-white border border-outline-variant hover:bg-surface-container-low text-on-surface px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={() => handleExport('pdf')}
            className="bg-white border border-outline-variant hover:bg-surface-container-low text-on-surface px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-4 h-4 text-secondary" />
            <span>Export PDF</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col md:flex-row items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search crop, anomaly, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Sector Select */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="text-outline w-4 h-4 shrink-0 hidden md:block" />
          <select 
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="w-full md:w-40 bg-surface border border-outline-variant rounded-lg text-sm px-3 py-2 focus:ring-primary focus:border-primary"
          >
            <option value="All">All Sectors</option>
            <option value="Sector 1">Sector 1</option>
            <option value="Sector 2">Sector 2</option>
            <option value="Sector 4">Sector 4</option>
            <option value="Sector 7">Sector 7</option>
          </select>
        </div>

        {/* Status Select */}
        <div className="w-full md:w-auto">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-40 bg-surface border border-outline-variant rounded-lg text-sm px-3 py-2 focus:ring-primary focus:border-primary"
          >
            <option value="All">All Statuses</option>
            <option value="HEALTHY">Healthy Only</option>
            <option value="WARNING">Warnings Only</option>
            <option value="CRITICAL">Critical Only</option>
          </select>
        </div>
      </div>

      {/* Inspections Table */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-outline-variant text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="p-4">Detection ID</th>
                <th className="p-4">Crop Type</th>
                <th className="p-4">Anomaly</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Sector/Grid</th>
                <th className="p-4">Detection Time</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-xs text-on-surface">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => {
                  let badgeColor = 'bg-surface-container-high text-on-surface-variant'
                  let BadgeIcon = Info
                  if (log.severity === 'CRITICAL') {
                    badgeColor = 'bg-error-container text-error'
                    BadgeIcon = ShieldAlert
                  } else if (log.severity === 'HEALTHY') {
                    badgeColor = 'bg-primary-container/20 text-primary'
                    BadgeIcon = CheckCircle2
                  } else if (log.severity === 'WARNING') {
                    badgeColor = 'bg-secondary-fixed text-secondary'
                    BadgeIcon = AlertTriangle
                  }

                  return (
                    <tr key={log.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-4 font-bold text-secondary font-label-sm">{log.id}</td>
                      <td className="p-4 font-medium">{log.crop}</td>
                      <td className="p-4">{log.anomaly}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 ${badgeColor}`}>
                          <BadgeIcon className="w-3.5 h-3.5 fill-current" />
                          {log.severity}
                        </span>
                      </td>
                      <td className="p-4 font-label-sm">{log.sector} ({log.cell})</td>
                      <td className="p-4 font-label-sm text-outline">{log.date}</td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => onTriggerToast(`Analyzing report profile for ID ${log.id}`)}
                          className="text-primary hover:underline font-bold"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-on-surface-variant font-bold">
                    No matching detection logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-surface border-t border-outline-variant flex justify-between items-center text-xs text-on-surface-variant font-label-sm">
          <span>Showing {filteredLogs.length} of {historicalLogs.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-outline-variant bg-white rounded cursor-not-allowed opacity-60">Prev</button>
            <button className="px-3 py-1 border border-outline-variant bg-white rounded cursor-not-allowed opacity-60">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
