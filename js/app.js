/**
 * A2Z BELT Collection - Modern E-Commerce Application Script
 * Minimalist, High-Converting, Cash on Delivery Optimized
 */

// 1. PRODUCT CATALOG DATA
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Full-Grain Italian Leather Belt - Jet Black',
    category: 'belts',
    categoryLabel: 'Premium Belt',
    price: 2450,
    originalPrice: 3500,
    image: 'images/belt-black.jpg',
    badge: 'Bestseller',
    badgeType: 'badge-royal',
    rating: 4.9,
    reviews: 312,
    leatherType: '100% Full-Grain Cowhide',
    buckle: 'Brushed Gunmetal Alloy',
    sizes: '30 to 44 inches (Adjustable)',
    description: 'Precision crafted from vegetable-tanned genuine full-grain leather. Engineered with an anti-scratch brushed alloy buckle for unmatched durability in boardroom or daily casual wear.'
  },
  {
    id: 'prod-2',
    name: 'Cognac Tan Vintage Artisan Belt',
    category: 'belts',
    categoryLabel: 'Handmade Belt',
    price: 2650,
    originalPrice: 3800,
    image: 'images/belt-brown.jpg',
    badge: 'Handcrafted',
    badgeType: 'badge-leather',
    rating: 4.8,
    reviews: 245,
    leatherType: 'Top-Grain Pull-Up Leather',
    buckle: 'Solid Antique Brass Finish',
    sizes: '32 to 46 inches (Adjustable)',
    description: 'Rich cognac patina with burnished edges and hand-stitched reinforcement. Develops a gorgeous vintage character with regular wear.'
  },
  {
    id: 'prod-3',
    name: 'Dual-Tone Reversible Executive Belt (Black / Brown)',
    category: 'belts',
    categoryLabel: 'Formal Belt',
    price: 2950,
    originalPrice: 4200,
    image: 'images/belt-reversible.jpg',
    badge: '2-in-1 Value',
    badgeType: 'badge-sale',
    rating: 4.9,
    reviews: 489,
    leatherType: 'Supple Nappa Leather',
    buckle: '360° Rotational Swivel Buckle',
    sizes: '30 to 46 inches (Adjustable)',
    description: 'A single belt for two distinct styles. Simply pull and twist the buckle to toggle between executive black and casual chocolate brown.'
  },
  {
    id: 'prod-4',
    name: 'Slim Handcrafted Bifold Leather Wallet',
    category: 'wallets',
    categoryLabel: 'Bifold Wallet',
    price: 1850,
    originalPrice: 2800,
    image: 'images/wallet-bifold.jpg',
    badge: 'Trending',
    badgeType: 'badge-royal',
    rating: 4.9,
    reviews: 520,
    leatherType: 'Genuine Oil-Wax Cowhide',
    buckle: 'RFID-Shielded Lining',
    sizes: '8 Card Slots + 2 Cash Slots',
    description: 'Slim front-pocket friendly profile packed with 8 precision card slots, ID window, dual currency dividers, and integrated RFID protection against data theft.'
  },
  {
    id: 'prod-5',
    name: 'Vintage Heritage Multi-Slot Leather Bifold',
    category: 'wallets',
    categoryLabel: 'Bifold Wallet',
    price: 2150,
    originalPrice: 3100,
    image: 'images/wallet-vintage.jpg',
    badge: 'Pure Leather',
    badgeType: 'badge-leather',
    rating: 4.7,
    reviews: 188,
    leatherType: 'Distressed Crazy Horse Leather',
    buckle: 'Heavy-Duty Waxed Thread',
    sizes: '10 Card Slots + Coin Flap',
    description: 'Rugged vintage distressed leather with self-healing surface scratch aesthetics. Built for high utility and generations of everyday carry.'
  },
  {
    id: 'prod-6',
    name: 'Urban Sleek Leather Crossbody Sling Bag',
    category: 'bags',
    categoryLabel: 'Crossbody Bag',
    price: 4450,
    originalPrice: 6200,
    image: 'images/bag-crossbody.jpg',
    badge: 'Top Rated',
    badgeType: 'badge-royal',
    rating: 5.0,
    reviews: 142,
    leatherType: 'Water-Repellent Full Hide',
    buckle: 'YKK Heavy Zippers & Steel Buckle',
    sizes: 'Compact Organizer (10" x 6.5")',
    description: 'The definitive hands-free commuter bag. Ergonomic dual-sided shoulder clip, padded breathable lining, and compartmentalized organizer for smartphone, keys, wallet, and power bank.'
  },
  {
    id: 'prod-7',
    name: 'Artisan Heritage Messenger Crossbody Bag',
    category: 'bags',
    categoryLabel: 'Crossbody Bag',
    price: 4950,
    originalPrice: 6900,
    image: 'images/bag-sling.jpg',
    badge: 'Premium',
    badgeType: 'badge-leather',
    rating: 4.9,
    reviews: 97,
    leatherType: 'Vegetable Tanned Leather',
    buckle: 'Magnetic Quick Clasp',
    sizes: 'Fits 11" iPad & Daily Gear',
    description: 'Spacious daily messenger cross-body bag tailored for professionals. Accommodates 11-inch tablets, journals, grooming kit, and tech gear in opulent leather.'
  },
  {
    id: 'prod-8',
    name: 'Executive Leather Gift Box (Belt + Bifold Wallet)',
    category: 'belts',
    categoryLabel: 'Gift Combo',
    price: 3950,
    originalPrice: 5800,
    image: 'images/hero-showcase.jpg',
    badge: 'Best Gift',
    badgeType: 'badge-sale',
    rating: 5.0,
    reviews: 364,
    leatherType: 'Full-Grain Matching Set',
    buckle: 'Brushed Titanium Finish',
    sizes: 'Embossed Luxury Gift Presentation',
    description: 'The ultimate gifting set for weddings, corporate executives, or personal indulgence. Comes in a matte royal blue embossed gift box with ribbon.'
  }
];

