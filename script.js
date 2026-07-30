// AURA STREETWEAR - FULL INTERACTIVE E-COMMERCE ENGINE

// 1. PRODUCTS CATALOG
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Oversized Acid Wash Tee',
    category: 'tshirt',
    collection: 'urban-minimal',
    price: 690,
    originalPrice: 890,
    rating: 4.9,
    reviewCount: 42,
    badge: 'HOT',
    badgeClass: 'hot',
    sizes: ['S', 'M', 'L', 'XL'],
    image: './images/tshirt.png',
    fallbackImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    description: 'เสื้อยืด Oversized ผ้านุ่มพิเศษ 100% Premium Heavyweight Cotton ย้อมสี Acid Wash ให้ลุคสตรีททรงเกาหลี ระบายอากาศเยี่ยม'
  },
  {
    id: 'prod-2',
    name: 'Minimal Essential Jacket',
    category: 'jacket',
    collection: 'tech-hybrid',
    price: 2490,
    originalPrice: 3200,
    rating: 5.0,
    reviewCount: 88,
    badge: 'NEW',
    badgeClass: 'new',
    sizes: ['M', 'L', 'XL'],
    image: './images/jacket.png',
    fallbackImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
    description: 'แจ็กเก็ตสไตล์มินิมอลตัดเย็บเนี๊ยบ ผลิตจากผ้ากันน้ำ ซิปเมทัลลิกพรีเมียม กระเป๋าจัดเก็บสิ่งของอเนกประสงค์ 6 ช่อง'
  },
  {
    id: 'prod-3',
    name: 'Minimal Beige Heavy Hoodie',
    category: 'hoodie',
    collection: 'monochrome',
    price: 1490,
    originalPrice: 1890,
    rating: 4.8,
    reviewCount: 65,
    badge: 'SALE 20%',
    badgeClass: 'sale',
    sizes: ['S', 'M', 'L', 'XL'],
    image: './images/hoodie.png',
    fallbackImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    description: 'เสื้อฮู้ดดี้ทรง Relaxed Fit โทนสีมินิมอล ผ้านุ่มบุด้านในกันหนาวได้ดี หมวกฮู้ดทรงสวยอยู่ทรง'
  },
  {
    id: 'prod-4',
    name: 'Tactical Multi-Pocket Cargo Pants',
    category: 'pants',
    collection: 'tech-hybrid',
    price: 1290,
    originalPrice: 1690,
    rating: 4.9,
    reviewCount: 54,
    badge: 'HOT',
    badgeClass: 'hot',
    sizes: ['M', 'L', 'XL'],
    image: './images/pants.png',
    fallbackImage: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80',
    description: 'กางเกงคาร์โก้สตรีททรงเกาหลี ผ้า Ripstop ขาจั๊มสายปรับได้ กระเป๋าข้างขนาดใหญ่ จุของได้เยอะ'
  },
  {
    id: 'prod-5',
    name: 'Aura Signature Graphic Hoodie',
    category: 'hoodie',
    collection: 'urban-minimal',
    price: 1690,
    originalPrice: 1990,
    rating: 4.7,
    reviewCount: 39,
    badge: 'NEW',
    badgeClass: 'new',
    sizes: ['S', 'M', 'L', 'XL'],
    image: './images/hoodie.png',
    fallbackImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
    description: 'เสื้อฮู้ดดี้ลายสกรีนนีออนเอกลักษณ์ของแบรนด์ AURA พิมพ์ลาย Silk Screen คมชัด ทนทาน'
  },
  {
    id: 'prod-6',
    name: 'Vintage Wash Oversized Tee',
    category: 'tshirt',
    collection: 'monochrome',
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

// 2. STATE
let state = {
  products: [...PRODUCTS],
  cart: JSON.parse(localStorage.getItem('aura_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('aura_wishlist') || '[]'),
  activeCategory: 'all',
  activeCollection: null,
  searchQuery: '',
  appliedCoupon: null,
  theme: localStorage.getItem('aura_theme') || 'light'
};

const COUPONS = {
  'AURA15': { type: 'percent', value: 0.15, desc: 'ส่วนลด 15% ทั้งตะกร้า' },
  'WELCOME100': { type: 'fixed', value: 100, desc: 'ส่วนลด ฿100' }
};

// 3. INIT & LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProducts();
  updateCartUI();
  startCountdown();
  initListeners();
});

function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  updateThemeUI();
}

