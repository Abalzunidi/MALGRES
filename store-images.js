/* ================================================
   STORE IMAGES CONFIGURATION
   ================================================
   
   This file contains ALL image paths for the entire store.
   Update image paths here to change them across the website.
   
   ملف تكوين الصور - يحتوي على مسارات كل الصور في المتجر
   ================================================ */

const STORE_IMAGES = {
    
    // ========================================
    // LOGOS - اللوقوهات
    // ========================================
    logos: {
        // Main logo (appears in header)
        main: 'L1.png',
        
        // Secondary logo (appears in popups/stamps)
        secondary: 'L2.png',
        
        // Favicon (browser tab icon)
        favicon: 'favicon.ico'
    },
    
    
    // ========================================
    // PRODUCTS - المنتجات
    // ========================================
    products: {
        // Malgré Signature Product
        signature: {
            // Main product image
            main: 'I1.png',
            
            // Thumbnail images (for gallery)
            thumbnails: [
                'I1.png',  // Thumbnail 1
                'I1.png',  // Thumbnail 2
                'I1.png'   // Thumbnail 3
            ],
            
            // Image shown in cart
            cart: 'I1.png',
            
            // Image shown in checkout
            checkout: 'I1.png'
        }
        
        // Add more products here as needed:
        // anotherProduct: {
        //     main: 'product2.png',
        //     thumbnails: ['product2-1.png', 'product2-2.png'],
        //     cart: 'product2.png'
        // }
    },
    
    
    // ========================================
    // MAGAZINE - المجلة
    // ========================================
    magazine: {
        // Magazine cover
        cover: 'I1.png',
        
        // All magazine pages
        pages: [
            'I1.png',  // Page 1
            'I1.png',  // Page 2
            'I1.png',  // Page 3
            'I1.png',  // Page 4
            'I1.png'   // Page 5
        ]
    },
    
    
    // ========================================
    // BACKGROUNDS - الخلفيات
    // ========================================
    backgrounds: {
        // Hero section background
        hero: null,
        
        // General section backgrounds
        section: null,
        
        // Page backgrounds
        page: null
    },
    
    
    // ========================================
    // ICONS - الأيقونات
    // ========================================
    icons: {
        // Success checkmark
        success: '✓',
        
        // Cart icon (if using image instead of SVG)
        cart: null,
        
        // Back arrow (if using image instead of SVG)
        back: null,
        
        // Menu/hamburger icon (if using image)
        menu: null
    },
    
    
    // ========================================
    // COUNTRY FLAGS - أعلام الدول
    // ========================================
    flags: {
        // Saudi Arabia flag emoji
        sa: '🇸🇦',
        
        // Kuwait flag emoji
        kw: '🇰🇼'
    }
};


// ================================================
// HELPER FUNCTIONS - دوال مساعدة
// ================================================

/**
 * Get image path by category and name
 * @param {string} category - Category name (e.g., 'logos', 'products')
 * @param {string} name - Image name (e.g., 'main', 'secondary')
 * @returns {string} Image path
 */
function getImage(category, name) {
    try {
        const parts = name.split('.');
        let current = STORE_IMAGES[category];
        
        for (const part of parts) {
            current = current[part];
        }
        
        return current;
    } catch (error) {
        console.error(`Image not found: ${category}.${name}`);
        return '';
    }
}


/**
 * Set image source for an element
 * @param {string} elementId - Element ID
 * @param {string} category - Image category
 * @param {string} name - Image name
 */
function setImage(elementId, category, name) {
    const element = document.getElementById(elementId);
    if (element) {
        element.src = getImage(category, name);
    } else {
        console.error(`Element not found: ${elementId}`);
    }
}


/**
 * Set background image for an element
 * @param {string} elementId - Element ID
 * @param {string} category - Image category
 * @param {string} name - Image name
 */
function setBackgroundImage(elementId, category, name) {
    const element = document.getElementById(elementId);
    if (element) {
        const imagePath = getImage(category, name);
        if (imagePath) {
            element.style.backgroundImage = `url('${imagePath}')`;
        }
    } else {
        console.error(`Element not found: ${elementId}`);
    }
}


