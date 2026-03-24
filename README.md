# 🎬 ReelGrab - Social Media Video Downloader

A modern, full-stack web application for downloading videos from TikTok, Instagram, and Facebook. Built with React, Tailwind CSS, and Supabase backend.

![ReelGrab](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## ✨ Features

### Core Functionality
- ✅ **Multi-Platform Support**: Download from TikTok, Instagram, and Facebook
- ✅ **Multiple Quality Options**: 1080p HD, 720p, 480p, and audio-only (MP3)
- ✅ **Video Preview**: See thumbnail and title before downloading
- ✅ **Copy Download Links**: Copy direct download URLs to clipboard
- ✅ **Download History**: Track all downloads in Supabase database
- ✅ **URL Validation**: Smart detection and validation of video URLs

### User Experience
- 🎨 **Dark Theme**: Sleek slate background with green accents (#22c55e)
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Intuitive**: Paste URL and download in seconds
- 🔔 **Toast Notifications**: Real-time feedback for all actions
- 📋 **Clipboard Paste**: One-click paste from clipboard
- ♻️ **Reset Functionality**: Download another video with ease

### Monetization Ready
- 💰 **Ad Placeholders**: Header, content, and footer ad spaces
- 🎯 **Production Ready**: Structured for easy ad integration

---

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4 with custom dark theme
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Build Tool**: Vite

### Backend
- **Runtime**: Deno (Supabase Edge Functions)
- **Framework**: Hono (lightweight web framework)
- **Database**: Supabase PostgreSQL (KV store)
- **API**: RESTful endpoints with CORS enabled

---

## 📂 Project Structure

```
reelgrab/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── sonner.tsx
│   │   │   │   └── ... (other UI components)
│   │   │   ├── Navbar.tsx
│   │   │   ├── VideoCard.tsx
│   │   │   ├── DownloadOptions.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── AdBanner.tsx
│   │   └── App.tsx
│   └── styles/
│       ├── theme.css
│       ├── tailwind.css
│       └── index.css
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx (API routes)
│           └── kv_store.tsx (Database utilities)
├── utils/
│   └── supabase/
│       └── info.tsx
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or pnpm
- Supabase account (free tier works)

### Installation

1. **Clone or download this project**
   ```bash
   cd reelgrab
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure Supabase**
   - The app uses Supabase for backend functionality
   - Supabase credentials are auto-configured in Figma Make environment
   - For local development, update `/utils/supabase/info.tsx`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 🔌 API Endpoints

### POST `/make-server-22961a83/download`
Fetch video details from a URL.

**Request:**
```json
{
  "url": "https://www.tiktok.com/@user/video/123456789"
}
```

**Response:**
```json
{
  "title": "Amazing dance performance - TikTok",
  "thumbnail": "https://...",
  "platform": "TikTok",
  "formats": [
    {
      "quality": "1080p HD",
      "url": "https://...",
      "size": "45.2 MB",
      "type": "video"
    },
    {
      "quality": "Audio Only (MP3)",
      "url": "https://...",
      "size": "3.2 MB",
      "type": "audio"
    }
  ]
}
```

### GET `/make-server-22961a83/history`
Get download history (last 50 downloads).

**Response:**
```json
{
  "history": [
    {
      "url": "https://...",
      "platform": "TikTok",
      "timestamp": "2026-03-22T10:30:00Z",
      "title": "Video title"
    }
  ]
}
```

---

## 🎨 Design System

### Color Palette
- **Background**: `#0f172a` (slate-950)
- **Card Background**: `#1e293b` (slate-800)
- **Primary Green**: `#22c55e` (green-500)
- **Text**: `#f8fafc` (slate-50)
- **Muted**: `#94a3b8` (slate-400)

### Typography
- **Font**: System font stack (optimized for performance)
- **Headings**: Medium weight (500)
- **Body**: Normal weight (400)

---

## 🔒 Security & Compliance

### Data Protection
- No user data is stored without consent
- Download history stored in secure Supabase database
- CORS enabled for cross-origin requests

### Legal Compliance
- ⚠️ **Disclaimer displayed prominently**
- Users must follow platform policies and copyright laws
- Only public content should be downloaded
- Intended for personal use only

### URL Validation
- Validates URL format before processing
- Only accepts URLs from supported platforms:
  - TikTok: `tiktok.com`, `vm.tiktok.com`
  - Instagram: `instagram.com`
  - Facebook: `facebook.com`, `fb.watch`

---

## 🛠️ Development

### Environment Variables
Configure in `/utils/supabase/info.tsx`:
- `projectId`: Your Supabase project ID
- `publicAnonKey`: Supabase anonymous key

### Build for Production
```bash
npm run build
# or
pnpm build
```

Output will be in `/dist` directory.

### Testing Locally
```bash
# Start dev server
npm run dev

# Test with sample URLs:
# - TikTok: https://www.tiktok.com/@username/video/1234567890
# - Instagram: https://www.instagram.com/reel/ABC123/
# - Facebook: https://www.facebook.com/watch/?v=123456789
```

---

## 📊 Database Schema

### KV Store Table
The app uses Supabase's key-value store with the following structure:

**Download History Entry:**
```typescript
{
  key: "download_2026-03-22T10:30:00Z_abc123",
  value: {
    url: string,
    platform: "TikTok" | "Instagram" | "Facebook",
    timestamp: string (ISO 8601),
    title: string
  }
}
```

---

## 🚧 Current Implementation

### Mock Video Extraction
Currently, the app uses **mock data** for video extraction. In a production environment, you should integrate with a third-party API:

#### Recommended APIs:
1. **RapidAPI** - TikTok/Instagram/Facebook downloaders
2. **Social Media Downloader APIs**
3. **Custom yt-dlp wrapper** (requires server infrastructure)

#### Implementation Guide:
Replace the `extractVideoData` function in `/supabase/functions/server/index.tsx` with actual API calls:

```typescript
async function extractVideoData(url: string, platform: string) {
  // Example: Call RapidAPI
  const response = await fetch('https://api.rapidapi.com/download', {
    method: 'POST',
    headers: {
      'X-RapidAPI-Key': Deno.env.get('RAPIDAPI_KEY'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });
  
  const data = await response.json();
  return formatResponse(data);
}
```

---

## 🎯 Future Enhancements

### Planned Features
- [ ] User authentication and personal download library
- [ ] Batch download support
- [ ] Video quality preview
- [ ] Download speed optimization
- [ ] Browser extension
- [ ] Mobile app (React Native)
- [ ] Social sharing features
- [ ] Download scheduling

### API Integration
- [ ] Replace mock data with real video extraction API
- [ ] Add support for YouTube Shorts
- [ ] Add support for Twitter/X videos
- [ ] Add support for Reddit videos

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🤝 Contributing

This is a production-ready template. Feel free to:
1. Fork the project
2. Add new features
3. Integrate with real video download APIs
4. Customize the design
5. Deploy to your own infrastructure

---

## ⚖️ Legal Disclaimer

**IMPORTANT**: This tool is provided for educational and personal use only.

- Users must comply with all applicable laws and platform terms of service
- Only download content you have permission to use
- Respect intellectual property rights and copyright laws
- Do not use for commercial purposes without proper authorization
- The developers are not responsible for misuse of this tool

ReelGrab respects platform policies and encourages responsible usage.

---

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Supabase** - For the backend infrastructure
- **Radix UI** - For accessible UI components
- **Lucide** - For beautiful icons

---

## 📞 Support

For issues or questions:
1. Check the documentation above
2. Review the code comments
3. Test with valid video URLs from supported platforms

---

**Built with ❤️ using React, Tailwind CSS, and Supabase**

*Version 1.0.0 - March 2026*
