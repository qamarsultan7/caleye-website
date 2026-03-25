# CalEye Image Management Guide

## Folder Structure

```
images/
├── features/              # Feature page images (6 images)
│   ├── ai-recognition.webp
│   ├── nutrition-breakdown.webp
│   ├── meal-history.webp
│   ├── goal-tracking.webp
│   ├── privacy-first.webp
│   └── works-offline.webp
│
├── how-it-works/         # Step-by-step process images (5 images)
│   ├── step-1-snap.webp
│   ├── step-2-analyze.webp
│   ├── step-3-nutrition.webp
│   ├── step-4-confirm.webp
│   └── step-5-progress.webp
│
└── misc/                 # Other images (testimonials, icons, etc.)
    └── [add as needed]
```

## Best Practices for Private Local Image Storage

### 1. **Use WebP Format**
- **Advantage**: 25-35% smaller file size than PNG/JPG
- **Speed**: Faster page loads
- **Quality**: Same visual quality at smaller sizes
- **Command**: Convert images to WebP using online tools or ffmpeg

### 2. **File Naming Convention**
- Use hyphens for word separation: `ai-recognition.webp` (not `ai_recognition.webp`)
- Use lowercase letters only
- Be descriptive: `step-1-snap.webp` not `image1.webp`

### 3. **Image Optimization**
- **Resolution**: 1200x800px for feature/step images (desktop optimal)
- **File Size**: Aim for 100-300KB per image after compression
- **Compression**: Use online tools like TinyPNG or ImageOptim

### 4. **Relative Path Structure**
All images use relative paths from the HTML files:
```html
<!-- From index.html or any page in root -->
<img src="./images/features/ai-recognition.webp" alt="AI Recognition">

<!-- Always use ./ prefix for clarity -->
```

### 5. **Privacy & Security**
- Images are stored locally in your project (not on external CDN)
- No external API calls or dependencies
- Works fully offline once generated
- Git can be configured to exclude large images if needed

### 6. **Generation Workflow**

1. **Use Gemini Nano/Banana** with the prompts in `image-generation-prompts.json`
2. **Download generated images** to appropriate folders
3. **Optimize using online tools** (TinyPNG, Squoosh, etc.)
4. **Convert to WebP** for best compression
5. **Update HTML** with new image paths
6. **Test locally** before deploying

### 7. **HTML Integration**

Include images in HTML with proper attributes:
```html
<figure class="feature-image">
    <img
        src="./images/features/ai-recognition.webp"
        alt="Instant AI Recognition of food items"
        loading="lazy"
        width="1200"
        height="800"
    >
</figure>
```

### 8. **.gitignore Configuration**

Add to `.gitignore` to avoid pushing large images to repository:
```
# Large image files (optional - only if needed)
# Uncomment if you want to store generated images separately
# images/features/*.webp
# images/how-it-works/*.webp

# But DO track image paths and HTML in git
!*.html
!IMAGE_GUIDE.md
!image-generation-prompts.json
```

### 9. **Responsive Images**

For different screen sizes:
```html
<picture>
    <source media="(max-width: 768px)" srcset="./images/features/ai-recognition.webp">
    <img src="./images/features/ai-recognition.webp" alt="AI Recognition">
</picture>
```

### 10. **Performance Tips**

- Use `loading="lazy"` for images below the fold
- Set explicit width/height to prevent layout shift
- Use `srcset` with 2x versions for high-DPI displays
- Consider WebP with JPEG fallback for older browsers

## File Naming for Generated Images

| Feature | Filename | Prompt Reference |
|---------|----------|---------|
| AI Recognition | `ai-recognition.webp` | `feature_1_ai_recognition` |
| Nutrition Breakdown | `nutrition-breakdown.webp` | `feature_2_nutrition` |
| Meal History | `meal-history.webp` | `feature_3_meal_history` |
| Goal Tracking | `goal-tracking.webp` | `feature_4_goal_tracking` |
| Privacy First | `privacy-first.webp` | `feature_5_privacy` |
| Works Offline | `works-offline.webp` | `feature_6_offline` |
| Step 1: Snap | `step-1-snap.webp` | `step_1_snap` |
| Step 2: Analyze | `step-2-analyze.webp` | `step_2_analyze` |
| Step 3: View Nutrition | `step-3-nutrition.webp` | `step_3_nutrition_view` |
| Step 4: Confirm | `step-4-confirm.webp` | `step_4_confirm` |
| Step 5: Progress | `step-5-progress.webp` | `step_5_progress` |

## Deployment

- All images are stored locally in the `images/` folder
- No CDN needed - fully self-hosted
- Ensure `/images/` folder is deployed to production server
- Check `.htaccess` or server config to allow image serving

## Troubleshooting

**Images not showing?**
- Check browser console for 404 errors
- Verify path is `./images/features/filename.webp`
- Ensure file extension matches exactly

**Images too large?**
- Compress using TinyPNG (recommended - preserves quality)
- Convert to WebP format for 25-35% size reduction
- Resize to 1200x800px maximum

**Wanting to add more images?**
- Create new subdirectories as needed
- Follow same naming convention
- Update HTML img src paths