// ================================================
// AUTO-APPLY IMAGES ON PAGE LOAD
// ================================================

/**
 * Automatically apply images when page loads
 * This function runs automatically and sets all images
 */
function applyStoreImages() {
    // Apply logos
    const logos = document.querySelectorAll('[data-image="logo-main"]');
    logos.forEach(logo => {
        if (logo.tagName === 'IMG') {
            logo.src = STORE_IMAGES.logos.main;
        }
    });
    
    const logosSecondary = document.querySelectorAll('[data-image="logo-secondary"]');
    logosSecondary.forEach(logo => {
        if (logo.tagName === 'IMG') {
            logo.src = STORE_IMAGES.logos.secondary;
        }
    });
    
    // Apply product images
    const productImages = document.querySelectorAll('[data-image="product-main"]');
    productImages.forEach(img => {
        if (img.tagName === 'IMG') {
            img.src = STORE_IMAGES.products.signature.main;
        }
    });
    
    // Apply product thumbnails
    const thumbnails = document.querySelectorAll('[data-image^="product-thumbnail-"]');
    thumbnails.forEach(img => {
        const index = parseInt(img.getAttribute('data-image').split('-')[2]) - 1;
        if (img.tagName === 'IMG' && STORE_IMAGES.products.signature.thumbnails[index]) {
            img.src = STORE_IMAGES.products.signature.thumbnails[index];
        }
    });
    
    // Apply magazine images
    const magazineImages = document.querySelectorAll('[data-image="magazine-page"]');
    magazineImages.forEach(img => {
        const pageIndex = parseInt(img.getAttribute('data-page')) - 1;
        if (img.tagName === 'IMG' && STORE_IMAGES.magazine.pages[pageIndex]) {
            img.src = STORE_IMAGES.magazine.pages[pageIndex];
        }
    });
}

// Run automatically when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyStoreImages);
} else {
    applyStoreImages();
}


// ================================================
// MAKE GLOBALLY AVAILABLE - متاح عالمياً
// ================================================

// Make the configuration available globally
if (typeof window !== 'undefined') {
    window.STORE_IMAGES = STORE_IMAGES;
    window.getImage = getImage;
    window.setImage = setImage;
    window.setBackgroundImage = setBackgroundImage;
    window.applyStoreImages = applyStoreImages;
}


// ================================================
// EXPORT FOR MODULE SYSTEMS (if needed)
// ================================================

// For ES6 modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STORE_IMAGES,
        getImage,
        setImage,
        setBackgroundImage
    };
}


// ================================================
// USAGE EXAMPLES - أمثلة الاستخدام
// ================================================

/*

// 1. Direct access to image paths:
// --------------------------------
const mainLogo = STORE_IMAGES.logos.main;
const productImage = STORE_IMAGES.products.signature.main;
const magazinePage1 = STORE_IMAGES.magazine.pages[0];


// 2. Using helper functions:
// --------------------------
// Get image path
const logoPath = getImage('logos', 'main');

// Set image source directly
setImage('mainLogo', 'logos', 'main');
setImage('productImage', 'products', 'signature.main');

// Set background image
setBackgroundImage('hero', 'backgrounds', 'hero');


// 3. In HTML:
// -----------
<script src="store-images.js"></script>

<img id="mainLogo" alt="Logo">
<img id="productImage" alt="Product">

<script>
    // After page loads
    setImage('mainLogo', 'logos', 'main');
    setImage('productImage', 'products', 'signature.main');
</script>


// 4. Dynamic image loading:
// -------------------------
// Load all magazine pages
STORE_IMAGES.magazine.pages.forEach((page, index) => {
    console.log(`Page ${index + 1}: ${page}`);
});

// Load all product thumbnails
STORE_IMAGES.products.signature.thumbnails.forEach((thumb, index) => {
    console.log(`Thumbnail ${index + 1}: ${thumb}`);
});


// 5. Update cart items:
// ---------------------
const cartItem = {
    name: 'Malgré Signature',
    image: STORE_IMAGES.products.signature.cart,
    price: 450
};

*/