// 2. STATE MANAGEMENT
let cart = [];
let wishlist = new Set();
let activeCategory = 'all';

// Initialize Cart from LocalStorage
function initCart() {
  try {
    const saved = localStorage.getItem('a2z_cart');
    if (saved) {
      cart = JSON.parse(saved);
    } else {
      // Default initial welcome item in cart for high conversion showcase
      cart = [{
        productId: 'prod-1',
        qty: 1
      }];
    }
  } catch (e) {
    cart = [{ productId: 'prod-1', qty: 1 }];
  }
}

function saveCart() {
  localStorage.setItem('a2z_cart', JSON.stringify(cart));
  updateCartUI();
  updateOrderSummaryUI();
}

// 3. UI RENDERING & LOGIC
function formatPrice(num) {
  return 'PKR ' + Number(num).toLocaleString('en-PK');
}

// Render Products Grid
function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filtered = activeCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  grid.innerHTML = filtered.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        
        <div class="product-badge-group">
          <span class="badge ${product.badgeType}">${product.badge}</span>
        </div>

        <div class="product-overlay-actions">
          <button class="btn-quickview" onclick="openQuickView('${product.id}')" aria-label="Quick View ${product.name}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Quick View
          </button>
          <button class="btn-wishlist ${wishlist.has(product.id) ? 'active' : ''}" onclick="toggleWishlist('${product.id}', this)" aria-label="Add to Wishlist">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
      </div>

      <div class="product-content">
        <span class="product-category-name">${product.categoryLabel}</span>
        <h3 class="product-title">${product.name}</h3>
        
        <div class="product-rating">
          <div class="stars">
            ${Array(5).fill('<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>').join('')}
          </div>
          <span class="rating-count">(${product.reviews})</span>
        </div>

        <div class="product-price-box">
          <span class="current-price">${formatPrice(product.price)}</span>
          <span class="original-price">${formatPrice(product.originalPrice)}</span>
          <span class="discount-tag">Save ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
        </div>

        <button class="btn-add-cart" onclick="addToCart('${product.id}')" id="add-to-cart-${product.id}">
          <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add to Cart
        </button>
      </div>
    </article>
  `).join('');
}

// 4. CART INTERACTIONS
function addToCart(productId, qty = 1) {
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ productId, qty });
  }

  const product = PRODUCTS.find(p => p.id === productId);
  showToast('Added to Cart', `${product ? product.name : 'Item'} added to your shopping bag.`);
  
  // Bump cart badge
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.classList.remove('bump');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('bump');
  }

  saveCart();
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.productId === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.productId !== productId);
  }

  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.productId !== productId);
  saveCart();
  showToast('Removed Item', 'Item removed from your cart.');
}

function updateCartUI() {
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  
  // Update badges
  const badge = document.getElementById('cart-badge');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }

  // Update Drawer list
  const drawerList = document.getElementById('drawer-items-list');
  const drawerEmpty = document.getElementById('drawer-empty');
  const drawerFooter = document.getElementById('drawer-footer');
  const drawerSubtotal = document.getElementById('drawer-subtotal');
  const drawerShipping = document.getElementById('drawer-shipping-text');

  if (!drawerList) return;

  if (cart.length === 0) {
    drawerList.style.display = 'none';
    if (drawerEmpty) drawerEmpty.style.display = 'block';
    if (drawerFooter) drawerFooter.style.display = 'none';
  } else {
    drawerList.style.display = 'flex';
    if (drawerEmpty) drawerEmpty.style.display = 'none';
    if (drawerFooter) drawerFooter.style.display = 'block';

    let subtotal = 0;
    drawerList.innerHTML = cart.map(item => {
      const prod = PRODUCTS.find(p => p.id === item.productId);
      if (!prod) return '';
      const lineTotal = prod.price * item.qty;
      subtotal += lineTotal;

      return `
        <div class="drawer-cart-item">
          <img src="${prod.image}" alt="${prod.name}" class="drawer-item-img" />
          <div class="drawer-item-content">
            <h4 class="drawer-item-title">${prod.name}</h4>
            <div class="drawer-item-price">${formatPrice(lineTotal)}</div>
            <div class="drawer-item-controls">
              <div class="qty-control">
                <button class="qty-btn" onclick="updateCartQty('${prod.id}', -1)" aria-label="Decrease quantity">-</button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn" onclick="updateCartQty('${prod.id}', 1)" aria-label="Increase quantity">+</button>
              </div>
              <button class="btn-remove-item" onclick="removeFromCart('${prod.id}')">Remove</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (drawerSubtotal) {
      drawerSubtotal.textContent = formatPrice(subtotal);
    }

    if (drawerShipping) {
      if (subtotal >= 2500) {
        drawerShipping.textContent = '🎉 Qualified for FREE Nationwide Shipping!';
        drawerShipping.style.color = '#10B981';
      } else {
        const remaining = 2500 - subtotal;
        drawerShipping.textContent = `Add ${formatPrice(remaining)} more to get FREE Delivery!`;
        drawerShipping.style.color = '#4169E1';
      }
    }
  }
}

