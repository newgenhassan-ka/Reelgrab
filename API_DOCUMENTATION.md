# 📡 ReelGrab API Documentation

Complete API reference for ReelGrab backend endpoints.

---

## Base URL

```
https://{projectId}.supabase.co/functions/v1/make-server-22961a83
```

Replace `{projectId}` with your Supabase project ID.

---

## Authentication

All requests require the Supabase anonymous key in the Authorization header:

```http
Authorization: Bearer {publicAnonKey}
```

---

## Endpoints

### 1. Health Check

Check if the API server is running.

**Endpoint:** `GET /health`

**Request:**
```bash
curl https://{projectId}.supabase.co/functions/v1/make-server-22961a83/health \
  -H "Authorization: Bearer {publicAnonKey}"
```

**Response:**
```json
{
  "status": "ok"
}
```

**Status Codes:**
- `200 OK` - Server is running

---

### 2. Download Video

Fetch video metadata and download links from a social media URL.

**Endpoint:** `POST /download`

**Headers:**
```http
Content-Type: application/json
Authorization: Bearer {publicAnonKey}
```

**Request Body:**
```json
{
  "url": "https://www.tiktok.com/@user/video/1234567890"
}
```

**Request Example:**
```bash
curl -X POST https://{projectId}.supabase.co/functions/v1/make-server-22961a83/download \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {publicAnonKey}" \
  -d '{
    "url": "https://www.tiktok.com/@user/video/1234567890"
  }'
```

**Successful Response (200 OK):**
```json
{
  "title": "Amazing dance performance - TikTok",
  "thumbnail": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
  "platform": "TikTok",
  "formats": [
    {
      "quality": "1080p HD",
      "url": "https://www.tiktok.com/@user/video/1234567890#download_1080p",
      "size": "45.2 MB",
      "type": "video"
    },
    {
      "quality": "720p",
      "url": "https://www.tiktok.com/@user/video/1234567890#download_720p",
      "size": "28.5 MB",
      "type": "video"
    },
    {
      "quality": "480p",
      "url": "https://www.tiktok.com/@user/video/1234567890#download_480p",
      "size": "15.8 MB",
      "type": "video"
    },
    {
      "quality": "Audio Only (MP3)",
      "url": "https://www.tiktok.com/@user/video/1234567890#download_audio",
      "size": "3.2 MB",
      "type": "audio"
    }
  ]
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Video title with platform suffix |
| `thumbnail` | string | Video thumbnail URL |
| `platform` | string | Detected platform (TikTok, Instagram, Facebook) |
| `formats` | array | Available download formats |
| `formats[].quality` | string | Quality description (e.g., "1080p HD") |
| `formats[].url` | string | Download URL |
| `formats[].size` | string | File size (e.g., "45.2 MB") |
| `formats[].type` | string | Format type: "video" or "audio" |

**Error Responses:**

**400 Bad Request - Missing URL:**
```json
{
  "error": "URL is required"
}
```

**400 Bad Request - Invalid URL:**
```json
{
  "error": "Invalid video URL. Please provide a valid TikTok, Instagram, or Facebook URL."
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to process video. Please check the URL and try again."
}
```

**Status Codes:**
- `200 OK` - Video data retrieved successfully
- `400 Bad Request` - Invalid or missing URL
- `500 Internal Server Error` - Server-side error

**Supported Platforms:**

| Platform | Supported Domains |
|----------|-------------------|
| TikTok | `tiktok.com`, `www.tiktok.com`, `vm.tiktok.com` |
| Instagram | `instagram.com`, `www.instagram.com` |
| Facebook | `facebook.com`, `www.facebook.com`, `fb.watch` |

**URL Examples:**
```
TikTok:     https://www.tiktok.com/@username/video/1234567890
Instagram:  https://www.instagram.com/reel/ABC123DEF456/
Facebook:   https://www.facebook.com/watch/?v=123456789012345
```

---

### 3. Get Download History

Retrieve the last 50 download requests.

**Endpoint:** `GET /history`

**Headers:**
```http
Authorization: Bearer {publicAnonKey}
```

**Request Example:**
```bash
curl https://{projectId}.supabase.co/functions/v1/make-server-22961a83/history \
  -H "Authorization: Bearer {publicAnonKey}"
