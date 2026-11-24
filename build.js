import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const startTime = performance.now();

const CONTENT_DIR = path.resolve('content/tips');
const TEMPLATES_DIR = path.resolve('templates');
const DIST_DIR = path.resolve('dist');
const TIPS_DIST_DIR = path.resolve('dist/tips');

// 1. Prepare dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });
fs.mkdirSync(TIPS_DIST_DIR, { recursive: true });

// 2. Copy style.css
fs.copyFileSync(path.join(TEMPLATES_DIR, 'style.css'), path.join(DIST_DIR, 'style.css'));

// 3. Read and parse markdown files
const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));

const articles = files.map(filename => {
  const slug = filename.replace(/\.md$/, '');
  const filePath = path.join(CONTENT_DIR, filename);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(rawContent);

  return {
    slug,
    data: {
      title: data.title || 'Không có tiêu đề',
      emoji: data.emoji || '💡',
      description: data.description || '',
      category: data.category || 'Chung',
      tags: data.tags || [],
      verified: data.verified ?? true,
      readTimeMinutes: data.readTimeMinutes || 3,
      updatedDate: data.updatedDate || '',
      quickTakeaways: data.quickTakeaways || [],
    },
    htmlContent: marked.parse(content),
  };
});

// Sort articles by date descending
articles.sort((a, b) => new Date(b.data.updatedDate) - new Date(a.data.updatedDate));

// Group articles by Category (Topic Clusters)
const categoriesMap = new Map();
for (const article of articles) {
  const cat = article.data.category;
  if (!categoriesMap.has(cat)) {
    categoriesMap.set(cat, []);
  }
  categoriesMap.get(cat).push(article);
}

// Common HTML Head & Header Component
function renderHeader(isArticle = false) {
  const homeLink = isArticle ? '../index.html' : './index.html';
  return `
    <header class="navbar">
      <div class="container nav-inner">
        <a href="${homeLink}" class="brand">
          <span>📓</span>
          <span>Bí kỹ cá nhân của Dz</span>
        </a>
        <div class="nav-actions">
          <span class="badge-verified">
            <span class="badge-dot"></span>
            Đã thực chứng
          </span>
          <button id="theme-toggle" class="btn-theme" aria-label="Toggle theme">
            <svg id="moon-icon" style="width:16px;height:16px;display:none;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg id="sun-icon" style="width:16px;height:16px;display:block;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  `;
}

function renderScripts() {
  return `
    <script>
      const toggle = document.getElementById('theme-toggle');
      const sunIcon = document.getElementById('sun-icon');
      const moonIcon = document.getElementById('moon-icon');

      function updateIcons(isDark) {
        if (sunIcon && moonIcon) {
          sunIcon.style.display = isDark ? 'none' : 'block';
          moonIcon.style.display = isDark ? 'block' : 'none';
        }
      }

      // Check current
      const isDark = document.documentElement.classList.contains('dark');
      updateIcons(isDark);

      toggle?.addEventListener('click', () => {
        const dark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        updateIcons(dark);
      });
    </script>
  `;
}

