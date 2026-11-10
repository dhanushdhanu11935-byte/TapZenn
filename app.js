/**
 * TapZen - Next-Gen NFC Ecosystem
 * Main Application & Interactive Features
 */

// Sound Synthesizer via Web Audio API
class NFCSoundFX {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  playTapChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;

      // Primary High Chime (NFC detection frequency)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5
      osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.08); // A6
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.28);

      // Harmonious Second Chime (confirmation ding)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1320, now + 0.06); // E6
      osc2.frequency.exponentialRampToValueAtTime(2640, now + 0.16);
      gain2.gain.setValueAtTime(0.15, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.35);
    } catch (e) {
      console.log('Audio disabled or not supported', e);
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }
}

const soundFX = new NFCSoundFX();

// Global App State
const AppState = {
  cart: [],
  discountCode: '',
  discountPercent: 0,
  activeFilter: 'all',
  customizerState: {
    material: 'google_review',
    name: 'MOHAMMAD SUZAIN',
    role: 'FOUNDER',
    company: 'TAPZEN',
    linkType: 'profile',
    isFlipped: false
  }
};

// ==========================================================================
// Initialization & Event Listeners
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadCartFromStorage();
  initHeaderScroll();
  initHero3DCard();
  initTapSimulator();
  initProductsCatalog();
  initCustomizer();
  initCartDrawer();
  initCheckoutModal();
  initFAQ();
  initSoundToggle();
  initCorporateModal();
  updateCartUI();
});

// Sound Toggle Control
function initSoundToggle() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (!soundBtn) return;
  soundBtn.addEventListener('click', () => {
    soundFX.enabled = !soundFX.enabled;
    soundBtn.innerHTML = soundFX.enabled 
      ? '<i class="fas fa-volume-up"></i>' 
      : '<i class="fas fa-volume-mute"></i>';
    showToast(soundFX.enabled ? 'NFC Sound FX Enabled' : 'NFC Sound FX Muted');
  });
}

// Header Sticky Scroll Style
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isDisplayed = navLinks.style.display === 'flex';
      navLinks.style.display = isDisplayed ? 'none' : 'flex';
      if (!isDisplayed) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#0a0b10';
        navLinks.style.padding = '2rem';
        navLinks.style.borderBottom = '1px solid var(--border-red)';
      }
    });
  }
}

// ==========================================================================
// 1. Hero 3D Card Interactive Tilt & Sheen
// ==========================================================================
function initHero3DCard() {
  const cardScene = document.getElementById('hero-3d-scene');
  const cardObj = document.getElementById('hero-3d-object');
  const flipBtn = document.getElementById('hero-flip-card-btn');
  const sheen = document.querySelector('#hero-3d-object .card-sheen');

  if (!cardScene || !cardObj) return;

  let isFlipped = false;

  // Mouse move tilt calculation
  cardScene.addEventListener('mousemove', (e) => {
    if (isFlipped) return; // keep rotation if flipped
    const rect = cardScene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 20;

    cardObj.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Sheen movement
    if (sheen) {
      const sheenX = ((x / rect.width) * 100) - 50;
      const sheenY = ((y / rect.height) * 100) - 50;
      sheen.style.transform = `translate(${sheenX * 1.5}px, ${sheenY * 1.5}px)`;
    }
  });

  // Mouse leave reset
  cardScene.addEventListener('mouseleave', () => {
    if (!isFlipped) {
      cardObj.style.transform = 'rotateX(0deg) rotateY(0deg)';
      if (sheen) sheen.style.transform = 'translate(0px, 0px)';
    }
  });

  // Flip Toggle Button
  if (flipBtn) {
    flipBtn.addEventListener('click', () => {
      soundFX.playClick();
      isFlipped = !isFlipped;
      if (isFlipped) {
        cardObj.classList.add('flipped');
        flipBtn.innerHTML = '<i class="fas fa-undo"></i> Show Front';
      } else {
        cardObj.classList.remove('flipped');
        cardObj.style.transform = 'rotateX(0deg) rotateY(0deg)';
        flipBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Flip Card (Back)';
      }
    });
  }
}

