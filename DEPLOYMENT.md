# 🚀 Quick Deployment Guide

## Deploy to Cloudflare Pages

### Option 1: GitHub Integration (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Optimize performance for Cloudflare"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** > **Create a project**
   - Connect your GitHub repository
   - Select your repository: `Ujjwal_Nepal`

3. **Configure Build Settings**
   - **Framework preset**: Next.js
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Environment variables**: (Add if needed from `.env.local.example`)

4. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare will build and deploy your site

### Option 2: Direct Deployment

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build for Cloudflare**
   ```bash
   npm run pages:build
   ```

4. **Deploy**
   ```bash
   wrangler pages deploy .vercel/output/public --project-name=ujjwal-nepal-portfolio
   ```

### Option 3: Vercel (Current Setup)

Your site is already configured for Vercel. Simply:

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Vercel will auto-deploy**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Your project will show the new deployment
   - Wait for build to complete

## 🌐 Custom Domain Setup

### Cloudflare Pages

1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to **Custom domains**
3. Click **Add custom domain**
4. Enter your domain: `ujjwal-nepal.com.np`
5. Follow the DNS configuration steps

### Vercel

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** > **Domains**
3. Add your domain: `ujjwal-nepal.com.np`
4. Update DNS records at your domain registrar

## ⚡ Post-Deployment Optimization

### Enable Cloudflare Features (If using Cloudflare Pages)

1. **Auto Minify**
   - Go to **Speed** > **Optimization**
   - Enable: Auto Minify (JavaScript, CSS, HTML)

2. **Brotli Compression**
   - Already enabled by default on Cloudflare

3. **Caching**
   - Go to **Caching** > **Configuration**
   - Set **Browser Cache TTL** to 1 month

4. **Image Optimization** (Optional but Recommended)
   - Go to **Images** > **Cloudflare Images**
   - Create an Images project
   - Upload your images
   - Update image URLs in your code

5. **Analytics**
   - Go to **Analytics** to monitor performance
   - Check **Core Web Vitals**

## 📊 Performance Testing

After deployment, test your site:

1. **Google PageSpeed Insights**
   ```
   https://pagespeed.web.dev/
   ```

2. **WebPageTest**
   ```
   https://www.webpagetest.org/
   ```

3. **GTmetrix**
   ```
   https://gtmetrix.com/
   ```

4. **Cloudflare Speed Test**
   - Available in Cloudflare Dashboard > Speed

## 🔧 Troubleshooting

### Build Fails

If the build fails on Cloudflare Pages:

1. Check build logs in Cloudflare Dashboard
2. Ensure all dependencies are in `package.json`
3. Try building locally: `npm run pages:build`

### Images Not Loading

1. Check image paths are correct
2. Ensure images are in `public/` directory
3. Verify remote patterns in `next.config.ts`

### Videos Not Playing

1. Check video file formats (MP4 recommended)
2. Ensure videos are in `public/` directory
3. Check browser console for errors

## 📈 Monitoring

### Set Up Monitoring

1. **Google Search Console**
   - Add your property
   - Submit sitemap
   - Monitor Core Web Vitals

2. **Cloudflare Analytics** (if using Cloudflare)
   - View traffic analytics
   - Monitor performance
   - Check security events

3. **Vercel Analytics** (if using Vercel)
   - Enable in project settings
   - View real-time metrics

## 🎉 Success Checklist

- [ ] Site builds successfully
- [ ] All pages load correctly
- [ ] Images are optimized and loading
- [ ] Videos lazy load properly
- [ ] Mobile responsive design works
- [ ] Dark mode toggle works
- [ ] Navigation prefetching works
- [ ] Contact form functional
- [ ] Blog posts loading
- [ ] Performance score > 90

---

**Need Help?** Check the [CLOUDFLARE_OPTIMIZATION.md](./CLOUDFLARE_OPTIMIZATION.md) for detailed setup instructions.
