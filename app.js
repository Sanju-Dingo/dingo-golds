// --- PRODUCTS DATABASE ---
const products = [
  {
    id: 1,
    name: "Solitaire Diamond Ring",
    category: "Rings",
    price: 490000.00,
    image: "assets/ring_diamond.png",
    tag: "Best Seller",
    description: "A breathtaking solitaire engagement ring featuring a hand-selected, brilliant-cut diamond. Crafted in premium 18k white gold to maximize the light-reflecting fire and brilliance.",
    details: "18k White Gold, Solitaire Diamond, 1.5 Carats, VVS1 Clarity, Colorless (D)"
  },
  {
    id: 2,
    name: "Royal Sapphire Pendant",
    category: "Necklaces",
    price: 260000.00,
    image: "assets/necklace_sapphire.png",
    tag: "Exclusive",
    description: "An elegant, regal necklace sporting a deep velvet blue sapphire pendant, encircled by a double halo of micro-pave diamonds and suspended by a solid 18k gold chain.",
    details: "18k Yellow Gold, Natural Blue Sapphire, 2.3 Carats, Round-Brilliant Diamond Accents"
  },
  {
    id: 3,
    name: "South Sea Pearl Drop Earrings",
    category: "Earrings",
    price: 150000.00,
    image: "assets/earrings_pearl.png",
    tag: "New Arrival",
    description: "Exquisite drop earrings showcasing matched South Sea white pearls of exceptional luster, elegantly mounted under diamonds with solid gold hook backs.",
    details: "18k Yellow Gold, South Sea Pearls (12mm), Brilliant Cut Diamonds (0.4ct total)"
  },
  {
    id: 4,
    name: "Emerald Tennis Bracelet",
    category: "Bracelets",
    price: 550000.00,
    image: "assets/bracelet_emerald.png",
    tag: "Premium",
    description: "A continuous flow of pure luxury. This classic tennis bracelet alternate oval-cut Colombian emeralds with brilliant accent diamonds, set in highly polished rose gold.",
    details: "14k Rose Gold, Natural Colombian Emeralds (5.5ct total), Conflict-free Diamonds (2.1ct total)"
  },
  {
    id: 5,
    name: "Vintage Halo Ruby Ring",
    category: "Rings",
    price: 320000.00,
    image: "assets/ring_ruby.png",
    tag: "Limited",
    description: "Inspired by classic antique styles, this halo ring centers a premium oval crimson ruby in a delicate floral crown of micro diamonds and hand-carved rose gold band.",
    details: "18k Rose Gold, Genuine Ruby (1.8ct), Round Cut Halo Diamonds (0.6ct)"
  },
  {
    id: 6,
    name: "Classic Multi-Layer Pearl Necklace",
    category: "Necklaces",
    price: 200000.00,
    image: "assets/necklace_pearl.png",
    tag: "Trending",
    description: "A timeless masterpiece. Three elegant layers of perfectly matched white freshwater pearls with an ornate vintage gold clasp. Offers an unmatched air of sophistication.",
    details: "White Freshwater Pearls (8.5mm), 18k Yellow Gold Vintage Clasp, Triple Strand Structure"
  }
];

// --- APP STATE ---
let cart = JSON.parse(localStorage.getItem('dingo_cart')) || [];
let activeFilter = 'all';
let searchQuery = '';
const WHATSAPP_PHONE = '918438885714'; // Customer order phone number (India)

// --- DOM ELEMENTS ---
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const categoryItems = document.querySelectorAll('.category-item');
const resultsCount = document.getElementById('results-count');
const navItems = document.querySelectorAll('.nav-item');
const navLinksContainer = document.getElementById('nav-links');
const menuToggle = document.getElementById('menu-toggle');

// Cart Elements
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartDrawer = document.getElementById('cart-drawer');
const cartCloseBtn = document.getElementById('cart-close-btn');
const drawerOverlay = document.getElementById('drawer-overlay');
const cartItemsList = document.getElementById('cart-items-list');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartBadgeCount = document.getElementById('cart-badge-count');
const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');

// Modal Elements
const productModal = document.getElementById('product-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalGridContent = document.getElementById('modal-grid-content');

// --- SPA ROUTER SYSTEM ---
function navigateToSection(targetId) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(section => {
    section.classList.remove('active');
  });

  // Activate targets
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update active state in navigation
  navItems.forEach(item => {
    if (item.getAttribute('data-target') === targetId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Close mobile navigation drawer if open
  navLinksContainer.classList.remove('active');
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
}

// Router Event Listeners
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToSection(hash);
});

// Initial Router setup
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1) || 'home';
  navigateToSection(hash);
  renderProducts();
  updateCartUI();
  updateCategoryCounts();
});

