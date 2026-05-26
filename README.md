# Keshav Labs — Premium Minimalist AI Productivity Blog & Brand

This repository houses the complete, high-fidelity codebase for **Keshav Labs** — a premium, lightweight, search-optimized AI productivity media platform and service business.

The platform is designed using a strict light-mode, high-contrast typography hierarchy, and precise whitespace spacing inspired by modern startup frameworks (such as Linear and Notion). It is built with zero framework overhead—using pure HTML5, vanilla CSS3 design tokens, and lightweight vanilla ES6 JS—ensuring **instantaneous load times (100/100 Lighthouse performance)** and flawless indexation on search engines.

---

## 📂 Repository File Index
* `index.html` — The main brand landing terminal with dashboards and call-outs.
* `articles.html` — The dedicated searchable/filterable blog catalog.
* `workflows.html` — The visual playbooks panel (SaaS-style switcher).
* `services.html` — Service packages, transparent starting rates, and FAQs.
* `about.html` — Systems philosophy, operational values, and founder bio.
* `contact.html` — Dynamic contact inquiries terminal.
* `post-zero-maintenance-ai.html` — Cornerstone post (*"Zero-Maintenance AI Content Machine"*).
* `post-stem-study-framework.html` — Secondary deep guide (*"AI Study Framework for STEM Majors"*).
* `post-template.html` — Reusable pre-styled article template for rapid publishing.
* `style.css` — Centralized global tokens, keyframe animations, and layouts.
* `app.js` — Core JS engine (search, filters, progress tracker, and form handlers).

---

## 🚀 Setting Up Free Hosting on GitHub Pages

Because this codebase consists of pure static assets, you can host the website completely free with near-infinite scaling using **GitHub Pages**. 

Follow these steps to deploy:

### Step 1: Create a GitHub Repository
1. Log in to your account at [github.com](https://github.com).
2. Create a new repository named `keshav-labs` (or any custom name). Keep it **Public**.
3. Do **not** initialize it with a README, `.gitignore`, or License (as we have already provided them locally!).

### Step 2: Push Local Files to GitHub
Open your terminal inside this project folder (`C:\Users\icee3\.gemini\antigravity\scratch\keshav-labs`) and execute:
```bash
# Link your local repository to your new GitHub remote
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/keshav-labs.git

# Rename branch to main
git branch -M main

# Push files up
git push -u origin main
```
*(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username).*

### Step 3: Activate GitHub Pages
1. Go to your repository page on GitHub.
2. Click on the **Settings** tab at the top.
3. In the left-hand sidebar, navigate to the **Pages** menu (under the "Code and automation" section).
4. Under **Build and deployment**:
   - Set **Source** to `Deploy from a branch`.
   - Under **Branch**, select `main` (or `master`) and specify the `/ (root)` folder.
   - Click the **Save** button.
5. Wait 1–2 minutes. Refresh the settings page, and you will see your active production link at the top:
   🎉 *“Your site is live at `https://YOUR_GITHUB_USERNAME.github.io/keshav-labs/`”*

---

## ✍️ How to Publish New Blog Posts on GitHub

To publish a new article, you or any automation agent can quickly compose content using the provided **`post-template.html`** file.

### Step 1: Copy and Name the Template
Duplicate `post-template.html` and save it under a search-optimized relative path name (e.g. `post-my-new-automation-guide.html`).

### Step 2: Edit Metadata & Article Copy
Open the new HTML file and edit:
* `<title>` tag (keep it under 60 characters).
* `<meta name="description">` (keep it under 155 characters).
* `<h1>` title heading, category badge, and published date.
* Add your structural H2/H3 headings and paragraph blocks inside the `<div class="article-body">` container.

### Step 3: Link the New Article to the Library
Open both `index.html` and `articles.html`, and add a new card to the article grid referencing your new file:
```html
<div class="blog-card" data-category="workflows" onclick="window.location.href='post-my-new-automation-guide.html';">
  <div class="blog-image-wrapper">
    <!-- SVG Icon or custom cover graphic -->
  </div>
  <div class="blog-content">
    <div class="post-meta-line">
      <span class="post-cat-badge">Workflows</span>
      <span>8 min read</span>
    </div>
    <h4 class="blog-title">Your New Article Headline Here</h4>
    <p class="blog-excerpt">Brief 1-2 sentence article description summarizing your value takeaways.</p>
    <span class="blog-btn">
      Read Guide
      <!-- SVG Arrow -->
    </span>
  </div>
</div>
```

### Step 4: Commit and Push to Deploy
Once your page is ready, push it to GitHub:
```bash
git add .
git commit -m "Publish new post: My New Automation Guide"
git push origin main
```
GitHub Pages will automatically build and update your live URL inside 30 seconds!
