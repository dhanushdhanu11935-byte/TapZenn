# TapZen — Next-Gen Smart NFC Cards & Tap Solutions

![TapZen Logo](assets/tapzen-logo.jpg)

> **TAP • CONNECT • GROW**  
> Premium Smart NFC Contactless Hardware & Digital Business Cards

---

## 🚀 Overview

**TapZen** is a high-impact, modern web application built for the TapZen NFC startup. It showcases TapZen's full line of NFC products, from luxury metal & carbon business cards to countertop "Tap to Review" Google stands and smart phone pucks.

The site is designed with a dark luxury cyberpunk aesthetic matching the TapZen official brand identity: obsidian black surfaces, laser crimson glows, and metallic silver accents.

---

## ✨ Key Features

1. **Interactive 3D Card Tilt Engine**:
   - Realistic 3D gyroscopic card tilt that responds dynamically to mouse movement or touch.
   - Dynamic holographic sheen that glides across the card surface as the angle changes.
   - 3D Flip toggle to view the reverse side with magnetic stripe, laser NFC microchip, and dynamic QR fallback.

2. **Live Phone Tap Simulator ("Experience The Tap")**:
   - Interactive phone simulation demonstrating native contactless tap in **0.18 seconds**.
   - **Realistic Web Audio API NFC Chime**: Synthesizes authentic high-frequency NFC detection audio on tap.
   - Sliding iOS/Android push notification banner.
   - Interactive digital bio hub with live `.vcf` contact file exporter (users can test saving a real contact to their phone).

3. **Interactive 3D Card Studio / Customizer**:
   - Live customizer with 5 premium materials:
     - *Matte Stealth Black*
     - *Crimson Carbon (TapZen Signature)*
     - *Brushed Titanium Steel*
     - *24K Mirror Gold Metal*
     - *Eco Natural Walnut Wood*
   - Live name, job title, and company engraving preview.
   - Selectable NFC destinations (Digital Cloud Bio, Google 5-Star Review, Custom Website, Socials).
   - Direct "Add Custom Card to Order" button.

4. **Complete Product Catalog**:
   - Category filtering (All Products, Smart Business Cards, Review & Cafe Stands, Smart Tags & Keychains, Corporate Teams).
   - Technical specifications modal (13.56 MHz frequency, NXP NTAG216 chip, IP68 waterproof rating, 10-year retention).

5. **Integrated Shopping Cart & Checkout**:
   - Slide-out cart drawer with quantity adjustments.
   - Promo discount code system (`TAPZEN10` for 10% off, `STARTUP20` for 20% off).
   - Simulated checkout modal with order confirmation screen and receipt generation.

6. **B2B / Corporate Team Inquiry Flow**:
   - Dedicated modal for team orders (10 to 5,000+ cards) with volume pricing.

7. **Educational & Conversion Sections**:
   - "Why NFC Over Paper Cards?" side-by-side comparison matrix.
   - 3-step setup guide ("Choose Your Style", "Set Up Your Profile", "Tap & Grow").
   - Interactive FAQ accordion.

---

## 📁 Project Structure

```
tapzen-nfc/
├── index.html            # Main semantic HTML5 application
├── assets/
│   └── tapzen-logo.jpg   # High-resolution official TapZen logo
├── css/
│   └── styles.css        # Custom design system, 3D transforms & animations
├── js/
│   ├── products.js       # Complete product catalog & material finish database
│   └── app.js            # 3D tilt, Web Audio synth, tap simulator, cart & checkout
└── README.md             # Project documentation
```

---

## 💻 How to Open and View

1. **Directly in Any Web Browser**:
   - Simply open `index.html` in Chrome, Edge, Safari, Opera, or Firefox.
2. **With VS Code Live Server**:
   - Open this directory (`tapzen-nfc`) in VS Code.
   - Right-click `index.html` and click **"Open with Live Server"**.

---

## 🎨 Brand Design Tokens

- **Obsidian Black**: `#06070a` / `#0a0b10`
- **TapZen Laser Red**: `#ff1a35` (Glow: `rgba(255, 26, 53, 0.45)`)
- **Metallic Silver**: `#ffffff` to `#9da4b4`
- **Typography**: Space Grotesk (Headings & Display) + Plus Jakarta Sans (Body)