// ==========================================================================
// 2. Live Interactive Phone Tap Simulator ("Experience The Tap")
// ==========================================================================
function initTapSimulator() {
  const triggerBtn = document.getElementById('simulator-trigger-tap');
  const lockscreenPrompt = document.getElementById('lockscreen-tap-area');
  const notif = document.getElementById('simulator-notification');
  const profileView = document.getElementById('simulator-profile-view');
  const closeProfileBtn = document.getElementById('close-profile-view-btn');
  const phoneWrapper = document.getElementById('simulator-phone-body');
  const simCard = document.getElementById('simulated-tap-card');
  const saveVcfBtn = document.getElementById('profile-save-vcf-btn');

  function triggerTapExperience() {
    soundFX.playTapChime();

    // Visual animation of card approaching phone
    if (simCard) {
      simCard.style.transform = 'scale(0.95) translateY(-25px) rotate(4deg)';
      setTimeout(() => {
        simCard.style.transform = 'none';
      }, 500);
    }

    // Phone vibration effect
    if (phoneWrapper) {
      phoneWrapper.style.transform = 'translateY(-6px)';
      setTimeout(() => {
        phoneWrapper.style.transform = 'none';
      }, 250);
    }

    // Show Notification banner with slight delay
    setTimeout(() => {
      if (notif) {
        notif.classList.add('active');
      }
    }, 300);
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', triggerTapExperience);
  }

  if (lockscreenPrompt) {
    lockscreenPrompt.addEventListener('click', triggerTapExperience);
  }

  // Clicking the notification opens the full profile
  if (notif) {
    notif.addEventListener('click', () => {
      soundFX.playClick();
      notif.classList.remove('active');
      if (profileView) {
        profileView.classList.add('active');
      }
    });
  }

  // Close profile view
  if (closeProfileBtn) {
    closeProfileBtn.addEventListener('click', () => {
      soundFX.playClick();
      if (profileView) {
        profileView.classList.remove('active');
      }
    });
  }

  // Real .vcf Contact Card Exporter
  if (saveVcfBtn) {
    saveVcfBtn.addEventListener('click', () => {
      soundFX.playTapChime();
      downloadVCard({
        firstName: 'TapZen',
        lastName: 'Team',
        title: 'Founders: Mohammad Suzain & Dhanush Kumar K',
        company: 'TapZen NFC',
        email: 'founders@tapzen.io',
        phone: '+91 98765 43210',
        website: 'https://www.instagram.com/tapzenn/'
      });
      showToast('Contact vCard saved to device!');
    });
  }
}

