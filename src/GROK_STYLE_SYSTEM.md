# 🎨 Grok Style System - Applied to CIELO Agency

## Overview
This document outlines the complete Grok-style design system now applied across the CIELO Agency dashboard. The system prioritizes **sharp edges**, **monospaced details**, **pure black backgrounds**, and **orange accents**.

---

## 🎯 Core Design Principles

### 1. **Sharp Frames (No Rounded Corners)**
- ❌ No `rounded-lg`, `rounded-xl`, `rounded-md` 
- ✅ Use sharp edges by default (`border-radius: 0`)
- ⚠️ Exception: Small UI elements like dots, avatars can use `rounded-full`

### 2. **Pure Black Aesthetic**
- Background: `#000000` (pure black)
- Panels: `#0a0a0a` (subtle elevation)
- No grays for backgrounds

### 3. **Orange as Primary Accent**
- Primary: `#f97316` (orange-500)
- Hover: `#ea580c` (orange-600)
- Used for: CTAs, active states, highlights

### 4. **Monospaced Typography for Data**
- Use `JetBrains Mono` for: labels, metadata, code, numbers
- Use `Inter/Space Grotesk` for: headings, body text

---

## 🎨 Color Palette

```css
/* Core Colors */
--color-obsidian: #000000;      /* Pure black background */
--color-surface: #000000;        /* Same as obsidian */
--color-panel: #0a0a0a;          /* Panel backgrounds */
--color-border: #27272a;         /* zinc-800 - Borders */
--color-dim: #71717a;            /* zinc-500 - Tertiary text */
--color-muted: #a1a1aa;          /* zinc-400 - Secondary text */
--color-text: #e5e5e5;           /* Primary text */
--color-orange-500: #f97316;     /* Primary accent */
--color-orange-600: #ea580c;     /* Hover accent */
```

### Usage Guidelines

| Element | Color | Tailwind Class |
|---------|-------|----------------|
| Background | #000000 | `bg-black` |
| Panels | #0a0a0a | `bg-[#0a0a0a]` |
| Borders | #27272a | `border-[#27272a]` |
| Primary Text | #e5e5e5 | `text-[#e5e5e5]` |
| Secondary Text | #a1a1aa | `text-[#a1a1aa]` |
| Tertiary Text | #71717a | `text-[#71717a]` |
| CTA/Active | #f97316 | `bg-[#f97316]` |
| Hover | #ea580c | `hover:bg-[#ea580c]` |

---

## 📐 Typography Scale

### Font Families
```css
/* Sans-serif (Headings & Body) */
font-family: 'Inter', 'Space Grotesk', sans-serif;

/* Monospace (Data & Labels) */
font-family: 'JetBrains Mono', monospace;
```

### Font Sizes & Usage

| Element | Size | Weight | Tracking | Use Case |
|---------|------|--------|----------|----------|
| **Hero Heading** | 4xl-6xl | 500 | -0.05em | Main page titles |
| **Section Heading** | 2xl | 500 | -0.025em | Section titles |
| **Subheading** | lg-xl | 300 | 0 | Excerpts, subtitles |
| **Body Text** | base (16px) | 300 | 0 | Paragraphs |
| **Small Text** | sm (14px) | 400 | 0 | Meta info |
| **Tiny Text** | xs (12px) | 400 | 0 | Captions |
| **Labels** | 10px | 400 | 0.1em | Uppercase labels |

### Font Feature Settings
```css
font-feature-settings: "ss01", "ss02", "cv01", "cv02";
```
Apply to body for enhanced Inter rendering.

---

## 🖼️ Frame Styles (Sharp Edges)

### Cards
```tsx
<div className="bg-[#0a0a0a] border border-[#27272a] p-6">
  {/* Content */}
</div>
```

### Images
```tsx
<div className="border border-[#27272a] overflow-hidden">
  <img src="..." className="w-full h-full object-cover" />
</div>
```

### Buttons (Primary)
```tsx
<button className="
  bg-[#f97316] 
  text-black 
  border border-[#f97316]
  px-4 py-2 
  font-mono 
  text-sm
  hover:bg-[#ea580c] 
  hover:border-[#ea580c]
  transition-colors
">
  Click Me
</button>
```

### Buttons (Secondary)
```tsx
<button className="
  bg-[#0a0a0a] 
  text-[#a1a1aa] 
  border border-[#27272a]
  px-4 py-2 
  font-mono 
  text-sm
  hover:border-[#71717a] 
  hover:text-white
  transition-all
">
  Click Me
</button>
```

### Inputs
```tsx
<input className="
  bg-[#0a0a0a] 
  border border-[#27272a]
  text-[#e5e5e5] 
  px-3 py-2
  text-sm
  focus:border-[#f97316]
  focus:outline-none
  transition-colors
" />
```

---

## 📊 Charts & Data Visualization

### Chart Container
```tsx
<div className="border border-[#27272a] bg-[#050505] overflow-hidden">
  {/* Chart Header */}
  <div className="border-b border-[#27272a] p-4 bg-[#0a0a0a]/30">
    <span className="text-xs font-mono text-[#a1a1aa]">Chart Title</span>
  </div>
  
  {/* Chart Area */}
  <div className="h-[360px] w-full relative p-12 chart-grid">
    {/* Chart content */}
  </div>
</div>
```