function updateThemeUI() {
  const textEl = document.querySelector('.theme-text');
  const iconEl = document.querySelector('#themeToggle i');
  if (textEl && iconEl) {
    textEl.textContent = state.theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    iconEl.className = state.theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
}

function initListeners() {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('aura_theme', state.theme);
      initTheme();
    });
  }

  // Live Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.toLowerCase().trim();
      filterProducts();
    });
  }

  // Category Pills
  const categoryPills = document.querySelectorAll('#categoryPills .pill-btn');
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategory = pill.getAttribute('data-category');
      state.activeCollection = null;
      filterProducts();
    });
  });

  // Cart Drawer Triggers
  const cartBtn = document.getElementById('cartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBackdrop = document.getElementById('cartBackdrop');
  if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

  // Apply Coupon
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  if (applyCouponBtn) applyCouponBtn.addEventListener('click', handleApplyCoupon);

  // Checkout Triggers
  const checkoutBtn = document.getElementById('checkoutBtn');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const checkoutBackdrop = document.getElementById('checkoutBackdrop');
  if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckoutModal);
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  if (checkoutBackdrop) checkoutBackdrop.addEventListener('click', closeCheckoutModal);

  // Quick View Close
  const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
  const quickViewBackdrop = document.getElementById('quickViewBackdrop');
  if (closeQuickViewBtn) closeQuickViewBtn.addEventListener('click', closeQuickViewModal);
  if (quickViewBackdrop) quickViewBackdrop.addEventListener('click', closeQuickViewModal);
}

// 4. RENDERING & FILTERING
function renderProducts() {
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('productCount');
  const emptyState = document.getElementById('emptyState');
  if (countEl) countEl.textContent = state.products.length;
  if (!grid) return;

  if (state.products.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  } else {
    if (emptyState) emptyState.style.display = 'none';
  }

  grid.innerHTML = state.products.map(p => `
    <div class="product-card">
      <div class="card-image-box">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='${p.fallbackImage}'">
        <div class="card-badges">
          ${p.badge ? `<span class="badge-tag ${p.badgeClass}">${p.badge}</span>` : ''}
        </div>
        <div class="card-actions-floating">
          <button class="btn-icon-circle" onclick="toggleWishlist('${p.id}')" title="ถูกใจ">
            <i class="${state.wishlist.includes(p.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
        <button class="quickview-btn-overlay" onclick="openQuickViewModal('${p.id}')">
          <i class="fa-solid fa-eye"></i> Quick View
        </button>
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
        <button class="btn btn-primary btn-block btn-sm" onclick="addToCart('${p.id}')">
          <i class="fa-solid fa-cart-plus"></i> เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  `).join('');
}

function filterProducts() {
  let list = [...PRODUCTS];

  if (state.activeCategory === 'new') {
    list = list.filter(p => p.badgeClass === 'new');
  } else if (state.activeCategory !== 'all') {
    list = list.filter(p => p.category === state.activeCategory);
  }

  if (state.activeCollection) {
    list = list.filter(p => p.collection === state.activeCollection);
  }

  if (state.searchQuery) {
    list = list.filter(p => p.name.toLowerCase().includes(state.searchQuery));
  }

  state.products = list;
  renderProducts();
}

function filterByCollection(collectionKey) {
  state.activeCategory = 'all';
  state.activeCollection = collectionKey;

  const categoryPills = document.querySelectorAll('#categoryPills .pill-btn');
  categoryPills.forEach(p => p.classList.remove('active'));
  const allPill = document.querySelector('#categoryPills .pill-btn[data-category="all"]');
  if (allPill) allPill.classList.add('active');

  filterProducts();

  const catalogEl = document.getElementById('catalog');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth' });
  }
}

// 5. CART ENGINE
function addToCart(productId, size = 'M') {
  const item = PRODUCTS.find(p => p.id === productId);
  if (!item) return;

  const existing = state.cart.find(i => i.id === productId && i.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...item, size: size, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`เพิ่ม "${item.name}" ลงตะกร้าเรียบร้อย!`, 'success');
}

function updateCartQty(id, size, delta) {
  const item = state.cart.find(i => i.id === id && i.size === size);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => !(i.id === id && i.size === size));
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(id, size) {
  state.cart = state.cart.filter(i => !(i.id === id && i.size === size));
  saveCart();
  updateCartUI();
  showToast('ลบรายการออกจากตะกร้าแล้ว', 'info');
}