// Setup click triggers on all links that have router navigation
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('.nav-trigger, .category-trigger');
  if (trigger) {
    e.preventDefault();
    const target = trigger.getAttribute('data-target') || 'shop';
    
    // If it's a category selection from Home
    const category = trigger.getAttribute('data-category');
    if (category) {
      activeFilter = category;
      // update category filters
      categoryItems.forEach(item => {
        if (item.getAttribute('data-filter') === category) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
    
    window.location.hash = target;
    navigateToSection(target);
    renderProducts();
  }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
  if (navLinksContainer.classList.contains('active')) {
    menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  } else {
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
});

// --- RENDER PRODUCTS GRID ---
function renderProducts() {
  productGrid.innerHTML = '';
  
  // Filter products
  const filtered = products.filter(product => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Update counts text
  if (filtered.length === 0) {
    productGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--color-text-muted);">
      No exquisite items matched your criteria.
    </div>`;
    resultsCount.textContent = "0 products found";
  } else {
    resultsCount.textContent = `Showing ${filtered.length} products`;
  }

  // Generate HTML
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        <div class="product-actions-overlay">
          <button class="btn-icon view-details-btn" data-id="${product.id}" title="View Details">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button class="btn-icon add-to-cart-btn" data-id="${product.id}" title="Add to Bag">
            <i class="fa-solid fa-bag-shopping"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title view-details-btn" data-id="${product.id}">${product.name}</h3>
        <p class="product-price">₹${product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Attach quick action listeners
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'));
      addToCart(id);
    });
  });

  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.getAttribute('data-id'));
      openProductModal(id);
    });
  });
}

// --- SEARCH & FILTER HANDLERS ---
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderProducts();
});

categoryItems.forEach(item => {
  item.addEventListener('click', () => {
    categoryItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    activeFilter = item.getAttribute('data-filter');
    renderProducts();
  });
});

function updateCategoryCounts() {
  document.getElementById('count-all').textContent = products.length;
  document.getElementById('count-rings').textContent = products.filter(p => p.category === 'Rings').length;
  document.getElementById('count-necklaces').textContent = products.filter(p => p.category === 'Necklaces').length;
  document.getElementById('count-earrings').textContent = products.filter(p => p.category === 'Earrings').length;
  document.getElementById('count-bracelets').textContent = products.filter(p => p.category === 'Bracelets').length;
}

// --- CART STATE MANAGEMENT ---
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
}

function updateCartQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
    saveCart();
    updateCartUI();
  }
}

// --- REMOVE FROM CART ---
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('dingo_cart', JSON.stringify(cart));
}

function updateCartUI() {
  // Update badge count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadgeCount.textContent = totalItems;
  cartBadgeCount.style.display = totalItems > 0 ? 'flex' : 'none';

  // Render items inside drawer
  cartItemsList.innerHTML = '';
  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p class="cart-empty-message">Your shopping bag is empty.</p>';
    cartSubtotal.textContent = "₹0.00";
    return;
  }

  let totalSum = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    totalSum += itemTotal;

    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <p class="cart-item-price">₹${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
        <div class="cart-item-controls">
          <div class="qty-selector">
            <button class="qty-btn dec-qty-btn" data-id="${item.id}">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn inc-qty-btn" data-id="${item.id}">+</button>
          </div>
          <span class="cart-remove-btn remove-item-btn" data-id="${item.id}">Remove</span>
        </div>
      </div>
    `;
    cartItemsList.appendChild(row);
  });

  cartSubtotal.textContent = `₹${totalSum.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  // Attach events
  cartItemsList.querySelectorAll('.dec-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      updateCartQuantity(id, -1);
    });
  });

  cartItemsList.querySelectorAll('.inc-qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      updateCartQuantity(id, 1);
    });
  });

  cartItemsList.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      removeFromCart(id);
    });
  });
}

// --- DRAWER TOGGLE ---
function openCartDrawer() {
  cartDrawer.classList.add('active');
  drawerOverlay.classList.add('active');
}

function closeCartDrawer() {
  cartDrawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
}

cartToggleBtn.addEventListener('click', openCartDrawer);
cartCloseBtn.addEventListener('click', closeCartDrawer);
drawerOverlay.addEventListener('click', () => {
  closeCartDrawer();
  closeProductModal();
});

// --- PRODUCT DETAILS MODAL ---
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  modalGridContent.innerHTML = `
    <div class="modal-img-container">
      <img src="${product.image}" alt="${product.name}" class="modal-img">
    </div>
    <div class="modal-details">
      <span class="modal-category">${product.category}</span>
      <h2 class="modal-title">${product.name}</h2>
      <p class="modal-price">₹${product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
      <p class="modal-desc">${product.description}</p>
      
      <div style="margin-bottom: 25px; border-left: 2px solid var(--color-gold); padding-left: 15px; font-size: 0.9rem; color: var(--color-text-muted);">
        <strong>Specifications:</strong><br>
        ${product.details}
      </div>

      <button class="btn-primary modal-add-to-cart-btn" data-id="${product.id}" style="width: 100%;">
        <i class="fa-solid fa-bag-shopping" style="margin-right: 10px;"></i> Add To Bag
      </button>
    </div>
  `;

  productModal.classList.add('active');
  drawerOverlay.classList.add('active');

  // Modal Add to Cart Button Listener
  modalGridContent.querySelector('.modal-add-to-cart-btn').addEventListener('click', () => {
    addToCart(product.id);
    closeProductModal();
  });
}

function closeProductModal() {
  productModal.classList.remove('active');
  // Only remove overlay if cart drawer is not open
  if (!cartDrawer.classList.contains('active')) {
    drawerOverlay.classList.remove('active');
  }
}

modalCloseBtn.addEventListener('click', closeProductModal);

// --- WHATSAPP ORDER INTEGRATION ---
whatsappCheckoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your shopping bag is empty! Please add some jewels before checking out.");
    return;
  }

  let message = `✨ *DINGO GOLDS - NEW ORDER* ✨\n`;
  message += `----------------------------------------\n`;
  message += `Hello! I would like to place an order for the following handcrafted items:\n\n`;

  let totalSum = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    totalSum += itemTotal;
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Quantity: ${item.quantity}\n`;
    message += `   Price: ₹${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n`;
    message += `   Subtotal: ₹${itemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n\n`;
  });

  message += `----------------------------------------\n`;
  message += `💰 *TOTAL ORDER VALUE:* ₹${totalSum.toLocaleString('en-IN', { minimumFractionDigits: 2 })}\n`;
  message += `----------------------------------------\n`;
  message += `Please confirm availability and coordinate payment options. Thank you!`;

  // Encode the message
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedText}`;

  // Redirect to WhatsApp
  window.open(whatsappUrl, '_blank');
});