// 5. CHECKOUT SUMMARY SYNC (ORDER FORM)
function updateOrderSummaryUI() {
  const summaryContainer = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('summary-subtotal');
  const shippingEl = document.getElementById('summary-shipping');
  const grandTotalEl = document.getElementById('summary-grand-total');
  const itemCountBadge = document.getElementById('summary-item-count');
  const submitBtn = document.getElementById('btn-submit-order');

  if (!summaryContainer) return;

  if (cart.length === 0) {
    summaryContainer.innerHTML = `
      <div class="summary-empty-state">
        <p>Your shopping bag is empty.</p>
        <a href="#catalog" class="btn-secondary" style="margin-top: 10px; display:inline-block; font-size:0.85rem; padding:8px 18px;">Browse Products</a>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    if (shippingEl) shippingEl.textContent = 'PKR 0';
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(0);
    if (itemCountBadge) itemCountBadge.textContent = '0 items';
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  if (submitBtn) submitBtn.disabled = false;

  let subtotal = 0;
  let totalCount = 0;

  summaryContainer.innerHTML = cart.map(item => {
    const prod = PRODUCTS.find(p => p.id === item.productId);
    if (!prod) return '';
    const lineTotal = prod.price * item.qty;
    subtotal += lineTotal;
    totalCount += item.qty;

    return `
      <div class="summary-item">
        <img src="${prod.image}" alt="${prod.name}" class="summary-item-img" />
        <div class="summary-item-details">
          <div class="summary-item-name">${prod.name}</div>
          <div class="summary-item-meta">Qty: ${item.qty} × ${formatPrice(prod.price)}</div>
        </div>
        <div class="summary-item-price">${formatPrice(lineTotal)}</div>
      </div>
    `;
  }).join('');

  // Shipping Calculation: Free above PKR 2500, else standard PKR 199
  const shippingFee = subtotal >= 2500 ? 0 : 199;
  const grandTotal = subtotal + shippingFee;

  if (itemCountBadge) itemCountBadge.textContent = `${totalCount} item${totalCount > 1 ? 's' : ''}`;
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shippingFee === 0 ? 'FREE (Special Offer)' : formatPrice(shippingFee);
  if (grandTotalEl) grandTotalEl.textContent = formatPrice(grandTotal);
}

// 6. QUICK VIEW MODAL
function openQuickView(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('quickview-modal');
  const container = document.getElementById('quickview-content');
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="modal-image-col">
      <img src="${prod.image}" alt="${prod.name}" />
    </div>
    <div class="modal-details-col">
      <span class="modal-cat-tag">${prod.categoryLabel}</span>
      <h3 class="modal-title">${prod.name}</h3>

      <div class="product-rating" style="margin-bottom: 12px;">
        <div class="stars">
          ${Array(5).fill('<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>').join('')}
        </div>
        <span class="rating-count">(${prod.reviews} verified reviews)</span>
      </div>

      <div class="product-price-box">
        <span class="current-price" style="font-size: 1.5rem;">${formatPrice(prod.price)}</span>
        <span class="original-price">${formatPrice(prod.originalPrice)}</span>
        <span class="discount-tag">Save ${Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}%</span>
      </div>

      <p class="modal-desc">${prod.description}</p>

      <div class="modal-specs-list">
        <div class="modal-spec-row">
          <span class="spec-key">Material:</span>
          <span class="spec-val">${prod.leatherType}</span>
        </div>
        <div class="modal-spec-row">
          <span class="spec-key">Hardware / Buckle:</span>
          <span class="spec-val">${prod.buckle}</span>
        </div>
        <div class="modal-spec-row">
          <span class="spec-key">Dimensions / Fit:</span>
          <span class="spec-val">${prod.sizes}</span>
        </div>
        <div class="modal-spec-row">
          <span class="spec-key">Payment:</span>
          <span class="spec-val" style="color: #4169E1;">Cash on Delivery Available</span>
        </div>
      </div>

      <div style="display: flex; gap: 12px; margin-top: auto;">
        <button class="btn-primary" style="flex: 1;" onclick="addToCart('${prod.id}'); closeQuickView();">
          Add to Cart &bull; ${formatPrice(prod.price)}
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 7. TOAST SYSTEM
function showToast(title, message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3400);
}

// 8. WISHLIST TOGGLE
function toggleWishlist(productId, btn) {
  if (wishlist.has(productId)) {
    wishlist.delete(productId);
    btn.classList.remove('active');
    showToast('Wishlist', 'Item removed from your wishlist.');
  } else {
    wishlist.add(productId);
    btn.classList.add('active');
    showToast('Saved to Wishlist', 'Item added to your personal wishlist.');
  }
}

// 9. DRAWER TOGGLE
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer-overlay');
  if (drawer) {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer-overlay');
  if (drawer) {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 10. CASH ON DELIVERY ORDER SUBMISSION
function handleOrderSubmit(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert('Please add at least one accessory to your cart before checking out.');
    return;
  }

  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const city = document.getElementById('cust-city').value;
  const address = document.getElementById('cust-address').value.trim();
  const notes = document.getElementById('cust-notes').value.trim();

  if (!name || !phone || !city || !address) {
    alert('Please complete all required fields.');
    return;
  }

  // Generate unique Order Number
  const orderId = 'A2Z-' + Math.floor(100000 + Math.random() * 900000);
  
  // Calculate final numbers
  const subtotal = cart.reduce((sum, item) => {
    const p = PRODUCTS.find(prod => prod.id === item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  const shippingFee = subtotal >= 2500 ? 0 : 199;
  const grandTotal = subtotal + shippingFee;

  // Build WhatsApp text link
  const itemsText = cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.productId);
    return `- ${p ? p.name : 'Item'} (x${item.qty})`;
  }).join('%0A');

  const waMessage = `*New Order: ${orderId}*%0A` +
    `*Customer:* ${encodeURIComponent(name)}%0A` +
    `*Phone:* ${encodeURIComponent(phone)}%0A` +
    `*City:* ${encodeURIComponent(city)}%0A` +
    `*Address:* ${encodeURIComponent(address)}%0A` +
    `*Items:*%0A${itemsText}%0A` +
    `*Total Bill:* ${formatPrice(grandTotal)} (Cash on Delivery)%0A` +
    (notes ? `*Notes:* ${encodeURIComponent(notes)}` : '');

  const whatsappUrl = `https://wa.me/923001234567?text=${waMessage}`;

  // Populate Order Success Modal
  const successModal = document.getElementById('order-success-modal');
  const detailsEl = document.getElementById('success-modal-details');
  const waBtn = document.getElementById('btn-whatsapp-confirm');

  if (detailsEl) {
    detailsEl.innerHTML = `
      <div class="order-id-badge">Order ID: #${orderId}</div>
      <p class="order-success-msg">
        Thank you, <strong>${name}</strong>! Your order has been placed successfully via <strong>Cash on Delivery</strong>.<br>
        Our team will dispatch your parcel to <strong>${address}, ${city}</strong> within 24 hours.
      </p>
      <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; margin-bottom: 20px; text-align: left; font-size: 0.875rem;">
        <div><strong>Total Payable:</strong> ${formatPrice(grandTotal)}</div>
        <div><strong>Payment Mode:</strong> Cash on Delivery (Inspect & Pay)</div>
        <div><strong>Contact:</strong> ${phone}</div>
      </div>
    `;
  }

  if (waBtn) {
    waBtn.href = whatsappUrl;
  }

  if (successModal) {
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Clear cart and form
  cart = [];
  saveCart();
  document.getElementById('checkout-form').reset();
}

function closeSuccessModal() {
  const successModal = document.getElementById('order-success-modal');
  if (successModal) {
    successModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 11. EVENT LISTENERS SETUP
document.addEventListener('DOMContentLoaded', () => {
  initCart();
  renderProducts();
  updateCartUI();
  updateOrderSummaryUI();

  // Category Filter Buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    // Close nav on click link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Cart Drawer Events
  const openCartBtn = document.getElementById('btn-open-cart');
  const closeCartBtn = document.getElementById('btn-close-cart');
  const drawerOverlay = document.getElementById('cart-drawer-overlay');

  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) closeCartDrawer();
    });
  }

  // Quick View Modal Backdrop Click
  const qvModal = document.getElementById('quickview-modal');
  if (qvModal) {
    qvModal.addEventListener('click', (e) => {
      if (e.target === qvModal) closeQuickView();
    });
  }

  // Order Form Submit
  const orderForm = document.getElementById('checkout-form');
  if (orderForm) {
    orderForm.addEventListener('submit', handleOrderSubmit);
  }

  // Header Scroll Shadow
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});
