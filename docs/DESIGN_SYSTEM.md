# Car Dealer SaaS - Design System
**Version:** 2.0  
**Last Updated:** October 29, 2025  
**Design Style:** Minimal Professional (Variation 4)

---

## 🎨 DESIGN PHILOSOPHY

### Core Principles
1. **Minimal but Professional** - Clean, functional, business-appropriate
2. **Soft Colors** - Easy on the eyes, not aggressive
3. **Subtle Depth** - Gentle gradients and shadows, no overwhelming effects
4. **Mobile-First** - Works perfectly on phones (dealers on the go)
5. **Fast & Lightweight** - No bloat, quick loading
6. **Accessible** - Proper contrast, readable text

### Design Inspiration
- **Like:** Linear, Notion, Professional SaaS dashboards
- **Unlike:** Flashy, over-animated, aggressive designs
- **Vibe:** Clean business software that's easy to use

---

## 🎨 COLOR PALETTE

### Primary Colors

```
Primary Blue
├── 50:  #EFF6FF  (very light backgrounds)
├── 100: #DBEAFE  (hover states)
├── 200: #BFDBFE  
├── 300: #93C5FD  
├── 400: #60A5FA  
├── 500: #3498db  ⭐ MAIN (buttons, active states, accents)
├── 600: #2980b9  (button hover)
├── 700: #2574a9  (active states)
└── 800: #1f5f8b  (dark blue)
```

**When to use:**
- Active navigation items
- Primary buttons
- Links and interactive elements
- Progress indicators
- Focus states

---

### Neutral Colors (Cool Grays)

```
Slate/Gray Tones
├── 50:  #f8f9fa  ⭐ (page backgrounds - light)
├── 100: #f1f3f5  (card backgrounds)
├── 200: #e9ecef  (borders)
├── 300: #dee2e6  (disabled states)
├── 400: #ced4da  (placeholder text)
├── 500: #adb5bd  (secondary text)
├── 600: #6c757d  ⭐ (body text)
├── 700: #495057  (headings)
├── 800: #343a40  (dark headings)
└── 900: #212529  (primary dark text)

Dark Mode Tones
├── Base: #1a1d23  ⭐ (main background)
├── Card: #1f2329  (elevated surfaces)
├── Border: #2a2d35  (dividers)
└── Sidebar: #252930  (navigation)
```