// Download real vCard file
function downloadVCard({ firstName, lastName, title, company, email, phone, website }) {
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${firstName} ${lastName}`,
    `ORG:${company};`,
    `TITLE:${title}`,
    `TEL;TYPE=CELL:${phone}`,
    `EMAIL;TYPE=WORK:${email}`,
    `URL:${website}`,
    'NOTE:Shared seamlessly via TapZen NFC Smart Card.',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${firstName}_${lastName}_TapZen.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==========================================================================
// 3. Interactive 3D Card Studio / Customizer
// ==========================================================================
function initCustomizer() {
  const customizerCard = document.getElementById('customizer-card-obj');
  const customizerSheen = document.querySelector('#customizer-card-obj .card-sheen');
  const flipBtn = document.getElementById('customizer-flip-btn');
  const nameInput = document.getElementById('cust-input-name');
  const roleInput = document.getElementById('cust-input-role');
  const companyInput = document.getElementById('cust-input-company');
  const linkSelect = document.getElementById('cust-select-destination');
  const materialBtns = document.querySelectorAll('.material-chip-btn');
  const addCustomBtn = document.getElementById('customizer-add-cart-btn');
  const customizerPriceDisplay = document.getElementById('customizer-price-display');

  // Preview elements
  const previewName = document.getElementById('cust-preview-name');
  const previewRole = document.getElementById('cust-preview-role');
  const previewCompany = document.getElementById('cust-preview-company');
  const previewDestination = document.getElementById('cust-preview-destination');

  // Material selection
  materialBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      soundFX.playClick();
      materialBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const matKey = btn.getAttribute('data-material');
      const matConfig = CUSTOMIZER_MATERIALS[matKey];
      AppState.customizerState.material = matKey;

      if (customizerCard && matConfig) {
        // Reset classes
        customizerCard.className = 'card-3d-object';
        const frontFace = customizerCard.querySelector('.card-face-front');
        frontFace.className = `card-face card-face-front ${matConfig.bgClass}`;
        // Show actual card image if available, else clear
        if (matConfig.image) {
          frontFace.style.backgroundImage = `url('${matConfig.image}')`;
          frontFace.style.backgroundSize = 'cover';
          frontFace.style.backgroundPosition = 'center';
          frontFace.style.backgroundRepeat = 'no-repeat';
        } else {
          frontFace.style.backgroundImage = '';
          frontFace.style.backgroundSize = '';
          frontFace.style.backgroundPosition = '';
        }
        if (customizerPriceDisplay) {
          customizerPriceDisplay.textContent = `₹${matConfig.basePrice.toLocaleString('en-IN')}`;
        }
      }
      showToast(`Selected: ${matConfig.name} (₹${matConfig.basePrice.toLocaleString('en-IN')})`);
    });
  });

  // Set initial card image on load (default: google_review)
  if (customizerCard) {
    const initMat = CUSTOMIZER_MATERIALS[AppState.customizerState.material] || CUSTOMIZER_MATERIALS['google_review'];
    const initFront = customizerCard.querySelector('.card-face-front');
    if (initFront && initMat && initMat.image) {
      initFront.className = `card-face card-face-front ${initMat.bgClass}`;
      initFront.style.backgroundImage = `url('${initMat.image}')`;
      initFront.style.backgroundSize = 'cover';
      initFront.style.backgroundPosition = 'center';
      initFront.style.backgroundRepeat = 'no-repeat';
    }
  }

  // Live input synchronization
  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      const val = e.target.value.trim() || 'YOUR NAME';
      AppState.customizerState.name = val;
      if (previewName) previewName.textContent = val.toUpperCase();
    });
  }

  if (roleInput) {
    roleInput.addEventListener('input', (e) => {
      const val = e.target.value.trim() || 'FOUNDER & CEO';
      AppState.customizerState.role = val;
      if (previewRole) previewRole.textContent = val.toUpperCase();
    });
  }

  if (companyInput) {
    companyInput.addEventListener('input', (e) => {
      const val = e.target.value.trim() || 'COMPANY NAME';
      AppState.customizerState.company = val;
      if (previewCompany) previewCompany.textContent = val.toUpperCase();
    });
  }

  if (linkSelect) {
    linkSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      AppState.customizerState.linkType = val;
      if (previewDestination) {
        const labels = {
          profile: 'TapZen Digital Bio Hub',
          google_review: 'Google 5-Star Direct Review',
          website: 'Custom Website URL',
          socials: 'Instagram / LinkedIn Direct'
        };
        previewDestination.textContent = labels[val] || 'Digital Bio Hub';
      }
    });
  }

  // 3D Tilt for 10x10 cm Customizer Card
  const customizerScene = document.getElementById('customizer-card-scene');
  if (customizerScene && customizerCard) {
    customizerScene.addEventListener('mousemove', (e) => {
      if (AppState.customizerState.isFlipped) return;
      const rect = customizerScene.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 16;
      customizerCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      if (customizerSheen) {
        const sheenX = ((x / rect.width) * 100) - 50;
        const sheenY = ((y / rect.height) * 100) - 50;
        customizerSheen.style.transform = `translate(${sheenX * 1.5}px, ${sheenY * 1.5}px)`;
      }
    });

    customizerScene.addEventListener('mouseleave', () => {
      if (!AppState.customizerState.isFlipped) {
        customizerCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
        if (customizerSheen) customizerSheen.style.transform = 'translate(0px, 0px)';
      }
    });
  }

  // Flip toggle for customizer
  if (flipBtn && customizerCard) {
    flipBtn.addEventListener('click', () => {
      soundFX.playClick();
      AppState.customizerState.isFlipped = !AppState.customizerState.isFlipped;
      if (AppState.customizerState.isFlipped) {
        customizerCard.classList.add('flipped');
        flipBtn.innerHTML = '<i class="fas fa-undo"></i> View Front';
      } else {
        customizerCard.classList.remove('flipped');
        flipBtn.innerHTML = '<i class="fas fa-sync-alt"></i> View Back (QR & Chip)';
      }
    });
  }

  // Add custom designed card to shopping cart
  if (addCustomBtn) {
    addCustomBtn.addEventListener('click', () => {
      soundFX.playTapChime();
      const mat = CUSTOMIZER_MATERIALS[AppState.customizerState.material];
      const customItem = {
        id: `custom-${Date.now()}`,
        name: `Custom ${mat.name}`,
        material: mat.name,
        price: mat.basePrice,
        customization: {
          name: AppState.customizerState.name,
          role: AppState.customizerState.role,
          company: AppState.customizerState.company,
          destination: AppState.customizerState.linkType
        },
        quantity: 1
      };

      addToCart(customItem);
      openCartDrawer();
      showToast('Custom TapZen card added to cart!');
    });
  }
}

// ==========================================================================
// 4. Product Catalog & Quick View
// ==========================================================================
function initProductsCatalog() {
  const container = document.getElementById('products-grid-container');
  const filterBtns = document.querySelectorAll('.filter-pill');
  if (!container) return;

  function renderProducts(category = 'all') {
    container.innerHTML = '';
    const filtered = category === 'all' 
      ? TAPZEN_PRODUCTS 
      : TAPZEN_PRODUCTS.filter((p) => p.category === category);

    filtered.forEach((prod) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      
      // Determine mini mockup background (Acrylic & PVC)
      let mockupBg = '#14151b';
      if (prod.id.includes('crimson')) mockupBg = 'radial-gradient(circle at 70% 30%, #ff1a35 0%, #150608 100%)';
      else if (prod.id.includes('crystal')) mockupBg = 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, #151b29 100%)';
      else if (prod.id.includes('frosted')) mockupBg = 'linear-gradient(135deg, #a4adc2 0%, #1e2638 100%)';
      else if (prod.id.includes('custom')) mockupBg = 'radial-gradient(circle at 50% 50%, #2b0f14 0%, #0d0e14 100%)';
      else if (prod.id.includes('stand')) mockupBg = 'linear-gradient(135deg, #1b2030, #0a0c14)';

      const isSquareCard = prod.category === 'cards';
      const shapeClass = isSquareCard ? 'mini-product-card-shape square-10x10' : 'mini-product-card-shape';

      card.innerHTML = `
        <div class="product-badge-float">
          <span class="badge badge-red badge-glow">${prod.badge}</span>
        </div>
        <div class="product-visual-preview">
          <div class="${shapeClass}" style="background: ${mockupBg}; border: 1px solid rgba(255,255,255,0.18)">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="display:flex; align-items:center; gap: 4px;">
                <img src="assets/tapzen-logo.jpg" style="width:20px; height:20px; border-radius:4px;" />
                <span style="font-size:0.75rem; font-weight:800; color:#fff;">TapZen</span>
              </div>
              <i class="fas fa-wifi" style="color:${prod.accentColor}; font-size:0.8rem; transform: rotate(90deg);"></i>
            </div>
            ${isSquareCard ? `
            <div style="text-align:center; margin: 4px 0;">
              <i class="fas fa-expand" style="color:var(--accent-red); font-size:1.1rem; opacity:0.8;"></i>
              <div style="font-size:0.55rem; color:#fff; font-weight:700; letter-spacing:0.05em;">10 × 10 CM</div>
            </div>
            ` : ''}
            <div>
              <div style="font-size:0.62rem; color:#fff; font-weight:700; text-transform:uppercase;">NFC ENABLED</div>
              <div style="font-size:0.52rem; color:#aaa;">TAP • CONNECT • GROW</div>
            </div>
          </div>
        </div>
        <div class="product-category-tag">${prod.category.toUpperCase()}</div>
        <h3 class="product-title">${prod.name}</h3>
        <p class="product-desc">${prod.shortDesc}</p>
        <ul class="product-specs-list">
          <li class="product-spec-item"><i class="fas fa-microchip"></i> ${prod.chip}</li>
          <li class="product-spec-item"><i class="fas fa-mobile-alt"></i> ${prod.compatibility}</li>
        </ul>
        <div class="product-price-row">
          <span class="product-current-price">₹${prod.price.toLocaleString('en-IN')}</span>
          <span class="product-old-price">₹${prod.originalPrice.toLocaleString('en-IN')}</span>
        </div>
        <div class="product-card-actions">
          <button class="btn btn-primary btn-sm add-cart-btn" data-id="${prod.id}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <button class="btn btn-secondary btn-sm quick-view-btn" data-id="${prod.id}">
            <i class="fas fa-eye"></i> Specs
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    // Attach button events
    container.querySelectorAll('.add-cart-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        const product = TAPZEN_PRODUCTS.find((p) => p.id === id);
        if (product) {
          soundFX.playTapChime();
          addToCart({
            id: product.id,
            name: product.name,
            material: product.material,
            price: product.price,
            quantity: 1
          });
          openCartDrawer();
          showToast(`Added ${product.name} to cart!`);
        }
      });
    });

    container.querySelectorAll('.quick-view-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        soundFX.playClick();
        const id = btn.getAttribute('data-id');
        const product = TAPZEN_PRODUCTS.find((p) => p.id === id);
        if (product) openProductModal(product);
      });
    });
  }

  // Initial render
  renderProducts('all');

  // Filter clicks
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      soundFX.playClick();
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      renderProducts(cat);
    });
  });
}

