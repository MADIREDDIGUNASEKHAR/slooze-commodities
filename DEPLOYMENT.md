# Deployment Guide

This document provides step-by-step instructions for deploying the Slooze Commodities Management System.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

Vercel is the fastest and easiest way to deploy Next.js applications.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Access Your App**
   - Your app will be live at `https://your-project.vercel.app`

### Option 2: Netlify

#### Steps:

1. **Build Command Setup**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site"
   - Connect to GitHub
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

3. **Essential Plugin**
   - Install "Next.js Runtime" plugin from Netlify
   - This ensures Next.js features work correctly

### Option 3: DigitalOcean App Platform

#### Steps:

1. **Create Account**
   - Sign up at [digitalocean.com](https://digitalocean.com)

2. **Deploy App**
   - Click "Create" → "Apps"
   - Connect GitHub repository
   - Configure:
     - Build command: `npm run build`
     - Run command: `npm start`
   - Choose plan (starts at $5/month)
   - Click "Launch App"

## 🔧 Build Configuration

### Environment Variables

No environment variables are required for the demo version. If you integrate with a backend:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.example.com/graphql
```

### Build Settings

- **Framework**: Next.js
- **Build Command**: `npm run build` or `yarn build`
- **Output Directory**: `.next`
- **Install Command**: `npm install` or `yarn install`
- **Development Command**: `npm run dev`

## 📋 Pre-Deployment Checklist

- [ ] All dependencies installed
- [ ] Application builds successfully locally (`npm run build`)
- [ ] No TypeScript errors (`npm run lint`)
- [ ] Demo credentials work correctly
- [ ] Light/Dark mode toggles properly
- [ ] All pages load without errors
- [ ] Mobile responsiveness tested

## 🌐 Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Follow DNS configuration steps
4. Enable HTTPS (automatic with Let's Encrypt)

## 🔒 Security Considerations

### For Production:

1. **Replace Mock Authentication**
   - Implement real JWT/session-based auth
   - Use secure httpOnly cookies
   - Add CSRF protection

2. **Environment Variables**
   - Never commit `.env` files
   - Use platform secret management
   - Rotate API keys regularly

3. **Backend Integration**
   - Use HTTPS only
   - Implement rate limiting
   - Add input validation
   - Enable CORS properly

## 📊 Monitoring & Analytics

### Vercel Analytics

```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Performance Monitoring

- Enable Vercel Speed Insights
- Monitor Core Web Vitals
- Track real user metrics

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### TypeScript Errors

```bash
# Check for type errors
npm run lint
npx tsc --noEmit
```

### Runtime Errors

- Check browser console
- Review server logs
- Verify all dependencies installed
- Ensure Node.js version compatibility

## 🔄 CI/CD Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run lint
```

## 📱 PWA Deployment (Optional)

To make this a Progressive Web App:

1. Install `next-pwa`:
   ```bash
   npm install next-pwa
   ```

2. Update `next.config.js`:
   ```javascript
   const withPWA = require('next-pwa')({
     dest: 'public',
     register: true,
     skipWaiting: true,
   });

   module.exports = withPWA({
     // your config
   });
   ```

3. Create `public/manifest.json`
4. Add icons to `public/icons/`

## 🎯 Performance Optimization

Before deployment:

1. **Image Optimization**
   - Use Next.js `<Image>` component
   - Implement lazy loading
   - Add proper alt text

2. **Code Splitting**
   - Already handled by Next.js
   - Use dynamic imports for heavy components

3. **Caching**
   - Configure cache headers
   - Use CDN for static assets
   - Implement service workers

## 📚 Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

Happy Deploying! 🚀
