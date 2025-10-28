'use client'

import { useState, useEffect } from 'react'
import { getAllInquiries, updateInquiryStatus } from '@/lib/services'
import type { ContactInquiry } from '@/types'
import { Mail, Phone, MessageSquare, CheckCircle, Clock, Search, Calendar } from 'lucide-react'

export default function InquiriesPage() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null)

  useEffect(() => {
    loadInquiries()
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') setDarkMode(true)
  }, [])

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem('theme')
      setDarkMode(savedTheme === 'dark')
    }
    window.addEventListener('storage', handleThemeChange)
    const interval = setInterval(handleThemeChange, 100)
    return () => {
      window.removeEventListener('storage', handleThemeChange)
      clearInterval(interval)
    }
  }, [])

  async function loadInquiries() {
    try {
      const data = await getAllInquiries()
      setInquiries(data)
    } catch (error) {
      console.error('Error loading inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateStatus(inquiryId: string, newStatus: 'new' | 'contacted' | 'closed') {
    try {
      await updateInquiryStatus(inquiryId, newStatus)
      
      setInquiries(inquiries.map(inq => 
        inq.id === inquiryId ? { ...inq, status: newStatus } : inq
      ))

      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus })
      }

      alert('Status updated successfully')
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const colors = {
    bg: darkMode ? '#0f172a' : '#f0f4f8',
    cardBg: darkMode ? '#1e293b' : '#ffffff',
    cardBgTinted: darkMode ? '#1e293b' : '#fafbfd',
    text: darkMode ? '#f1f5f9' : '#1e293b',
    textMuted: darkMode ? '#94a3b8' : '#64748b',
    border: darkMode ? '#334155' : '#dce4ec'
  }

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = searchTerm === '' || 
      inq.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.customer_email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    closed: inquiries.filter(i => i.status === 'closed').length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return { bg: darkMode ? 'rgba(59, 130, 246, 0.15)' : '#dbeafe', text: '#3b82f6' }
      case 'contacted': return { bg: darkMode ? 'rgba(245, 158, 11, 0.15)' : '#fef3c7', text: '#f59e0b' }
      case 'closed': return { bg: darkMode ? 'rgba(16, 185, 129, 0.15)' : '#d1fae5', text: '#10b981' }
      default: return { bg: colors.border, text: colors.textMuted }
    }
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: colors.bg
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            animation: 'spin 1s linear infinite',
            borderRadius: '50%',
            height: '64px',
            width: '64px',
            border: `4px solid ${colors.border}`,
            borderTopColor: '#3b82f6',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: colors.textMuted, fontSize: '18px' }}>Loading inquiries...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      backgroundColor: colors.bg,
      minHeight: '100vh',
      padding: '32px',
      backgroundImage: darkMode 
        ? `
          radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 70%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(245, 158, 11, 0.06) 0%, transparent 50%)`
        : `
          radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
          radial-gradient(circle at 40% 70%, rgba(16, 185, 129, 0.10) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(245, 158, 11, 0.10) 0%, transparent 50%)`
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: colors.text, marginBottom: '8px' }}>
            Customer Inquiries
          </h1>
          <p style={{ fontSize: '16px', color: colors.textMuted }}>
            Manage and respond to customer messages
          </p>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <div style={{
            backgroundColor: colors.cardBgTinted,
            padding: '16px',
            borderRadius: '10px',
            border: `1px solid ${colors.border}`,
            borderLeftWidth: '3px',
            borderLeftStyle: 'solid',
            borderLeftColor: '#64748b'
          }}>
            <div style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
              Total
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: colors.text }}>
              {stats.total}
            </div>
          </div>

          <div style={{
            backgroundColor: colors.cardBgTinted,
            padding: '16px',
            borderRadius: '10px',
            border: `1px solid ${colors.border}`,
            borderLeftWidth: '3px',
            borderLeftStyle: 'solid',
            borderLeftColor: '#3b82f6'
          }}>
            <div style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
              New
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#3b82f6' }}>
              {stats.new}
            </div>
          </div>

          <div style={{
            backgroundColor: colors.cardBgTinted,
            padding: '16px',
            borderRadius: '10px',
            border: `1px solid ${colors.border}`,
            borderLeftWidth: '3px',
            borderLeftStyle: 'solid',
            borderLeftColor: '#f59e0b'
          }}>
            <div style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
              In Progress
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b' }}>
              {stats.contacted}
            </div>
          </div>

          <div style={{
            backgroundColor: colors.cardBgTinted,
            padding: '16px',
            borderRadius: '10px',
            border: `1px solid ${colors.border}`,
            borderLeftWidth: '3px',
            borderLeftStyle: 'solid',
            borderLeftColor: '#10b981'
          }}>
            <div style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '4px', fontWeight: '600', textTransform: 'uppercase' }}>
              Closed
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981' }}>
              {stats.closed}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{
          backgroundColor: colors.cardBgTinted,
          padding: '20px',
          borderRadius: '12px',
          border: `1px solid ${colors.border}`,
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '12px',
            alignItems: 'center'
          }}>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: colors.textMuted
              }} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  backgroundColor: colors.cardBg,
                  color: colors.text,
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.cardBg,
                color: colors.text,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Inquiries Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: selectedInquiry ? '1fr 1.5fr' : '1fr',
          gap: '24px'
        }}>
          {/* Inquiries List */}
          <div style={{
            backgroundColor: colors.cardBg,
            borderRadius: '12px',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden'
          }}>
            {filteredInquiries.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <MessageSquare size={48} color={colors.textMuted} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '8px' }}>
                  No inquiries found
                </h3>
                <p style={{ fontSize: '14px', color: colors.textMuted }}>
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your filters'
                    : 'New inquiries will appear here'}
                </p>
              </div>
            ) : (
              <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
                {filteredInquiries.map((inquiry) => {
                  const statusColors = getStatusColor(inquiry.status)
                  const isSelected = selectedInquiry?.id === inquiry.id

                  return (
                    <div
                      key={inquiry.id}
                      onClick={() => setSelectedInquiry(inquiry)}
                      style={{
                        padding: '16px',
                        borderBottom: `1px solid ${colors.border}`,
                        cursor: 'pointer',
                        backgroundColor: isSelected ? (darkMode ? '#334155' : '#f8fafc') : 'transparent',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: '600', color: colors.text, marginBottom: '4px' }}>
                            {inquiry.customer_name}
                          </div>
                          <div style={{ fontSize: '13px', color: colors.textMuted }}>
                            {inquiry.customer_email}
                          </div>
                        </div>
                        <div style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: statusColors.bg,
                          color: statusColors.text,
                          fontSize: '11px',
                          fontWeight: '600',
                          textTransform: 'capitalize'
                        }}>
                          {inquiry.status}
                        </div>
                      </div>
                      
                      <div style={{
                        fontSize: '13px',
                        color: colors.textMuted,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: '8px'
                      }}>
                        {inquiry.message}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: colors.textMuted }}>
                        <Calendar size={12} />
                        {new Date(inquiry.created_at).toLocaleDateString()} at {new Date(inquiry.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Inquiry Detail */}
          {selectedInquiry && (
            <div style={{
              backgroundColor: colors.cardBg,
              borderRadius: '12px',
              border: `1px solid ${colors.border}`,
              padding: '24px'
            }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: '700', color: colors.text, marginBottom: '8px' }}>
                      {selectedInquiry.customer_name}
                    </h2>
                    <div style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: getStatusColor(selectedInquiry.status).bg,
                      color: getStatusColor(selectedInquiry.status).text,
                      fontSize: '13px',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      display: 'inline-block'
                    }}>
                      {selectedInquiry.status}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Mail size={18} color={colors.textMuted} />
                    <a
                      href={`mailto:${selectedInquiry.customer_email}`}
                      style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}
                    >
                      {selectedInquiry.customer_email}
                    </a>
                  </div>

                  {selectedInquiry.customer_phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Phone size={18} color={colors.textMuted} />
                      <a
                        href={`tel:${selectedInquiry.customer_phone}`}
                        style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none' }}
                      >
                        {selectedInquiry.customer_phone}
                      </a>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Calendar size={18} color={colors.textMuted} />
                    <span style={{ fontSize: '14px', color: colors.textMuted }}>
                      {new Date(selectedInquiry.created_at).toLocaleDateString()} at {new Date(selectedInquiry.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div style={{
                  padding: '16px',
                  backgroundColor: colors.cardBgTinted,
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                  marginBottom: '24px'
                }}>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: colors.textMuted, marginBottom: '8px' }}>
                    Message:
                  </div>
                  <div style={{ fontSize: '14px', color: colors.text, lineHeight: '1.6' }}>
                    {selectedInquiry.message}
                  </div>
                </div>

                {/* Action Buttons */}
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: colors.textMuted, marginBottom: '12px' }}>
                    Update Status:
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {selectedInquiry.status !== 'new' && (
                      <button
                        onClick={() => handleUpdateStatus(selectedInquiry.id, 'new')}
                        style={{
                          flex: 1,
                          padding: '10px 16px',
                          backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.15)' : '#dbeafe',
                          color: '#3b82f6',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Clock size={16} />
                        Mark as New
                      </button>
                    )}

                    {selectedInquiry.status !== 'contacted' && (
                      <button
                        onClick={() => handleUpdateStatus(selectedInquiry.id, 'contacted')}
                        style={{
                          flex: 1,
                          padding: '10px 16px',
                          backgroundColor: darkMode ? 'rgba(245, 158, 11, 0.15)' : '#fef3c7',
                          color: '#f59e0b',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <MessageSquare size={16} />
                        In Progress
                      </button>
                    )}

                    {selectedInquiry.status !== 'closed' && (
                      <button
                        onClick={() => handleUpdateStatus(selectedInquiry.id, 'closed')}
                        style={{
                          flex: 1,
                          padding: '10px 16px',
                          backgroundColor: darkMode ? 'rgba(16, 185, 129, 0.15)' : '#d1fae5',
                          color: '#10b981',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <CheckCircle size={16} />
                        Close
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}