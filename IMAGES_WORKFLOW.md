# CalEye Image Generation & Management Workflow

## Quick Start: 11 Steps to Get Images

### Phase 1: Generate Images (Using Gemini Nano/Banana)

1. **Open [image-generation-prompts.json](image-generation-prompts.json)**
   - Contains 11 ready-to-use prompts
   - 6 feature prompts + 5 how-it-works step prompts

2. **Feature Images (Generate 6 images)**
   - Copy prompt for `feature_1_ai_recognition`
   - Paste into Gemini Nano interface
   - Download generated image
   - Repeat for all 6 features

3. **How-It-Works Images (Generate 5 images)**
   - Copy prompt for `step_1_snap`
   - Paste into Gemini Nano interface
   - Download generated image
   - Repeat for all 5 steps

### Phase 2: Optimize Images

4. **Download Images to Local Folder**
   - Create temporary folder: `downloads/`
   - Save all 11 generated images there

5. **Compress Images Using TinyPNG**
   - Go to [https://tinypng.com](https://tinypng.com)
   - Upload images (batch: drag all 11 at once)
   - Download compressed versions
   - File size reduction: 25-35%

6. **Convert to WebP Format**
   - Use online: [https://squoosh.app](https://squoosh.app)
   - Upload PNG/JPEG → Export as WebP
   - WebP provides 25-35% better compression than PNG
   - Result: Much faster page loading

### Phase 3: Organize & Deploy

7. **Move Optimized Images to Project Folders**

   **Features folder:**
   ```
   images/features/
   ├── ai-recognition.webp
   ├── nutrition-breakdown.webp
   ├── meal-history.webp
   ├── goal-tracking.webp
   ├── privacy-first.webp
   └── works-offline.webp
   ```

   **How-It-Works folder:**
   ```
   images/how-it-works/
   ├── step-1-snap.webp
   ├── step-2-analyze.webp
   ├── step-3-nutrition.webp
   ├── step-4-confirm.webp
   └── step-5-progress.webp
   ```

8. **Test Images Locally**
   - Open `features.html` in browser
   - Verify all 6 feature images load
   - Open `how-it-works.html` in browser
   - Verify all 5 step images load
   - Check mobile responsive view

### Phase 4: Version Control & Deployment

9. **Git Commit Images**
   ```bash
   git add images/
   git commit -m "Add feature and how-it-works images"
   ```

10. **Deploy to Production**
    - Ensure `/images/` folder is included in deployment
    - Test on live server
    - Verify all images load with correct paths

11. **Monitor Performance**
    - Check page load times (target: < 3s)
    - Monitor image requests in browser DevTools
    - Adjust compression if needed

---

## File Naming Reference

| Feature | Filename | Dimensions | Max Size |
|---------|----------|-----------|----------|
| AI Recognition | `ai-recognition.webp` | 600x400px | 150KB |
| Nutrition Breakdown | `nutrition-breakdown.webp` | 600x400px | 150KB |
| Meal History | `meal-history.webp` | 600x400px | 150KB |
| Goal Tracking | `goal-tracking.webp` | 600x400px | 150KB |
| Privacy First | `privacy-first.webp` | 600x400px | 150KB |
| Works Offline | `works-offline.webp` | 600x400px | 150KB |
| Step 1: Snap | `step-1-snap.webp` | 600x300px | 120KB |
| Step 2: Analyze | `step-2-analyze.webp` | 600x300px | 120KB |
| Step 3: View Nutrition | `step-3-nutrition.webp` | 600x300px | 120KB |
| Step 4: Confirm | `step-4-confirm.webp` | 600x300px | 120KB |
| Step 5: Progress | `step-5-progress.webp` | 600x300px | 120KB |

**Total Budget:** ~1.5MB for all 11 images (well below typical CDN limits)

---

## Best Practices Summary

### Storage Method: Local Project Folder
✅ **Advantages:**
- Complete privacy - no external services
- Works fully offline after generated
- Version controlled with git
- No CDN costs
- Fast local loading
- Easy to update

❌ **Trade-offs:**
- Slightly larger project folder (~1-2MB)
- Must optimize images for web
- Requires git LFS for very large files (>100MB)

### Image Optimization Best Practices
1. **Always use WebP format** (25-35% smaller than PNG/JPEG)
2. **Compress with TinyPNG** (preserve quality while reducing size)
3. **Use appropriate dimensions:**
   - Features: 600x400px (Desktop optimal)
   - Steps: 600x300px (Compact timeline)
4. **Add width/height attributes** (prevents layout shift)
5. **Use loading="lazy"** (defer below-fold images)

### HTML Implementation
All images already updated with:
```html
<img
    src="./images/features/ai-recognition.webp"
    alt="Instant AI Recognition"
    loading="lazy"
    width="600"
    height="400"
>
```

**Relative paths** (`./images/`) work anywhere:
- Local development ✓
- Live production ✓
- No external dependencies ✓

---

## Troubleshooting

**Images not showing after deployment?**
- Check that `/images/` folder was copied to server
- Verify file permissions (readable by web server)
- Check browser console for 404 errors
- Test with DevTools Network tab

**Images too slow on mobile?**
- Reduce dimensions (mobile: 400x267px)
- Further compress with TinyPNG
- Consider lazy loading (already implemented)

**Want to add more images later?**
1. Generate with same prompt format
2. Compress and convert to WebP
3. Save to appropriate subfolder in `images/`
4. Update HTML with new `<img>` tags
5. Use same relative path format

---

## Git Strategy for Images

### Current Setup
Images are **tracked in git** for maximum convenience:
- All images committed to repository
- Full history with every change
- Easy collaboration
- No external dependencies

### If Project Gets Too Large
Git LFS (Large File Storage) can be added:
```bash
git lfs install
git lfs track "images/**/*.webp"
```

But for CalEye (~11 images, ~1.5MB total), regular git tracking is fine.

---

## Performance Metrics

### Typical Load Times
- with optimized WebP images: **0.5-1.0 seconds** for all images
- without optimization: **2-3 seconds**
- with external CDN removal savings: **200-500ms** faster

### SEO Benefits
- Faster page load = Better Google ranking
- Local serving = Consistent performance
- Optimized images = Lower bandwidth use
- Self-hosted = No CDN dependencies

---

## Next Steps

1. ✅ Folder structure created (`images/features/`, `images/how-it-works/`)
2. ✅ HTML updated with local image paths (features.html, how-it-works.html)
3. ✅ Prompts ready in `image-generation-prompts.json`
4. ⏭️ **YOUR ACTION:** Generate 11 images using Gemini Nano/Banana
5. ⏭️ **YOUR ACTION:** Optimize with TinyPNG + convert to WebP
6. ⏭️ **YOUR ACTION:** Move optimized images to `images/` subfolders
7. ⏭️ **YOUR ACTION:** Test locally at `features.html` and `how-it-works.html`
8. ⏭️ **YOUR ACTION:** Commit to git and deploy to production

---

## Support Resources

- **Compression:** [TinyPNG.com](https://tinypng.com) - Recommended for quality preservation
- **Format Conversion:** [Squoosh.app](https://squoosh.app) - Google's image optimization tool
- **WebP Info:** [WebP.dev](https://developers.google.com/speed/webp) - Format benefits
- **Image Generation:** [Gemini AI](https://makersui.ai) - Using the provided prompts
