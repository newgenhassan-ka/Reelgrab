# 🚀 ReelGrab Setup & Deployment Guide

Complete guide for setting up, developing, and deploying ReelGrab.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Development Setup](#development-setup)
3. [Understanding the Architecture](#understanding-the-architecture)
4. [API Integration (Production)](#api-integration-production)
5. [Deployment Options](#deployment-options)
6. [Customization Guide](#customization-guide)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Running Locally (Demo Mode)

The application currently runs with **mock data** - perfect for testing the UI and flow.

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Navigate to http://localhost:5173
```

**Test it out:**
- Click one of the sample platform buttons (TikTok, Instagram, Facebook)
- Click "Download" to see mock video data
- Try the clipboard paste feature
- View download history by clicking the "History" button

---

## Development Setup

### Prerequisites

- **Node.js** 18+ or **pnpm** installed
- **Code editor** (VS Code recommended)
- **Git** for version control
- **Supabase account** (free tier) for backend

### Environment Configuration

The app is pre-configured for Figma Make environment. For standalone deployment:

1. **Update Supabase credentials** in `/utils/supabase/info.tsx`:

```typescript
export const projectId = 'your-project-id';
export const publicAnonKey = 'your-anon-key';
```

2. **Get Supabase credentials:**
   - Go to https://supabase.com
   - Create a new project
   - Navigate to Settings > API
   - Copy `Project URL` and `anon public` key

### Project Structure Overview

```
src/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx              # Top navigation
│   │   ├── VideoCard.tsx           # Video preview component
│   │   ├── DownloadOptions.tsx     # Download format selector
│   │   ├── Loader.tsx              # Loading spinner
│   │   ├── AdBanner.tsx            # Ad placeholders
│   │   ├── SampleUrls.tsx          # Demo URL buttons
│   │   ├── HistoryViewer.tsx       # Download history modal
│   │   └── ui/                     # Reusable UI components
│   └── App.tsx                     # Main application

supabase/functions/server/
└── index.tsx                       # Backend API routes

styles/
└── theme.css                       # Dark theme with green accents
```

---

## Understanding the Architecture

### Frontend (React)

**Technology Stack:**
- React 18 with TypeScript
- Tailwind CSS v4 for styling
- Radix UI for accessible components
- Lucide React for icons
- Sonner for toast notifications

**Key Features:**
- State management with React hooks
- Real-time feedback via toasts
- Responsive design (mobile-first)
- Keyboard shortcuts (Enter to submit)
- Clipboard integration

### Backend (Supabase Edge Functions)

**Technology:**
- Deno runtime
- Hono web framework
- Supabase KV store for database

**Endpoints:**

1. **POST** `/make-server-22961a83/download`
   - Accepts video URL
   - Validates URL format
   - Detects platform (TikTok/Instagram/Facebook)
   - Returns video metadata and download links
   - Saves to download history

2. **GET** `/make-server-22961a83/history`
   - Returns last 50 downloads
   - Sorted by timestamp (newest first)

### Data Flow

```
User enters URL
    ↓
Frontend validates input
    ↓
POST request to backend
    ↓
Backend validates URL
    ↓
Backend extracts video data (currently mock)
    ↓
Saves to Supabase database
    ↓
Returns data to frontend
    ↓
Frontend displays video preview + download options
```

---

## API Integration (Production)

### Current State: Mock Data

The app uses **simulated video extraction** for demonstration. To make it production-ready, you need to integrate with a real video download API.

### Recommended APIs

#### Option 1: RapidAPI (Easiest)

Popular APIs on RapidAPI:
- **TikTok Video Downloader**
- **Instagram Downloader**
- **Social Media Downloader (Multi-platform)**

**Steps:**
1. Sign up at https://rapidapi.com
2. Subscribe to a downloader API (many have free tiers)
3. Get your API key
4. Replace mock implementation (see below)

#### Option 2: Custom yt-dlp Server

If you need full control:
1. Set up a Node.js/Python server
2. Install yt-dlp: `pip install yt-dlp`
3. Create wrapper API
4. Deploy to your infrastructure

### Implementation Example

Replace the `extractVideoData` function in `/supabase/functions/server/index.tsx`:

```typescript
async function extractVideoData(url: string, platform: string) {
  const apiKey = Deno.env.get('RAPIDAPI_KEY');
  
  const response = await fetch('https://tiktok-downloader.p.rapidapi.com/download', {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'tiktok-downloader.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch video data from API');
  }

  const data = await response.json();

  // Transform API response to match our format
  return {
    title: data.title || 'Untitled Video',
    thumbnail: data.thumbnail_url,
    platform,
    formats: [
      {
        quality: '1080p HD',
        url: data.download_urls.hd,
        size: data.file_size_hd,
        type: 'video'
      },
      {
        quality: '720p',
        url: data.download_urls.sd,
        size: data.file_size_sd,
        type: 'video'
      },
      {
        quality: 'Audio Only (MP3)',
        url: data.download_urls.audio,
        size: data.file_size_audio,
        type: 'audio'
      }
    ]
  };
}
```

### Setting Environment Variables

For Supabase Edge Functions:

```bash
# Using Supabase CLI
supabase secrets set RAPIDAPI_KEY=your_api_key_here
```

For Figma Make environment, use the secret management system provided.

---

## Deployment Options

### Option 1: Vercel (Frontend Only)

Perfect for demo with mock data:

```bash
# Install Vercel CLI
npm i -g vercel

# Build and deploy
npm run build
vercel --prod
```

**Limitations:** No backend functionality (download history won't work)

### Option 2: Supabase (Full-Stack)

Recommended for production:

1. **Install Supabase CLI:**
```bash
npm install -g supabase
```

2. **Login to Supabase:**
```bash
supabase login
```

3. **Link project:**
```bash
supabase link --project-ref your-project-id
```

4. **Deploy Edge Functions:**
```bash
supabase functions deploy server
```

5. **Deploy Frontend to Vercel/Netlify:**
```bash
npm run build
# Upload dist/ folder or connect Git repo
```

### Option 3: Complete Custom Deployment

For maximum control:

**Frontend:** Any static hosting (Netlify, Cloudflare Pages, AWS S3)
**Backend:** Your own Node.js server with Express
**Database:** Your own PostgreSQL or MongoDB instance

---

## Customization Guide

### Branding

**Colors** - Edit `/src/styles/theme.css`:
```css
:root {
  --primary: #22c55e;        /* Change to your brand color */
  --background: #0f172a;     /* Dark background */
}
```

**Logo** - Edit `/src/app/components/Navbar.tsx`:
- Replace the Video icon
- Add your logo image
- Update text

### Features

**Add New Platform:**

1. Update validation in backend:
```typescript
// In isValidVideoUrl function
const validDomains = [
  'tiktok.com',
  'instagram.com',
  'facebook.com',
  'youtube.com',  // Add new platform
];
```

2. Update platform detection:
```typescript
function detectPlatform(url: string): string {
  if (url.includes('youtube.com')) return 'YouTube';
  // ... existing platforms
}
```

3. Add platform color in VideoCard component

**Remove Download History:**

Simply remove `<HistoryViewer />` from App.tsx

**Add User Authentication:**

Integrate Supabase Auth (see Supabase documentation)

### Ad Integration

Replace placeholder `<AdBanner />` components with real ad code:

```tsx
// Example: Google AdSense
<div className="ad-container">
  <ins className="adsbygoogle"
       style={{display:'block'}}
       data-ad-client="ca-pub-XXXXXXXX"
       data-ad-slot="XXXXXXXXX"
       data-ad-format="auto">
  </ins>
</div>
```

---

## Troubleshooting

### Issue: "Failed to fetch video"

**Causes:**
- Invalid URL format
- Backend server not running
- CORS issues

**Solutions:**
1. Check URL is from supported platform
2. Verify Supabase Edge Function is deployed
3. Check browser console for detailed errors

### Issue: Clipboard paste not working

**Cause:** Browser security - clipboard access requires HTTPS or localhost

**Solution:** Test on localhost or deploy to HTTPS domain

### Issue: Download not starting

**Cause:** Mock URLs don't point to real videos

**Solution:** Integrate with real video extraction API (see API Integration section)

### Issue: History not loading

**Causes:**
- Supabase credentials incorrect
- Edge Function not deployed
- Network issues

**Solutions:**
1. Verify credentials in `/utils/supabase/info.tsx`
2. Deploy backend: `supabase functions deploy server`
3. Check browser Network tab for API errors

### Issue: Styles not loading

**Cause:** Tailwind CSS not compiled

**Solution:**
```bash
# Restart dev server
npm run dev
```

---

## Testing Checklist

Before deploying to production:

- [ ] Test with sample URLs from each platform
- [ ] Verify clipboard paste works
- [ ] Check responsive design on mobile
- [ ] Test download history feature
- [ ] Verify error messages display correctly
- [ ] Test keyboard shortcuts (Enter key)
- [ ] Check loading states
- [ ] Verify toast notifications appear
- [ ] Test "Download Another" reset
- [ ] Check footer disclaimer is visible
- [ ] Verify ad placeholders are positioned correctly

---

## Performance Optimization

### For Production:

1. **Enable compression** on your hosting
2. **Add CDN** for static assets
3. **Implement caching** for API responses
4. **Optimize images** (use WebP format)
5. **Add rate limiting** to prevent abuse
6. **Lazy load** components not immediately visible

### Example: Rate Limiting (Backend)

```typescript
// In Edge Function
const rateLimiter = new Map();

app.post("/make-server-22961a83/download", async (c) => {
  const ip = c.req.header('x-forwarded-for') || 'unknown';
  const now = Date.now();
  
  if (rateLimiter.has(ip)) {
    const lastRequest = rateLimiter.get(ip);
    if (now - lastRequest < 5000) { // 5 second cooldown
      return c.json({ error: "Too many requests. Please wait." }, 429);
    }
  }
  
  rateLimiter.set(ip, now);
  
  // ... rest of endpoint
});
```

---

## Security Best Practices

1. **Never expose API keys** in frontend code
2. **Validate all user input** before processing
3. **Use HTTPS** in production
4. **Implement CORS** properly
5. **Add rate limiting** to prevent abuse
6. **Sanitize URLs** before processing
7. **Keep dependencies updated**

---

## Support & Resources

### Documentation
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Hono Framework](https://hono.dev)

### Communities
- [React Discord](https://discord.gg/react)
- [Tailwind Discord](https://discord.gg/tailwindcss)
- [Supabase Discord](https://discord.supabase.com)

---

## License & Legal

Remember to:
1. Add proper **Terms of Service**
2. Include **Privacy Policy**
3. Respect platform **Terms of Service**
4. Comply with **DMCA** and copyright laws
5. Add proper **disclaimers** (already included in app)

---

**Built with ❤️ by the ReelGrab Team**

*Last Updated: March 2026*