```

**Successful Response (200 OK):**
```json
{
  "history": [
    {
      "url": "https://www.tiktok.com/@user/video/1234567890",
      "platform": "TikTok",
      "timestamp": "2026-03-22T14:30:00.000Z",
      "title": "Amazing dance performance - TikTok"
    },
    {
      "url": "https://www.instagram.com/reel/ABC123/",
      "platform": "Instagram",
      "timestamp": "2026-03-22T14:25:00.000Z",
      "title": "Funny cat compilation - Instagram"
    }
  ]
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `history` | array | Array of download history items (max 50) |
| `history[].url` | string | Original video URL |
| `history[].platform` | string | Platform name |
| `history[].timestamp` | string | ISO 8601 timestamp |
| `history[].title` | string | Video title |

**Notes:**
- History is sorted by timestamp (newest first)
- Maximum 50 items returned
- Items are stored in Supabase KV store with keys prefixed `download_`

**Error Response:**

**500 Internal Server Error:**
```json
{
  "error": "Failed to fetch history"
}
```

**Status Codes:**
- `200 OK` - History retrieved successfully
- `500 Internal Server Error` - Server-side error

---

## Data Storage

### Download History Storage

Each successful download is stored in Supabase KV store with:

**Key Format:**
```
download_{timestamp}_{randomId}
```

Example: `download_2026-03-22T14:30:00.000Z_a7b9c2`

**Value Structure:**
```json
{
  "url": "string",
  "platform": "string",
  "timestamp": "string (ISO 8601)",
  "title": "string"
}
```

---

## Rate Limiting

**Current Status:** No rate limiting implemented (demo version)

**Recommended for Production:**
- Implement rate limiting: 20 requests per minute per IP
- Return `429 Too Many Requests` when limit exceeded
- Add retry-after header

**Example Rate Limit Response:**
```json
{
  "error": "Too many requests. Please wait."
}
```

---

## Error Handling

### Standard Error Format

All errors follow this format:

```json
{
  "error": "Human-readable error message"
}
```

### Common Error Scenarios

| Scenario | Status Code | Error Message |
|----------|-------------|---------------|
| Missing URL | 400 | "URL is required" |
| Invalid URL format | 400 | "Invalid video URL. Please provide a valid..." |
| Unsupported platform | 400 | "Invalid video URL. Please provide a valid..." |
| Server error | 500 | "Failed to process video. Please check the URL..." |
| Database error | 500 | "Failed to fetch history" |

---

## CORS Configuration

The API supports requests from any origin with the following configuration:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 600
```

---

## Integration Examples

### JavaScript/TypeScript (Frontend)

```typescript
const projectId = 'your-project-id';
const publicAnonKey = 'your-anon-key';

// Download video
async function downloadVideo(url: string) {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-22961a83/download`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ url }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error);
  }

  return await response.json();
}

// Get history
async function getHistory() {
  const response = await fetch(
    `https://${projectId}.supabase.co/functions/v1/make-server-22961a83/history`,
    {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }

  const data = await response.json();
  return data.history;
}
```

### Python

```python
import requests

PROJECT_ID = 'your-project-id'
PUBLIC_ANON_KEY = 'your-anon-key'
BASE_URL = f'https://{PROJECT_ID}.supabase.co/functions/v1/make-server-22961a83'

headers = {
    'Authorization': f'Bearer {PUBLIC_ANON_KEY}',
    'Content-Type': 'application/json'
}

# Download video
def download_video(url):
    response = requests.post(
        f'{BASE_URL}/download',
        json={'url': url},
        headers=headers
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(response.json().get('error'))

# Get history
def get_history():
    response = requests.get(
        f'{BASE_URL}/history',
        headers={'Authorization': f'Bearer {PUBLIC_ANON_KEY}'}
    )
    
    if response.status_code == 200:
        return response.json()['history']
    else:
        raise Exception('Failed to fetch history')
```

### cURL

```bash
# Download video
curl -X POST \
  'https://{projectId}.supabase.co/functions/v1/make-server-22961a83/download' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer {publicAnonKey}' \
  -d '{"url":"https://www.tiktok.com/@user/video/1234567890"}'

# Get history
curl 'https://{projectId}.supabase.co/functions/v1/make-server-22961a83/history' \
  -H 'Authorization: Bearer {publicAnonKey}'
```

---

## Testing

### Using Postman

1. Create a new request
2. Set method to `POST` for download endpoint
3. Set URL: `https://{projectId}.supabase.co/functions/v1/make-server-22961a83/download`
4. Add headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer {publicAnonKey}`
5. Add body (raw JSON):
   ```json
   {
     "url": "https://www.tiktok.com/@user/video/1234567890"
   }
   ```
6. Send request

### Test URLs (Mock Data)

Since the current implementation uses mock data, any valid URL from supported platforms will work:

```
https://www.tiktok.com/@test/video/1234567890
https://www.instagram.com/reel/ABC123/
https://www.facebook.com/watch/?v=123456789
```

---

## Production Considerations

### Required Changes for Production:

1. **Replace Mock Data**
   - Integrate with real video extraction API (RapidAPI, yt-dlp, etc.)
   - Update `extractVideoData` function in `/supabase/functions/server/index.tsx`

2. **Add Rate Limiting**
   - Prevent abuse
   - Protect server resources

3. **Implement Caching**
   - Cache video metadata
   - Reduce API calls
   - Improve performance

4. **Add Monitoring**
   - Track API usage
   - Monitor errors
   - Set up alerts

5. **Security Enhancements**
   - Input sanitization
   - SQL injection prevention
   - XSS protection

6. **Error Logging**
   - Detailed server logs
   - Error tracking (Sentry, LogRocket)

---

## Changelog

### Version 1.0.0 (March 2026)
- Initial API release
- Mock data implementation
- Download history tracking
- Multi-platform support (TikTok, Instagram, Facebook)

---

## Support

For API issues or questions:
1. Check this documentation
2. Review `/supabase/functions/server/index.tsx` source code
3. Test with provided examples
4. Verify Supabase configuration

---

**API Version:** 1.0.0  
**Last Updated:** March 22, 2026
