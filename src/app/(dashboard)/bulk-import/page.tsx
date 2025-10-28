'use client';

import React, { useState } from 'react';
import { Zap, Upload, Search, CheckCircle, AlertCircle, Car, Download, FileText, ClipboardPaste, Image as ImageIcon, X, Plus } from 'lucide-react';
import Papa from 'papaparse';

export default function EnhancedBulkImport() {
  const [activeTab, setActiveTab] = useState<'quick' | 'csv' | 'photos'>('quick');
  const [registration, setRegistration] = useState('');
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [lookupSuccess, setLookupSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvText, setCsvText] = useState('');
  const [csvUploading, setCsvUploading] = useState(false);
  const [showPasteArea, setShowPasteArea] = useState(false);
  
  // New photo matching states
  const [csvData, setCsvData] = useState<any[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [matchedCars, setMatchedCars] = useState<any[]>([]);
  const [unmatchedPhotos, setUnmatchedPhotos] = useState<File[]>([]);
  const [photoStep, setPhotoStep] = useState<'upload' | 'match' | 'review'>('upload');
  const [importResults, setImportResults] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    make: '', model: '', year: '', color: '', fuelType: '', engineCapacity: '', transmission: '',
    doors: '', seats: '', price: '', mileage: '', description: '', status: 'available', bodyType: '',
    registration: '', serviceHistory: 'Full', mot: '', taxStatus: '', emissions: '', warranty: '', features: '',
  });

  const colors = {
    bg: '#f0f4f8', cardBg: '#ffffff', text: '#1e293b', textMuted: '#64748b', border: '#e2e8f0',
    primary: '#667eea', success: '#10b981', error: '#ef4444', orange: '#f97316', yellow: '#fbbf24',
  };

  const handleAutoFill = async () => {
    if (!registration.trim()) {
      setLookupError('Please enter a registration number');
      return;
    }
    setLoading(true);
    setLookupError('');
    setLookupSuccess(false);
    
    try {
      const response = await fetch('/api/dvla-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registration: registration.trim() }),
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to lookup vehicle');
      
      setFormData(prev => ({
        ...prev,
        make: data.make || '',
        model: data.model || '',
        year: data.year?.toString() || data.yearOfManufacture?.toString() || '',
        color: data.color || data.colour || '',
        fuelType: data.fuelType || data.fuel_type || '',
        engineCapacity: data.engineCapacity ? `${data.engineCapacity}cc` : '',
        transmission: data.transmission || '',
        doors: data.doors?.toString() || data.numberOfDoors?.toString() || '',
        seats: data.seats?.toString() || data.numberOfSeats?.toString() || '',
        registration: data.registrationNumber || registration.trim().toUpperCase(),
        mot: data.motExpiryDate || data.mot_expiry_date || '',
        taxStatus: data.taxStatus || data.tax_status || '',
        emissions: data.co2Emissions?.toString() || data.co2_emissions?.toString() || '',
        bodyType: data.wheelplan?.includes('4x4') ? 'SUV' : data.bodyType || '',
      }));

      setLookupSuccess(true);
      setTimeout(() => setLookupSuccess(false), 3000);
      
    } catch (error: any) {
      setLookupError(error.message || 'Failed to lookup vehicle');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!formData.make || !formData.model || !formData.year || !formData.price || !formData.mileage) {
      alert('Please fill in all required fields');
      return;
    }
    setSaving(true);
    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save car');
      alert('Car added successfully');
      setRegistration('');
      setFormData({
        make: '', model: '', year: '', color: '', fuelType: '', engineCapacity: '', transmission: '',
        doors: '', seats: '', price: '', mileage: '', description: '', status: 'available', bodyType: '',
        registration: '', serviceHistory: 'Full', mot: '', taxStatus: '', emissions: '', warranty: '', features: '',
      });
      setLookupSuccess(false);
    } catch (error: any) {
      alert(error.message || 'Failed to save car');
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setCsvFile(e.target.files[0]);
      setShowPasteArea(false);
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile && !csvText.trim()) {
      alert('Please select a CSV file or paste CSV data');
      return;
    }
    setCsvUploading(true);
    try {
      const formData = new FormData();
      if (csvFile) {
        formData.append('file', csvFile);
      } else {
        formData.append('file', new Blob([csvText], { type: 'text/csv' }), 'pasted-data.csv');
      }
      const response = await fetch('/api/bulk-import', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Failed to upload CSV');
      const result = await response.json();
      alert(`Successfully imported ${result.count || 0} cars`);
      setCsvFile(null);
      setCsvText('');
      setShowPasteArea(false);
    } catch (error: any) {
      alert(error.message || 'Failed to upload CSV');
    } finally {
      setCsvUploading(false);
    }
  };

  // NEW: Parse CSV for photo matching
  const handleCsvForPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        const validData = result.data.filter((row: any) => 
          row.make && row.model && row.year && row.price
        );
        setCsvData(validData);
        setPhotoStep('match');
      },
      error: (error) => {
        alert(`CSV Parse Error: ${error.message}`);
      }
    });
  };

  // NEW: Handle photo uploads
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setPhotoFiles(files);
  };

  // NEW: Auto-match photos to cars
  const autoMatchPhotos = () => {
    const matched = csvData.map((car, index) => {
      const carIdentifier = `${car.make}-${car.model}-${car.year}`.toLowerCase().replace(/\s+/g, '-');
      
      const carPhotos = photoFiles.filter(photo => {
        const photoName = photo.name.toLowerCase();
        return (
          photoName.includes(car.make.toLowerCase()) &&
          photoName.includes(car.model.toLowerCase())
        ) || photoName.includes(carIdentifier) || photoName.includes(car.year.toString());
      });

      return {
        ...car,
        id: `car-${index}`,
        photos: carPhotos,
        photoCount: carPhotos.length
      };
    });

    const allMatchedPhotoNames = matched.flatMap(car => 
      car.photos.map((p: File) => p.name)
    );
    
    const unmatched = photoFiles.filter(photo => 
      !allMatchedPhotoNames.includes(photo.name)
    );

    setMatchedCars(matched);
    setUnmatchedPhotos(unmatched);
    setPhotoStep('review');
  };

  // NEW: Manually assign photo to car
  const assignPhotoToCar = (carId: string, photo: File) => {
    setMatchedCars(prev => prev.map(car => {
      if (car.id === carId) {
        return {
          ...car,
          photos: [...car.photos, photo],
          photoCount: car.photos.length + 1
        };
      }
      return car;
    }));

    setUnmatchedPhotos(prev => prev.filter(p => p.name !== photo.name));
  };

  // NEW: Remove photo from car
  const removePhotoFromCar = (carId: string, photoName: string) => {
    let removedPhoto: File | null = null;
    
    setMatchedCars(prev => prev.map(car => {
      if (car.id === carId) {
        removedPhoto = car.photos.find((p: File) => p.name === photoName);
        return {
          ...car,
          photos: car.photos.filter((p: File) => p.name !== photoName),
          photoCount: car.photos.length - 1
        };
      }
      return car;
    }));

    if (removedPhoto) {
      setUnmatchedPhotos(prev => [...prev, removedPhoto]);
    }
  };

  // NEW: Final import with photos
  const handleFinalImport = async () => {
    setCsvUploading(true);
    
    try {
      // Simulate import (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const successCount = matchedCars.length;
      const totalPhotos = matchedCars.reduce((sum, car) => sum + car.photoCount, 0);
      
      setImportResults({
        carsImported: successCount,
        photosUploaded: totalPhotos,
        unmatchedPhotos: unmatchedPhotos.length
      });
      
      alert(`Successfully imported ${successCount} cars with ${totalPhotos} photos!`);
      
      // Reset
      setCsvData([]);
      setPhotoFiles([]);
      setMatchedCars([]);
      setUnmatchedPhotos([]);
      setPhotoStep('upload');
      
    } catch (error: any) {
      alert(error.message || 'Failed to import');
    } finally {
      setCsvUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csv = 'make,model,year,price,mileage,color,fuel_type,transmission,description,status\nToyota,Camry,2020,15000,35000,Silver,Petrol,Automatic,"Great condition",available\n';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'car-import-template.csv';
    a.click();
  };

  const inputStyle = { width: '100%', padding: '10px 12px', fontSize: '15px', border: `1px solid ${colors.border}`, borderRadius: '8px', outline: 'none' };
  const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '6px' };

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, padding: '32px', position: 'relative', overflow: 'hidden' }}>
      {/* Background gradient orbs */}
      <div style={{ position: 'absolute', top: '-150px', left: '-150px', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${colors.primary}35 0%, ${colors.primary}15 40%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', top: '20%', right: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: `radial-gradient(circle, ${colors.success}25 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-200px', right: '-200px', width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle, ${colors.orange}40 0%, ${colors.orange}20 40%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }}></div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: colors.text, marginBottom: '8px' }}>Bulk Import</h1>
          <p style={{ fontSize: '16px', color: colors.textMuted, margin: 0 }}>Add cars quickly using auto-fill, CSV upload, or bulk import with photo matching</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: `2px solid ${colors.border}` }}>
          <button onClick={() => setActiveTab('quick')} style={{ padding: '12px 24px', background: 'none', border: 'none', borderBottom: activeTab === 'quick' ? `3px solid ${colors.primary}` : 'none', color: activeTab === 'quick' ? colors.primary : colors.textMuted, fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '-2px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
            <Zap size={20} />Quick Add
          </button>
          <button onClick={() => setActiveTab('csv')} style={{ padding: '12px 24px', background: 'none', border: 'none', borderBottom: activeTab === 'csv' ? `3px solid ${colors.orange}` : 'none', color: activeTab === 'csv' ? colors.orange : colors.textMuted, fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '-2px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
            <Upload size={20} />CSV Upload
          </button>
          <button onClick={() => setActiveTab('photos')} style={{ padding: '12px 24px', background: 'none', border: 'none', borderBottom: activeTab === 'photos' ? `3px solid ${colors.success}` : 'none', color: activeTab === 'photos' ? colors.success : colors.textMuted, fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '-2px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
            <ImageIcon size={20} />CSV + Photos
          </button>
        </div>

        {/* Quick Add Tab (existing code) */}
        {activeTab === 'quick' && (
          <div>
            <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '32px', marginBottom: '24px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, #764ba2 100%)`, borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)' }}><Zap size={24} color="white" /></div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.text, margin: 0 }}>Step 1: Auto-Fill from Registration</h2>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <input type="text" placeholder="E.G. AB12 CDE" value={registration} onChange={(e) => setRegistration(e.target.value.toUpperCase())} onKeyPress={(e) => e.key === 'Enter' && handleAutoFill()} style={{ flex: 1, padding: '14px 16px', fontSize: '16px', border: `2px solid ${colors.border}`, borderRadius: '10px', outline: 'none', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', background: 'white' }} />
                <button onClick={handleAutoFill} disabled={loading} style={{ padding: '14px 32px', background: `linear-gradient(135deg, ${colors.primary} 0%, #764ba2 100%)`, color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', opacity: loading ? 0.7 : 1, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)' }}>
                  <Search size={20} />{loading ? 'Looking up...' : 'Auto-Fill'}
                </button>
              </div>
              {lookupError && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#fee', border: `2px solid ${colors.error}`, borderRadius: '8px', color: colors.error, fontSize: '14px' }}><AlertCircle size={18} />{lookupError}</div>}
              {lookupSuccess && <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#d1fae5', border: `2px solid ${colors.success}`, borderRadius: '8px', color: colors.success, fontSize: '14px', fontWeight: '600' }}><CheckCircle size={18} />Vehicle details loaded from DVLA</div>}
            </div>

            <div style={{ background: `linear-gradient(135deg, ${colors.cardBg} 0%, #f0f4ff 100%)`, borderRadius: '16px', padding: '32px', border: `2px solid ${colors.primary}30`, boxShadow: '0 6px 20px rgba(102, 126, 234, 0.15)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', color: colors.text, marginBottom: '24px' }}>Step 2: Complete Car Details</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '32px', padding: '20px', background: '#fef3c7', borderRadius: '12px', border: `2px solid ${colors.yellow}` }}>
                <div><label style={{...labelStyle, color: '#92400e'}}>Price (£) *</label><input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="15000" style={{...inputStyle, background: 'white'}} /></div>
                <div><label style={{...labelStyle, color: '#92400e'}}>Mileage *</label><input type="number" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="35000" style={{...inputStyle, background: 'white'}} /></div>
                <div><label style={{...labelStyle, color: '#92400e'}}>Service History *</label><select name="serviceHistory" value={formData.serviceHistory} onChange={handleChange} style={{...inputStyle, background: 'white'}}><option value="Full">Full</option><option value="Partial">Partial</option><option value="None">None</option></select></div>
                <div><label style={{...labelStyle, color: '#92400e'}}>Warranty</label><select name="warranty" value={formData.warranty} onChange={handleChange} style={{...inputStyle, background: 'white'}}><option value="">None</option><option value="3 Months">3 Months</option><option value="6 Months">6 Months</option><option value="12 Months">12 Months</option></select></div>
              </div>
              
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.textMuted, marginBottom: '16px' }}>Auto-Filled Information</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><label style={labelStyle}>Make (Auto)</label><input type="text" name="make" value={formData.make} onChange={handleChange} style={{...inputStyle, background: '#f9fafb'}} disabled /></div>
                <div><label style={labelStyle}>Model</label><input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Enter if not auto-filled" style={inputStyle} /></div>
                <div><label style={labelStyle}>Year (Auto)</label><input type="text" name="year" value={formData.year} onChange={handleChange} style={{...inputStyle, background: '#f9fafb'}} disabled /></div>
                <div><label style={labelStyle}>Body Type</label><select name="bodyType" value={formData.bodyType} onChange={handleChange} style={inputStyle}><option value="">Select...</option><option value="Sedan">Sedan</option><option value="Hatchback">Hatchback</option><option value="SUV">SUV</option><option value="Estate">Estate</option><option value="Coupe">Coupe</option><option value="Convertible">Convertible</option><option value="MPV">MPV</option></select></div>
                <div><label style={labelStyle}>Color (Auto)</label><input type="text" name="color" value={formData.color} onChange={handleChange} style={{...inputStyle, background: '#f9fafb'}} disabled /></div>
                <div><label style={labelStyle}>Doors</label><select name="doors" value={formData.doors} onChange={handleChange} style={inputStyle}><option value="">Select...</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div>
                <div><label style={labelStyle}>Fuel Type (Auto)</label><input type="text" name="fuelType" value={formData.fuelType} onChange={handleChange} style={{...inputStyle, background: '#f9fafb'}} disabled /></div>
                <div><label style={labelStyle}>Transmission (Auto)</label><input type="text" name="transmission" value={formData.transmission} onChange={handleChange} style={{...inputStyle, background: '#f9fafb'}} disabled /></div>
                <div><label style={labelStyle}>Engine Size (Auto)</label><input type="text" name="engineCapacity" value={formData.engineCapacity} onChange={handleChange} style={{...inputStyle, background: '#f9fafb'}} disabled /></div>
                <div><label style={labelStyle}>Seats</label><select name="seats" value={formData.seats} onChange={handleChange} style={inputStyle}><option value="">Select...</option><option value="2">2</option><option value="4">4</option><option value="5">5</option><option value="7">7</option></select></div>
                <div><label style={labelStyle}>MOT Expiry (Auto)</label><input type="date" name="mot" value={formData.mot} onChange={handleChange} style={{...inputStyle, background: '#f9fafb'}} /></div>
                <div><label style={labelStyle}>Tax Status (Auto)</label><input type="text" name="taxStatus" value={formData.taxStatus} onChange={handleChange} style={{...inputStyle, background: '#f9fafb'}} disabled /></div>
                <div><label style={labelStyle}>CO2 Emissions (Auto)</label><input type="text" name="emissions" value={formData.emissions} onChange={handleChange} style={{...inputStyle, background: '#f9fafb'}} disabled /></div>
              </div>
              <div style={{ marginTop: '16px' }}><label style={labelStyle}>Key Features</label><textarea name="features" value={formData.features} onChange={handleChange} placeholder="Leather seats, Sat Nav, Parking sensors..." rows={2} style={{...inputStyle, resize: 'vertical', fontFamily: 'inherit'}} /></div>
              <div style={{ marginTop: '16px' }}><label style={labelStyle}>Description</label><textarea name="description" value={formData.description} onChange={handleChange} placeholder="Excellent condition, full service history..." rows={3} style={{...inputStyle, resize: 'vertical', fontFamily: 'inherit'}} /></div>
              <button onClick={handleSave} disabled={saving} style={{ marginTop: '24px', width: '100%', padding: '14px', background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`, color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '600', cursor: saving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: saving ? 0.7 : 1, transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
                <Car size={22} />{saving ? 'Saving...' : 'Save Car to Inventory'}
              </button>
            </div>
          </div>
        )}

        {/* CSV Upload Tab (existing code) */}
        {activeTab === 'csv' && (
          <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '40px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: colors.orange, borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Upload size={24} color="white" /></div>
              <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.text, margin: 0 }}>Upload Multiple Cars via CSV</h2>
            </div>
            <div style={{ background: '#fef3c7', border: `2px solid ${colors.yellow}`, borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '12px' }}>How to use CSV Import:</h3>
              <ol style={{ margin: 0, paddingLeft: '20px', color: '#92400e', fontSize: '14px', lineHeight: '1.8' }}>
                <li>Download the CSV template below</li>
                <li>Fill it out with your car details</li>
                <li>Save as CSV format</li>
                <li>Upload the file here</li>
              </ol>
            </div>
            <button onClick={downloadTemplate} style={{ padding: '12px 24px', background: 'white', color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', transition: 'all 0.2s' }}>
              <Download size={20} />Download CSV Template
            </button>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: `1px solid ${colors.border}` }}>
              <button onClick={() => setShowPasteArea(false)} style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: !showPasteArea ? `3px solid ${colors.orange}` : 'none', color: !showPasteArea ? colors.orange : colors.textMuted, fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '-1px' }}>Choose File</button>
              <button onClick={() => setShowPasteArea(true)} style={{ padding: '10px 20px', background: 'none', border: 'none', borderBottom: showPasteArea ? `3px solid ${colors.orange}` : 'none', color: showPasteArea ? colors.orange : colors.textMuted, fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '-1px', display: 'flex', alignItems: 'center', gap: '6px' }}><ClipboardPaste size={18} />Paste CSV Data</button>
            </div>
            {!showPasteArea && (
              <div style={{ border: `2px dashed ${colors.border}`, borderRadius: '12px', padding: '48px', textAlign: 'center', background: '#fafbfc', marginBottom: '24px' }}>
                <FileText size={48} color={colors.textMuted} style={{ margin: '0 auto 16px' }} />
                <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} id="csv-upload" />
                <label htmlFor="csv-upload" style={{ display: 'inline-block', padding: '12px 32px', background: `linear-gradient(135deg, ${colors.orange} 0%, #ea580c 100%)`, color: 'white', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginBottom: '16px' }}>Choose CSV File</label>
                {csvFile && <p style={{ fontSize: '14px', color: colors.success, marginTop: '12px', fontWeight: '600' }}>Selected: {csvFile.name}</p>}
                <p style={{ fontSize: '14px', color: colors.textMuted, marginTop: '12px' }}>Supported format: CSV only</p>
              </div>
            )}
            {showPasteArea && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: colors.text, marginBottom: '8px' }}>Paste CSV Data:</label>
                <textarea value={csvText} onChange={(e) => setCsvText(e.target.value)} placeholder="Paste your CSV data here" rows={10} style={{ width: '100%', padding: '12px', fontSize: '14px', fontFamily: 'monospace', border: `2px solid ${colors.border}`, borderRadius: '10px', outline: 'none', resize: 'vertical', background: '#fafbfc' }} />
                {csvText.trim() && <p style={{ fontSize: '13px', color: colors.success, marginTop: '8px', fontWeight: '600' }}>CSV data ready to import</p>}
              </div>
            )}
            <button onClick={handleCsvUpload} disabled={(!csvFile && !csvText.trim()) || csvUploading} style={{ width: '100%', padding: '16px', background: (csvFile || csvText.trim()) ? `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)` : colors.border, color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '600', cursor: (csvFile || csvText.trim()) && !csvUploading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: csvUploading ? 0.7 : 1, transition: 'all 0.2s', boxShadow: (csvFile || csvText.trim()) ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none' }}>
              <Upload size={22} />{csvUploading ? 'Uploading...' : 'Upload and Import Cars'}
            </button>
          </div>
        )}

        {/* NEW: CSV + Photos Tab */}
        {activeTab === 'photos' && (
          <div>
            {/* Step 1: Upload CSV */}
            {photoStep === 'upload' && (
              <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '40px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ background: colors.success, borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={24} color="white" /></div>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.text, margin: 0 }}>Step 1: Upload CSV File</h2>
                </div>
                
                <div style={{ background: '#e0f2fe', border: `2px solid #0ea5e9`, borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#075985', marginBottom: '12px' }}>📋 How it works:</h3>
                  <ol style={{ margin: 0, paddingLeft: '20px', color: '#075985', fontSize: '14px', lineHeight: '1.8' }}>
                    <li>Upload your CSV with car details</li>
                    <li>Upload photos (we'll auto-match them to cars)</li>
                    <li>Review matches and adjust if needed</li>
                    <li>Import everything at once!</li>
                  </ol>
                </div>

                <button onClick={downloadTemplate} style={{ padding: '12px 24px', background: 'white', color: colors.success, border: `2px solid ${colors.success}`, borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                  <Download size={20} />Download CSV Template
                </button>

                <div style={{ border: `2px dashed ${colors.border}`, borderRadius: '12px', padding: '48px', textAlign: 'center', background: '#fafbfc' }}>
                  <FileText size={48} color={colors.textMuted} style={{ margin: '0 auto 16px' }} />
                  <input type="file" accept=".csv" onChange={handleCsvForPhotos} style={{ display: 'none' }} id="csv-photo-upload" />
                  <label htmlFor="csv-photo-upload" style={{ display: 'inline-block', padding: '12px 32px', background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`, color: 'white', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Choose CSV File</label>
                  <p style={{ fontSize: '14px', color: colors.textMuted, marginTop: '16px' }}>Upload your car inventory CSV file</p>
                </div>
              </div>
            )}

            {/* Step 2: Upload Photos */}
            {photoStep === 'match' && (
              <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '40px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ background: colors.success, borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ImageIcon size={24} color="white" /></div>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.text, margin: 0 }}>Step 2: Upload Photos</h2>
                </div>

                <div style={{ background: '#d1fae5', border: `2px solid ${colors.success}`, borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                  <strong style={{ color: '#065f46' }}>✓ CSV Loaded:</strong> <span style={{ color: '#065f46' }}>{csvData.length} cars ready for photos</span>
                </div>

                <div style={{ background: '#fef3c7', border: `2px solid ${colors.yellow}`, borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '12px' }}>💡 Pro Tip for Auto-Matching:</h3>
                  <p style={{ margin: 0, color: '#92400e', fontSize: '14px', lineHeight: '1.6' }}>
                    Name your photos like: <strong>"Toyota-Camry-2020-front.jpg"</strong> or <strong>"Honda-Civic-front.jpg"</strong>
                    <br />We'll automatically match them to the right cars!
                  </p>
                </div>

                <div style={{ border: `2px dashed ${colors.border}`, borderRadius: '12px', padding: '48px', textAlign: 'center', background: '#fafbfc', marginBottom: '24px' }}>
                  <ImageIcon size={48} color={colors.textMuted} style={{ margin: '0 auto 16px' }} />
                  <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} id="photo-upload" />
                  <label htmlFor="photo-upload" style={{ display: 'inline-block', padding: '12px 32px', background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`, color: 'white', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>Choose Photos</label>
                  <p style={{ fontSize: '14px', color: colors.textMuted, marginTop: '16px' }}>Select multiple photos (JPG, PNG, etc.)</p>
                </div>

                {photoFiles.length > 0 && (
                  <div style={{ marginBottom: '24px' }}>
                    <strong style={{ display: 'block', marginBottom: '16px', fontSize: '16px' }}>✓ Selected: {photoFiles.length} photos</strong>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                      {photoFiles.slice(0, 12).map((file, idx) => (
                        <div key={idx} style={{ aspectRatio: '1', backgroundColor: '#f3f4f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', padding: '8px', textAlign: 'center', overflow: 'hidden', wordBreak: 'break-word' }}>
                          {file.name}
                        </div>
                      ))}
                      {photoFiles.length > 12 && (
                        <div style={{ aspectRatio: '1', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                          +{photoFiles.length - 12}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button onClick={() => { setPhotoStep('upload'); setPhotoFiles([]); }} style={{ padding: '12px 24px', background: 'white', color: colors.text, border: `2px solid ${colors.border}`, borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                        Back
                      </button>
                      <button onClick={autoMatchPhotos} style={{ flex: 1, padding: '12px 24px', background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`, color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        Match Photos to Cars →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review and Match */}
            {photoStep === 'review' && (
              <div style={{ background: colors.cardBg, borderRadius: '16px', padding: '40px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ background: colors.success, borderRadius: '12px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle size={24} color="white" /></div>
                  <h2 style={{ fontSize: '24px', fontWeight: '600', color: colors.text, margin: 0 }}>Step 3: Review & Adjust Matches</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ background: '#d1fae5', padding: '16px', borderRadius: '12px', border: `2px solid ${colors.success}` }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#065f46' }}>{matchedCars.length}</div>
                    <div style={{ fontSize: '14px', color: '#065f46' }}>Cars Ready</div>
                  </div>
                  <div style={{ background: '#dbeafe', padding: '16px', borderRadius: '12px', border: `2px solid #0ea5e9` }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#075985' }}>
                      {matchedCars.reduce((sum, car) => sum + car.photoCount, 0)}
                    </div>
                    <div style={{ fontSize: '14px', color: '#075985' }}>Photos Matched</div>
                  </div>
                  <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '12px', border: `2px solid ${colors.yellow}` }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#92400e' }}>{unmatchedPhotos.length}</div>
                    <div style={{ fontSize: '14px', color: '#92400e' }}>Unmatched Photos</div>
                  </div>
                </div>

                {/* Unmatched Photos */}
                {unmatchedPhotos.length > 0 && (
                  <div style={{ marginBottom: '32px', padding: '20px', background: '#fef3c7', borderRadius: '12px', border: `2px solid ${colors.yellow}` }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '12px' }}>
                      Unmatched Photos ({unmatchedPhotos.length})
                    </h3>
                    <p style={{ fontSize: '14px', color: '#92400e', marginBottom: '16px' }}>
                      Click on a photo below, then click "+" on a car to assign it
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {unmatchedPhotos.map((photo, idx) => (
                        <div key={idx} style={{ padding: '8px 12px', background: 'white', border: `2px solid ${colors.yellow}`, borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
                          {photo.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Cars */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Matched Cars</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {matchedCars.map((car) => (
                      <div key={car.id} style={{ padding: '20px', background: '#f9fafb', borderRadius: '12px', border: `1px solid ${colors.border}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <div>
                            <strong style={{ fontSize: '16px' }}>
                              {car.make} {car.model} ({car.year})
                            </strong>
                            <div style={{ fontSize: '14px', color: colors.textMuted, marginTop: '4px' }}>
                              £{car.price?.toLocaleString()} • {car.mileage?.toLocaleString()} miles
                            </div>
                          </div>
                          <div style={{ padding: '6px 12px', background: car.photoCount > 0 ? '#d1fae5' : '#fee', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: car.photoCount > 0 ? '#065f46' : '#991b1b' }}>
                            {car.photoCount} {car.photoCount === 1 ? 'photo' : 'photos'}
                          </div>
                        </div>
                        
                        {car.photos.length > 0 && (
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                            {car.photos.map((photo: File, idx: number) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', background: 'white', border: `1px solid ${colors.border}`, borderRadius: '6px', fontSize: '12px' }}>
                                <span>{photo.name}</span>
                                <button onClick={() => removePhotoFromCar(car.id, photo.name)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: colors.error }}>
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {unmatchedPhotos.length > 0 && (
                          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            {unmatchedPhotos.slice(0, 3).map((photo, idx) => (
                              <button key={idx} onClick={() => assignPhotoToCar(car.id, photo)} style={{ padding: '6px 10px', background: colors.success, color: 'white', border: 'none', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Plus size={14} /> {photo.name.substring(0, 20)}...
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button onClick={() => { setPhotoStep('match'); setMatchedCars([]); setUnmatchedPhotos([]); }} style={{ padding: '12px 24px', background: 'white', color: colors.text, border: `2px solid ${colors.border}`, borderRadius: '10px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
                    Back
                  </button>
                  <button onClick={handleFinalImport} disabled={csvUploading} style={{ flex: 1, padding: '14px', background: `linear-gradient(135deg, ${colors.success} 0%, #059669 100%)`, color: 'white', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '600', cursor: csvUploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: csvUploading ? 0.7 : 1 }}>
                    <Upload size={22} />{csvUploading ? 'Importing...' : `Import ${matchedCars.length} Cars with Photos`}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}