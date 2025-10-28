'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createCar } from '@/lib/services'
import type { CarFormData } from '@/types'
import { Upload, Loader2, Car } from 'lucide-react'

export default function AddCarPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  
  const [formData, setFormData] = useState<CarFormData>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: 0,
    fuel_type: 'petrol',
    transmission: 'manual',
    body_type: 'sedan',
    color: '',
    description: '',
    status: 'available'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create car using service
      const newCar = await createCar(formData)

      // TODO: Handle image upload here if images selected
      // For now, we'll skip image upload since it needs API setup

      alert('Car added successfully!')
      router.push('/inventory')
    } catch (error: any) {
      console.error('Error adding car:', error)
      alert(error.message || 'Failed to add car')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' || name === 'mileage' 
        ? Number(value) 
        : value
    }))
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: 'white',
    color: '#1e293b'
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '6px'
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '32px',
      backgroundColor: '#f0f4f8',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Add New Car
          </h1>
          <p style={{ fontSize: '15px', color: '#64748b' }}>
            Fill in the details to add a new car to your inventory
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1e293b',
              marginBottom: '16px'
            }}>
              Basic Information
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '16px' 
            }}>
              <div>
                <label style={labelStyle}>Make *</label>
                <input
                  type="text"
                  name="make"
                  required
                  value={formData.make}
                  onChange={handleChange}
                  placeholder="e.g., Toyota"
                  style={inputStyle}
                />
              </div>
              
              <div>
                <label style={labelStyle}>Model *</label>
                <input
                  type="text"
                  name="model"
                  required
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g., Camry"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Year *</label>
                <input
                  type="number"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Price (£) *</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., 25000"
                  min="0"
                  step="0.01"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Mileage *</label>
                <input
                  type="number"
                  name="mileage"
                  required
                  value={formData.mileage}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  min="0"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  placeholder="e.g., Silver"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#1e293b',
              marginBottom: '16px'
            }}>
              Specifications
            </h3>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '16px' 
            }}>
              <div>
                <label style={labelStyle}>Fuel Type</label>
                <select
                  name="fuel_type"
                  value={formData.fuel_type}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="electric">Electric</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Transmission</label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                  <option value="semi-automatic">Semi-Automatic</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Body Type</label>
                <select
                  name="body_type"
                  value={formData.body_type}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="sedan">Sedan</option>
                  <option value="saloon">Saloon</option>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="estate">Estate</option>
                  <option value="coupe">Coupe</option>
                  <option value="convertible">Convertible</option>
                  <option value="mpv">MPV</option>
                  <option value="van">Van</option>
                  <option value="pickup">Pickup</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the vehicle..."
              rows={4}
              style={{
                ...inputStyle,
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Images */}
          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              style={{
                ...inputStyle,
                cursor: 'pointer'
              }}
            />
            {images.length > 0 && (
              <p style={{ 
                fontSize: '13px', 
                color: '#10b981', 
                marginTop: '8px',
                fontWeight: '500'
              }}>
                {images.length} image(s) selected
              </p>
            )}
          </div>

          {/* Submit Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: '12px',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <button
              type="button"
              onClick={() => router.push('/inventory')}
              disabled={loading}
              style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 24px',
                backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Adding Car...
                </>
              ) : (
                <>
                  <Car size={18} />
                  Add Car
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}