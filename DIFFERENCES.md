# DIFFERENCES.md

## Website Restructuring Summary

This document outlines all the changes made to transform your website from a two-column layout to a Stanford-style single-column academic portfolio, and lists all placeholder content that was added.

## Layout Changes Implemented

### 1. **Page Structure**
- ✅ Changed from two-column to single-column layout
- ✅ Removed fixed sidebar navigation
- ✅ Consolidated all content on a single scrollable page
- ✅ Centered all content with max-width of 3xl (48rem)

### 2. **Component Restructuring**
- ✅ Created new `ProfileHeader` component replacing the old `Header`
- ✅ Reordered profile section: Image → Name → Title → Social Links
- ✅ Made social links horizontal with text labels
- ✅ Removed navigation menu completely
- ✅ Updated all sections to use consistent styling

### 3. **New Sections Added**
The following sections were added to match Ken Liu's website structure:
- News and Olds
- Teaching & Mentoring  
- Experience
- Professional Service
- Miscellaneous

### 4. **Removed Components**
- Deleted `/app/blog` and `/app/publications` routes
- Removed old navigation component usage
- Removed fixed positioning styles

## Placeholder Content Added (NEEDS YOUR UPDATE)

Please update the following placeholder content with your actual information:

### 1. **Google Scholar Link**
```json
"scholar": "https://scholar.google.com/citations?user=YOUR_ID"
```
**Action needed:** Replace `YOUR_ID` with your actual Google Scholar user ID

### 2. **News Section**
Added sample news items:
```json
"news": [
    {
        "date": "Oct 2024",
        "content": "Started PhD at UCLA!"
    },
    {
        "date": "May 2024", 
        "content": "Paper accepted at PaPoC 2024"
    },
    {
        "date": "May 2024",
        "content": "Graduated from UC Berkeley"
    }
]
```
**Action needed:** Update with your actual news/updates

### 3. **Teaching Section**
Added placeholder teaching experience:
```json
"teaching": {
    "courses": [
        {
            "role": "Teaching Assistant",
            "course": "CS 162 - Operating Systems",
            "term": "Fall 2023",
            "institution": "UC Berkeley"
        }
    ]
}
```
**Action needed:** Replace with your actual teaching experience or remove if none

### 4. **Experience Section**
Added placeholder work experience:
```json
"experience": {
    "positions": [
        {
            "title": "Research Assistant",
            "company": "Sky Computing Lab",
            "dates": "2022 - 2024",
            "location": "Berkeley, CA",
            "description": "Worked on distributed systems and database research under Prof. Joe Hellerstein"
        }
    ]
}
```
**Action needed:** Update with your complete work/research experience

### 5. **Service Section**
Added placeholder service activity:
```json
"service": {
    "service": [
        {
            "role": "Student Volunteer",
            "venue": "SIGMOD",
            "year": "2024"
        }
    ]
}
```
**Action needed:** Add your actual service activities (reviews, committees, etc.)

### 6. **Miscellaneous Section**
Added placeholder personal interests:
```json
"misc": {
    "items": [
        "I enjoy hiking in the California mountains",
        "Photography enthusiast - mainly landscape and street photography",
        "Coffee aficionado - always exploring new local roasters",
        "This site is built with Next.js and Tailwind CSS"
    ]
}
```
**Action needed:** Replace with your actual interests and fun facts

## Files Modified

### Core Layout Files
- `/app/page.js` - Complete restructure to single-column layout
- `/components/profile-header.jsx` - New component (replaced header.jsx)
- `/components/about.jsx` - Updated styling to match new layout

### New Component Files Created
- `/components/news-section.jsx`
- `/components/teaching.jsx`
- `/components/experience.jsx`
- `/components/service.jsx`
- `/components/misc.jsx`

### Updated Files
- `/components/publications/publications.jsx` - Updated for single-page layout
- `/public/translations/en.json` - Added all new section data

### Deleted Files/Folders
- `/app/blog/` - Entire folder removed
- `/app/publications/` - Entire folder removed
- Old navigation component no longer used

## Styling Notes

The new layout uses:
- Consistent section spacing with `mb-16` (4rem bottom margin)
- Section headers with `text-2xl font-bold mb-6`
- Gray color scheme for text (`text-gray-700` for body, `text-gray-500` for placeholders)
- Blue links with hover underline (`text-blue-600 hover:underline`)
- Smaller, centered profile image (150x150px vs 350x250px)

## Next Steps

1. **Update all placeholder content** in `/public/translations/en.json`
2. **Add your Google Scholar ID** if you have one, or remove the link
3. **Customize the misc section** with your personal touches
4. **Test the website** locally with `yarn dev`
5. **Consider adding more news items** as they occur
6. **Update experience and teaching** sections with complete history

## Optional Enhancements

Based on Ken's website, you might also consider adding:
- Publication thumbnails/images
- Links to slides, code, or videos for publications
- More detailed teaching descriptions
- Personal website counter (in misc section)
- Awards/honors section if applicable