// Product Quick Specs Modal
function openProductModal(product) {
  const modal = document.getElementById('product-specs-modal');
  const body = document.getElementById('modal-product-content');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="display:flex; align-items:center; gap: 1rem; margin-bottom: 1.5rem;">
      <img src="assets/tapzen-logo.jpg" style="width:50px; height:50px; border-radius:10px; box-shadow: 0 0 15px rgba(255,26,53,0.4);" />
      <div>
        <span class="badge badge-red">${product.badge}</span>
        <h2 style="font-size:1.6rem; margin-top:0.3rem;">${product.name}</h2>
      </div>
    </div>
    <p style="color:var(--text-secondary); margin-bottom:1.5rem;">${product.shortDesc}</p>
    <div style="background:rgba(255,255,255,0.04); border:1px solid var(--border-subtle); border-radius:14px; padding:1.2rem; margin-bottom:1.5rem;">
      <h4 style="color:#ffffff; margin-bottom:0.8rem; font-size:0.95rem; text-transform:uppercase; letter-spacing:0.05em;">Technical Specifications</h4>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.8rem; font-size:0.85rem;">
        <div><strong>NFC Frequency:</strong> 13.56 MHz High Frequency</div>
        <div><strong>Standard:</strong> ISO/IEC 14443 Type A</div>
        <div><strong>Microchip:</strong> ${product.chip}</div>
        <div><strong>Write Endurance:</strong> 100,000+ Cycles</div>
        <div><strong>Data Retention:</strong> 10+ Years</div>
        <div><strong>Read Range:</strong> 2 - 4 cm (Instant touch)</div>
        <div><strong>Material:</strong> ${product.material}</div>
        <div><strong>Water Resistance:</strong> IP68 Fully Sealed</div>
      </div>
    </div>
    <div style="margin-bottom:1.8rem;">
      <h4 style="color:#ffffff; margin-bottom:0.6rem; font-size:0.95rem; text-transform:uppercase;">Included In Box:</h4>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:0.4rem; font-size:0.85rem; color:var(--text-secondary);">
        ${product.features.map(f => `<li><i class="fas fa-check" style="color:var(--accent-red); margin-right:6px;"></i> ${f}</li>`).join('')}
        <li><i class="fas fa-check" style="color:var(--accent-red); margin-right:6px;"></i> Complimentary Lifetime TapZen Digital Cloud Bio</li>
      </ul>
    </div>
    <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-subtle); padding-top:1.2rem;">
      <div>
        <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Price Today</div>
        <div style="font-family:var(--font-heading); font-size:1.8rem; font-weight:800; color:#fff;">₹${product.price.toLocaleString('en-IN')}</div>
      </div>
      <button class="btn btn-primary" id="modal-add-to-cart-btn">
        <i class="fas fa-shopping-cart"></i> Add to Cart
      </button>
    </div>
  `;

  modal.classList.add('active');

  const addBtn = body.querySelector('#modal-add-to-cart-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      soundFX.playTapChime();
      addToCart({
        id: product.id,
        name: product.name,
        material: product.material,
        price: product.price,
        quantity: 1
      });
      modal.classList.remove('active');
      openCartDrawer();
      showToast(`Added ${product.name} to cart!`);
    });
  }

  // Close modal button
  const closeBtn = modal.querySelector('.modal-close-x');
  if (closeBtn) {
    closeBtn.onclick = () => modal.classList.remove('active');
  }
}

// ==========================================================================
// 5. Shopping Cart & Drawer Management
// ==========================================================================
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('tapzen_cart');
    if (saved) AppState.cart = JSON.parse(saved);
  } catch (e) {
    AppState.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('tapzen_cart', JSON.stringify(AppState.cart));
  } catch (e) {}
}

function addToCart(item) {
  const existing = AppState.cart.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity += item.quantity || 1;
  } else {
    AppState.cart.push(item);
  }
  saveCartToStorage();
  updateCartUI();
}

function removeFromCart(id) {
  AppState.cart = AppState.cart.filter((i) => i.id !== id);
  saveCartToStorage();
  updateCartUI();
}

function updateCartQuantity(id, delta) {
  const item = AppState.cart.find((i) => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
  }
  saveCartToStorage();
  updateCartUI();
}

function updateCartUI() {
  const countBadges = document.querySelectorAll('.cart-count-badge');
  const itemsContainer = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const discountEl = document.getElementById('cart-discount-val');
  const totalEl = document.getElementById('cart-total-val');

  const totalCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  countBadges.forEach((badge) => {
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'flex' : 'none';
  });

  if (!itemsContainer) return;

  if (AppState.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <i class="fas fa-shopping-bag" style="font-size:2.8rem; opacity:0.3; color:var(--accent-red);"></i>
        <h4 style="color:#ffffff;">Your cart is empty</h4>
        <p style="font-size:0.85rem;">Discover our smart NFC cards and customized tap solutions.</p>
        <button class="btn btn-outline-red btn-sm" onclick="closeCartDrawer(); document.getElementById('products').scrollIntoView();">
          Browse Products
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₹0';
    if (discountEl) discountEl.textContent = '-₹0';
    if (totalEl) totalEl.textContent = '₹0';
    return;
  }

  itemsContainer.innerHTML = '';
  let subtotal = 0;

  AppState.cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div class="cart-item-thumb">
        <i class="fas fa-id-card" style="color:var(--accent-red); font-size:1.2rem;"></i>
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">${item.customization ? `Custom: ${item.customization.name}` : (item.material || 'NFC Product')}</div>
        <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
        <span style="font-size:0.85rem; font-weight:700; width:18px; text-align:center;">${item.quantity}</span>
        <button class="qty-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
      </div>
    `;
    itemsContainer.appendChild(row);
  });

  const discountAmount = subtotal * (AppState.discountPercent / 100);
  const total = Math.max(0, subtotal - discountAmount);

  if (subtotalEl) subtotalEl.textContent = `₹${Math.round(subtotal).toLocaleString('en-IN')}`;
  if (discountEl) discountEl.textContent = `-₹${Math.round(discountAmount).toLocaleString('en-IN')}`;
  if (totalEl) totalEl.textContent = `₹${Math.round(total).toLocaleString('en-IN')}`;
}

