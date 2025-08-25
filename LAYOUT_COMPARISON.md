# Layout Comparison: Stanford Website vs Current Website

## Major Structural Differences

### 1. Overall Layout Architecture

**Stanford Website (Target)**
- **Single-column layout** throughout
- Vertical scrolling design
- All content flows top-to-bottom in one stream
- No fixed/sticky elements
- Centered content with consistent margins

**Your Current Website**
- **Two-column layout** on desktop (lg breakpoint)
- Left column is **fixed** containing header/navigation
- Right column contains scrollable content
- Responsive: becomes single column on mobile
- 50% split between columns on desktop

### 2. Header/Profile Section

**Stanford Website (Target)**
- Profile image at the very top, centered
- Name directly below image
- Title/affiliation below name
- Social links as horizontal text links below title
- Everything stacks vertically in the center
- No sidebar navigation

**Your Current Website**
- Profile image in the fixed left column
- Name above the image
- Title/email below name
- Navigation menu below in the same fixed column
- Social links at bottom of fixed column
- All left-aligned within the column

### 3. Navigation Approach

**Stanford Website (Target)**
- **No visible navigation menu**
- Relies on scrolling to access sections
- All sections on single page
- Direct vertical flow

**Your Current Website**
- Dedicated navigation component with "ABOUT", "PUBLICATIONS", "BLOG"
- Links to separate pages/routes
- Always visible in fixed left column
- Active state tracking

### 4. Content Organization

**Stanford Website (Target)**
- All sections on **one long page**:
  - About
  - Publications/Research
  - News
  - Teaching
  - Experience
  - Service
  - Miscellaneous
- Clear section headers with generous spacing
- No page routing needed

**Your Current Website**
- Content split across **multiple pages/routes**
- Home page has About and Blog preview
- Separate /publications and /blog pages
- Content starts at 50% width on desktop

### 5. Spatial Formatting

**Stanford Website (Target)**
- **Full-width content** (with margins)
- Consistent padding/margins throughout
- Large white space between sections
- No column constraints
- Text spans comfortable reading width

**Your Current Website**
- Content constrained to **50% width** on desktop
- Fixed left column takes 50% space
- Less vertical breathing room
- Content feels more compressed

### 6. Social Links Placement

**Stanford Website (Target)**
- **Horizontal layout** below profile info
- Part of the main content flow
- Text-based links (e.g., "Google Scholar", "Twitter")
- Immediately visible, no scrolling needed

**Your Current Website**
- **Vertical stack** at bottom of fixed column
- Icon-based (Font Awesome icons)
- May require scrolling in the fixed column to see

### 7. Image Treatment

**Stanford Website (Target)**
- Circular profile image
- Centered positioning
- Smaller, more subtle size
- At the very top of content hierarchy

**Your Current Website**
- Circular profile image (border-radius: 100px)
- Left-aligned in fixed column
- Larger size (350x250px)
- Middle of the header section

## Key Changes Needed for Stanford-Style Layout

1. **Eliminate two-column layout** - Move to single-column design
2. **Remove fixed positioning** - Let everything scroll naturally
3. **Consolidate all content** on single page (no routing)
4. **Center all content** with consistent max-width
5. **Reorder elements**: Image → Name → Title → Social Links → Content
6. **Horizontal social links** instead of vertical stack
7. **Remove navigation menu** entirely
8. **Increase section spacing** for better visual separation
9. **Full-width content blocks** (with reasonable max-width for readability)
10. **Simplify component structure** - fewer nested divs, cleaner hierarchy