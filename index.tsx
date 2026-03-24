import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-22961a83/health", (c) => {
  return c.json({ status: "ok" });
});

// Video download endpoint
app.post("/make-server-22961a83/download", async (c) => {
  try {
    const { url } = await c.req.json();
    
    if (!url) {
      return c.json({ error: "URL is required" }, 400);
    }

    // Validate URL format
    if (!isValidVideoUrl(url)) {
      return c.json({ error: "Invalid video URL. Please provide a valid TikTok, Instagram, or Facebook URL." }, 400);
    }

    // Detect platform
    const platform = detectPlatform(url);
    
    // Mock video extraction (in production, you would use a third-party API)
    const videoData = await extractVideoData(url, platform);

    // Save to download history
    const timestamp = new Date().toISOString();
    const historyKey = `download_${timestamp}_${Math.random().toString(36).substring(7)}`;
    
    await kv.set(historyKey, {
      url,
      platform,
      timestamp,
      title: videoData.title,
    });

    return c.json(videoData);
  } catch (error) {
    console.log(`Error processing download request: ${error}`);
    return c.json({ error: "Failed to process video. Please check the URL and try again." }, 500);
  }
});

// Get download history
app.get("/make-server-22961a83/history", async (c) => {
  try {
    const history = await kv.getByPrefix("download_");
    
    // Sort by timestamp descending
    const sortedHistory = history.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return c.json({ history: sortedHistory.slice(0, 50) }); // Return last 50
  } catch (error) {
    console.log(`Error fetching download history: ${error}`);
    return c.json({ error: "Failed to fetch history" }, 500);
  }
});

function isValidVideoUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    const validDomains = [
      'tiktok.com',
      'www.tiktok.com',
      'vm.tiktok.com',
      'instagram.com',
      'www.instagram.com',
      'facebook.com',
      'www.facebook.com',
      'fb.watch',
    ];
    
    return validDomains.some(domain => parsedUrl.hostname.includes(domain));
  } catch {
    return false;
  }
}

function detectPlatform(url: string): string {
  if (url.includes('tiktok.com')) return 'TikTok';
  if (url.includes('instagram.com')) return 'Instagram';
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'Facebook';
  return 'Unknown';
}

async function extractVideoData(url: string, platform: string) {
  // This is a mock implementation
  // In production, you would integrate with a third-party API like RapidAPI
  // or a service that supports video extraction
  
  const mockTitles = [
    "Amazing dance performance",
    "Funny cat compilation",
    "Cooking tutorial: Perfect pasta",
    "Travel vlog: Beautiful sunset",
    "Fitness motivation workout",
    "DIY home improvement tips",
    "Gaming highlights compilation",
    "Music cover performance",
  ];

  const mockThumbnails = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
  ];

  const randomTitle = mockTitles[Math.floor(Math.random() * mockTitles.length)];
  const randomThumbnail = mockThumbnails[Math.floor(Math.random() * mockThumbnails.length)];

  return {
    title: `${randomTitle} - ${platform}`,
    thumbnail: randomThumbnail,
    platform,
    formats: [
      {
        quality: "1080p HD",
        url: `${url}#download_1080p`,
        size: "45.2 MB",
        type: "video",
      },
      {
        quality: "720p",
        url: `${url}#download_720p`,
        size: "28.5 MB",
        type: "video",
      },
      {
        quality: "480p",
        url: `${url}#download_480p`,
        size: "15.8 MB",
        type: "video",
      },
      {
        quality: "Audio Only (MP3)",
        url: `${url}#download_audio`,
        size: "3.2 MB",
        type: "audio",
      },
    ],
  };
}

Deno.serve(app.fetch);