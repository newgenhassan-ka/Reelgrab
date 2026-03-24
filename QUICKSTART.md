# ⚡ ReelGrab Quick Start Guide

Get ReelGrab running in under 2 minutes!

---

## 🎯 For Users: Test the App Now

The app is **already running** in your browser! Here's how to use it:

### Step 1: Try Sample URLs
1. Look for the colored platform buttons (TikTok, Instagram, Facebook)
2. Click any button to load a sample URL
3. Click the green **"Download"** button

### Step 2: Test Your Own URL
1. Copy any public video URL from:
   - TikTok: `https://www.tiktok.com/@user/video/...`
   - Instagram: `https://www.instagram.com/reel/...`
   - Facebook: `https://www.facebook.com/watch/?v=...`
2. Paste it in the input field (or click the clipboard icon)
3. Press **Enter** or click **"Download"**

### Step 3: Explore Features
- 📥 **Download Options** - See multiple quality choices
- 🔗 **Copy Links** - Use the "Copy Link" button
- 📜 **History** - Click the floating "History" button (bottom-right)
- 🔄 **Reset** - Click "Download Another Video" to start over

---

## 💻 For Developers: Run Locally

### Prerequisites
```bash
# You need Node.js 18+ installed
node --version
```

### Installation (3 commands)
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to the URL shown (usually http://localhost:5173)
```

That's it! The app is now running locally.

---

## 🧪 Testing Tips

### Valid Test URLs

**TikTok:**
```
https://www.tiktok.com/@username/video/1234567890
https://vm.tiktok.com/ZMhPqRS9J/
```

**Instagram:**
```
https://www.instagram.com/reel/ABC123DEF456/
https://www.instagram.com/p/ABC123DEF456/
```

**Facebook:**
```
https://www.facebook.com/watch/?v=123456789012345
https://fb.watch/abc123def456/
```

### What to Test

✅ **Paste URL** - Type or paste a URL  
✅ **Clipboard Button** - Click clipboard icon  
✅ **Enter Key** - Press Enter to submit  
✅ **Sample Buttons** - Try each platform button  
✅ **Download Options** - View different qualities  
✅ **Copy Link** - Test the copy button  
✅ **History** - Open the history panel  
✅ **Reset** - Click "Download Another"  
✅ **Mobile** - Test on phone/tablet  

---

## 🎨 Customization (Quick)

### Change Brand Color

Edit `/src/styles/theme.css`:
```css
--primary: #22c55e;  /* Change this hex color */
```

Common alternatives:
- Blue: `#3b82f6`
- Purple: `#8b5cf6`
- Orange: `#f97316`
- Pink: `#ec4899`

### Change App Name

Edit `/src/app/components/Navbar.tsx`:
```tsx
<h1 className="text-2xl font-bold text-white">ReelGrab</h1>
                                              👆 Change this
```

### Remove History Feature

Edit `/src/app/App.tsx` and remove this line:
```tsx
<HistoryViewer />  ← Delete this line
```

---

## 🐛 Common Issues & Fixes

### Issue: "Failed to fetch video"
**Cause:** Backend not configured  
**Fix:** This is expected with mock data. Integrate real API for production.

### Issue: Clipboard paste doesn't work
**Cause:** Browser security - needs HTTPS  
**Fix:** Test on localhost or deploy to HTTPS domain

### Issue: Styles look broken
**Cause:** Tailwind not compiled  
**Fix:** Restart dev server: `npm run dev`

### Issue: Port already in use
**Cause:** Another app using port 5173  
**Fix:** Kill the other process or change port in `vite.config.ts`

---

## 📚 Next Steps

### For Users
1. ⭐ **Star the project** if you like it
2. 📥 **Download as ZIP** for your own use
3. 🎨 **Customize** the branding
4. 🚀 **Deploy** to your own domain

### For Developers
1. 📖 Read **[README.md](/README.md)** for full overview
2. 🔧 Check **[SETUP_GUIDE.md](/SETUP_GUIDE.md)** for deployment
3. 📡 Review **[API_DOCUMENTATION.md](/API_DOCUMENTATION.md)** for API details
4. ✨ Explore **[FEATURES.md](/FEATURES.md)** for complete feature list

### Production Deployment
1. 🔌 **Integrate real video API** (RapidAPI, yt-dlp)
2. 🚀 **Deploy to Vercel/Netlify** (frontend)
3. ☁️ **Deploy to Supabase** (backend)
4. 💰 **Add real advertisements** (replace placeholders)

---

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production

# Testing
# Just open browser and test with sample URLs

# Deployment (Vercel example)
npm install -g vercel
npm run build
vercel --prod
```

---

## 💡 Pro Tips

### Speed Up Testing
- Use the sample URL buttons instead of copying/pasting
- Press Enter instead of clicking Download
- Use keyboard shortcuts where available

### Best Practices
- Always test on mobile viewport
- Check browser console for errors
- Test with different URL formats
- Verify toast notifications appear

### Development Workflow
1. Make code changes
2. Save file (auto-reload happens)
3. Test in browser
4. Check console for errors
5. Repeat!

---

## 🎉 You're All Set!

ReelGrab is now ready to use. Enjoy downloading videos from TikTok, Instagram, and Facebook!

**Need Help?**
- 📖 Check the [README.md](/README.md)
- 🔧 See [SETUP_GUIDE.md](/SETUP_GUIDE.md)
- 📡 Read [API_DOCUMENTATION.md](/API_DOCUMENTATION.md)

---

**Happy Downloading! 🎬**

*ReelGrab v1.0.0 - March 2026*
