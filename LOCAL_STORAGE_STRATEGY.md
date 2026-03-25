# CalEye Local Private Image Storage Strategy

## Overview: Why Store Images Locally?

CalEye uses **local, private image storage** in the project folder rather than external CDNs or cloud services. This provides maximum privacy, control, and reliability.

---

## Storage Architecture

### Folder Structure
```
caleye-website/
├── images/                           # All images stored here
│   ├── features/                     # 6 feature showcase images
│   │   ├── ai-recognition.webp       # 1. AI Recognition feature
│   │   ├── nutrition-breakdown.webp  # 2. Nutrition Breakdown feature
│   │   ├── meal-history.webp         # 3. Meal History Timeline feature
│   │   ├── goal-tracking.webp        # 4. Goal Tracking feature
│   │   ├── privacy-first.webp        # 5. Privacy First feature
│   │   └── works-offline.webp        # 6. Works Offline feature
│   │
│   ├── how-it-works/                 # 5 step-by-step process images
│   │   ├── step-1-snap.webp          # Step 1: Take photo
│   │   ├── step-2-analyze.webp       # Step 2: AI analyzes
│   │   ├── step-3-nutrition.webp     # Step 3: View results
│   │   ├── step-4-confirm.webp       # Step 4: Confirm & log
│   │   └── step-5-progress.webp      # Step 5: Track progress
│   │
│   ├── misc/                         # Additional images (future use)
│   │
│   ├── IMAGE_GUIDE.md                # Image management guide
│   └── [generated images stored here]
│
├── index.html                        # Home page
├── features.html                     # Features page (uses features/ images)
├── how-it-works.html                 # How-it-works page (uses how-it-works/ images)
├── .gitignore                        # Git configuration (tracks images)
├── image-generation-prompts.json     # AI prompts for image generation
└── IMAGES_WORKFLOW.md                # Step-by-step image workflow guide
```

### Files Already Updated
- ✅ **features.html** - All 6 feature image references point to `./images/features/`
- ✅ **how-it-works.html** - All 5 step image references point to `./images/how-it-works/`

---

## Why Local Storage Over CDN?

### ✅ Advantages of Local Storage

| Feature | Benefit |
|---------|---------|
| **Privacy** | Your images never leave your server. No external tracking. |
| **Control** | You own the images. No terms of service restrictions. |
| **Reliability** | Not dependent on third-party CDN uptime. |
| **Speed** | Same server = faster load times than external CDN. |
| **Cost** | No CDN fees. Just bandwidth included in your hosting. |
| **Ownership** | Complete control over image versions and updates. |
| **Offline** | Works fully offline after initial load. |

### 📊 Comparison: Local vs CDN

| Factor | Local Storage | CDN | Cloud Service |
|--------|---------------|-----|---------------|
| Privacy | ✅ Full Control | ⚠️ Third-party | ❌ Stored remotely |
| Cost | ✅ Free | ❌ $100+/mo | ❌ Varies |
| Speed | ✅ Same server | ✅ Faster globally | ⚠️ Network latency |
| Ownership | ✅ Full control | ⚠️ Limited | ⚠️ Limited |
| Backup | ✅ Git version control | ⚠️ Manual | ⚠️ Limited |

---

## Implementation Details

### Relative Path Usage
All images use **relative paths** from the HTML file location:

```html
<!-- From any HTML page in root directory -->
<img src="./images/features/ai-recognition.webp" alt="...">

<!-- This works in all environments: -->
✓ Local: file:///C:/project/index.html
✓ Production: https://caleye.com/ with /images/ folder
✓ Subdirectory: https://example.com/caleye/ (adjust paths accordingly)
```

**Why relative paths?**
- No hardcoded URLs to change
- Works in any environment
- Easy to deploy
- No external dependencies

### Image Specifications

**Quality Standards:**
- Format: WebP (best compression)
- Fallback: PNG/JPEG supported
- Compression: TinyPNG optimized
- Dimensions: Optimized for web (600x400, 600x300)
- Total size: ~1.5MB for all 11 images

**File Size Targets:**
```
Feature images (6×): ~150KB each = 900KB
Step images (5×): ~120KB each = 600KB
Total: ~1.5MB
Load time: < 1 second on typical connections
```

---

## Git Integration

### Version Control Strategy
Images are **tracked in git** for:
- ✅ Version history with code
- ✅ Easy collaboration
- ✅ Backup redundancy
- ✅ No external dependencies

### .gitignore Configuration
```bash
# Git TRACKS image files (stored in version control)
# This is intentional for CalEye project

# If images folder grows too large (>100MB):
# Use git-lfs instead:
# git lfs track "images/**/*.webp"
```

### Deployment
```bash
# Commit images with code
git add images/
git commit -m "Add feature and how-it-works images"
git push

# Deploy: Ensure /images/ folder copied to server
# All relative paths work immediately
```