function saveCart() {
  localStorage.setItem('aura_cart', JSON.stringify(state.cart));
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const drawerCount = document.getElementById('cartDrawerCount');
  const headerTotal = document.getElementById('cartHeaderTotal');
  const container = document.getElementById('cartItemsContainer');

  const totalQty = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  const totals = calculateTotals();

  if (badge) badge.textContent = totalQty;
  if (drawerCount) drawerCount.textContent = totalQty;
  if (headerTotal) headerTotal.textContent = `฿${totals.grandTotal.toLocaleString('th-TH')}`;

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-products-state">
        <div class="empty-icon"><i class="fa-solid fa-bag-shopping"></i></div>
        <h3>ตะกร้าสินค้าว่างเปล่า</h3>
      </div>
    `;
    updatePriceSummaryUI(totals);
    return;
  }

  container.innerHTML = state.cart.map(i => `
    <div class="cart-item">
      <img src="${i.image}" alt="${i.name}" class="cart-item-img" onerror="this.src='${i.fallbackImage}'">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${i.name}</h4>
        <div style="font-size: 0.8rem; color: var(--text-muted);">ไซส์: ${i.size}</div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateCartQty('${i.id}', '${i.size}', -1)">-</button>
            <span class="qty-val">${i.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty('${i.id}', '${i.size}', 1)">+</button>
          </div>
          <span class="cart-item-price">฿${(i.price * i.quantity).toLocaleString('th-TH')}</span>
        </div>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart('${i.id}', '${i.size}')"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  `).join('');

  updatePriceSummaryUI(totals);
}

function calculateTotals() {
  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  let discount = 0;
  let shipping = subtotal > 1500 || subtotal === 0 ? 0 : 60;

  if (state.appliedCoupon) {
    const c = COUPONS[state.appliedCoupon];
    if (c) {
      if (c.type === 'percent') discount = subtotal * c.value;
      else if (c.type === 'fixed') discount = Math.min(subtotal, c.value);
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + shipping);
  return { subtotal, discount, shipping, grandTotal };
}

function updatePriceSummaryUI(totals) {
  const sub = document.getElementById('summarySubtotal');
  const discRow = document.getElementById('discountRow');
  const disc = document.getElementById('summaryDiscount');
  const ship = document.getElementById('summaryShipping');
  const grand = document.getElementById('summaryGrandTotal');

  if (sub) sub.textContent = `฿${totals.subtotal.toLocaleString('th-TH')}`;
  if (discRow && disc) {
    if (totals.discount > 0) {
      discRow.style.display = 'flex';
      disc.textContent = `-฿${totals.discount.toLocaleString('th-TH')}`;
    } else {
      discRow.style.display = 'none';
    }
  }
  if (ship) ship.textContent = totals.shipping === 0 ? 'ฟรี (Free)' : `฿${totals.shipping}`;
  if (grand) grand.textContent = `฿${totals.grandTotal.toLocaleString('th-TH')}`;
}

function handleApplyCoupon() {
  const input = document.getElementById('couponInput');
  const msg = document.getElementById('couponMessage');
  if (!input) return;

  const code = input.value.toUpperCase().trim();
  if (COUPONS[code]) {
    state.appliedCoupon = code;
    if (msg) {
      msg.className = 'coupon-msg success';
      msg.textContent = `ใช้โค้ด ${code} สำเร็จ! (${COUPONS[code].desc})`;
    }
    updateCartUI();
    showToast(`เปิดใช้ส่วนลด ${code} แล้ว`, 'success');
  } else {
    state.appliedCoupon = null;
    if (msg) {
      msg.className = 'coupon-msg error';
      msg.textContent = 'โค้ดส่วนลดไม่ถูกต้อง';
    }
    updateCartUI();
  }
}

// 6. WISHLIST
function toggleWishlist(id) {
  const idx = state.wishlist.indexOf(id);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast('ลบรายการถูกใจแล้ว', 'info');
  } else {
    state.wishlist.push(id);
    showToast('บันทึกสินค้าลงรายการถูกใจแล้ว!', 'success');
  }
  const badge = document.getElementById('wishlistBadge');
  if (badge) badge.textContent = state.wishlist.length;
  renderProducts();
}

// 7. MODALS & DRAWERS
function openCartDrawer() {
  document.getElementById('cartDrawer')?.classList.add('active');
  document.getElementById('cartBackdrop')?.classList.add('active');
}
function closeCartDrawer() {
  document.getElementById('cartDrawer')?.classList.remove('active');
  document.getElementById('cartBackdrop')?.classList.remove('active');
}

function openQuickViewModal(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const content = document.getElementById('quickViewContent');
  if (content) {
    content.innerHTML = `
      <div class="qv-image-box">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='${product.fallbackImage}'">
      </div>
      <div>
        <h2 style="font-size: 1.6rem; margin-bottom: 10px;">${product.name}</h2>
        <div style="font-size: 1.5rem; font-weight: 800; color: var(--accent-primary); margin-bottom: 16px;">
          ฿${product.price.toLocaleString('th-TH')}
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 20px;">${product.description}</p>
        <button class="btn btn-primary btn-block btn-lg btn-glow" onclick="addToCart('${product.id}'); closeQuickViewModal(); openCartDrawer();">
          <i class="fa-solid fa-cart-plus"></i> เพิ่มลงตะกร้าสินค้า
        </button>
      </div>
    `;
  }
  document.getElementById('quickViewModal')?.classList.add('active');
  document.getElementById('quickViewBackdrop')?.classList.add('active');
}
function closeQuickViewModal() {
  document.getElementById('quickViewModal')?.classList.remove('active');
  document.getElementById('quickViewBackdrop')?.classList.remove('active');
}

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('ตะกร้าของคุณยังไม่มีสินค้า', 'error');
    return;
  }
  closeCartDrawer();
  updateCheckoutSummaryUI();
  document.getElementById('checkoutModal')?.classList.add('active');
  document.getElementById('checkoutBackdrop')?.classList.add('active');
}
function closeCheckoutModal() {
  document.getElementById('checkoutModal')?.classList.remove('active');
  document.getElementById('checkoutBackdrop')?.classList.remove('active');
}

