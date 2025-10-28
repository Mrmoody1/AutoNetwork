

THIS IS A PLANNED TREE 
IT DOES NOT STATE IF FILES ARE MADE OR NOT, DO NOT ASSUME

-----------------------------------------------------------------------------------------------------------


Complete File Tree - Car Dealer Management SaaS

```
car-dealer-saas/
├── 📁src/                              
│   │
│   ├── 📁app/                         
│   │   │
│   │   ├── 📁(auth)/                   # LAYER 1: Authentication
│   │   │   ├── 📁login/
│   │   │   │   └── page.tsx
│   │   │   ├── 📁register/
│   │   │   │   └── page.tsx
│   │   │   ├── 📁forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx            # Auth layout (no sidebar)
│   │   │
│   │   ├── 📁setup/                    # LAYER 2: Onboarding Wizard
│   │   │   ├── 📁business-info/
│   │   │   │   └── page.tsx          # Step 1: Business details
│   │   │   ├── 📁branding/
│   │   │   │   └── page.tsx          # Step 2: Logo, colors, template
│   │   │   ├── 📁domain/
│   │   │   │   └── page.tsx          # Step 3: Domain & Google Business
│   │   │   ├── 📁preview/
│   │   │   │   └── page.tsx          # Step 4: Preview & Go Live
│   │   │   └── layout.tsx            # Setup layout (with progress sidebar)
│   │   │
│   │   ├── 📁(dashboard)/              # LAYER 3: Admin Dashboard
│   │   │   ├── page.tsx              # Dashboard home/overview
│   │   │   │
│   │   │   ├── 📁cars/                 # Vehicle Management
│   │   │   │   ├── page.tsx          # All vehicles
│   │   │   │   ├── 📁add/
│   │   │   │   │   └── page.tsx      # Add vehicle
│   │   │   │   └── 📁[id]/
│   │   │   │       └── page.tsx      # Edit vehicle
│   │   │   │
│   │   │   ├── 📁inquiries/            # Customer Inquiries
│   │   │   │   ├── 📁page.tsx          # All inquiries
│   │   │   │   └── 📁[id]/
│   │   │   │       └── page.tsx      # Inquiry details
│   │   │   │
│   │   │   ├── 📁appointments/         # Appointment Booking
│   │   │   │   └── page.tsx          # Calendar view
│   │   │   │
│   │   │   ├── 📁analytics/            # Analytics & Reports
│   │   │   │   └── page.tsx          # Analytics dashboard
│   │   │   │
│   │   │   ├── 📁billing/              # Billing & Subscription
│   │   │   │   └── page.tsx          # Stripe billing
│   │   │   │
│   │   │   ├── 📁settings/             # Settings
│   │   │   │   ├── 📁account/
│   │   │   │   │   └── page.tsx      # Account settings
│   │   │   │   ├── 📁branding/
│   │   │   │   │   └── page.tsx      # Branding settings
│   │   │   │   ├── 📁notifications/
│   │   │   │   │   └── page.tsx      # Notification preferences
│   │   │   │   ├── integrations/
│   │   │   │   │   └── page.tsx      # Facebook, Google Business
│   │   │   │   ├── 📁security/
│   │   │   │   │   └── page.tsx      # Password, 2FA
│   │   │   │   └── layout.tsx        # Settings layout (tabbed)
│   │   │   │
│   │   │   ├── 📁website/              # Website Management
│   │   │   │   └── 📁domain/
│   │   │   │       └── page.tsx      # Custom domain setup
│   │   │   │
│   │   │   └── layout.tsx            # Dashboard layout (with sidebar)
│   │   │
│   │   ├── 📁showroom/                 # LAYER 4: Public Showroom
│   │   │   ├── 📁[dealerSlug]/
│   │   │   │   ├── page.tsx          # Showroom home
│   │   │   │   ├── 📁inventory/
│   │   │   │   │   └── page.tsx      # Browse inventory
│   │   │   │   ├── 📁car/
│   │   │   │   │   └── 📁[id]/
│   │   │   │   │       └── page.tsx  # Vehicle detail
│   │   │   │   ├── 📁about/
│   │   │   │   │   └── page.tsx      # About dealer
│   │   │   │   ├── 📁contact/
│   │   │   │   │   └── page.tsx      # Contact page
│   │   │   │   └── layout.tsx        # Public layout (header/footer)
│   │   │   └── page.tsx              # Showroom redirect/404
│   │   │
│   │   ├── 📁api/                      # API Routes
│   │   │   ├── 📁setup/
│   │   │   │   └── 📁complete/
│   │   │   │       └── route.ts      # Complete onboarding
│   │   │   │
│   │   │   ├── 📁vehicles/
│   │   │   │   ├── 📁route.ts          # GET, POST vehicles
│   │   │   │   ├── 📁[id]/
│   │   │   │   │   └── route.ts      # GET, PATCH, DELETE vehicle
│   │   │   │   └── 📁upload/
│   │   │   │       └── route.ts      # Photo upload
│   │   │   │
│   │   │   ├── 📁inquiries/
│   │   │   │   ├── 📁route.ts          # POST inquiry
│   │   │   │   └── 📁[id]/
│   │   │   │       └── 📁route.ts      # GET, PATCH inquiry
│   │   │   │
│   │   │   ├── 📁appointments/
│   │   │   │   ├── 📁route.ts          # GET, POST appointments
│   │   │   │   ├── 📁[id]/
│   │   │   │   │   └── route.ts      # GET, PATCH, DELETE
│   │   │   │   └── 📁available-slots/
│   │   │   │       └── route.ts      # Get available slots
│   │   │   │
│   │   │   ├── 📁follow-ups/
│   │   │   │   ├── 📁schedule/
│   │   │   │   │   └── route.ts      # Schedule follow-ups
│   │   │   │   └── 📁send/
│   │   │   │       └── route.ts      # Send follow-ups (cron)
│   │   │   │
│   │   │   ├── 📁analytics/
│   │   │   │   └── route.ts          # Get analytics data
│   │   │   │
│   │   │   ├── 📁facebook/
│   │   │   │   ├── connect/
│   │   │   │   │   └── route.ts      # OAuth connection
│   │   │   │   ├── post/
│   │   │   │   │   └── route.ts      # Post vehicle
│   │   │   │   ├── update/
│   │   │   │   │   └── route.ts      # Update post
│   │   │   │   ├── delete/
│   │   │   │   │   └── route.ts      # Delete post
│   │   │   │   └── sync-all/
│   │   │   │       └── route.ts      # Bulk sync
│   │   │   │
│   │   │   ├── 📁domain/
│   │   │   │   ├── add/
│   │   │   │   │   └── route.ts      # Add custom domain
│   │   │   │   ├── verify/
│   │   │   │   │   └── route.ts      # Verify domain
│   │   │   │   └── remove/
│   │   │   │       └── route.ts      # Remove domain
│   │   │   │
│   │   │   ├── 📁checkout/
│   │   │   │   └── route.ts          # Stripe checkout
│   │   │   │
│   │   │   ├── 📁billing/
│   │   │   │   └── portal/
│   │   │   │       └── route.ts      # Stripe portal
│   │   │   │
│   │   │   ├── 📁notifications/
│   │   │   │   ├── 📁subscribe/
│   │   │   │   │   └── route.ts      # Push subscription
│   │   │   │   └── 📁send/
│   │   │   │       └── route.ts      # Send notification
│   │   │   │
│   │   │   ├── 📁reminders/
│   │   │   │   └── route.ts          # Appointment reminders (cron)
│   │   │   │
│   │   │   └──📁webhooks/
│   │   │       └── 📁stripe/
│   │   │           └── route.ts      # Stripe webhook handler
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   ├── 📁about/
│   │   │   └── page.tsx              # About page
│   │   ├── 📁contact/
│   │   │   └── page.tsx              # Contact page
│   │   ├── 📁privacy/
│   │   │   └── page.tsx              # Privacy policy
│   │   ├── 📁terms/
│   │   │   └── page.tsx              # Terms of service
│   │   ├── 📁cookies/
│   │   │   └── page.tsx              # Cookie policy
│   │   ├── 📁help/
│   │   │   └── page.tsx              # Help center
│   │   ├── sitemap.ts                # Sitemap generation
│   │   ├── robots.ts                 # Robots.txt
│   │   ├── globals.css               # Global styles
│   │   └── error.tsx                 # Error page
│   │
│   ├── 📁components/                   # React Components
│   │   │
│   │   ├── 📁layout/                   # Layout components by layer
│   │   │   │
│   │   │   ├── 📁setup/                # Layer 2 layouts
│   │   │   │   ├── SetupSidebar.tsx
│   │   │   │   ├── SetupHeader.tsx
│   │   │   │   └── SetupProgressBar.tsx
│   │   │   │
│   │   │   ├── 📁dashboard/            # Layer 3 layouts
│   │   │   │   ├── DashboardSidebar.tsx
│   │   │   │   └── DashboardHeader.tsx
│   │   │   │
│   │   │   └── 📁public/               # Layer 4 layouts
│   │   │       ├── PublicHeader.tsx
│   │   │       └── PublicFooter.tsx
│   │   │
│   │   ├── 📁features/                 # Feature-specific components
│   │   │   │
│   │   │   ├── 📁auth/                 # Layer 1 components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   │
│   │   │   ├── 📁setup/                # Layer 2 components
│   │   │   │   ├── BusinessInfoForm.tsx
│   │   │   │   ├── BrandingForm.tsx
│   │   │   │   ├── ColorPicker.tsx
│   │   │   │   ├── TemplateSelector.tsx
│   │   │   │   ├── DomainSelector.tsx
│   │   │   │   ├── DNSInstructions.tsx
│   │   │   │   ├── GoogleBusinessGuide.tsx
│   │   │   │   └── ShowroomPreview.tsx
│   │   │   │
│   │   │   ├── 📁cars/                 # Layer 3 - Vehicles
│   │   │   │   ├── VehicleCard.tsx
│   │   │   │   ├── VehicleForm.tsx
│   │   │   │   ├── VehicleList.tsx
│   │   │   │   ├── VehicleGrid.tsx
│   │   │   │   ├── FilterBar.tsx
│   │   │   │   └── PhotoUpload.tsx
│   │   │   │
│   │   │   ├── 📁inquiries/            # Layer 3 - Inquiries
│   │   │   │   ├── InquiryCard.tsx
│   │   │   │   ├── InquiryList.tsx
│   │   │   │   ├── InquiryDetails.tsx
│   │   │   │   ├── QuickReplyForm.tsx
│   │   │   │   └── LeadScoreBadge.tsx
│   │   │   │
│   │   │   ├── 📁appointments/         # Layer 3 - Appointments
│   │   │   │   ├── Calendar.tsx
│   │   │   │   ├── AppointmentDetail.tsx
│   │   │   │   ├── AppointmentCard.tsx
│   │   │   │   └── RescheduleModal.tsx
│   │   │   │
│   │   │   ├── 📁analytics/            # Layer 3 - Analytics
│   │   │   │   ├── StatsCard.tsx
│   │   │   │   ├── InquiryChart.tsx
│   │   │   │   ├── VehicleStatusChart.tsx
│   │   │   │   ├── TopVehiclesTable.tsx
│   │   │   │   ├── DateRangePicker.tsx
│   │   │   │   └── ExportButton.tsx
│   │   │   │
│   │   │   ├── 📁billing/              # Layer 3 - Billing
│   │   │   │   ├── UpgradeBanner.tsx
│   │   │   │   ├── PlanCard.tsx
│   │   │   │   ├── PaymentMethodCard.tsx
│   │   │   │   └── InvoiceTable.tsx
│   │   │   │
│   │   │   ├── 📁settings/             # Layer 3 - Settings
│   │   │   │   ├── AccountSettings.tsx
│   │   │   │   ├── BrandingSettings.tsx
│   │   │   │   ├── NotificationSettings.tsx
│   │   │   │   └── SecuritySettings.tsx
│   │   │   │
│   │   │   ├── 📁facebook/             # Facebook Integration
│   │   │   │   ├── ConnectButton.tsx
│   │   │   │   ├── SyncStatus.tsx
│   │   │   │   └── SyncAllButton.tsx
│   │   │   │
│   │   │   ├── 📁domain/               # Domain Management
│   │   │   │   ├── DNSInstructions.tsx
│   │   │   │   ├── DomainVerification.tsx
│   │   │   │   └── RegistrarGuides.tsx
│   │   │   │
│   │   │   ├── 📁mobile/               # Mobile Features
│   │   │   │   ├── QuickActions.tsx
│   │   │   │   ├── QuickReplyModal.tsx
│   │   │   │   └── SwipeableInquiryCard.tsx
│   │   │   │
│   │   │   └── 📁showroom/             # Layer 4 components
│   │   │       ├── PublicCarCard.tsx
│   │   │       ├── CarDetailView.tsx
│   │   │       ├── PhotoGallery.tsx
│   │   │       ├── FilterSidebar.tsx
│   │   │       ├── ContactForm.tsx
│   │   │       ├── BookingWidget.tsx
│   │   │       └── ContactSection.tsx
│   │   │
│   │   └── 📁ui/                       # Shared UI components (shadcn/ui)
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── select.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── tabs.tsx
│   │       ├── label.tsx
│   │       ├── badge.tsx
│   │       ├── toast.tsx
│   │       ├── Toast.tsx             # Custom toast provider
│   │       ├── LoadingState.tsx      # Custom loading
│   │       ├── EmptyState.tsx        # Custom empty state
│   │       └── ConfirmDialog.tsx     # Custom confirm dialog
│   │
│   ├── 📁stores/                       # Zustand State Management
│   │   ├── authStore.ts              # Authentication state
│   │   ├── onboardingStore.ts        # Setup wizard state
│   │   ├── dashboardStore.ts         # Dashboard UI state
│   │   └── customerSiteStore.ts      # Public site state
│   │
│   ├── 📁lib/                          # Library configurations
│   │   ├── supabase.ts               # Supabase client
│   │   ├── prisma.ts                 # Prisma client
│   │   ├── queryClient.ts            # TanStack Query client
│   │   ├── stripe.ts                 # Stripe client
│   │   ├── resend.ts                 # Resend client
│   │   ├── twilio.ts                 # Twilio client
│   │   ├── facebook.ts               # Facebook API
│   │   ├── vercel.ts                 # Vercel API
│   │   ├── push-notifications.ts     # Web push
│   │   ├── templates.ts              # Template system
│   │   ├── leadScoring.ts            # Lead scoring logic
│   │   ├── emailSequences.ts         # Email sequences
│   │   ├── featureGates.ts           # Feature gates
│   │   └── constants.ts              # App constants
│   │
│   ├── 📁services/                     # Business logic layer
│   │   ├── authService.ts            # Authentication operations
│   │   ├── dealerService.ts          # Dealer management
│   │   ├── vehicleService.ts         # Vehicle CRUD
│   │   ├── inquiryService.ts         # Inquiry handling
│   │   ├── appointmentService.ts     # Appointment management
│   │   ├── analyticsService.ts       # Analytics data
│   │   ├── subscriptionService.ts    # Stripe subscriptions
│   │   ├── facebookService.ts        # Facebook Marketplace
│   │   ├── domainService.ts          # Domain management
│   │   └── emailService.ts           # Email sending
│   │
│   ├── 📁hooks/                        # Custom React hooks
│   │   ├── useAuth.ts                # Authentication
│   │   ├── useDealer.ts              # Current dealer
│   │   ├── useVehicles.ts            # Vehicles data
│   │   ├── useInquiries.ts           # Inquiries data
│   │   ├── useAppointments.ts        # Appointments data
│   │   ├── useAnalytics.ts           # Analytics data
│   │   └── useFacebook.ts            # Facebook integration
│   │
│   ├── 📁types/                        # TypeScript type definitions
│   │   ├── auth.ts                   # Auth types
│   │   ├── dealer.ts                 # Dealer types
│   │   ├── vehicle.ts                # Vehicle types
│   │   ├── customer.ts               # Customer types
│   │   ├── inquiry.ts                # Inquiry types
│   │   ├── appointment.ts            # Appointment types
│   │   ├── subscription.ts           # Subscription types
│   │   ├── analytics.ts              # Analytics types
│   │   └── api.ts                    # API response types
│   │
│   ├── 📁utils/                        # Utility functions
│   │   ├── formatting.ts             # Date, currency formatting
│   │   ├── validation.ts             # Form validation
│   │   └── helpers.ts                # General helpers
│   │
│   └── 📁styles/                       # Styles
│       └── globals.css               # Global styles
│
├── 📁prisma/                           # Prisma ORM
│   ├── schema.prisma                 # Database schema
│   └── migrations/                   # Database migrations
│
├── 📁public/                           # Static assets
│   ├── sw.js                         # Service worker (push notifications)
│   ├── icon-192.png                  # App icon
│   ├── badge-72.png                  # Badge icon
│   └── assets/
│       ├── logo.svg
│       └── icons/
│
├── 📁scripts/                          # Utility scripts
│   └── backup-db.sh                  # Database backup script
│
├── 📁docs/                             # Documentation
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── TROUBLESHOOTING.md            # Troubleshooting guide
│
├── .env.local                        # Environment variables (not in git)
├── .env.example                      # Example env file
├── .gitignore                        # Git ignore rules
├── middleware.ts                     # Next.js middleware (auth)
├── next.config.js                    # Next.js configuration
├── tailwind.config.js                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies
├── package-lock.json                 # Lock file
├── vercel.json                       # Vercel config (cron jobs)
├── sentry.client.config.ts           # Sentry client config
├── sentry.server.config.ts           # Sentry server config
└── README.md                         # Project documentation
```

