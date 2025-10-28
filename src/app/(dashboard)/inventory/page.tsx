'use client'

import { useState, useEffect } from 'react'
import { getAllCars, deleteCar } from '@/lib/services'
import type { Car } from '@/types'
import { Car as CarIcon, Edit, Trash2, Search, Filter } from 'lucide-react'
import Link from 'next/link'

export default function InventoryPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    loadCars()
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
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

  const colors = {
    bg: darkMode ? '#0f172a' : '#f0f4f8',
    cardBg: darkMode ? '#1e293b' : '#ffffff',
    cardBgTinted: darkMode ? '#1e293b' : '#fafbfd',
    text: darkMode ? '#f1f5f9' : '#1e293b',
    textMuted: darkMode ? '#94a3b8' : '#64748b',
    border: darkMode ? '#334155' : '#dce4ec',
    inputBg: darkMode ? '#0f172a' : '#f8fafc'
  }

  async function loadCars() {
    try {
      const data = await getAllCars()
      setCars(data)
    } catch (error) {
      console.error('Error loading cars:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteCar(carId: string) {
    if (!confirm('Are you sure you want to delete this car?')) return

    try {
      await deleteCar(carId)
      await loadCars()
    } catch (error) {
      console.error('Error deleting car:', error)
      alert('Failed to delete car')
    }
  }

  const filteredCars = cars.filter(car => {
    const matchesSearch = 
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || car.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', backgroundColor: colors.bg }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ animation: 'spin 1s linear infinite', borderRadius: '50%', height: '48px', width: '48px', borderWidth: '4px', borderStyle: 'solid', borderColor: colors.border, borderTopColor: '#3b82f6', margin: '0 auto 16px' }}></div>
          <p style={{ color: colors.textMuted }}>Loading cars...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: '100vh', padding: '32px' }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .select-focus:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
      `}</style>

      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <div style={{ 
            backgroundColor: colors.cardBgTinted, 
            padding: '20px', 
            borderRadius: '12px', 
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: colors.border,
            borderLeftWidth: '4px',
            borderLeftColor: '#3b82f6'
          }}>
            <div style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '8px', fontWeight: '600' }}>Total Cars</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#3b82f6' }}>{cars.length}</div>
          </div>
          <div style={{ 
            backgroundColor: colors.cardBgTinted, 
            padding: '20px', 
            borderRadius: '12px', 
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: colors.border,
            borderLeftWidth: '4px',
            borderLeftColor: '#10b981'
          }}>
            <div style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '8px', fontWeight: '600' }}>Available</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#10b981' }}>
              {cars.filter(c => c.status === 'available').length}
            </div>
          </div>
          <div style={{ 
            backgroundColor: colors.cardBgTinted, 
            padding: '20px', 
            borderRadius: '12px', 
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: colors.border,
            borderLeftWidth: '4px',
            borderLeftColor: '#f59e0b'
          }}>
            <div style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '8px', fontWeight: '600' }}>Pending</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#f59e0b' }}>
              {cars.filter(c => c.status === 'pending').length}
            </div>
          </div>
          <div style={{ 
            backgroundColor: colors.cardBgTinted, 
            padding: '20px', 
            borderRadius: '12px', 
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: colors.border,
            borderLeftWidth: '4px',
            borderLeftColor: '#8b5cf6'
          }}>
            <div style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '8px', fontWeight: '600' }}>Sold</div>
            <div style={{ fontSize: '36px', fontWeight: '700', color: '#8b5cf6' }}>
              {cars.filter(c => c.status === 'sold').length}
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{
          backgroundColor: colors.cardBg,
          padding: '20px',
          borderRadius: '12px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: colors.border,
          marginBottom: '24px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: colors.textMuted
            }} />
            <input
              type="text"
              placeholder="Search by make, model, or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="select-focus"
              style={{
                width: '100%',
                padding: '12px 16px 12px 48px',
                fontSize: '14px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: colors.border,
                borderRadius: '10px',
                backgroundColor: colors.inputBg,
                color: colors.text,
                transition: 'all 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select-focus"
            style={{
              padding: '12px 16px',
              fontSize: '14px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: colors.border,
              borderRadius: '10px',
              backgroundColor: colors.inputBg,
              color: colors.text,
              cursor: 'pointer',
              minWidth: '160px'
            }}
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>

        {/* Cars Grid */}
        {filteredCars.length === 0 ? (
          <div style={{
            backgroundColor: colors.cardBg,
            padding: '60px 40px',
            borderRadius: '16px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: colors.border,
            textAlign: 'center'
          }}>
            <CarIcon size={64} style={{ margin: '0 auto 24px', opacity: 0.3, color: colors.textMuted }} />
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: colors.text, marginBottom: '8px' }}>
              No cars found
            </h3>
            <p style={{ fontSize: '15px', color: colors.textMuted }}>
              {searchTerm || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Start by adding your first car'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {filteredCars.map(car => (
              <div
                key={car.id}
                style={{
                  backgroundColor: colors.cardBg,
                  borderRadius: '12px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: colors.border,
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = darkMode ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Car Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: colors.border,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {car.images && Array.isArray(car.images) && car.images.length > 0 ? (
                    <img
                      src={car.images[0].url}
                      alt={`${car.make} ${car.model}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <CarIcon size={48} color={colors.textMuted} />
                  )}
                </div>

                {/* Car Details */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '4px' }}>
                        {car.year} {car.make} {car.model}
                      </h3>
                      <p style={{ fontSize: '14px', color: colors.textMuted }}>
                        {car.mileage?.toLocaleString()} miles
                      </p>
                    </div>
                    <span style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      borderRadius: '6px',
                      backgroundColor: car.status === 'available' ? '#dcfce7' : 
                                      car.status === 'pending' ? '#fef3c7' : '#fee2e2',
                      color: car.status === 'available' ? '#10b981' :
                             car.status === 'pending' ? '#f59e0b' : '#ef4444'
                    }}>
                      {car.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '16px' }}>
                    £{car.price.toLocaleString()}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link
                      href={`/inventory/edit/${car.id}`}
                      style={{
                        flex: 1,
                        padding: '10px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Edit size={16} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteCar(car.id)}
                      style={{
                        padding: '10px',
                        backgroundColor: colors.cardBgTinted,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: colors.border,
                        color: '#ef4444',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}