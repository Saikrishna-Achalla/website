# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js 14 and React 18. It's a two-column responsive design featuring blog posts, publications, and personal information.

## Development Commands

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint
```

## Architecture

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom color theme
- **Icons**: Font Awesome
- **Language**: JavaScript (not TypeScript)

### Project Structure

```
app/
├── layout.js          # Root layout with Inter font
├── page.js           # Home page, reads translations from JSON
├── blog/             # Blog section pages
└── publications/     # Publications section pages

components/
├── header.jsx        # Fixed left column with name, headline, navigation
├── navigation.jsx    # Main navigation component
├── about.jsx        # About section component
├── socials.jsx      # Social media links
├── blog/           # Blog-related components
└── publications/   # Publication-related components
```

### Key Implementation Details

1. **Data Source**: Content is stored in `/public/translations/en.json` and loaded server-side using Node's fs module in page components.

2. **Routing**: Uses Next.js App Router with separate layouts for blog and publications sections.

3. **Styling**: Custom Tailwind configuration with specific color scheme:
   - Primary colors for links and hover states
   - Surface colors for text elements
   - Custom responsive breakpoints for two-column layout

4. **Path Aliases**: Uses `@/` alias for imports, configured in both `jsconfig.json` and `next.config.js`.

5. **Layout**: Responsive design with fixed left column on desktop (lg breakpoint) containing header and navigation, with scrollable right column for content.

## Important Configuration Files

- `tailwind.config.js`: Custom color theme and font configurations
- `next.config.js`: Webpack alias configuration for @ imports
- `jsconfig.json`: Path mapping for @ alias
- `/public/translations/en.json`: Main content data source