// 4. Build Homepage (dist/index.html)
let clustersHtml = '';
for (const [category, items] of categoriesMap.entries()) {
  const cardsHtml = items.map(item => `
    <a href="./tips/${item.slug}.html" class="card">
      <div class="card-emoji">${item.data.emoji}</div>
      <div class="card-content">
        <div class="card-meta">
          <span>${item.data.category}</span>
          <span>•</span>
          <span>${item.data.readTimeMinutes} phút đọc</span>
        </div>
        <h3 class="card-title">${item.data.title}</h3>
        <p class="card-desc">${item.data.description}</p>
        ${item.data.quickTakeaways && item.data.quickTakeaways.length > 0 ? `
          <div class="card-highlights">
            ${item.data.quickTakeaways.slice(0, 2).map(pt => `
              <div class="highlight-item">
                <span class="highlight-icon">⚡</span>
                <span>${pt}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </a>
  `).join('');

  clustersHtml += `
    <section class="cluster">
      <div class="cluster-header">
        <h2 class="cluster-title">
          <span>📁</span>
          <span>${category}</span>
        </h2>
        <span class="cluster-count">${items.length} bí kỹ</span>
      </div>
      <div class="cards-grid">
        ${cardsHtml}
      </div>
    </section>
  `;
}

const indexHtml = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bí kỹ cá nhân của Dz - Cẩm nang thực chiến tinh gọn từ AI</title>
  <meta name="description" content="Tổng hợp các mẹo đời sống, nhà bếp và sức khỏe hữu ích tinh gọn từ AI và đã kiểm chứng thành công trong thực tế.">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%22><text y=%2226%22 font-size=%2224%22>📓</text></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
  <script>
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>
</head>
<body>
  ${renderHeader(false)}

  <main class="container">
    <section class="hero">
      <div class="hero-icon">📓</div>
      <h1 class="hero-title">Bí kỹ cá nhân của Dz</h1>
      <p class="hero-desc">
        Kho cẩm nang đời sống & nhà bếp thực chiến. Tinh gọn từ các đối thoại chuyên sâu cùng AI và đã kiểm chứng hiệu quả với bản thân.
      </p>
    </section>

    <!-- Topic Clusters List -->
    ${clustersHtml}
  </main>

  <footer class="footer container">
    <p>Bí kỹ cá nhân của Dz • Tinh gọn & Thực tế • Được tạo với HTML/CSS tĩnh siêu nhẹ</p>
  </footer>

  ${renderScripts()}
</body>
</html>`;

fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHtml, 'utf-8');

// 5. Build Each Article Page (dist/tips/${slug}.html)
for (const article of articles) {
  const articleHtml = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${article.data.title} - Bí kỹ cá nhân của Dz</title>
  <meta name="description" content="${article.data.description}">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220%22><text y=%2226%22 font-size=%2224%22>📓</text></svg>">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css">
  <script>
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  </script>
</head>
<body>
  ${renderHeader(true)}

  <main class="container">
    <article>
      <header class="article-header">
        <nav class="breadcrumb">
          <a href="../index.html">← Trang chủ</a>
          <span>/</span>
          <span>${article.data.category}</span>
        </nav>

        <div class="article-emoji">${article.data.emoji}</div>
        <h1 class="article-title">${article.data.title}</h1>
        <p class="article-desc">${article.data.description}</p>

        <div class="article-meta-row">
          <span>✓ Đã kiểm chứng thực tế</span>
          <span>•</span>
          <span>${article.data.readTimeMinutes} phút đọc</span>
          <span>•</span>
          <span>Cập nhật: ${article.data.updatedDate}</span>
        </div>

        ${article.data.quickTakeaways && article.data.quickTakeaways.length > 0 ? `
          <div class="takeaways-box">
            <div class="takeaways-title">
              <span>⚡</span>
              <span>Tóm tắt cốt lõi (Nhớ nhanh trước khi làm):</span>
            </div>
            <ul class="takeaways-list">
              ${article.data.quickTakeaways.map(pt => `<li>${pt}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </header>

      <div class="prose">
        ${article.htmlContent}
      </div>

      <footer class="article-footer">
        <a href="../index.html" class="btn-back">
          ← Về mục lục chủ đề
        </a>
        <button id="btn-copy" class="btn-copy">
          <span id="copy-text">Sao chép link</span>
        </button>
      </footer>
    </article>
  </main>

  <footer class="footer container">
    <p>Bí kỹ cá nhân của Dz • Tinh gọn & Thực tế</p>
  </footer>

  ${renderScripts()}
  <script>
    const copyBtn = document.getElementById('btn-copy');
    const copyText = document.getElementById('copy-text');
    copyBtn?.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      if (copyText) {
        copyText.textContent = '✓ Đã chép link!';
        setTimeout(() => { copyText.textContent = 'Sao chép link'; }, 2000);
      }
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(TIPS_DIST_DIR, `${article.slug}.html`), articleHtml, 'utf-8');
}

const elapsed = (performance.now() - startTime).toFixed(1);
console.log(`✓ [Clean & Fresh] Built ${articles.length} articles in ${categoriesMap.size} clusters to dist/ (${elapsed}ms)`);
