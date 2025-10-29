


-------------------------------------------------------------------------------------------------------------------

# 📋 Car Dealer SaaS - Phase-by-Phase Build Guide (Complete)

**Last Updated:** October 14, 2025  
**Status:** Ready to Build

## Table of Contents
- [Phase 0: Project Setup](#phase-0-project-setup)
- [Phase 1: Authentication](#phase-1-authentication)
- [Phase 2: Database Schema](#phase-2-database-schema)
- [Phase 3: Onboarding Wizard](#phase-3-onboarding-wizard)
- [Phase 4: Dashboard Foundation](#phase-4-dashboard-foundation)
- [Phase 5: Vehicle Management](#phase-5-vehicle-management)
- [Phase 6: Public Showroom](#phase-6-public-showroom)
- [Phase 7: Inquiry & Lead System](#phase-7-inquiry--lead-system)
- [Phase 8: Appointment Booking](#phase-8-appointment-booking)
- [Phase 9: Facebook Integration](#phase-9-facebook-integration)
- [Phase 10: Mobile Features](#phase-10-mobile-features)
- [Phase 11: Stripe Integration](#phase-11-stripe-integration)
- [Phase 12: Analytics Dashboard](#phase-12-analytics-dashboard)
- [Phase 13: Settings & Polish](#phase-13-settings--polish)
- [Phase 14: Domain Management](#phase-14-domain-management)
- [Phase 15: Launch Preparation](#phase-15-launch-preparation)
- [Progress Tracker](#progress-tracker)

---

## Phase 0: Project Setup ⚙️

 
**Goal:** Development environment ready to start building

### Tasks:
- [ ] Create Next.js project with TypeScript and Tailwind
- [ ] Install core dependencies (TanStack Query, Zustand, Prisma, Supabase, etc.)
- [ ] Install shadcn/ui and essential components
+ [ ] Add colors to tailwind.config.js:
+     - Primary: #3498db (blue)
+     - Sidebar: #2c3e50 (dark slate)
+     - Success: #2ecc71, #16a085
+     - Warning: #e67e22
+     - Danger: #e74c3c
+     - Purple: #9b59b6
- [ ] Add Inter font to project
- [ ] Create Supabase project and get API keys
- [ ] Set up environment variables (.env.local)
- [ ] Initialize Prisma
- [ ] Create folder structure (app, components, stores, lib, services, hooks, types)
- [ ] Set up GitHub repository
- [ ] Connect to Vercel
- [ ] Create basic Supabase and Prisma client files
- [ ] Test with a simple button and card

### Files Created:
- `.env.local`
- `next.config.js`
- `tailwind.config.js` (with design system colors)
- `tsconfig.json`
- `prisma/schema.prisma`
- `src/lib/supabase.ts`
- `src/lib/prisma.ts`
- Folder structure

### Done When:
- `npm run dev` works without errors
- Can connect to Supabase
- shadcn/ui components render
- Design system colors work (test with button)
- Inter font loads correctly
- Environment variables configured
- GitHub repo created
- Vercel project connected

---

## Phase 1: Authentication 🔐
  
**Goal:** Users can register, login, and logout securely

### Tasks:
- [ ] Create authStore (Zustand) with user, isAuthenticated, currentLayer
- [ ] Create login page with form
- [ ] Create register page with form
- [ ] Create forgot password page
- [ ] Build LoginForm component with React Hook Form + Zod
- [ ] Build RegisterForm component
- [ ] Implement Supabase email/password authentication
- [ ] Create auth middleware for protected routes
- [ ] Add redirect logic (new user → setup, existing → dashboard)
- [ ] Style auth pages (centered, minimal, responsive) using design system
- [ ] **Add dark mode toggle to auth header** (sun/moon icon, top-right)
+ [ ] Add 'dark' class to <html> element on toggle
+ [ ] Add darkmode icons toggle (top-right of auth pages)
+ [ ] Use #3498db for active toggle state
+ [ ] Save as 'theme' key: 'light' or 'dark'
+ [ ] Load preference on page load
- [ ] **Test dark mode on auth pages**

### Files Created:
- `app/(auth)/layout.tsx`
- `app/(auth)/login/page.tsx`
- `app/(auth)/register/page.tsx`
- `app/(auth)/forgot-password/page.tsx`
- `components/features/auth/LoginForm.tsx`
- `components/features/auth/RegisterForm.tsx`
- `components/ui/DarkModeToggle.tsx` ← NEW
- `stores/authStore.ts`
- `middleware.ts`

### Done When:
- Can create account with email/password
- Can login with credentials
- Session persists on page refresh
- Can logout
- Protected routes redirect to login
- Logged in users redirect from /login
- New users redirect to setup
- Existing users redirect to dashboard
- **Dark mode toggle works and persists**
- **Auth pages look good in both light and dark mode**

---

## Phase 2: Database Schema 💾

 
**Goal:** All database tables defined with proper relationships and security

### Tasks:
- [ ] Define complete Prisma schema with all models:
  - Dealer (business info, branding, domain, subscription, darkMode preference)
  - Vehicle (inventory details, photos, Facebook sync)
  - Customer (contact info, lead score, status)
  - Inquiry (messages, follow-up tracking)
  - Appointment (scheduling, reminders)
  - Subscription (Stripe integration)
- [ ] Create enums (Plan, VehicleStatus, CustomerStatus, InquiryStatus, etc.)
- [ ] Run Prisma migrations
- [ ] Generate Prisma Client
- [ ] Set up Row Level Security (RLS) in Supabase SQL Editor
- [ ] Create RLS policies for all tables (dealer_id isolation)
- [ ] Create public access policy for available vehicles
- [ ] Test database connection and queries
- [ ] Verify RLS enforcement works

### Files Created:
- `prisma/schema.prisma` (complete)
- `prisma/migrations/`
- `lib/prisma.ts`

### Done When:
- All tables exist in Supabase
- Prisma Client generated successfully
- Can query database from Next.js
- RLS policies active and tested
- Relationships between tables work
- No migration errors

---

## Phase 3: Onboarding Wizard 🚀
 
**Goal:** New dealers complete 4-step setup and get live showroom

### Tasks:

**Setup Store:**
- [ ] Create onboardingStore with step tracking, form data persistence

**Layout & Sidebar:**
- [ ] Create setup layout with sidebar
- [ ] Build SetupSidebar showing 4 steps with progress
- [ ] Show completion checkmarks
- [ ] Highlight current step
- [ ] Apply dark mode styles to setup layout

**Step 1: Business Info**
- [ ] Business name (required)
- [ ] Business type (new/used/both)
- [ ] Phone number (formatted)
- [ ] Full address (Google Maps autocomplete)
- [ ] Hours of operation picker
- [ ] About Us rich text editor
- [ ] Validate and save to onboardingStore
- [ ] Generate slug from business name

**Step 2: Branding**
- [ ] Logo upload (drag & drop, to Supabase Storage)
- [ ] Primary color picker with live preview
- [ ] Secondary color picker
- [ ] Template selection (5 options with previews)
- [ ] **Dark mode preference toggle** (enable/disable for showroom)
- [ ] Live preview of colors and dark mode

**Step 3: Domain & Visibility**
- [ ] Auto-generate free subdomain (businessname.yoursaas.com)
- [ ] Custom domain connection wizard with DNS instructions
- [ ] Domain verification status
- [ ] Google Business Profile setup guide
- [ ] Social media links (Facebook, Instagram)

**Step 4: Preview & Launch**
- [ ] iframe preview of showroom with branding
- [ ] Show sample vehicle (placeholder)
- [ ] **Toggle between light/dark mode preview**
- [ ] Generate shareable link
- [ ] Generate QR code
- [ ] "Go Live" button
- [ ] Save all data to Dealer table (including darkMode preference)
- [ ] Set setupCompleted = true
- [ ] Create Vercel subdomain
- [ ] Redirect to dashboard

**API Routes:**
- [ ] Create setup/complete route to save all data

### Files Created:
- `app/setup/layout.tsx`
- `app/setup/business-info/page.tsx`
- `app/setup/branding/page.tsx`
- `app/setup/domain/page.tsx`
- `app/setup/preview/page.tsx`
- `components/layout/setup/SetupSidebar.tsx`
- `components/features/setup/*` (all form components)
- `stores/onboardingStore.ts`
- `app/api/setup/complete/route.ts`

### Done When:
- Can complete all 4 steps
- Data persists between steps
- Logo uploads successfully
- Colors apply in preview
- Template selection works
- **Dark mode preference saves**
- Subdomain generates correctly
- Custom domain instructions clear
- QR code generates
- "Go Live" saves to database
- Redirects to dashboard
- Setup can be resumed if interrupted

---

## Phase 4: Dashboard Foundation 📊

 
**Goal:** Dashboard with working navigation and layout

### Tasks:

**Dashboard Store:**
- [ ] Create dashboardStore with sidebar state, view preferences, filters, theme

**Layout:**
- [ ] Create dashboard layout with sidebar and main content area
- [ ] Handle collapsed state
- [ ] Mobile responsive (drawer on mobile)
- [ ] Apply dark mode styles

**Sidebar:**
- [ ] Build DashboardSidebar with all navigation sections:
- [ ] Dark slate background (#2c3e50)
  - BUSINESS (Overview, Templates, Reports, Pricing)
  - WEBSITE (Public Site, Branding, Custom Domain, Google Business)
  - INVENTORY (All Vehicles, Add Vehicle, Categories, Photo Gallery)
  - CUSTOMERS (Inquiries, Messages, Contacts, Leads)
  - APPOINTMENTS (Calendar, Upcoming, Completed)
  - SETTINGS (Business Info, Notifications, Security, Team)
- [ ] Collapsible sidebar with collapse button
- [ ] Active route highlighting
- [ ] Icons for each item
- [ ] User profile section at bottom
- [ ] Logout button
- [ ] Dark mode styling for sidebar

**Header:**
- [ ] Logo/business name
- [ ] Breadcrumbs
- [ ] Notifications bell
- [ ] **Dark mode toggle** (sun/moon icon, top-right, before profile)
- [ ] User avatar dropdown (Settings, Billing, Help, Logout)
- [ ] Mobile menu button

**Home Page:**
- [ ] Welcome message with dealer name
- [ ] Quick stats cards (vehicles, inquiries, appointments, customers)
- [ ] Quick actions (Add Vehicle, View Showroom, Check Inquiries)
- [ ] Recent activity feed (placeholder)
- [ ] Dark mode styling for all cards

**Test Navigation:**
- [ ] Click each sidebar item
- [ ] Verify routes work
- [ ] Test collapse/expand
- [ ] Test on mobile
- [ ] **Test dark mode toggle persistence**

### Files Created:
- `app/(dashboard)/layout.tsx`
- `app/(dashboard)/page.tsx`
- `components/layout/dashboard/DashboardSidebar.tsx`
- `components/layout/dashboard/DashboardHeader.tsx`
- `components/ui/DarkModeToggle.tsx` (if not created in Phase 1)
- `stores/dashboardStore.ts`

### Done When:
- Dashboard loads without errors
- Sidebar displays all sections
- Can collapse/expand sidebar
- Can navigate between pages
- Active route highlights correctly
- Mobile responsive (drawer)
- User dropdown works
- Can logout from dashboard
- **Dark mode toggle in header works**
- **Dashboard looks good in dark mode**

---

## Phase 5: Vehicle Management 🚗


**Goal:** Complete vehicle CRUD with photo uploads

### Tasks:

**Setup TanStack Query:**
- [ ] Create queryClient
- [ ] Add QueryClientProvider to root layout

**Services & Hooks:**
- [ ] Create vehicleService with CRUD operations and photo upload
- [ ] Create useVehicles, useVehicle, useCreateVehicle, useUpdateVehicle, useDeleteVehicle hooks

**All Vehicles Page:**
- [ ] Fetch vehicles with useVehicles
- [ ] Display in grid/list/table view (toggle)
- [ ] Filter by status, make, search
- [ ] Sort options
- [ ] "Add Vehicle" button
- [ ] Empty state
- [ ] Loading skeleton
- [ ] Error state
- [ ] Dark mode styling

**Vehicle Card:**
- [ ] Vehicle photo
- [ ] Year Make Model
- [ ] Price (formatted)
- [ ] Mileage
- [ ] Status badge
- [ ] Quick actions (Edit, Delete, View, Copy link)
- [ ] Dark mode styling

**Add Vehicle Page:**
- [ ] Form with all fields (VIN, make, model, year, price, mileage, status)
- [ ] Multiple photo upload (drag & drop)
- [ ] Preview thumbnails
- [ ] Reorder photos
- [ ] Description editor
- [ ] Features multi-input
- [ ] Save as Draft / Publish
- [ ] Dark mode styling

**Vehicle Form Component:**
- [ ] React Hook Form + Zod validation
- [ ] All form fields
- [ ] Photo upload handling
- [ ] Loading states
- [ ] Error handling
- [ ] Success toast

**Photo Upload Component:**
- [ ] Drag & drop zone
- [ ] File input
- [ ] Preview grid
- [ ] Upload progress
- [ ] Remove photo
- [ ] Reorder with drag & drop
- [ ] Compress images
- [ ] Max file size validation
- [ ] Dark mode styling

**Edit Vehicle Page:**
- [ ] Fetch vehicle data
- [ ] Pre-fill form
- [ ] Show existing photos
- [ ] Can add/remove photos
- [ ] Update vehicle
- [ ] Delete button with confirmation

**API Routes:**
- [ ] GET/POST vehicles
- [ ] GET/PATCH/DELETE vehicles/[id]
- [ ] POST vehicles/upload (photos to Supabase Storage)

### Files Created:
- `app/(dashboard)/cars/page.tsx`
- `app/(dashboard)/cars/add/page.tsx`
- `app/(dashboard)/cars/[id]/page.tsx`
- `app/api/vehicles/route.ts`
- `app/api/vehicles/[id]/route.ts`
- `app/api/vehicles/upload/route.ts`
- `components/features/cars/*` (all components)
- `services/vehicleService.ts`
- `hooks/useVehicles.ts`
- `lib/queryClient.ts`

### Done When:
- Can view all vehicles in grid/list
- Can add new vehicle with photos
- Photos upload to Supabase Storage
- Can edit existing vehicle
- Can delete vehicle
- Filters work
- Sort options work
- Loading states show
- Error handling works
- TanStack Query cache updates correctly
- Mobile responsive
- **Works well in dark mode**

---

## Phase 6: Public Showroom 🌐

 
**Goal:** Customer-facing website with templates and branding

### Tasks:

**Customer Site Store:**
- [ ] Create customerSiteStore with filters, view, sortBy, favorites

**Template System:**
- [ ] Define 5 templates (modern, bold, classic, luxury, budget)
- [ ] Each with different card/button/header styles
- [ ] **Each template has light and dark mode variants**
- [ ] Function to get template styles based on dealer preference

**Showroom Layout:**
- [ ] Fetch dealer data by slug
- [ ] Apply dealer's branding (logo, colors, template, **darkMode setting**)
- [ ] PublicHeader with logo, nav, mobile menu, **optional dark mode toggle**
- [ ] PublicFooter with business info, hours, social links
- [ ] Respect dealer's dark mode preference (force light, force dark, or user choice)

**Home Page:**
- [ ] Hero section with business name, tagline, CTAs
- [ ] Featured vehicles (3-6 latest)
- [ ] About Us preview
- [ ] Call to action section
- [ ] Contact info
- [ ] Works in light and dark mode

**Inventory Page:**
- [ ] Fetch vehicles (only AVAILABLE)
- [ ] Filter sidebar (make, year, price, mileage)
- [ ] View toggle (grid/list)
- [ ] Sort dropdown
- [ ] Vehicle grid/list
- [ ] Pagination
- [ ] No results state
- [ ] Dark mode styling

**Public Vehicle Card:**
- [ ] Photo, Year Make Model, Price, Mileage
- [ ] Key features
- [ ] "View Details" button
- [ ] Favorite heart icon
- [ ] Apply template styles
- [ ] Dark mode styling

**Vehicle Detail Page:**
- [ ] Photo gallery (main image, thumbnails, fullscreen)
- [ ] Vehicle info (title, price, VIN, mileage, status)
- [ ] Features list
- [ ] Full description
- [ ] Specifications table
- [ ] Contact dealer section (phone, email, inquiry form, book appointment)
- [ ] Share button
- [ ] Similar vehicles
- [ ] Dark mode styling

**About Us Page:**
- [ ] Display aboutUs content
- [ ] Business photo
- [ ] Hours of operation
- [ ] Location map (Google Maps embed)
- [ ] Contact info

**Contact Page:**
- [ ] Contact form
- [ ] Map with location
- [ ] Business hours
- [ ] Phone/email
- [ ] Social links

**SEO & Meta Tags:**
- [ ] Dynamic title tags per page
- [ ] Meta descriptions
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] Canonical URLs
- [ ] Schema.org markup (LocalBusiness, Vehicle)

**Test All Templates:**
- [ ] Apply each template
- [ ] Verify styles
- [ ] Test with different colors
- [ ] **Test light and dark mode for each template**
- [ ] Mobile responsive for all

### Files Created:
- `app/showroom/[dealerSlug]/layout.tsx`
- `app/showroom/[dealerSlug]/page.tsx`
- `app/showroom/[dealerSlug]/inventory/page.tsx`
- `app/showroom/[dealerSlug]/car/[id]/page.tsx`
- `app/showroom/[dealerSlug]/about/page.tsx`
- `app/showroom/[dealerSlug]/contact/page.tsx`
- `components/layout/public/*`
- `components/features/showroom/*`
- `stores/customerSiteStore.ts`
- `lib/templates.ts`

### Done When:
- Public showroom loads with dealer branding
- Can browse vehicle inventory
- Filters and search work
- Vehicle detail pages show all info
- Photo gallery works
- All 5 templates work correctly
- Brand colors apply dynamically
- **Dark mode respects dealer preference**
- **All templates work in both light and dark mode**
- About Us page shows dealer info
- Contact page has map and form
- SEO meta tags on all pages
- Fully mobile responsive
- Works for different dealer slugs

---

## Phase 7: Inquiry & Lead System 💬
 
**Goal:** Complete lead management with automation

### Tasks:

**Contact Form:**
- [ ] Build ContactForm component (name, email, phone, vehicle, message)
- [ ] React Hook Form + Zod validation
- [ ] Phone formatting, email validation
- [ ] Loading/success/error states
- [ ] Dark mode styling

**Inquiry API:**
- [ ] Create inquiry route
- [ ] Find or create Customer record
- [ ] Create Inquiry record
- [ ] Calculate initial lead score
- [ ] Send confirmation email to customer (Resend)
- [ ] Send notification email to dealer
- [ ] Send SMS to dealer (Twilio - optional)
- [ ] Schedule first follow-up email

**Inquiry Inbox:**
- [ ] Fetch inquiries with filters
- [ ] Display as list/cards
- [ ] Lead score badges (Hot/Warm/Cold)
- [ ] Filter by status
- [ ] Sort by newest, score, vehicle
- [ ] Search by customer name/email
- [ ] Unread badge
- [ ] Empty state, loading skeleton
- [ ] Dark mode styling

**Inquiry Card:**
- [ ] Customer name, lead score badge
- [ ] Vehicle of interest
- [ ] Message preview
- [ ] Time ago
- [ ] Status dropdown
- [ ] Quick actions (Call, Email, SMS, View details)
- [ ] Dark mode styling

**Inquiry Detail Page:**
- [ ] Customer info (name, email, phone, lead score breakdown, source, created date)
- [ ] All inquiries from customer
- [ ] Full message
- [ ] Vehicle of interest (link)
- [ ] Status dropdown
- [ ] Follow-ups sent count
- [ ] Communication history (emails, SMS, notes)
- [ ] Quick reply form (email)
- [ ] SMS form
- [ ] Phone button (click-to-call)
- [ ] Add note section
- [ ] Book appointment button
- [ ] Dark mode styling

**Lead Scoring:**
- [ ] Implement scoring algorithm (recency, contact info, inquiry quality, engagement, intent signals)
- [ ] Calculate on inquiry creation
- [ ] Update on interactions
- [ ] Color-code badges (Hot/Warm/Cold)

**Auto-Follow-Up System:**
- [ ] Define default email sequence (5 emails, different delays)
- [ ] Template variables (customerName, dealerName, vehicleInfo, etc.)
- [ ] Schedule follow-up jobs
- [ ] Stop sequence on reply/contact/lost
- [ ] Cron job to send scheduled follow-ups

**Email Integration (Resend):**
- [ ] Setup Resend client
- [ ] Send inquiry notifications
- [ ] Send follow-up emails
- [ ] Replace template variables
- [ ] Track email sent

**SMS Integration (Twilio - Optional):**
- [ ] Setup Twilio client
- [ ] Send dealer notifications
- [ ] Send appointment reminders
- [ ] Send customer reminders

**Services:**
- [ ] Create inquiryService with CRUD operations
- [ ] Create hooks (useInquiries)

### Files Created:
- `app/(dashboard)/inquiries/page.tsx`
- `app/(dashboard)/inquiries/[id]/page.tsx`
- `app/api/inquiries/route.ts`
- `app/api/inquiries/[id]/route.ts`
- `app/api/follow-ups/schedule/route.ts`
- `app/api/follow-ups/send/route.ts`
- `components/features/inquiries/*`
- `components/features/showroom/ContactForm.tsx`
- `services/inquiryService.ts`
- `hooks/useInquiries.ts`
- `lib/resend.ts`
- `lib/twilio.ts` (optional)
- `lib/leadScoring.ts`
- `lib/emailSequences.ts`

### Done When:
- Contact form works on showroom
- Inquiry saves to database
- Customer record created/updated
- Dealer receives email notification
- Dealer receives SMS notification (if configured)
- Lead score calculates correctly
- Inquiry appears in dashboard
- Can filter/sort inquiries
- Can view inquiry details
- Can update inquiry status
- Auto-follow-up emails schedule
- Follow-up emails send correctly
- Sequence stops on reply
- Quick reply works
- SMS sending works
- **All pages work in dark mode**

---

## Phase 8: Appointment Booking 📅

**Goal:** Complete appointment system with reminders

### Tasks:

**Booking Widget (Showroom):**
- [ ] Calendar view (month)
- [ ] Calculate available time slots based on business hours
- [ ] Prevent double-booking
- [ ] Select appointment type (Test Drive, Consultation)
- [ ] Customer form (name, email, phone)
- [ ] Notes field
- [ ] Submit button
- [ ] Confirmation message
- [ ] Dark mode styling

**Add to Vehicle Detail:**
- [ ] "Schedule Test Drive" button
- [ ] Opens BookingWidget modal
- [ ] Pre-fills vehicle info

**Booking API:**
- [ ] Validate date/time
- [ ] Check if slot available
- [ ] Create Customer (if new)
- [ ] Create Appointment record
- [ ] Send confirmation email
- [ ] Send notification to dealer
- [ ] Schedule reminders (24hr and 1hr)

**Appointments Calendar Page:**
- [ ] Day/Week/Month views
- [ ] Display all appointments
- [ ] Color-coded by type
- [ ] Click to view details
- [ ] Filter by status/type
- [ ] Today button
- [ ] Add appointment button (manual)
- [ ] Dark mode styling

**Appointment Detail Modal:**
- [ ] Customer info, vehicle info
- [ ] Scheduled date/time
- [ ] Appointment type, status
- [ ] Notes
- [ ] Actions: Reschedule, Cancel, Mark completed/no-show, Add notes
- [ ] Call/Email/SMS customer buttons
- [ ] Dark mode styling

**Appointment Service:**
- [ ] getAvailableSlots (check business hours, existing appointments)
- [ ] createAppointment
- [ ] rescheduleAppointment
- [ ] cancelAppointment

**Reminder System:**
- [ ] Cron job (runs hourly)
- [ ] Find appointments needing 24hr reminder
- [ ] Send email + SMS reminders
- [ ] Find appointments needing 1hr reminder
- [ ] Send SMS reminders
- [ ] Configure Vercel Cron in vercel.json

### Files Created:
- `app/(dashboard)/appointments/page.tsx`
- `app/api/appointments/route.ts`
- `app/api/appointments/[id]/route.ts`
- `app/api/appointments/available-slots/route.ts`
- `app/api/reminders/route.ts`
- `components/features/appointments/*`
- `components/features/showroom/BookingWidget.tsx`
- `services/appointmentService.ts`
- `hooks/useAppointments.ts`
- `vercel.json`

### Done When:
- Booking widget works on showroom
- Can select date and time
- Available slots calculate correctly
- Appointment saves to database
- Confirmation emails send
- Appointments show in calendar
- Can view appointment details
- Can reschedule appointment
- Can cancel appointment
- 24-hour reminders send (email + SMS)
- 1-hour reminders send (SMS)
- Cron job runs correctly
- No double-booking possible
- Mobile responsive calendar
- **All pages work in dark mode**

---

## Phase 9: Facebook Integration 📱


**Goal:** Auto-post vehicles to Facebook Marketplace

### Tasks:

**Set Up Facebook App:**
- [ ] Create app on developers.facebook.com
- [ ] Add Facebook Login product
- [ ] Add permissions (pages_manage_posts, pages_read_engagement, publish_video)
- [ ] Get App ID and App Secret
- [ ] Add to .env.local

**OAuth Flow:**
- [ ] Create /api/facebook/connect route
- [ ] Redirect to Facebook OAuth
- [ ] Exchange code for access token
- [ ] Get user's pages
- [ ] Save page access token and page ID to Dealer table
- [ ] Redirect back to settings

**Settings Page:**
- [ ] Show connection status
- [ ] "Connect Facebook" button
- [ ] Show connected page name
- [ ] "Disconnect" button
- [ ] "Auto-post new vehicles" toggle
- [ ] "Sync all existing vehicles" button
- [ ] Show sync status per vehicle (Posted, Pending, Failed)
- [ ] Dark mode styling

**Facebook Service:**
- [ ] postVehicle (upload photos, create marketplace listing)
- [ ] uploadPhoto (to Facebook)
- [ ] updateVehicle (update existing listing)
- [ ] deleteVehicle (remove from marketplace)

**Auto-Post API Routes:**
- [ ] /api/facebook/post (single vehicle)
- [ ] /api/facebook/sync-all (bulk post)
- [ ] /api/facebook/update (update listing)
- [ ] /api/facebook/delete (remove listing)

**Add Hooks to Vehicle CRUD:**
- [ ] On createVehicle: auto-post to Facebook if connected and status=AVAILABLE
- [ ] On updateVehicle: update Facebook post
- [ ] On deleteVehicle: delete from Facebook first

**Sync Status:**
- [ ] Show Facebook icon on vehicles
- [ ] Green if posted, yellow if pending, red if failed
- [ ] Tooltip with error message
- [ ] "Retry" button for failed

**Error Handling:**
- [ ] Rate limiting
- [ ] Token expiration (re-auth)
- [ ] Invalid photos
- [ ] Network errors
- [ ] Show friendly error messages

### Files Created:
- `app/(dashboard)/settings/integrations/page.tsx`
- `app/api/facebook/connect/route.ts`
- `app/api/facebook/post/route.ts`
- `app/api/facebook/update/route.ts`
- `app/api/facebook/delete/route.ts`
- `app/api/facebook/sync-all/route.ts`
- `components/features/facebook/*`
- `services/facebookService.ts`
- `hooks/useFacebook.ts`

### Done When:
- Can connect Facebook account
- OAuth flow works
- Page access token saves
- New vehicles auto-post
- Photos upload correctly
- Vehicle updates sync to Facebook
- Vehicle deletions sync to Facebook
- "Sync all" button works
- Sync status shows for each vehicle
- Errors handled gracefully
- Can disconnect Facebook
- Token refresh works
- **Settings page works in dark mode**

---

## Phase 10: Mobile Features 📱
 
**Goal:** Mobile-optimized inquiry response with push notifications

### Tasks:

**Optimize Inquiry Inbox:**
- [ ] Swipe gestures (right=read, left=archive)
- [ ] Tap-to-expand inquiry
- [ ] Pull-to-refresh
- [ ] Infinite scroll
- [ ] Fixed quick action bar (Call, SMS, Email)
- [ ] Dark mode for mobile

**Mobile Quick Actions:**
- [ ] Fixed bottom bar with Call, SMS, Email buttons
- [ ] Click-to-call (tel:)
- [ ] Click-to-SMS (sms:)
- [ ] Click-to-email (mailto:)

**Quick Reply Templates:**
- [ ] Pre-written templates
- [ ] Custom templates
- [ ] Tap to select
- [ ] Edit before sending
- [ ] Send via email or SMS toggle

**Web Push Notifications:**
- [ ] Create service worker (public/sw.js)
- [ ] Request notification permission
- [ ] Subscribe to push (save subscription to database)
- [ ] Generate VAPID keys
- [ ] Add keys to .env.local

**Notification API:**
- [ ] /api/notifications/subscribe (save subscription)
- [ ] /api/notifications/send (send to all dealer's subscriptions)
- [ ] Use web-push library

**Notification Triggers:**
- [ ] New inquiry
- [ ] Hot lead (score > 80)
- [ ] Appointment booked
- [ ] Appointment in 1 hour
- [ ] Customer replied

**Notification Settings:**
- [ ] Enable/disable push notifications
- [ ] "Request Permission" button
- [ ] Toggle for each notification type
- [ ] Quiet hours (start/end time)
- [ ] Sound on/off
- [ ] Test notification button
- [ ] Dark mode styling

**Permission Request:**
- [ ] Request on first dashboard visit (after 3 seconds)
- [ ] Subscribe if granted
- [ ] Store in localStorage that we asked

**Test on Devices:**
- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] Swipe gestures
- [ ] Tap-to-call/SMS
- [ ] Notifications
- [ ] Notification clicks

### Files Created:
- `app/(dashboard)/settings/notifications/page.tsx`
- `app/api/notifications/subscribe/route.ts`
- `app/api/notifications/send/route.ts`
- `components/features/mobile/*`
- `public/sw.js`
- `public/icon-192.png`
- `public/badge-72.png`
- `lib/push-notifications.ts`
- Add PushSubscription model to Prisma schema

### Done When:
- Inquiry inbox works well on mobile
- Swipe gestures work
- Tap-to-call works
- Tap-to-SMS works
- Quick reply templates work
- Push notifications work
- Permission request shows
- Can enable/disable notifications
- Quiet hours respected
- Clicking notification opens correct page
- Works on iOS Safari
- Works on Android Chrome
- **All mobile features work in dark mode**

---

## Phase 11: Stripe Integration 💳

 
**Goal:** Payment processing for $99/month subscription

### Tasks:

**Set Up Stripe:**
- [ ] Create Stripe account
- [ ] Create subscription product ($99/month)
- [ ] Get API keys (publishable and secret)
- [ ] Add to .env.local

**Stripe Client:**
- [ ] Create stripe client in lib/stripe.ts

**Checkout API:**
- [ ] Create or get Stripe customer
- [ ] Save stripeCustomerId to Dealer
- [ ] Create checkout session
- [ ] Return session URL

**Billing Page:**
- [ ] Current plan section (name, price, status, next billing date)
- [ ] Features included list
- [ ] Payment method section (card info, update button)
- [ ] Billing history table (invoices with download)
- [ ] Cancel subscription button (with confirmation)
- [ ] "Upgrade" button if FREE
- [ ] "Manage Subscription" button if Pro
- [ ] Dark mode styling

**Webhook Handler:**
- [ ] Verify webhook signature
- [ ] Handle events:
  - checkout.session.completed (activate subscription)
  - invoice.payment_succeeded (renew subscription)
  - invoice.payment_failed (mark past due, send email)
  - customer.subscription.deleted (cancel, downgrade to FREE)
  - customer.subscription.updated (update subscription)

**Configure Webhook in Stripe:**
- [ ] Add endpoint in Stripe Dashboard
- [ ] Select events to listen for
- [ ] Copy webhook signing secret
- [ ] Add to .env.local

**Feature Gates:**
- [ ] Check subscription status
- [ ] Allow/restrict based on plan
- [ ] Show upgrade prompts for FREE users

**Customer Portal Link:**
- [ ] Create /api/billing/portal route
- [ ] Generate Stripe portal session
- [ ] Dealers can update payment method, cancel, view invoices

### Files Created:
- `app/(dashboard)/billing/page.tsx`
- `app/api/checkout/route.ts`
- `app/api/billing/portal/route.ts`
- `app/api/webhooks/stripe/route.ts`
- `lib/stripe.ts`
- `lib/featureGates.ts`
- `components/features/billing/*`

### Done When:
- Can click "Upgrade" and go to Stripe Checkout
- Payment processes successfully
- Webhook updates subscription in database
- Dealer plan changes to PAID
- Billing page shows current plan
- Can view billing history
- Can manage subscription via portal
- Can cancel subscription
- Cancellation downgrades to FREE
- Payment failure handled gracefully
- Confirmation emails send
- **Billing page works in dark mode**

---

## Phase 12: Analytics Dashboard 📈

 
**Goal:** Business metrics and reporting

### Tasks:

**Install Chart Library:**
- [ ] Install recharts

**Analytics Service:**
- [ ] getOverviewStats (total vehicles, available, sold, inquiries, conversion rate)
- [ ] getInquiryTrends (group by day)
- [ ] getVehicleStats (group by status)
- [ ] getTopVehicles (most inquired about)
- [ ] getLeadSourceBreakdown (group by source)

**Analytics Page:**
- [ ] Date range selector (Last 7/30/90 days, Custom)
- [ ] Key metrics cards section
- [ ] Charts section
- [ ] Tables section
- [ ] Dark mode styling

**Stats Cards:**
- [ ] Total Inquiries
- [ ] New Leads
- [ ] Vehicles Sold
- [ ] Conversion Rate
- [ ] Each with value, change percentage, icon
- [ ] Dark mode styling

**Inquiry Trend Chart:**
- [ ] Line chart showing inquiries over time
- [ ] X-axis: dates
- [ ] Y-axis: count
- [ ] Responsive container
- [ ] Dark mode colors

**Vehicle Status Chart:**
- [ ] Pie chart showing distribution
- [ ] Colors per status (Available=green, Pending=yellow, Sold=blue, Archived=gray)
- [ ] Legend and tooltips
- [ ] Dark mode colors

**Top Vehicles Table:**
- [ ] Vehicle name
- [ ] Price
- [ ] Number of inquiries
- [ ] Interest level bar
- [ ] Dark mode styling

**Date Range Picker:**
- [ ] Preset buttons (7/30/90 days, Custom)
- [ ] Active state highlighting
- [ ] Triggers data refresh
- [ ] Dark mode styling

**Export to CSV:**
- [ ] Export button
- [ ] Convert data to CSV format
- [ ] Download file

**Analytics API Route:**
- [ ] GET /api/analytics
- [ ] Accept dealerId, startDate, endDate
- [ ] Return all stats, trends, charts data

### Files Created:
- `app/(dashboard)/analytics/page.tsx`
- `app/api/analytics/route.ts`
- `components/features/analytics/StatsCard.tsx`
- `components/features/analytics/InquiryChart.tsx`
- `components/features/analytics/VehicleStatusChart.tsx`
- `components/features/analytics/TopVehiclesTable.tsx`
- `components/features/analytics/DateRangePicker.tsx`
- `components/features/analytics/ExportButton.tsx`
- `services/analyticsService.ts`
- `hooks/useAnalytics.ts`

### Done When:
- Analytics page loads with data
- All stats cards show correct numbers
- Charts render with real data
- Date range picker works
- Data updates when range changes
- Top vehicles table shows correctly
- Export to CSV works
- Mobile responsive
- Loading states show
- No errors in console
- **All charts and cards work in dark mode**

---

## Phase 13: Settings & Polish ⚙️

 
**Goal:** All settings editable, UI polished and professional

### Tasks:

**Settings Layout:**
- [ ] Create tabbed settings layout
- [ ] Sidebar with tabs (Account, Branding, Notifications, Integrations, Security, Billing)
- [ ] Main content area
- [ ] Dark mode styling

**Account Settings:**
- [ ] Business information (editable name, phone, address, hours, about)
- [ ] User profile (name, email, photo upload)
- [ ] Danger zone (delete account, export data)
- [ ] Dark mode styling

**Branding Settings:**
- [ ] Logo upload (replace existing)
- [ ] Primary color picker (live preview)
- [ ] Secondary color picker (live preview)
- [ ] Template selector (change template)
- [ ] **Showroom dark mode toggle** (enable/disable for customers)
- [ ] Preview button (opens showroom)
- [ ] Reset to defaults
- [ ] Save button
- [ ] Dark mode styling for settings page

**Notifications Settings:**
- [ ] Email notifications (toggles for each type)
- [ ] Push notifications (master toggle + per type)
- [ ] SMS notifications (master toggle + per type)
- [ ] Quiet hours (enable, start/end time, days)
- [ ] Dark mode styling

**Integrations Settings:**
- [ ] Facebook Marketplace (status, connect/disconnect, auto-post toggle, sync all)
- [ ] Google Business (profile URL, view/update links)
- [ ] Future integrations (Coming Soon badges)
- [ ] Dark mode styling

**Security Settings:**
- [ ] Password change (current, new, confirm)
- [ ] Two-factor authentication (future)
- [ ] Active sessions (list with device, location, revoke buttons)
- [ ] Dark mode styling

**UI Polish - Toast Notifications:**
- [ ] Install sonner or similar
- [ ] Add Toaster to root layout
- [ ] Use toast.success, toast.error, toast.loading everywhere
- [ ] Dark mode toast styling

**UI Polish - Loading States:**
- [ ] Create LoadingState component (spinner)
- [ ] Create LoadingSkeleton component
- [ ] Use everywhere data is loading
- [ ] Dark mode styling

**UI Polish - Empty States:**
- [ ] Create EmptyState component (icon, title, description, action)
- [ ] Use for all empty lists (no vehicles, no inquiries, etc.)
- [ ] Dark mode styling

**UI Polish - Consistent Styling:**
- [ ] Go through all pages
- [ ] Ensure consistent spacing (Tailwind scale)
- [ ] Consistent button styles
- [ ] Consistent form input styles
- [ ] Consistent card styles
- [ ] Consistent typography
- [ ] Consistent colors (from design system)
- [ ] Smooth transitions
- [ ] Proper focus states
- [ ] **Apply dark mode styles to ALL pages**
- [ ] **Ensure all components work in both light and dark mode**
- [ ] **Test dark mode with all 5 showroom templates**
- [ ] **Verify contrast ratios in dark mode (accessibility)**

**Performance Optimization:**
- [ ] Use Next.js Image component everywhere
- [ ] Add loading="lazy" for below-fold images
- [ ] Compress images before upload
- [ ] Use WebP format
- [ ] Dynamic imports for heavy components
- [ ] Lazy load modals and charts
- [ ] Run npm run build and check bundle size
- [ ] Identify and optimize large dependencies

**SEO Optimization:**
- [ ] Add meta tags to every page
- [ ] Make them dynamic based on content
- [ ] Include Open Graph tags
- [ ] Include Twitter Card tags
- [ ] Generate metadata for showroom pages
- [ ] Create sitemap.ts (auto-generate for all dealers)
- [ ] Create robots.ts (allow public pages, disallow dashboard)

### Files Created:
- `app/(dashboard)/settings/layout.tsx`
- `app/(dashboard)/settings/account/page.tsx`
- `app/(dashboard)/settings/branding/page.tsx`
- `app/(dashboard)/settings/notifications/page.tsx`
- `app/(dashboard)/settings/integrations/page.tsx`
- `app/(dashboard)/settings/security/page.tsx`
- `components/ui/Toast.tsx`
- `components/ui/LoadingState.tsx`
- `components/ui/EmptyState.tsx`
- `components/ui/ConfirmDialog.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

### Done When:
- All settings pages created
- Can edit all dealer settings
- Changes save correctly
- Toast notifications show for all actions
- Loading states everywhere
- Empty states for all lists
- Consistent styling across all pages
- Images optimized with Next.js Image
- Code split appropriately
- SEO meta tags on all pages
- Sitemap generated
- Robots.txt configured
- Mobile responsive all pages
- No console errors
- Fast page loads (<3s)
- **DARK MODE WORKS ON ALL PAGES**
- **All templates work in dark mode**
- **Dark mode toggle persists correctly**
- **Proper contrast in dark mode**

---

## Phase 14: Domain Management 🌐

 
**Goal:** Custom domain connection with verification

### Tasks:

**Domain Management Page:**
- [ ] Show current domain (subdomain or custom)
- [ ] Copy button
- [ ] "Visit Site" button
- [ ] Display free subdomain (always available)
- [ ] "Add Custom Domain" button
- [ ] Domain input form
- [ ] "Verify Domain" button
- [ ] If connected: show domain, status, "Remove Domain" button
- [ ] Dark mode styling

**DNS Instructions Component:**
- [ ] Step-by-step instructions
- [ ] Display required DNS records:
  - A Record: @ → 76.76.21.21
  - CNAME: www → cname.vercel-dns.com
- [ ] Explanation for each step
- [ ] "View Video Tutorial" button
- [ ] Dark mode styling

**Domain Service:**
- [ ] addDomain (add to Vercel via API, save to database)
- [ ] verifyDomain (check DNS configuration via Vercel API)
- [ ] removeDomain (remove from Vercel, database)
- [ ] getDomainStatus (check verification status)

**Domain API Routes:**
- [ ] POST /api/domain/add
- [ ] POST /api/domain/verify
- [ ] POST /api/domain/remove

**Domain Verification Polling:**
- [ ] Create component that polls verification every 5 seconds
- [ ] Show "Verifying..." with attempt count
- [ ] Show "Verified!" when done
- [ ] Show "Failed" if 20 attempts with no success
- [ ] SSL provisions automatically (Vercel handles)

**Popular Registrar Guides:**
- [ ] Create guides component
- [ ] Step-by-step for GoDaddy
- [ ] Step-by-step for Namecheap
- [ ] Step-by-step for Google Domains
- [ ] Show in cards with logos
- [ ] Dark mode styling

**Error Handling:**
- [ ] Domain already in use
- [ ] Invalid domain format
- [ ] DNS not configured
- [ ] Vercel API errors
- [ ] Show helpful error messages and solutions

### Files Created:
- `app/(dashboard)/website/domain/page.tsx`
- `app/api/domain/add/route.ts`
- `app/api/domain/verify/route.ts`
- `app/api/domain/remove/route.ts`
- `components/features/domain/DNSInstructions.tsx`
- `components/features/domain/DomainVerification.tsx`
- `components/features/domain/RegistrarGuides.tsx`
- `services/domainService.ts`
- `lib/vercel.ts`

### Done When:
- Can add custom domain
- DNS instructions display clearly
- Domain verification polls automatically
- Shows verification status
- SSL provisions automatically
- Can remove domain
- Error messages helpful
- Registrar guides available
- Works with Vercel Domains API
- Custom domain routes correctly to showroom
- **Domain management page works in dark mode**

---

## Phase 15: Launch Preparation 🚀

  
**Goal:** Production-ready, live, accepting users

### Tasks:

**Environment Setup:**
- [ ] Create production Supabase project
- [ ] Run all migrations on production
- [ ] Set up RLS policies on production
- [ ] Configure storage buckets
- [ ] Enable authentication
- [ ] Switch Stripe to live mode
- [ ] Create live product/price in Stripe
- [ ] Configure webhooks for production URL
- [ ] Get live API keys for all services (Resend, Twilio, Facebook)
- [ ] Configure all environment variables in Vercel

**Complete Testing:**
- [ ] Test complete user flow (register → setup → add vehicle → inquiry → payment)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Device testing (iPhone, Android, iPad, Desktop, Laptop)
- [ ] **Test light and dark mode on all devices**
- [ ] Run Lighthouse audit (target: Performance >90, Accessibility >95, Best Practices >95, SEO >95)
- [ ] Load testing (simulate multiple concurrent users)
- [ ] Test database under load
- [ ] Check for memory leaks

**Security Audit:**
- [ ] All RLS policies active and tested
- [ ] No exposed API keys in code
- [ ] All API routes authenticated
- [ ] CORS configured correctly
- [ ] Rate limiting on sensitive endpoints
- [ ] SQL injection prevention (Prisma handles)
- [ ] XSS prevention (React handles)
- [ ] CSRF protection
- [ ] Webhook signature verification
- [ ] File upload validation
- [ ] Password requirements enforced
- [ ] Session security
- [ ] HTTPS everywhere
- [ ] Run npm audit and fix issues

**Configure Monitoring:**
- [ ] Set up Sentry (error tracking)
- [ ] Enable Vercel Analytics
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Configure error alerts (email/Slack)
- [ ] Database connection monitoring

**Create Legal Pages:**
- [ ] Privacy Policy (use template or hire lawyer)
- [ ] Terms of Service (include payment terms, refund policy)
- [ ] Cookie Policy
- [ ] Add links in footer
- [ ] Dark mode styling

**Create Marketing Site (Optional):**
- [ ] Landing page (hero, features, how it works, pricing, testimonials, FAQ, CTA)
- [ ] About page (story, mission, team)
- [ ] Contact page (form, support email)
- [ ] Dark mode styling

**Create Documentation:**
- [ ] Help Center with articles:
  - Getting Started
  - Onboarding Guide
  - Adding Vehicles
  - Managing Inquiries
  - Setting Up Domain
  - Facebook Integration
  - Billing & Subscription
  - Troubleshooting
- [ ] Include screenshots and step-by-step instructions
- [ ] Or use external service (Intercom, Help Scout, Notion)

**Set Up Email Templates:**
- [ ] Create branded templates in Resend:
  - Welcome email
  - Onboarding completion
  - New inquiry notification
  - Appointment confirmation/reminder
  - Payment confirmation/failed
  - Subscription canceled
  - Weekly summary report

**Database Backups:**
- [ ] Enable automatic backups in Supabase (daily, 30 day retention)
- [ ] Enable point-in-time recovery
- [ ] Test restore process
- [ ] Create manual backup script
- [ ] Schedule with cron

**Final Deployment Checklist:**
- [ ] No console.logs in production
- [ ] No commented-out code
- [ ] All TODOs resolved
- [ ] All TypeScript errors fixed
- [ ] All ESLint warnings resolved
- [ ] Code formatted (Prettier)
- [ ] All environment variables set correctly
- [ ] Production API keys only
- [ ] Main app domain configured
- [ ] SSL certificate active
- [ ] DNS propagated
- [ ] All redirects working
- [ ] Stripe webhook configured
- [ ] Resend domain verified
- [ ] Twilio phone verified (if used)
- [ ] Facebook app approved
- [ ] Sentry configured
- [ ] Analytics configured
- [ ] All migrations run
- [ ] RLS policies active
- [ ] Backups enabled
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] Help documentation ready
- [ ] Email templates created
- [ ] All user flows tested
- [ ] Payment flow tested with real card
- [ ] Mobile responsive verified
- [ ] Cross-browser tested
- [ ] **Dark mode tested on all pages and devices**
- [ ] **All templates tested in dark mode**

**Deploy to Production:**
- [ ] Deploy to Vercel
- [ ] Smoke test all critical paths
- [ ] Monitor error logs
- [ ] Monitor performance
- [ ] Ready to accept users! 🎉

**Post-Launch Tasks:**

**Immediate (Day 1):**
- [ ] Monitor error logs closely
- [ ] Watch for critical issues
- [ ] Be ready for quick fixes
- [ ] Monitor server resources
- [ ] Check email deliverability

**First Week:**
- [ ] Gather user feedback
- [ ] Fix any bugs found
- [ ] Monitor conversion rates
- [ ] Track key metrics (signups, onboarding completion, activation, subscription conversion)
- [ ] Start marketing efforts

**First Month:**
- [ ] Analyze usage patterns
- [ ] Identify drop-off points
- [ ] Plan improvements
- [ ] Build roadmap for features
- [ ] Consider customer interviews

**Marketing Launch Plan:**

**Pre-Launch:**
- [ ] Create social media accounts
- [ ] Build email list (landing page)
- [ ] Create demo video
- [ ] Prepare launch announcement
- [ ] Reach out to potential beta users

**Launch Day:**
- [ ] Post on Product Hunt
- [ ] Post on social media
- [ ] Email launch announcement
- [ ] Post in relevant communities (Reddit, Indie Hackers, Hacker News)
- [ ] Reach out to car dealer communities
- [ ] Press release (optional)

**Post-Launch:**
- [ ] Content marketing (blog posts)
- [ ] SEO optimization
- [ ] Google/Facebook Ads (optional)
- [ ] Referral program (future)
- [ ] Partnership outreach

### Files Created:
- `app/page.tsx` (landing page)
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/cookies/page.tsx`
- `app/help/page.tsx`
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `scripts/backup-db.sh`
- `docs/DEPLOYMENT.md`
- `docs/TROUBLESHOOTING.md`

### Done When:
- Production environment configured
- All testing complete
- Security audit passed
- Monitoring active
- Legal pages published
- Help documentation ready
- Marketing site live (if applicable)
- Email templates created
- Backups enabled
- Final deployment checklist complete
- **LIVE IN PRODUCTION** 🚀
- No critical errors
- Users can sign up successfully
- Payment processing works
- All core features functional
- **Dark mode works perfectly everywhere**

---


## 📝 Quick Reference

### When Starting a New Phase:

1. **Read the phase goal**
2. **Review all tasks**
3. **Check "Done When" criteria**
4. **Start first task**
5. **Work through tasks in order**
6. **Test as you go**
7. **Check off completed tasks**
8. **Verify "Done When" before moving on**
9. **Update progress tracker**
10. **Celebrate completion!** 🎉

### When You Get Stuck:

1. **Check the error message carefully**
2. **Google the specific error**
3. **Check official documentation**
4. **Review similar code in the guide**
5. **Simplify and test in isolation**
6. **Ask for help with context**

### Remember:

- ✅ One phase at a time
- ✅ One task at a time
- ✅ Test frequently
- ✅ Commit often
- ✅ Progress > Perfection
- ✅ Progress < Perfection

---



**Total Phases:** 15 phases (Phase 0 through Phase 15)

**What You're Building:**
- Multi-tenant SaaS platform
- 4-layer architecture (Auth, Setup, Dashboard, Showroom)
- Complete inventory management
- Smart lead management with automation
- Appointment booking system
- Facebook Marketplace integration
- Mobile-optimized with push notifications
- Stripe payment processing
- Analytics and reporting
- Custom domain support
- **Full dark mode support throughout**
- **5 customizable showroom templates**
- **User-controlled dark mode preferences**
- Production-ready and scalable


---

