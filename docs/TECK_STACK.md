
Tech Stack , 4-Layer Application , Database Schema , Multi-Tenancy , Data Flow


------------------------------------------------------------------------------------------



Tech Stack:
Frontend
├── Next.js 14+ (App Router)
├── React 18+
├── TypeScript
├── Tailwind CSS
├── shadcnui + Lucide React
└── next-themes (dark mode)

State Management
├── TanStack Query (server state - PRIMARY)
├── Zustand (UI state - 4 stores)
├── React Hook Form (forms)
└── React Hooks (local state)

Backend
├── Next.js API Routes
├── Supabase (Auth, Storage, Real-time, Database)
├── Prisma (Type-safe ORM)
└── PostgreSQL (via Supabase)

External Services
├── Stripe (payments + webhooks)
├── Resend (emails)
├── Twilio (SMS)
├── Sentry (error tracking + monitoring)
└── Linear (issue tracking)
└──Facebook Graph API - Marketplace auto-posting

Infrastructure
├── Vercel (hosting)
└── GitHub (version control)

Row Level Security (RLS) via Supabase

--------------------------------------------------------------------------------------------------------------

4-Layer Application Structure:
Layer 1: Auth (/auth)
├── Login, Register, Forgot Password
├── No sidebar - simple forms
└── State: authStore

Layer 2: Setup Wizard (/setup)
├── Step 1: Business Info (name, hours, about, location)
├── Step 2: Branding (logo, colors, template selection)
├── Step 3: Domain & Visibility (subdomain/custom domain, Google Business)
├── Step 4: Preview & Launch (test showroom, go live)
├── Setup Sidebar - Progress tracker
└── One-time flow for new dealers

Layer 3: Admin Dashboard (/dashboard)
├── Overview (stats, quick actions)
├── Inventory (vehicles CRUD, bulk ops, Facebook sync)
├── Inquiries (lead management, scoring, responses)
├── Appointments (booking calendar, reminders)
├── Analytics (metrics, reports)
├── Settings (account, branding, notifications)
├── Dashboard Sidebar - Full navigation
└── Daily dealer workspace

Layer 4: Public Showroom (/showroom)
├── Home (featured vehicles, CTA)
├── Inventory (browsing, filtering, searching)
├── Vehicle Details (gallery, specs, inquiry form)
├── About Us (dealer story, hours, map)
├── Contact (inquiry form, appointment booking)
├── Public Header/Footer - Branded navigation
└── Customer-facing website

--------------------------------------------------------------------------------------------------------------

Database Schema (Prisma + Supabase):
Core Models:
├── Dealer (id, name, email, slug, plan, branding, settings)
├── Vehicle (id, dealerId, vin, make, model, year, price, status, photos[])
├── Customer (id, dealerId, name, email, phone, status, source)
├── Inquiry (id, dealerId, customerId, vehicleId, message, status)
├── Deal (id, dealerId, vehicleId, customerId, salePrice, status)
├── Document (id, dealerId, fileUrl, type)
├── User (id, dealerId, email, role, permissions)
└── Subscription (id, dealerId, stripeCustomerId, plan, status)

Security: Row Level Security (RLS) on ALL tables

--------------------------------------------------------------------------------------------------------------

Multi-Tenancy:
Strategy:
├── Supabase RLS (dealer_id on every table)
├── Database-level security (even if frontend hacked)
└── URL: dealer-slug.yoursaas.com or app.yoursaas.com/[dealer-slug]

Security & Monitoring
Security:
├── Supabase RLS (multi-tenant isolation)
├── JWT auth + server-side session validation
├── API route middleware protection
└── Stripe webhook signature verification

Monitoring:
├── Sentry (errors + performance)
├── Vercel Analytics (speed metrics)
└── Linear (bug tracking)

--------------------------------------------------------------------------------------------------------------

Data Flow Examples:

Add Vehicle:
Dashboard Form 
→ React Hook Form validates 
→ Photos to Supabase Storage 
→ Prisma saves to PostgreSQL 
→ RLS ensures dealerId 
→ TanStack Query cache updates 
→ Public showroom auto-updates

Customer Inquiry:
Showroom form → Next.js API 
→ Prisma saves to Inquiry table 
→ Resend emails dealer 
→ Twilio SMS (optional) → TanStack Query refetches inbox

Payment Webhook:
Stripe payment 
→ Webhook to /api/webhooks/stripe 
→ Prisma updates Subscription 
→ Features unlocked → Resend confirmation email