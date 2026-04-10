# 🚀 Grok Style Quick Reference

## Essential Copy-Paste Snippets

### 🎨 Colors (Use These)
```tsx
bg-black               // #000000 - Background
bg-[#0a0a0a]           // #0a0a0a - Panels
border-[#27272a]       // #27272a - Borders
text-[#e5e5e5]         // #e5e5e5 - Primary text
text-[#a1a1aa]         // #a1a1aa - Secondary text
text-[#71717a]         // #71717a - Tertiary text
bg-[#f97316]           // #f97316 - Orange accent
hover:bg-[#ea580c]     // #ea580c - Orange hover
```

### 📝 Typography
```tsx
// Headings
className="text-4xl md:text-6xl font-medium tracking-tighter text-white"

// Section Heading
className="text-2xl font-medium tracking-tight text-white"

// Body Text
className="text-base text-[#a1a1aa] font-light leading-relaxed"

// Labels (10px, uppercase, mono)
className="text-[10px] font-mono text-[#71717a] uppercase tracking-widest"

// Metadata
className="text-xs font-mono text-[#71717a]"
```

### 🔲 Buttons

**Primary Button**
```tsx
<button className="bg-[#f97316] text-black border border-[#f97316] px-4 py-2 font-mono text-sm hover:bg-[#ea580c] transition-colors">
  Click Me
</button>
```

**Secondary Button**
```tsx
<button className="bg-[#0a0a0a] text-[#a1a1aa] border border-[#27272a] px-4 py-2 font-mono text-sm hover:border-[#71717a] hover:text-white transition-all">
  Click Me
</button>
```

### 📦 Cards
```tsx
<div className="bg-[#0a0a0a] border border-[#27272a] p-6">
  <div className="text-[10px] font-mono text-[#71717a] uppercase tracking-widest mb-4">
    Label
  </div>
  <h3 className="text-xl text-white font-medium mb-4">Title</h3>
  <p className="text-[#a1a1aa] text-sm">Content</p>
</div>
```

### 📝 Inputs
```tsx
<input 
  className="bg-[#0a0a0a] border border-[#27272a] text-[#e5e5e5] px-3 py-2 text-sm focus:border-[#f97316] focus:outline-none w-full"
  placeholder="Enter text..."
/>
```

### 🖼️ Image Container
```tsx
<div className="border border-[#27272a] overflow-hidden bg-[#0a0a0a]">
  <img src="..." className="w-full h-full object-cover" />
</div>
```

### 📊 Chart Container
```tsx
<div className="border border-[#27272a] bg-[#050505] overflow-hidden">
  <div className="border-b border-[#27272a] p-4 bg-[#0a0a0a]/30">
    <span className="text-xs font-mono text-[#a1a1aa]">Chart Title</span>
  </div>
  <div className="h-[360px] w-full relative p-12 chart-grid">
    {/* Chart content */}
  </div>
</div>
```

### 🔴 Status Indicator
```tsx
<div className="flex items-center gap-3">
  <div className="w-2 h-2 rounded-full bg-emerald-500" />
  <span className="text-xs font-mono text-[#71717a]">Online</span>
</div>
```

### 📏 Divider
```tsx
<div className="w-full h-px bg-[#27272a]" />
```

### 🌫️ Noise Overlay (Add to pages)
```tsx
<div className="noise" />
```

### ✨ Orange Glow Effect
```tsx
<div className="relative">
  <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
  <div className="relative z-10">
    {/* Content */}
  </div>
</div>
```

### 📐 Layout Section
```tsx
<section className="py-20 px-6 border-b border-[#27272a]">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### 🔢 Metadata Line
```tsx
<div className="flex items-center gap-4 text-xs font-mono text-[#71717a]">
  <div className="flex items-center gap-2">
    <Calendar className="w-4 h-4" />
    <span>Dec 1, 2025</span>
  </div>
  <div className="flex items-center gap-2">
    <Clock className="w-4 h-4" />
    <span>5 min</span>
  </div>
</div>
```

---

## ⚡ Rules to Remember

1. **NO rounded corners** (except dots/avatars)
2. **Always use borders** instead of shadows
3. **Mono font for data/labels**
4. **Orange for CTAs only**
5. **Pure black backgrounds**
6. **Border color: #27272a**
7. **Add noise overlay to full pages**

---

## 🎯 Component Template

```tsx
export function MyGrokComponent() {
  return (
    <div className="bg-black min-h-screen">
      {/* Noise Overlay */}
      <div className="noise" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Label */}
        <div className="text-[10px] font-mono text-[#71717a] uppercase tracking-widest mb-4">
          [ Section ]
        </div>
        
        {/* Heading */}
        <h1 className="text-5xl font-medium tracking-tighter text-white mb-6">
          Page Title
        </h1>
        
        {/* Body */}
        <p className="text-lg text-[#a1a1aa] font-light leading-relaxed mb-12">
          Description text goes here.
        </p>
        
        {/* Divider */}
        <div className="w-full h-px bg-[#27272a] mb-12" />
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card */}
          <div className="bg-[#0a0a0a] border border-[#27272a] p-6">
            <div className="text-[10px] font-mono text-[#71717a] uppercase tracking-widest mb-4">
              Card Label
            </div>
            <h3 className="text-xl text-white font-medium mb-4">
              Card Title
            </h3>
            <p className="text-[#a1a1aa] text-sm mb-6">
              Card content here.
            </p>
            <button className="bg-[#f97316] text-black border border-[#f97316] px-4 py-2 font-mono text-sm hover:bg-[#ea580c] transition-colors">
              Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📱 Responsive Patterns

```tsx
// Responsive heading
className="text-4xl md:text-5xl lg:text-6xl"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Responsive padding
className="px-4 sm:px-6 lg:px-8"

// Responsive flex
className="flex-col md:flex-row"
```

---

## 🎨 Use This Palette

| Variable | Hex | Use |
|----------|-----|-----|
| `bg-black` | #000000 | Main background |
| `bg-[#0a0a0a]` | #0a0a0a | Panels, cards |
| `border-[#27272a]` | #27272a | All borders |
| `text-[#e5e5e5]` | #e5e5e5 | Primary text |
| `text-[#a1a1aa]` | #a1a1aa | Secondary text |
| `text-[#71717a]` | #71717a | Tertiary text |
| `bg-[#f97316]` | #f97316 | Orange CTA |
| `bg-emerald-500` | #10b981 | Success/Online |

---

That's it! Copy, paste, and stay consistent. 🚀