### Chart Grid (Background)
```css
.chart-grid {
  background-size: 40px 40px;
  background-image: 
    linear-gradient(to right, rgba(50, 50, 50, 0.2) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(50, 50, 50, 0.2) 1px, transparent 1px);
}
```

### Chart Data Points
```tsx
{/* Active Point */}
<div 
  className="chart-dot active" 
  style={{ top: '15%', left: '10%' }}
/>

{/* Inactive Point */}
<div 
  className="chart-dot inactive" 
  style={{ top: '35%', left: '50%' }}
/>

{/* Label */}
<div 
  className="chart-label" 
  style={{ top: '15%', left: '10%' }}
>
  Data Label
</div>
```

---

## ✨ Animations

### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
```

### Slide In
```css
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-slideIn {
  animation: slideIn 0.4s ease-out;
}
```

### Pulse (Status Indicators)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0; transform: scale(1.5); }
}

.status-dot::after {
  animation: pulse 2s ease-in-out infinite;
}
```

---

## 🌫️ Special Effects

### Noise Overlay
Always include on main pages for texture:
```tsx
<div className="noise" />
```

CSS is in globals.css:
```css
.noise {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
  background: url("data:image/svg+xml,...");
}
```

### Orange Glow Effect
For featured content/images:
```tsx
<div className="relative">
  {/* Background Glow */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
  
  {/* Content */}
  <div className="relative z-10">
    {/* Your content */}
  </div>
</div>
```

### Backdrop Blur
For overlays and modals:
```tsx
<div className="backdrop-blur-sm bg-black/80">
  {/* Content */}
</div>
```

---

## 🎯 Component Patterns

### Label + Content
```tsx
<div>
  <div className="text-[10px] font-mono text-[#71717a] uppercase tracking-widest mb-4">
    Section Label
  </div>
  <div className="text-base text-[#e5e5e5]">
    Content here
  </div>
</div>
```

### Status Indicator
```tsx
<div className="flex items-center gap-3">
  <div className="w-2 h-2 rounded-full bg-emerald-500" />
  <span className="text-xs font-mono text-[#71717a]">
    System Online
  </span>
</div>
```

### Metadata Line
```tsx
<div className="flex items-center gap-4 text-sm text-[#71717a] font-mono">
  <div className="flex items-center gap-2">
    <Calendar className="w-4 h-4" />
    <span>Dec 1, 2025</span>
  </div>
  <div className="flex items-center gap-2">
    <Clock className="w-4 h-4" />
    <span>5 min read</span>
  </div>
</div>
```

### Divider
```tsx
<div className="w-full h-px bg-[#27272a]" />
```

---

## 📦 Utility Classes

### Pre-built in globals.css

```css
/* Grok Card */
.grok-card {
  background-color: #0a0a0a;
  border: 1px solid #27272a;
  transition: border-color 0.3s ease;
}

/* Grok Button */
.grok-button {
  background-color: transparent;
  border: 1px solid #27272a;
  color: #e5e5e5;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-family: 'JetBrains Mono', monospace;
  transition: all 0.2s ease;
}

/* Grok Input */
.grok-input {
  background-color: #0a0a0a;
  border: 1px solid #27272a;
  color: #e5e5e5;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

/* Text Label */
.text-label {
  font-size: 10px;
  font-family: 'JetBrains Mono', monospace;
  color: #71717a;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

## ✅ Checklist for New Components

When creating a new component, ensure:

- [ ] Background is `bg-black` or `bg-[#0a0a0a]`
- [ ] Borders use `border-[#27272a]`
- [ ] NO rounded corners (except dots/avatars)
- [ ] Labels use `font-mono` and `text-[10px]` uppercase
- [ ] Primary text is `text-[#e5e5e5]`
- [ ] CTAs use orange `bg-[#f97316]`
- [ ] Hover states change border color
- [ ] Include noise overlay on full pages
- [ ] Use `tracking-tight` or `tracking-tighter` for headings
- [ ] Font weights: 300 (light), 400 (normal), 500 (medium)

---

## 🚀 Files Updated

### Core Style Files
- `/styles/globals.css` - Complete Grok style system

### Component Files
- `/components/pages/Blog.tsx` - Applied Grok styles
- `/components/pages/BlogDetails.tsx` - Already using Grok styles

### Remaining Files to Update
- Other page components (Home, About, Portfolio, etc.)
- Dashboard components
- Form components
- Modal components

---

## 📝 Next Steps

To fully apply Grok styles across all components:

1. **Update all buttons** - Remove `rounded-full`, use sharp edges
2. **Update all cards** - Remove `rounded-lg`, use `border-[#27272a]`
3. **Update all inputs** - Use `grok-input` class
4. **Add noise overlay** - To all main pages
5. **Replace color classes** - Use exact hex values
6. **Update fonts** - Ensure mono for data, sans for content
7. **Remove gradients** - Replace with solid colors + borders

---

## 💡 Design Philosophy

**"Sharp, minimal, technical"**

- Inspired by terminal interfaces
- Prioritizes readability and data clarity
- Uses borders and spacing over shadows
- Monospace font signals technical precision
- Orange creates urgency and focus
- Pure black creates infinite depth

---

This style system creates a cohesive, professional, and distinctly technical aesthetic that sets CIELO Agency apart. The sharp edges and monospaced details give it a command-line feel, while the orange accents provide warmth and energy.
