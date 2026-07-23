import React, { useState } from 'react'
import { Users, UserPlus, Shield, UserCheck, Trash2, MailPlus } from 'lucide-react'

export default function UserManagement({ onTriggerToast }) {
  const [operators, setOperators] = useState([
    { id: 1, name: 'Alex Rivera', role: 'Fleet Admiral', email: 'alex.rivera@agrotech.precision', status: 'Active', activeTime: 'Now' },
    { id: 2, name: 'Clara Oswald', role: 'Fleet Operator', email: 'clara.os@agrotech.precision', status: 'Active', activeTime: '12 mins ago' },
    { id: 3, name: 'Marcus Brody', role: 'Technician', email: 'marcus.b@agrotech.precision', status: 'Maintenance', activeTime: '1 hour ago' },
    { id: 4, name: 'Elena Rostova', role: 'Fleet Operator', email: 'elena.ros@agrotech.precision', status: 'Inactive', activeTime: '3 days ago' }
  ])
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Fleet Operator')

  const handleRoleChange = (id, newRole) => {
    setOperators(prev => prev.map(op => op.id === id ? { ...op, role: newRole } : op))
    onTriggerToast(`Operator role updated to ${newRole}`)
  }

  const handleRemoveOperator = (id, name) => {
    setOperators(prev => prev.filter(op => op.id !== id))
    onTriggerToast(`Access revoked for operator: ${name}`)
  }

  const handleInviteSubmit = (e) => {
    e.preventDefault()
    if (!inviteEmail) return
    onTriggerToast(`Fleet invitation sent to ${inviteEmail} as ${inviteRole}`)
    setInviteEmail('')
    setShowInviteModal(false)
  }

  return (
    <div className="space-y-gutter animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">User Management</h2>
          <p className="text-on-surface-variant font-body-md">Manage security clearances and active operator accounts.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-primary text-on-primary hover:opacity-90 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-98"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Operator</span>
        </button>
      </div>

      {/* Operators Grid */}
      <div className="bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-outline-variant text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                <th className="p-4">Operator Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Clearance Role</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Activity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-xs text-on-surface">
              {operators.map((op) => (
                <tr key={op.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="p-4 font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xs">
                      {op.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{op.name}</span>
                  </td>
                  <td className="p-4 text-on-surface-variant font-label-sm">{op.email}</td>
                  <td className="p-4">
                    <select 
                      value={op.role}
                      onChange={(e) => handleRoleChange(op.id, e.target.value)}
                      className="bg-surface-container-low border border-outline-variant rounded px-2.5 py-1 text-xs focus:ring-primary focus:border-primary font-medium"
                    >
                      <option value="Fleet Admiral">Fleet Admiral</option>
                      <option value="Fleet Operator">Fleet Operator</option>
                      <option value="Technician">Technician</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                      op.status === 'Active' 
                        ? 'bg-primary-container/20 text-primary' 
                        : op.status === 'Maintenance' 
                        ? 'bg-secondary-fixed text-secondary' 
                        : 'bg-surface-container-high text-outline'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        op.status === 'Active' ? 'bg-primary' : op.status === 'Maintenance' ? 'bg-secondary' : 'bg-outline'
                      }`}></span>
                      {op.status}
                    </span>
                  </td>
                  <td className="p-4 font-label-sm text-outline">{op.activeTime}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleRemoveOperator(op.id, op.name)}
                      disabled={op.role === 'Fleet Admiral'}
                      className={`text-error hover:bg-error-container/20 p-2 rounded transition-colors ${
                        op.role === 'Fleet Admiral' ? 'opacity-30 cursor-not-allowed' : ''
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Modal Dialog */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full border border-outline-variant p-6 shadow-2xl animate-in zoom-in duration-200">
            <h3 className="font-headline-lg-mobile text-base font-bold text-on-surface flex items-center gap-2 mb-2">
              <MailPlus className="text-primary w-5 h-5" />
              Invite New Operator
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">
              Enter their operator email below to generate a secure authentication invitation.
            </p>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface block">Email Address</label>
                <input 
                  type="email" 
                  value={inviteEmail} 
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="operator-name@agrotech.precision"
                  required
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface block">Access Clearance Role</label>
                <select 
                  value={inviteRole} 
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary font-medium"
                >
                  <option value="Fleet Operator">Fleet Operator</option>
                  <option value="Technician">Technician</option>
                  <option value="Fleet Admiral">Fleet Admiral</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-outline-variant">
                <button 
                  type="button" 
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 border border-outline rounded-lg text-xs font-bold hover:bg-surface transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:opacity-90 transition-all shadow-md"
                >
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