**When to use:**
- Body text (#6c757d)
- Headings (#495057, #343a40)
- Backgrounds (#f8f9fa, #f1f3f5)
- Borders (#e9ecef)
- Dark mode backgrounds

---

### Sidebar Color

```
Dark Slate (Sidebar)
└── #2c3e50  ⭐ MAIN sidebar background
    - Professional dark blue-gray
    - Works in both light and dark mode
    - Good contrast with white text
```

---

### Semantic Colors

```
Success Green
├── Light: #d4edda
├── Main:  #2ecc71  ⭐ (success actions)
└── Dark:  #16a085  (teal green)

Warning Orange
├── Light: #fff3cd
├── Main:  #e67e22  ⭐ (warnings, pending)
└── Dark:  #d35400

Danger Red
├── Light: #f8d7da
├── Main:  #e74c3c  ⭐ (errors, delete)
└── Dark:  #c0392b

Info/Accent Purple
├── Light: #e8daef
├── Main:  #9b59b6  ⭐ (info, accents)
└── Dark:  #8e44ad
```

---

## 📐 LAYOUT SYSTEM

### Dashboard Layout
```
┌─────────────────────────────────────────┐
│         Header (64px)                   │ ← Account dropdown here
├────────┬────────────────────────────────┤
│        │                                │
│ Side   │    Main Content                │
│ bar    │    (max 1280px centered)       │
│ 256px  │                                │
│        │                                │
└────────┴────────────────────────────────┘
```

### Background

**Light Mode:**
```css
background: linear-gradient(to bottom, #f0f4f8 0%, #e8eef5 100%);

/* Subtle radial accents */
radial-gradient(at 15% 25%, rgba(52, 152, 219, 0.08) 0%, transparent 50%),
radial-gradient(at 85% 75%, rgba(155, 89, 182, 0.06) 0%, transparent 50%)
```

**Dark Mode:**
```css
background: linear-gradient(to bottom, #1a1d23 0%, #1f2329 100%);

/* Subtle radial accents */
radial-gradient(at 15% 25%, rgba(52, 152, 219, 0.06) 0%, transparent 50%),
radial-gradient(at 85% 75%, rgba(155, 89, 182, 0.05) 0%, transparent 50%)
```

---

## 🧭 SIDEBAR DESIGN (LEFT NAVIGATION)

### Structure
```
Width: 256px (16rem)
Background: #2c3e50
Position: Fixed left
Height: 100vh
```

### Top Section
```
Logo/Branding:
├── Padding: 24px 16px
├── Border-bottom: 1px solid rgba(255,255,255,0.1)
└── Content: Logo + Business name
```

### Navigation Items
```
┌─────────────────────────┐
│ icon-Dashboard          │
│ icon-Inventory          │
│ icon-Customers          │
│ icon-Calendar           │
│ icon-Messages           │
│ icon-Analytics          │
│ icon-Settings           │
└─────────────────────────┘
```

**Default State:**
```
Background: transparent
Text: white (opacity 0.8)
Icon: white (opacity 0.8)
Padding: 12px 16px
Border-radius: 8px
Font: 14px Medium
```

**Hover State:**
```
Background: rgba(255,255,255,0.1)
Text: white (opacity 1)
Icon: white (opacity 1)
Transition: 150ms ease
```

**Active State:**
```
Background: #3498db (primary blue)
Text: white
Icon: white
Font-weight: 600
```

---

## 🎯 HEADER DESIGN (TOP BAR)

### Structure
```
Height: 64px
Background: white (light) / #1f2329 (dark)
Border-bottom: 1px solid #e9ecef (light) / #2a2d35 (dark)
Padding: 0 32px
Position: Fixed top
Width: calc(100% - 256px)
Margin-left: 256px
```

### Layout
```
┌──────────────────────────────────────────────────────┐
│  Page Title         [🌙] [🔔] [👤 Mike ▾]           │
└──────────────────────────────────────────────────────┘
    Left side          Right side →
```

### Left Side
```
Page Title:
├── Font: 24px Semibold
├── Color: #343a40 (light) / white (dark)
└── Breadcrumbs (optional): 14px, secondary color
```

### Right Side (Account Bar)

**Dark Mode Toggle:**
```
Position: Right side, before notifications
Size: 40px × 40px
Icon: Sun (light mode) / Moon (dark mode)
Background: transparent
Hover: #f1f3f5 (light) / rgba(255,255,255,0.1) (dark)
Border-radius: 8px
Color: #6c757d (light) / rgba(255,255,255,0.7) (dark)
Active: #3498db background, white icon
```

**Notifications Bell:**
```
Position: Right side, before profile
Size: 40px × 40px
Icon: Bell (20px)
Background: transparent
Hover: #f1f3f5 (light) / rgba(255,255,255,0.1) (dark)
Border-radius: 8px
Badge: Red dot for unread (8px circle, top-right)
```

**Profile Dropdown:**
```
Trigger:
├── Avatar: 32px circle (left)
├── Name: 14px Medium, truncate at 150px
├── Chevron: down icon (12px, right)
├── Padding: 8px 12px
├── Border-radius: 8px
├── Hover: #f1f3f5 (light) / rgba(255,255,255,0.1) (dark)
└── Gap: 8px between elements

Dropdown Menu:
├── Position: Absolute, top-right
├── Width: 200px
├── Background: white (light) / #1f2329 (dark)
├── Border: 1px solid #e9ecef (light) / #2a2d35 (dark)
├── Border-radius: 8px
├── Shadow: lg
├── Padding: 8px
└── Items:
    ├── Profile Settings
    ├── Billing & Subscription
    ├── Help & Support
    ├── Separator (1px border)
    └── Sign Out (red text)

Menu Item Style:
├── Padding: 8px 12px
├── Border-radius: 6px
├── Font: 14px Regular
├── Color: #495057 (light) / rgba(255,255,255,0.8) (dark)
├── Hover: #f1f3f5 (light) / rgba(255,255,255,0.1) (dark)
├── Icon: 16px (left, 8px gap)
└── Transition: 150ms ease
```

---

## 🔤 TYPOGRAPHY

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', 'Roboto', sans-serif;
```

### Font Sizes
```
H1 (Page titles): 24px Semibold
H2 (Section headers): 20px Semibold
H3 (Card titles): 18px Semibold
Body (Default): 16px Regular ⭐
Body Small: 14px Regular
Caption/Label: 12px Medium
```

### Font Weights
- **400** - Regular (body text) ⭐
- **500** - Medium (labels)
- **600** - Semibold (headings) ⭐
- **700** - Bold (emphasis)

---

## 📏 SPACING SYSTEM

```
2:   8px    (0.5rem)  ⭐ (tight spacing)
3:   12px   (0.75rem)
4:   16px   (1rem)    ⭐ (default spacing)
6:   24px   (1.5rem)  ⭐ (card padding)
8:   32px   (2rem)    (section gaps)
12:  48px   (3rem)    (large gaps)
```

---

## 🎨 COMPONENT STYLES

### Buttons

**Primary Button**
```
Background: #3498db
Text: white
Hover: #2980b9
Padding: 12px 24px
Border-radius: 8px
Font: 14px Medium
Shadow: sm
Transition: 150ms ease
```

**Secondary Button**
```
Background: #f1f3f5 (light) / #2a2d35 (dark)
Text: #495057 (light) / white (dark)
Border: 1px solid #dee2e6 (light) / #2a2d35 (dark)
Hover: #e9ecef (light) / #343a40 (dark)
Same sizing as primary
```

**Danger Button**
```
Background: #e74c3c
Text: white
Hover: #c0392b
Same styling as Primary
```

---

### Cards

**Standard Card**
```
Background: white (light) / #1f2329 (dark)
Border: 1px solid #e9ecef (light) / #2a2d35 (dark)
Border-radius: 12px
Padding: 24px
Shadow: sm
Hover: shadow-md transition
```

**Stats Card**
```
Same as standard card
Add:
├── Icon: 48px with colored background
├── Value: 36px Bold
├── Label: 14px Regular, secondary color
└── Optional badge or trend indicator
```

---

### Input Fields

**Text Input**
```
Border: 1px solid #dee2e6
Background: white (light) / #252930 (dark)
Padding: 12px 16px
Border-radius: 8px
Font: 16px Regular

Focus:
├── Border: #3498db (2px)
├── Ring: rgba(52, 152, 219, 0.25) (4px)
└── Outline: none
```

---

### Badges

**Status Badge**
```
Padding: 4px 12px
Border-radius: 6px (md, not full)
Font: 12px Medium

Available (Green):
├── Background: #d4edda
└── Text: #16a085

Pending (Orange):
├── Background: #fff3cd
└── Text: #d35400

Sold (Gray):
├── Background: #e9ecef
└── Text: #6c757d
```

---

## 🎭 SHADOWS & EFFECTS

### Shadow Scale
```
sm:   0 1px 2px 0 rgba(0, 0, 0, 0.05)
md:   0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1)
```

### Border Radius
```
DEFAULT: 8px  ⭐ (buttons, inputs)
lg:      12px ⭐ (cards)
```

---

## 🎬 ANIMATIONS

### Timing
```
Fast:    150ms (hover states) ⭐
Normal:  200ms (default)
Slow:    300ms (modals)
```

### Easing
```
ease-out: cubic-bezier(0, 0, 0.2, 1) ⭐ (most common)
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
sm:  640px   (small tablets)
md:  768px   ⭐ (tablets)
lg:  1024px  ⭐ (laptops)
xl:  1280px  ⭐ (desktops)
```

---

## 🔣 ICON LIBRARY

### Icon Library
**Use:** Lucide React

### Icon Sizes
```
Small: 16px (inline, dropdown menus)
Default: 20px ⭐ (buttons, nav)
Medium: 24px (cards, features)
Large: 48px (stat cards, empty states)
```

### Icon Style
```
Stroke width: 2px
Style: Outline (not filled)
Color: Inherit from parent
```

---

## 🌙 DARK MODE

### Toggle Location
**Position:** Header, right side (before notifications)

### Color Overrides (Dark Mode)
```
Background: #1a1d23 → #1f2329 gradient
Cards: #1f2329
Text Primary: white
Text Secondary: rgba(255,255,255,0.7)
Borders: #2a2d35
Sidebar: #252930 (slightly lighter than main bg)
Header: #1f2329
```

### Usage
```jsx
<div className="bg-white dark:bg-[#1f2329]">
<p className="text-slate-700 dark:text-white">
```

---

## ✅ DESIGN CHECKLIST

**Before Coding Any Page:**
- [ ] Uses correct color palette (#3498db, #2c3e50, etc.)
- [ ] LEFT sidebar (256px) with navigation
- [ ] Header with account dropdown (top-right)
- [ ] Dark mode toggle in header
- [ ] Proper hover states (150ms transition)
- [ ] Cards have subtle shadows
- [ ] Border radius: 8px (inputs/buttons), 12px (cards)
- [ ] Dark mode works correctly

---

## 🎯 QUICK REFERENCE

### Most Used Values
```
Primary Color: #3498db
Sidebar Color: #2c3e50
Text Color: #6c757d (light) / white (dark)
Background: #f8f9fa (light) / #1a1d23 (dark)
Border: #e9ecef (light) / #2a2d35 (dark)
Border Radius: 8px (inputs), 12px (cards)
Padding: 24px (cards), 12px 16px (inputs)
Gap: 16px (components), 24px (sections)
Shadow: sm (default), md (hover)
Transition: 150ms ease-out
Font: 16px Regular (body), 14px Medium (labels)
Icon Size: 20px (default)
Sidebar Width: 256px
Header Height: 64px
```

---

**This design system matches Variation 4 - Minimal Professional exactly.**

*Keep it minimal. Keep it professional. Keep it functional.*
