/**
 * cms.js (Pro Version)
 * Handles reading and writing to data/articles.json and generating static HTML
 * files in the articles/ directory via the File System Access API.
 * Only runs on localhost.
 */

let dirHandle;
let articlesData = { articles: [] };

document.addEventListener('DOMContentLoaded', () => {
  const btnConnect = document.getElementById('btnConnect');
  const connDot = document.getElementById('connDot');
  const connStatus = document.getElementById('connStatus');
  const contentPanel = document.getElementById('contentPanel');
  const articlesList = document.getElementById('articlesList');
  const articleCount = document.getElementById('articleCount');
  
  const modal = document.getElementById('articleModal');
  const btnNewArticle = document.getElementById('btnNewArticle');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancel = document.getElementById('btnCancel');
  const btnDelete = document.getElementById('btnDelete');
  const btnSave = document.getElementById('btnSave');
  const saveStatus = document.getElementById('saveStatus');
  const form = document.getElementById('articleForm');
  
  const fTitle = document.getElementById('fTitle');
  const fSlug = document.getElementById('fSlug');
  const fCategory = document.getElementById('fCategory');
  const fDifficulty = document.getElementById('fDifficulty');
  const fReadTime = document.getElementById('fReadTime');
  const fMetaTitle = document.getElementById('fMetaTitle');
  const fMetaDesc = document.getElementById('fMetaDesc');
  const fKeywords = document.getElementById('fKeywords');
  const fDriveImage = document.getElementById('fDriveImage');
  const fExcerpt = document.getElementById('fExcerpt');
  const fContent = document.getElementById('fContent');
  const editIndex = document.getElementById('editIndex');

  const countMetaTitle = document.getElementById('countMetaTitle');
  const countMetaDesc = document.getElementById('countMetaDesc');

  if (!window.showDirectoryPicker) {
    connStatus.textContent = 'File System Access API is not supported in this browser. Please use Chrome or Edge.';
    btnConnect.disabled = true;
    return;
  }

  // 1. Connect to Root Directory
  btnConnect.addEventListener('click', async () => {
    try {
      dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      
      // Load data/articles.json
      let dataHandle;
      try {
        const dataDir = await dirHandle.getDirectoryHandle('data');
        dataHandle = await dataDir.getFileHandle('articles.json');
        const file = await dataHandle.getFile();
        const contents = await file.text();
        articlesData = JSON.parse(contents);
      } catch (e) {
        articlesData = { articles: [] };
        console.warn("articles.json not found, starting fresh.");
      }
      
      if (!articlesData.articles) articlesData.articles = [];
      
      connDot.classList.add('connected');
      connStatus.textContent = `Connected to directory: /${dirHandle.name}`;
      btnConnect.style.display = 'none';
      contentPanel.style.display = 'block';
      
      renderArticles();
    } catch (err) {
      if (err.name !== 'AbortError') alert('Error accessing directory: ' + err.message);
    }
  });

  // 2. Render List
  function renderArticles() {
    articleCount.textContent = articlesData.articles.length;
    articlesList.innerHTML = '';
    
    const sorted = [...articlesData.articles].map((a, index) => ({...a, _originalIndex: index}))
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      
    sorted.forEach((article) => {
      const el = document.createElement('div');
      el.className = 'article-row';
      el.innerHTML = `
        <div class="article-info">
          <h4>${article.title} <span class="footer-badge badge-gold" style="margin-left:8px">${article.category}</span></h4>
          <p>${article.publishedAt} • ${article.readTime} • /articles/${article.slug}.html</p>
        </div>
        <div class="article-actions">
          <button onclick="editArticle(${article._originalIndex})">Edit</button>
        </div>
      `;
      articlesList.appendChild(el);
    });
  }

  // 3. Edit / Add
  window.editArticle = function(index) {
    const article = articlesData.articles[index];
    document.getElementById('modalTitle').textContent = 'Edit Article';
    editIndex.value = index;
    
    fTitle.value = article.title || '';
    fSlug.value = article.slug || '';
    fCategory.value = article.category || '';
    fDifficulty.value = article.difficulty || 'Beginner';
    fReadTime.value = article.readTime || '';
    fMetaTitle.value = article.metaTitle || article.title || '';
    fMetaDesc.value = article.metaDesc || article.excerpt || '';
    fKeywords.value = (article.keywords || []).join(', ');
    fDriveImage.value = article.driveImageRaw || '';
    fExcerpt.value = article.excerpt || '';
    fContent.value = article.rawContent || '<p></p>';
    
    updateCounts();
    btnDelete.style.display = 'block';
    openModal();
  };

  btnNewArticle.addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'Add Article';
    form.reset();
    editIndex.value = -1;
    fDifficulty.value = 'Beginner';
    updateCounts();
    btnDelete.style.display = 'none';
    openModal();
  });

  // 4. Helpers
  fTitle.addEventListener('input', () => {
    if (editIndex.value === '-1') {
      fSlug.value = fTitle.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      fMetaTitle.value = fTitle.value;
    }
    updateCounts();
  });

  fMetaTitle.addEventListener('input', updateCounts);
  fMetaDesc.addEventListener('input', updateCounts);

  function updateCounts() {
    countMetaTitle.textContent = `${fMetaTitle.value.length} / 60`;
    countMetaTitle.className = fMetaTitle.value.length > 60 ? 'char-count error' : 'char-count';
    
    countMetaDesc.textContent = `${fMetaDesc.value.length} / 160`;
    countMetaDesc.className = fMetaDesc.value.length > 160 ? 'char-count error' : 'char-count';
  }

  function convertDriveLink(url) {
    if (!url) return '';
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url; // return as is if not a standard drive share link
  }

  // 5. Save Logic (Generate HTML & Update JSON)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btnSave.disabled = true;
    saveStatus.style.display = 'inline-block';
    
    const convertedImgUrl = convertDriveLink(fDriveImage.value);
    const pubDate = new Date().toISOString().split('T')[0];
    
    const articleObj = {
      title: fTitle.value,
      excerpt: fExcerpt.value,
      category: fCategory.value,
      difficulty: fDifficulty.value,
      url: `articles/${fSlug.value}.html`,
      readTime: fReadTime.value,
      slug: fSlug.value,
      keywords: fKeywords.value.split(',').map(k => k.trim()).filter(k => k),
      metaTitle: fMetaTitle.value,
      metaDesc: fMetaDesc.value,
      driveImageRaw: fDriveImage.value, // keep raw for editing later
      driveImageUrl: convertedImgUrl,
      rawContent: fContent.value, // keep raw for editing later
      publishedAt: pubDate
    };

    const idx = parseInt(editIndex.value, 10);
    if (idx >= 0) {
      articleObj.publishedAt = articlesData.articles[idx].publishedAt;
      articlesData.articles[idx] = articleObj;
    } else {
      articlesData.articles.unshift(articleObj);
    }
    
    try {
      // 5a. Save to data/articles.json
      const dataDir = await dirHandle.getDirectoryHandle('data', { create: true });
      const jsonHandle = await dataDir.getFileHandle('articles.json', { create: true });
      const writableJson = await jsonHandle.createWritable();
      
      // Strip raw HTML from JSON to keep it tiny for the homepage grid fetch
      const strippedData = { articles: articlesData.articles.map(a => ({
        ...a, rawContent: undefined, driveImageRaw: undefined 
      }))};
      await writableJson.write(JSON.stringify(strippedData, null, 2));
      await writableJson.close();

      // 5b. Generate Static HTML
      let templateHtml = '';
      try {
        const tplHandle = await dirHandle.getFileHandle('article-template.html');
        const tplFile = await tplHandle.getFile();
        templateHtml = await tplFile.text();
      } catch (e) {
        throw new Error('article-template.html not found in root directory!');
      }

      const finalHtml = templateHtml
        .replace(/\{\{SEO_TITLE\}\}/g, articleObj.metaTitle)
        .replace(/\{\{SEO_DESC\}\}/g, articleObj.metaDesc)
        .replace(/\{\{KEYWORDS\}\}/g, articleObj.keywords.join(', '))
        .replace(/\{\{SLUG\}\}/g, articleObj.slug)
        .replace(/\{\{IMAGE_URL\}\}/g, articleObj.driveImageUrl)
        .replace(/\{\{CATEGORY\}\}/g, articleObj.category)
        .replace(/\{\{DIFFICULTY\}\}/g, articleObj.difficulty)
        .replace(/\{\{TITLE\}\}/g, articleObj.title)
        .replace(/\{\{DATE\}\}/g, articleObj.publishedAt)
        .replace(/\{\{READ_TIME\}\}/g, articleObj.readTime)
        .replace(/\{\{CONTENT\}\}/g, articleObj.rawContent);

      // 5c. Save static HTML to articles/ directory
      const articlesDir = await dirHandle.getDirectoryHandle('articles', { create: true });
      const htmlHandle = await articlesDir.getFileHandle(`${articleObj.slug}.html`, { create: true });
      const writableHtml = await htmlHandle.createWritable();
      await writableHtml.write(finalHtml);
      await writableHtml.close();

      // Done!
      saveStatus.style.display = 'none';
      btnSave.disabled = false;
      
      const originalText = btnSave.textContent;
      btnSave.textContent = 'Saved Successfully!';
      btnSave.style.background = '#22c55e';
      setTimeout(() => {
        btnSave.textContent = originalText;
        btnSave.style.background = 'var(--cta)';
        closeModal();
        renderArticles();
      }, 1200);
      
    } catch (err) {
      alert('Error generating article: ' + err.message);
      saveStatus.style.display = 'none';
      btnSave.disabled = false;
    }
  });

  // 6. Delete Logic
  btnDelete.addEventListener('click', async () => {
    if (confirm('Are you sure you want to delete this article? Note: This deletes it from the JSON list, but you must manually delete the .html file from the articles/ folder if you want it completely gone.')) {
      const idx = parseInt(editIndex.value, 10);
      articlesData.articles.splice(idx, 1);
      
      try {
        const dataDir = await dirHandle.getDirectoryHandle('data');
        const jsonHandle = await dataDir.getFileHandle('articles.json');
        const writableJson = await jsonHandle.createWritable();
        const strippedData = { articles: articlesData.articles.map(a => ({
          ...a, rawContent: undefined, driveImageRaw: undefined 
        }))};
        await writableJson.write(JSON.stringify(strippedData, null, 2));
        await writableJson.close();
      } catch (err) {
        console.error("Error saving delete:", err);
      }
      
      closeModal();
      renderArticles();
    }
  });

  function openModal() { modal.classList.add('open'); }
  function closeModal() { modal.classList.remove('open'); }
  
  btnCloseModal.addEventListener('click', closeModal);
  btnCancel.addEventListener('click', closeModal);
});