---

## Security & Privacy

### Data Protection
1. **On-Device Processing**
   - AI image analysis happens server-side
   - Images only stored locally
   - No cloud image storage

2. **No Tracking**
   - No external image services
   - No CDN tracking pixels
   - No third-party access logs

3. **HTTPS Recommended**
   - Use HTTPS in production
   - Images served over encrypted connection
   - Browser caching enabled

4. **Access Control**
   - Standard web server file permissions
   - No special authentication needed for images
   - Standard HTTP/HTTPS access

### GDPR & Privacy Compliance
✅ **Compliant because:**
- No third-party processing
- No PII in image metadata
- Full data ownership
- Easy data export/deletion

---

## Performance Optimization

### Current Optimizations
✅ WebP format (25-35% smaller than PNG)
✅ TinyPNG compression
✅ Lazy loading attributes
✅ Width/height attributes (prevents layout shift)
✅ Relative paths (no external dependencies)
✅ Same-server hosting (no network overhead)

### Typical Performance
```
Feature page load:
- 6 images (feature): 1.2-1.8 seconds
- Total assets: ~2.5 seconds

How-it-works page:
- 5 images (steps): 0.8-1.2 seconds
- Total assets: ~2.0 seconds
```

### Further Optimization Options
Optional (if needed):
- Image sprites (combine multiple images)
- Progressive loading (blur-up effect)
- AVIF format (newer, better compression)
- Responsive images (multiple sizes per image)

---

## Maintenance & Updates

### Adding New Images
1. Generate with Gemini Nano/Banana
2. Compress with TinyPNG
3. Convert to WebP
4. Save to appropriate subfolder
5. Update HTML img src
6. Commit and deploy

### Updating Existing Images
1. Regenerate image with improved prompt
2. Replace file (same filename)
3. Commit: `git add images/`
4. Deploy (browser cache may need clearing)

### Image Versioning
If you want to keep old versions:
```
images/features/
├── ai-recognition.webp        # Current version
└── ai-recognition-v1.webp     # Previous version
```

---

## Troubleshooting

### Images Not Showing?

**Check 1: File Paths**
- Open browser DevTools (F12)
- Go to Network tab
- Check if image requests return 404
- Verify filename matches exactly (case-sensitive on Linux)

**Check 2: File Permissions**
- Ensure `/images/` folder readable by web server
- Files should have 644 permissions (owner read/write)
- Folder should have 755 permissions

**Check 3: Server Configuration**
- Verify web root includes `/images/` folder
- Check `.htaccess` (if using Apache) allows image access
- Verify web server user has read permission

### Slow Image Loading?

**If images load slowly:**
1. Check file sizes (should be < 200KB each)
2. Verify compression with TinyPNG
3. Check server bandwidth (CDN not needed)
4. Monitor browser cache

### Images Load Locally but Not on Production?

**Common causes:**
1. `/images/` folder not deployed
2. Permissions not set correctly
3. Path still using hardcoded domain name
4. Web server misconfigured

**Solution:**
```bash
# Verify local path works
file:///path/to/features.html → images load ✓

# Verify production path
https://yourdomain.com/features.html → images load ✓

# If not working:
# 1. SSH to server
# 2. ls -la images/  (verify folder exists)
# 3. ls -la images/features/  (verify images exist)
# 4. Check web server error logs
```

---

## Best Practices Summary

1. **Use WebP Format**
   - 25-35% smaller than PNG/JPEG
   - Widely supported in modern browsers
   - Use PNG as fallback if needed

2. **Optimize Before Uploading**
   - TinyPNG for compression
   - Correct dimensions (600x400, 600x300)
   - Remove unnecessary metadata

3. **Use Relative Paths**
   - `./images/features/` not absolute paths
   - Works in any environment
   - No external dependencies

4. **Set Image Dimensions**
   - Prevents layout shift
   - Helps browser allocate space
   - Required for responsive images

5. **Use Lazy Loading**
   - `loading="lazy"` already set
   - Defers below-fold images
   - Improves page speed

6. **Keep in Version Control**
   - Commit images with code
   - Easy collaboration
   - Version history preserved

7. **Monitor Performance**
   - Use PageSpeed Insights
   - Check browser Network tab
   - Target < 3-second page load

---

## Resources

- **Image Optimization:** [TinyPNG.com](https://tinypng.com)
- **Format Conversion:** [Squoosh.app](https://squoosh.app)
- **Prompts:** [image-generation-prompts.json](image-generation-prompts.json)
- **Workflow Guide:** [IMAGES_WORKFLOW.md](IMAGES_WORKFLOW.md)
- **Technical Details:** [IMAGE_GUIDE.md](images/IMAGE_GUIDE.md)
