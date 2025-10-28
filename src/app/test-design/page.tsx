'use client'

import React, { useState } from 'react';
import { Calendar, Car, Users, Mail, Bell, Settings, BarChart3, Plus, Filter, TrendingUp, DollarSign, Sun, Moon } from 'lucide-react';

export default function TestDesignPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen flex" style={{ 
        backgroundColor: darkMode ? '#1a1d23' : '#f0f4f8'
      }}>
        
        {/* Very subtle radial accents - barely visible */}
        <div className="fixed inset-0 pointer-events-none" style={{
          backgroundImage: darkMode
            ? `radial-gradient(at 10% 20%, rgba(52, 152, 219, 0.04) 0%, transparent 40%),
               radial-gradient(at 90% 80%, rgba(155, 89, 182, 0.03) 0%, transparent 40%)`
            : `radial-gradient(at 10% 20%, rgba(52, 152, 219, 0.05) 0%, transparent 40%),
               radial-gradient(at 90% 80%, rgba(155, 89, 182, 0.04) 0%, transparent 40%)`
        }}></div>
        
        {/* Sidebar - minimal clean */}
        <aside className="w-64 flex flex-col relative z-10" style={{ 
          backgroundColor: darkMode ? '#252930' : '#2c3e50',
          borderRight: `1px solid ${darkMode ? '#2d3139' : 'transparent'}`
        }}>
          <div className="p-6 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <h1 className="text-2xl font-bold text-white">AutoNetwork</h1>
            <p className="text-sm text-white text-opacity-70 mt-1">Mike's Auto Sales</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white rounded-lg" 
               style={{ backgroundColor: '#3498db' }}>
              <BarChart3 size={18} />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-5 rounded-lg transition-all">
              <Car size={18} />
              Inventory
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-5 rounded-lg transition-all">
              <Users size={18} />
              Leads
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-5 rounded-lg transition-all">
              <Calendar size={18} />
              Appointments
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-5 rounded-lg transition-all">
              <Mail size={18} />
              Messages
            </a>
          </nav>

          <div className="p-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-5 rounded-lg transition-all">
              <Settings size={18} />
              Settings
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          
          {/* Header - clean minimal */}
          <header className="px-8 py-4 flex justify-between items-center" style={{ 
            backgroundColor: darkMode ? '#252930' : '#ffffff',
            borderBottom: `1px solid ${darkMode ? '#2d3139' : '#e9ecef'}`
          }}>
            <div>
              <h2 className="text-2xl font-semibold" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>Dashboard</h2>
              <p className="text-sm" style={{ color: darkMode ? '#8b92a0' : '#6c757d' }}>Welcome back, Mike</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg transition-all hover:bg-black hover:bg-opacity-5" style={{ 
                color: darkMode ? '#8b92a0' : '#6c757d'
              }}>
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#3498db' }}></span>
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg transition-all hover:bg-black hover:bg-opacity-5"
                style={{ 
                  color: darkMode ? '#8b92a0' : '#6c757d'
                }}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-8 overflow-auto">
            
            {/* Stats Grid - balanced design with better hover */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {/* Total Inventory */}
              <div className="rounded-xl p-6 transition-all hover:shadow-xl hover:-translate-y-1.5 group cursor-pointer" style={{ 
                backgroundColor: darkMode ? '#252930' : '#ffffff',
                border: `1px solid ${darkMode ? '#2d3139' : '#e9ecef'}`
              }}>
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{
                  boxShadow: darkMode ? '0 0 30px rgba(52, 152, 219, 0.15)' : '0 0 30px rgba(52, 152, 219, 0.1)'
                }}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg transition-transform group-hover:scale-110" style={{ 
                      backgroundColor: darkMode ? 'rgba(52, 152, 219, 0.15)' : 'rgba(52, 152, 219, 0.1)'
                    }}>
                      <Car size={20} style={{ color: '#3498db' }} />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ 
                      backgroundColor: darkMode ? 'rgba(46, 204, 113, 0.15)' : 'rgba(46, 204, 113, 0.1)',
                      color: '#2ecc71'
                    }}>
                      +12%
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ 
                    color: darkMode ? '#8b92a0' : '#6c757d' 
                  }}>Total Inventory</p>
                  <h3 className="text-4xl font-bold mb-1" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>47</h3>
                  <p className="text-sm font-medium" style={{ color: darkMode ? '#8b92a0' : '#6c757d' }}>32 available to sell</p>
                </div>
              </div>

              {/* Active Leads */}
              <div className="rounded-xl p-6 transition-all hover:shadow-xl hover:-translate-y-1.5 group cursor-pointer relative" style={{ 
                backgroundColor: darkMode ? '#252930' : '#ffffff',
                border: `1px solid ${darkMode ? '#2d3139' : '#e9ecef'}`
              }}>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{
                  boxShadow: darkMode ? '0 0 30px rgba(155, 89, 182, 0.15)' : '0 0 30px rgba(155, 89, 182, 0.1)'
                }}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg transition-transform group-hover:scale-110" style={{ 
                      backgroundColor: darkMode ? 'rgba(155, 89, 182, 0.15)' : 'rgba(155, 89, 182, 0.1)'
                    }}>
                      <Users size={20} style={{ color: '#9b59b6' }} />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ 
                      backgroundColor: darkMode ? 'rgba(46, 204, 113, 0.15)' : 'rgba(46, 204, 113, 0.1)',
                      color: '#2ecc71'
                    }}>
                      +8%
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ 
                    color: darkMode ? '#8b92a0' : '#6c757d' 
                  }}>Active Leads</p>
                  <h3 className="text-4xl font-bold mb-1" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>23</h3>
                  <p className="text-sm font-medium" style={{ color: darkMode ? '#8b92a0' : '#6c757d' }}>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold" style={{
                      backgroundColor: 'rgba(231, 76, 60, 0.1)',
                      color: '#e74c3c'
                    }}>
                      5 need response
                    </span>
                  </p>
                </div>
              </div>

              {/* Appointments */}
              <div className="rounded-xl p-6 transition-all hover:shadow-xl hover:-translate-y-1.5 group cursor-pointer relative" style={{ 
                backgroundColor: darkMode ? '#252930' : '#ffffff',
                border: `1px solid ${darkMode ? '#2d3139' : '#e9ecef'}`
              }}>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{
                  boxShadow: darkMode ? '0 0 30px rgba(230, 126, 34, 0.15)' : '0 0 30px rgba(230, 126, 34, 0.1)'
                }}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg transition-transform group-hover:scale-110" style={{ 
                      backgroundColor: darkMode ? 'rgba(230, 126, 34, 0.15)' : 'rgba(230, 126, 34, 0.1)'
                    }}>
                      <Calendar size={20} style={{ color: '#e67e22' }} />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ 
                      backgroundColor: darkMode ? 'rgba(52, 152, 219, 0.15)' : 'rgba(52, 152, 219, 0.1)',
                      color: '#3498db'
                    }}>
                      Today
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ 
                    color: darkMode ? '#8b92a0' : '#6c757d' 
                  }}>Appointments</p>
                  <h3 className="text-4xl font-bold mb-1" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>8</h3>
                  <p className="text-sm font-medium" style={{ color: darkMode ? '#8b92a0' : '#6c757d' }}>3 scheduled this week</p>
                </div>
              </div>

              {/* Sold This Month */}
              <div className="rounded-xl p-6 transition-all hover:shadow-xl hover:-translate-y-1.5 group cursor-pointer relative" style={{ 
                backgroundColor: darkMode ? '#252930' : '#ffffff',
                border: `1px solid ${darkMode ? '#2d3139' : '#e9ecef'}`
              }}>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" style={{
                  boxShadow: darkMode ? '0 0 30px rgba(46, 204, 113, 0.15)' : '0 0 30px rgba(46, 204, 113, 0.1)'
                }}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 rounded-lg transition-transform group-hover:scale-110" style={{ 
                      backgroundColor: darkMode ? 'rgba(46, 204, 113, 0.15)' : 'rgba(46, 204, 113, 0.1)'
                    }}>
                      <BarChart3 size={20} style={{ color: '#2ecc71' }} />
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ 
                      backgroundColor: darkMode ? 'rgba(46, 204, 113, 0.15)' : 'rgba(46, 204, 113, 0.1)',
                      color: '#2ecc71'
                    }}>
                      +15%
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ 
                    color: darkMode ? '#8b92a0' : '#6c757d' 
                  }}>Sold This Month</p>
                  <h3 className="text-4xl font-bold mb-1" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>12</h3>
                  <p className="text-sm font-medium flex items-center gap-1" style={{ color: darkMode ? '#8b92a0' : '#6c757d' }}>
                    <DollarSign size={13} />
                    284,500 revenue
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              
              {/* Recent Inventory */}
              <div className="rounded-lg overflow-hidden" style={{ 
                backgroundColor: darkMode ? '#252930' : '#ffffff',
                border: `1px solid ${darkMode ? '#2d3139' : '#e9ecef'}`
              }}>
                <div className="p-6 border-b flex justify-between items-center" style={{ 
                  borderColor: darkMode ? '#2d3139' : '#e9ecef'
                }}>
                  <div>
                    <h3 className="text-base font-semibold flex items-center gap-2" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>
                      <Car size={18} />
                      Recent Inventory
                    </h3>
                    <p className="text-xs mt-1" style={{ color: darkMode ? '#8b92a0' : '#6c757d' }}>Latest vehicles added</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90 transition-all" style={{ 
                    backgroundColor: '#16a085'
                  }}>
                    <Plus size={15} />
                    Add
                  </button>
                </div>
                <div className="p-6 space-y-3">
                  {[
                    { year: '2021', make: 'Toyota', model: 'Camry', price: '$24,500', status: 'available' },
                    { year: '2020', make: 'Honda', model: 'Accord', price: '$22,900', status: 'pending' },
                    { year: '2022', make: 'Ford', model: 'F-150', price: '$38,700', status: 'available' }
                  ].map((car, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg transition-all hover:shadow-sm" style={{ 
                      backgroundColor: darkMode ? '#1a1d23' : '#f8f9fa',
                      border: `1px solid ${darkMode ? '#2d3139' : 'transparent'}`
                    }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ 
                          backgroundColor: darkMode ? 'rgba(52, 152, 219, 0.1)' : 'rgba(52, 152, 219, 0.08)'
                        }}>
                          <Car size={16} style={{ color: '#3498db' }} />
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>{car.year} {car.make} {car.model}</p>
                          <p className="text-xs" style={{ color: darkMode ? '#8b92a0' : '#6c757d' }}>{car.price}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded" style={{ 
                        backgroundColor: car.status === 'available' 
                          ? (darkMode ? 'rgba(46, 204, 113, 0.15)' : 'rgba(46, 204, 113, 0.1)')
                          : (darkMode ? 'rgba(230, 126, 34, 0.15)' : 'rgba(230, 126, 34, 0.1)'),
                        color: car.status === 'available' ? '#2ecc71' : '#e67e22'
                      }}>
                        {car.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Leads */}
              <div className="rounded-lg overflow-hidden" style={{ 
                backgroundColor: darkMode ? '#252930' : '#ffffff',
                border: `1px solid ${darkMode ? '#2d3139' : '#e9ecef'}`
              }}>
                <div className="p-6 border-b flex justify-between items-center" style={{ 
                  borderColor: darkMode ? '#2d3139' : '#e9ecef'
                }}>
                  <div>
                    <h3 className="text-base font-semibold flex items-center gap-2" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>
                      <Users size={18} />
                      Recent Leads
                    </h3>
                    <p className="text-xs mt-1" style={{ color: darkMode ? '#8b92a0' : '#6c757d' }}>New customer inquiries</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-black hover:bg-opacity-5 transition-all" style={{ 
                    color: darkMode ? '#8b92a0' : '#6c757d' 
                  }}>
                    <Filter size={18} />
                  </button>
                </div>
                <div className="p-6 space-y-3">
                  {[
                    { name: 'Sarah Johnson', interest: '2021 Toyota Camry', score: 'hot', time: '5 min ago' },
                    { name: 'Mike Chen', interest: '2020 Honda Accord', score: 'warm', time: '1 hour ago' },
                    { name: 'Emma Davis', interest: '2022 Ford F-150', score: 'hot', time: '2 hours ago' }
                  ].map((lead, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg transition-all hover:shadow-sm" style={{ 
                      backgroundColor: darkMode ? '#1a1d23' : '#f8f9fa',
                      border: `1px solid ${darkMode ? '#2d3139' : 'transparent'}`
                    }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold" style={{ 
                          backgroundColor: darkMode ? 'rgba(155, 89, 182, 0.15)' : 'rgba(155, 89, 182, 0.1)',
                          color: '#9b59b6'
                        }}>
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>{lead.name}</p>
                          <p className="text-xs" style={{ color: darkMode ? '#8b92a0' : '#6c757d' }}>{lead.interest}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded mb-1" style={{ 
                          backgroundColor: lead.score === 'hot' 
                            ? (darkMode ? 'rgba(231, 76, 60, 0.15)' : 'rgba(231, 76, 60, 0.1)')
                            : (darkMode ? 'rgba(230, 126, 34, 0.15)' : 'rgba(230, 126, 34, 0.1)'),
                          color: lead.score === 'hot' ? '#e74c3c' : '#e67e22'
                        }}>
                          {lead.score}
                        </span>
                        <p className="text-xs" style={{ color: darkMode ? '#8b92a0' : '#95a5a6' }}>{lead.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg p-6" style={{ 
              backgroundColor: darkMode ? '#252930' : '#ffffff',
              border: `1px solid ${darkMode ? '#2d3139' : '#e9ecef'}`
            }}>
              <h3 className="text-base font-semibold mb-5" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Plus, label: 'Add Vehicle', color: '#3498db' },
                  { icon: Users, label: 'New Lead', color: '#9b59b6' },
                  { icon: Calendar, label: 'Schedule', color: '#e67e22' },
                  { icon: Mail, label: 'Messages', color: '#16a085' }
                ].map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button key={idx} className="flex flex-col items-center gap-3 p-5 rounded-lg transition-all hover:shadow-lg hover:-translate-y-1 hover:scale-105 group" style={{ 
                      backgroundColor: darkMode ? '#1a1d23' : '#f8f9fa',
                      border: `1px solid ${darkMode ? '#2d3139' : 'transparent'}`
                    }}>
                      <div className="p-2.5 rounded-lg transition-all group-hover:scale-110" style={{ 
                        backgroundColor: `${action.color}15`
                      }}>
                        <Icon size={20} style={{ color: action.color }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: darkMode ? '#fff' : '#2c3e50' }}>
                        {action.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}