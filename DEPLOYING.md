# DEPLOYING.md

## Deployment Guide for Next.js Portfolio Website

This guide covers how to deploy your Next.js website to production and set up preview/staging environments for testing changes before going live.

## Quick Start - Recommended Approach

### Vercel (Easiest & Best for Next.js)

Vercel is the recommended platform since it's made by the creators of Next.js and offers:
- **Automatic preview deployments** for every branch/PR
- **Zero configuration** deployment
- **Free tier** includes 100GB bandwidth/month
- **Instant rollbacks** to previous versions

#### Initial Setup

1. **Install Vercel CLI** (optional but useful):
```bash
npm i -g vercel
```

2. **Deploy via GitHub Integration** (Recommended):
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository (`Saikrishna-Achalla/website`)
   - Vercel auto-detects Next.js and configures everything
   - Click "Deploy"

3. **Deploy via CLI** (Alternative):
```bash
# In your project directory
vercel

# Follow the prompts
# - Link to existing project or create new
# - Confirm project settings
# - Deploy!
```

#### Preview Deployments (Automatic)

Every time you:
- **Push to a branch**: Vercel creates a preview URL
- **Open a PR**: Comment appears with preview link
- **Update PR**: Preview updates automatically

Example workflow:
```bash
# Create feature branch
git checkout -b update-layout

# Make changes
# ... edit files ...

# Push branch
git add .
git commit -m "Update layout"
git push origin update-layout

# Vercel automatically creates preview at:
# https://website-[branch-name]-[your-username].vercel.app
```

## Alternative Platforms

### Netlify

Good alternative with similar features:

1. **Setup**:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

2. **GitHub Integration**:
   - Connect repo at [app.netlify.com](https://app.netlify.com)
   - Auto-deploys on push to main
   - Preview deploys for PRs

3. **Build Settings**:
   - Build command: `yarn build`
   - Publish directory: `.next`

### GitHub Pages (NOT Recommended)

GitHub Pages doesn't support Next.js SSR/API routes. Only use if you export as static site:

```bash
# Add to package.json
"export": "next build && next export"

# Build static version
yarn export

# Deploy 'out' folder to GitHub Pages
```

**Limitations**: No server-side features, API routes, or image optimization.

## Local Preview Before Deployment

### Method 1: Production Build Locally
```bash
# Build production version
yarn build

# Start production server
yarn start

# View at http://localhost:3000
```

### Method 2: Docker (Optional)
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

Run:
```bash
docker build -t my-website .
docker run -p 3000:3000 my-website
```

## Environment Variables

Create `.env.local` for local development:
```env
# Add any API keys or secrets here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production (Vercel):
- Go to Project Settings → Environment Variables
- Add production values
- They're automatically injected during build

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain (e.g., `saikrishnaachalla.com`)
3. Update DNS records as instructed
4. SSL certificate auto-configured

### DNS Records (Example)
```
Type  Name    Value
A     @       76.76.21.21
CNAME www     cname.vercel-dns.com
```

## Deployment Checklist

Before deploying to production:

- [ ] Run `yarn build` locally - no errors
- [ ] Run `yarn lint` - no warnings
- [ ] Test production build: `yarn start`
- [ ] Check all images load correctly
- [ ] Verify responsive design
- [ ] Test all links/navigation
- [ ] Update `public/translations/en.json` with latest content
- [ ] Commit all changes

## Useful Commands

```bash
# Check build size
yarn build
# Look for "First Load JS" - aim for < 200kB

# Analyze bundle
yarn add -D @next/bundle-analyzer
# Add to next.config.js and run build

# Preview on mobile (local network)
yarn dev --hostname 0.0.0.0
# Access via your IP: http://192.168.x.x:3000
```

## Rollback Strategy

### Vercel
- Dashboard → Deployments → Three dots → "Promote to Production"
- Or via CLI: `vercel rollback`

### Git-based
```bash
# Revert last commit
git revert HEAD
git push

# Or reset to specific commit
git reset --hard [commit-hash]
git push --force
```

## Monitoring

### Vercel Analytics (Free tier)
- Automatically tracks Web Vitals
- Enable in Project Settings → Analytics

### Check deployment status
```bash
# Vercel CLI
vercel ls
vercel inspect [deployment-url]

# Or check GitHub PR comments for status
```

## Troubleshooting

### Build Failures
1. Check build logs in Vercel/Netlify dashboard
2. Common issues:
   - Missing dependencies: Add to `package.json`
   - File path issues: Use lowercase, no spaces
   - Image imports: Ensure files exist in `/public`

### Preview Not Updating
- Clear cache: `vercel --force`
- Check branch protection rules in GitHub
- Verify webhook is active in GitHub settings

### Performance Issues
- Enable caching headers in `next.config.js`
- Optimize images (Next.js Image component)
- Reduce JavaScript bundle size

## Cost Considerations

### Vercel Free Tier Limits
- 100GB bandwidth/month
- 6,000 build minutes/month
- 100 GB-hours serverless execution
- Unlimited static sites & preview deployments

### When to Upgrade
- Consistent > 100GB bandwidth
- Need team features
- Custom firewall rules
- Advanced analytics

## Quick Deploy Commands

```bash
# First time setup
git remote add origin git@github.com:Saikrishna-Achalla/website.git
vercel

# Deploy updates
git add .
git commit -m "Update content"
git push origin main
# Auto-deploys via GitHub integration

# Manual deploy current directory
vercel --prod

# Deploy specific branch
vercel --prod --scope your-team
```

## Next Steps

1. **Set up Vercel**: Connect GitHub repo for auto-deployments
2. **Configure domain**: Add custom domain in project settings
3. **Enable analytics**: Monitor performance
4. **Set up staging**: Use branch deployments for testing

For your specific case with GitHub repo already set up, the fastest path is:
1. Go to [vercel.com](https://vercel.com)
2. Import `Saikrishna-Achalla/website` repository
3. Deploy with default settings
4. Every push to `main` auto-deploys
5. Every PR gets a preview URL