function initCartDrawer() {
  const trigger = document.getElementById('navbar-cart-trigger');
  const overlay = document.getElementById('cart-drawer-overlay');
  const closeBtn = document.getElementById('cart-close-btn');
  const checkoutBtn = document.getElementById('cart-checkout-proceed-btn');
  const applyPromoBtn = document.getElementById('cart-apply-promo-btn');
  const promoInput = document.getElementById('cart-promo-input');

  if (trigger) trigger.addEventListener('click', openCartDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCartDrawer();
    });
  }

  // Promo code
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'TAPZEN10') {
        AppState.discountPercent = 10;
        AppState.discountCode = code;
        showToast('Promo code applied! 10% discount added.');
        updateCartUI();
      } else if (code === 'STARTUP20' || code === 'TAPZEN20') {
        AppState.discountPercent = 20;
        AppState.discountCode = code;
        showToast('Launch code applied! 20% discount added.');
        updateCartUI();
      } else {
        showToast('Invalid promo code. Try "TAPZEN10"');
      }
    });
  }

  // Proceed to Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (AppState.cart.length === 0) {
        showToast('Your cart is empty.');
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }
}

function openCartDrawer() {
  soundFX.playClick();
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) overlay.classList.add('active');
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (overlay) overlay.classList.remove('active');
}

