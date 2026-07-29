// PART 1, 3 & 4: E-COMMERCE CORE APP LOGIC

// 1. PRODUCTS DATASET
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Oversized Acid Wash Tee',
    category: 'tshirt',
    price: 690,
    originalPrice: 890,
    rating: 4.9,
    reviewCount: 42,
    badge: 'HOT',
    badgeClass: 'hot',
    sizes: ['S', 'M', 'L', 'XL'],
    image: './images/tshirt.png',
    fallbackImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    description: 'เสื้อยืด Oversized ผ้านุ่มพิเศษ 100% Premium Heavyweight Cotton ย้อมสี Acid Wash ให้ลุคสตรีททรงเกาหลี'
  },
  {
    id: 'prod-2',
    name: 'Cyberpunk Techwear Jacket',
    category: 'jacket',
    price: 2490,
    originalPrice: 3200,
    rating: 5.0,
    reviewCount: 88,
    badge: 'NEW',
    badgeClass: 'new',
    sizes: ['M', 'L', 'XL'],
    image: './images/jacket.png',
    fallbackImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    description: 'แจ็กเก็ตสไตล์ Cyberpunk Techwear ผลิตจากผ้ากันน้ำ ซิปเมทัลลิกพรีเมียม กระเป๋าจัดเก็บสิ่งของ 6 ช่อง'
  },
  {
    id: 'prod-3',
    name: 'Minimal Beige Heavy Hoodie',
    category: 'hoodie',
    price: 1490,
    originalPrice: 1890,
    rating: 4.8,
    reviewCount: 65,
    badge: 'SALE 20%',
    badgeClass: 'sale',
    sizes: ['S', 'M', 'L', 'XL'],
    image: './images/hoodie.png',
    fallbackImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    description: 'เสื้อฮู้ดดี้ทรง Relaxed Fit โทนสีมินิมอล ผ้านุ่มบุด้านในกันหนาวได้ดี หมวกฮู้ดทรงสวย'
  },
  {
    id: 'prod-4',
    name: 'Tactical Multi-Pocket Cargo Pants',
    category: 'pants',
    price: 1290,
    originalPrice: 1690,
    rating: 4.9,
    reviewCount: 54,
    badge: 'HOT',
    badgeClass: 'hot',
    sizes: ['M', 'L', 'XL'],
    image: './images/pants.png',
    fallbackImage: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80',
    description: 'กางเกงคาร์โก้สตรีททรงเกาหลี ผ้า Ripstop ขาจั๊มสายปรับได้ กระเป๋าข้างขนาดใหญ่'
  },
  {
    id: 'prod-5',
    name: 'Aura Signature Graphic Hoodie',
    category: 'hoodie',
    price: 1690,
    originalPrice: 1990,
    rating: 4.7,
    reviewCount: 39,
    badge: 'NEW',
    badgeClass: 'new',
    sizes: ['S', 'M', 'L', 'XL'],
    image: './images/hoodie.png',
    fallbackImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
    description: 'เสื้อฮู้ดดี้ลายสกรีนนีออนเอกลักษณ์ของแบรนด์ AURA พิมพ์ลาย Silk Screen คมชัด'
  },
  {
    id: 'prod-6',
    name: 'Vintage Wash Oversized Tee',
    category: 'tshirt',
    price: 590,
    originalPrice: 790,
    rating: 4.9,
    reviewCount: 71,
    badge: 'SALE 25%',
    badgeClass: 'sale',
    sizes: ['S', 'M', 'L', 'XL'],
    image: './images/tshirt.png',
    fallbackImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80',
    description: 'เสื้อยืดสไตล์วินเทจผ้าหนา 240 GSM ทรงสวย ไหล่ตก ได้ฟีล Retro 90s'
  }
];

let currentProducts = [...PRODUCTS];

document.addEventListener('DOMContentLoaded', () => {
  // Theme Setup
  const themeToggleBtn = document.getElementById('themeToggle');
  let currentTheme = localStorage.getItem('aura_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeUI(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem('aura_theme', currentTheme);
      updateThemeUI(currentTheme);
    });
  }

  // Flash Sale Clock
  startCountdown();

  // Render Product Grid
  renderProducts();

  // Filter Category Pills
  const categoryPills = document.querySelectorAll('#categoryPills .pill-btn');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-category');
      filterCategory(cat);
    });
  });
});

function updateThemeUI(theme) {
  const textEl = document.querySelector('.theme-text');
  const iconEl = document.querySelector('#themeToggle i');
  if (textEl && iconEl) {
    textEl.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    iconEl.className = theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

function startCountdown() {
  let secondsLeft = 31335;
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  setInterval(() => {
    if (secondsLeft <= 0) secondsLeft = 86400;
    secondsLeft--;
    const h = Math.floor(secondsLeft / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;

    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = currentProducts.length;

  if (!grid) return;

  grid.innerHTML = currentProducts.map(p => `
    <div class="product-card">
      <div class="card-image-box">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='${p.fallbackImage}'">
        <div class="card-badges">
          ${p.badge ? `<span class="badge-tag ${p.badgeClass}">${p.badge}</span>` : ''}
        </div>
        <div class="card-actions-floating">
          <button class="btn-icon-circle" title="ถูกใจ"><i class="fa-regular fa-heart"></i></button>
        </div>
        <button class="quickview-btn-overlay"><i class="fa-solid fa-eye"></i> Quick View</button>
      </div>

      <div class="card-content">
        <span class="card-category">${p.category}</span>
        <h3 class="product-title">${p.name}</h3>
        <div class="rating-row">
          <span>★ ${p.rating}</span>
          <span style="color: var(--text-muted);">(${p.reviewCount} รีวิว)</span>
        </div>
        <div class="price-row">
          <span class="current-price">฿${p.price.toLocaleString('th-TH')}</span>
          ${p.originalPrice ? `<span class="old-price">฿${p.originalPrice.toLocaleString('th-TH')}</span>` : ''}
        </div>
        <button class="btn btn-primary btn-block btn-sm">
          <i class="fa-solid fa-cart-plus"></i> เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  `).join('');
}

function filterCategory(cat) {
  if (cat === 'all') {
    currentProducts = [...PRODUCTS];
  } else {
    currentProducts = PRODUCTS.filter(p => p.category === cat);
  }
  renderProducts();
}