function updateCheckoutSummaryUI() {
  const totals = calculateTotals();
  const list = document.getElementById('checkoutItemsList');
  if (list) {
    list.innerHTML = state.cart.map(i => `
      <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 8px;">
        <span>${i.name} x ${i.quantity} (ไซส์: ${i.size})</span>
        <strong>฿${(i.price * i.quantity).toLocaleString('th-TH')}</strong>
      </div>
    `).join('');
  }
  document.getElementById('coSubtotal').textContent = `฿${totals.subtotal.toLocaleString('th-TH')}`;
  document.getElementById('coShipping').textContent = totals.shipping === 0 ? 'ฟรี' : `฿${totals.shipping}`;
  document.getElementById('coGrandTotal').textContent = `฿${totals.grandTotal.toLocaleString('th-TH')}`;
  document.getElementById('qrTotalAmount').textContent = `฿${totals.grandTotal.toLocaleString('th-TH')}`;
}

function togglePaymentFields(method) {
  document.getElementById('promptpayDisplay').style.display = method === 'promptpay' ? 'block' : 'none';
  document.getElementById('cardDisplay').style.display = method === 'card' ? 'block' : 'none';
  document.getElementById('truemoneyDisplay').style.display = method === 'truemoney' ? 'block' : 'none';
}

function handlePaymentSubmit(e) {
  e.preventDefault();
  const totals = calculateTotals();
  const orderId = '#AUR-' + Math.floor(10000 + Math.random() * 90000);
  const trackingNo = 'TH2026-EXPRESS-' + Math.floor(100 + Math.random() * 900);

  closeCheckoutModal();

  state.cart = [];
  saveCart();
  updateCartUI();

  document.getElementById('receiptOrderId').textContent = orderId;
  document.getElementById('receiptTracking').textContent = trackingNo;
  document.getElementById('receiptTotal').textContent = `฿${totals.grandTotal.toLocaleString('th-TH')}`;

  document.getElementById('successModal')?.classList.add('active');
  document.getElementById('successBackdrop')?.classList.add('active');
}

function closeSuccessModal() {
  document.getElementById('successModal')?.classList.remove('active');
  document.getElementById('successBackdrop')?.classList.remove('active');
}

function startCountdown() {
  let secondsLeft = 31335;
  setInterval(() => {
    if (secondsLeft <= 0) secondsLeft = 86400;
    secondsLeft--;
    const h = Math.floor(secondsLeft / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;
    document.getElementById('hours') && (document.getElementById('hours').textContent = String(h).padStart(2, '0'));
    document.getElementById('minutes') && (document.getElementById('minutes').textContent = String(m).padStart(2, '0'));
    document.getElementById('seconds') && (document.getElementById('seconds').textContent = String(s).padStart(2, '0'));
  }, 1000);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