// Ensure global accessibility for inline HTML event handlers
window.closeCartDrawer = closeCartDrawer;
window.openCartDrawer = openCartDrawer;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;


// ==========================================================================
// 6. Checkout Flow & Order Confirmation
// ==========================================================================
function initCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  const form = document.getElementById('checkout-order-form');
  const closeBtn = document.getElementById('checkout-modal-close');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      soundFX.playTapChime();

      // Collect data
      const orderId = `TZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const name = document.getElementById('checkout-cust-name').value;
      const email = document.getElementById('checkout-cust-email').value;

      // Show Order Success View
      const modalBox = modal.querySelector('.modal-box');
      modalBox.innerHTML = `
        <div style="text-align:center; padding: 1rem 0;">
          <div style="width:72px; height:72px; border-radius:50%; background:rgba(255,26,53,0.15); border:2px solid var(--accent-red); color:var(--accent-red); font-size:2rem; display:flex; align-items:center; justify-content:center; margin:0 auto 1.2rem auto; box-shadow:0 0 25px rgba(255,26,53,0.5);">
            <i class="fas fa-check"></i>
          </div>
          <span class="badge badge-red" style="margin-bottom:0.8rem;">ORDER CONFIRMED</span>
          <h2 style="font-size:2rem; margin-bottom:0.5rem;">Welcome to the TapZen Network!</h2>
          <p style="color:var(--text-secondary); margin-bottom:1.5rem;">
            Thank you, <strong>${name}</strong>. Your custom NFC cards are being programmed and queued for laser engraving.
          </p>

          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:14px; padding:1.2rem; text-align:left; margin-bottom:1.8rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.88rem;">
              <span style="color:var(--text-muted);">Order Tracking ID:</span>
              <strong style="color:var(--accent-red); font-family:var(--font-heading);">${orderId}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.88rem;">
              <span style="color:var(--text-muted);">Confirmation Sent To:</span>
              <span style="color:#ffffff;">${email}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.88rem;">
              <span style="color:var(--text-muted);">Estimated Dispatch:</span>
              <span style="color:#ffffff;">Within 24-48 Hours with Tracking</span>
            </div>
          </div>

          <div style="display:flex; gap:1rem; justify-content:center;">
            <button class="btn btn-primary" onclick="location.reload();">
              <i class="fas fa-home"></i> Return Home
            </button>
            <button class="btn btn-secondary" onclick="window.print();">
              <i class="fas fa-print"></i> Print Receipt
            </button>
          </div>
        </div>
      `;

      // Clear cart
      AppState.cart = [];
      saveCartToStorage();
      updateCartUI();
    });
  }
}

function openCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.add('active');
}

// ==========================================================================
// 7. Corporate & Bulk Orders Modal
// ==========================================================================
function initCorporateModal() {
  const triggerBtn = document.getElementById('open-corporate-modal-btn');
  const modal = document.getElementById('corporate-modal');
  const closeBtn = document.getElementById('corporate-modal-close');
  const form = document.getElementById('corporate-quote-form');

  if (triggerBtn && modal) {
    triggerBtn.addEventListener('click', () => {
      soundFX.playClick();
      modal.classList.add('active');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      soundFX.playTapChime();
      modal.classList.remove('active');
      showToast('Corporate quote request received! Our enterprise team will email your demo kit.');
      form.reset();
    });
  }
}

// ==========================================================================
// 8. FAQ Accordion
// ==========================================================================
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        soundFX.playClick();
        const isActive = item.classList.contains('active');
        items.forEach((i) => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
}

// ==========================================================================
// 9. Toast Notifications
// ==========================================================================
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `<i class="fas fa-bolt" style="color:var(--accent-red);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3200);
}
