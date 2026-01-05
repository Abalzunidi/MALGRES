// ================================================
// MENU.JS - CENTRALIZED MENU MANAGEMENT
// ================================================
// This file controls the menu across all pages
// هذا الملف يتحكم في المنيو في كل الصفحات
// ================================================

// Menu toggle function
function toggleMenu() {
    const menuButton = document.getElementById('menuButton');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    menuButton.classList.toggle('active');
    sideMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

// Get current page to set active state
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page;
}

// Menu structure - يمكنك تعديل المنيو من هنا
const menuStructure = {
    home: {
        sectionTitle: 'Main',
        title: 'Home Page',
        link: 'index.html',
        showOnPages: '*' // * means show on all pages
    },
    collection: {
        sectionTitle: 'Collection',
        items: [
            {
                title: 'Malgré Collection',
                link: 'products.html',
                activePages: ['products.html', 'product.html']
            }
        ]
    },
    explore: {
        sectionTitle: 'Explore',
        items: [
            {
                title: 'Magazine',
                link: 'magazine.html',
                activePages: ['magazine.html']
            },
            {
                title: 'Inquiry',
                link: 'inquiry.html',
                activePages: ['inquiry.html']
            },
            {
                title: 'Shopping Cart',
                link: 'cart.html',
                activePages: ['cart.html']
            },
            {
                title: 'Locations',
                link: 'locations.html',
                activePages: ['locations.html']
            }
        ]
    },
    information: {
        sectionTitle: 'Information',
        items: [
            {
                title: 'Email',
                link: 'contact.html',
                activePages: ['contact.html']
            },
            {
                title: 'Return Policy',
                link: 'returns.html',
                activePages: ['returns.html']
            },
            {
                title: 'Privacy Policy',
                link: 'privacy.html',
                activePages: ['privacy.html']
            },
            {
                title: 'Our Vision',
                link: 'vision.html',
                activePages: ['vision.html']
            },
            {
                title: 'Sponsorship',
                link: 'sponsorship.html',
                activePages: ['sponsorship.html']
            }
        ]
    }
};

// Generate menu HTML
function generateMenuHTML() {
    const currentPage = getCurrentPage();
    let html = '';
    
    // Logo at top
    html += `
        <div class="menu-logo" onclick="window.location.href='index.html'" style="text-align: center; margin-bottom: 30px; cursor: pointer;">
            <img src="L2.png" alt="Malgré" data-image="logo-main" style="height: 80px; width: auto;">
        </div>
    `;
    
    // Home section (Main section with title)
    const isHomeActive = currentPage === 'index.html' || currentPage === '';
    html += `
        <!-- Main Section -->
        <div class="menu-section">
            <div class="menu-section-title">${menuStructure.home.sectionTitle}</div>
            <div class="menu-item ${isHomeActive ? 'active' : ''}" onclick="window.location.href='${menuStructure.home.link}'">
                ${menuStructure.home.title}
            </div>
        </div>
    `;
    
    // Collection section
    html += generateSection('collection', menuStructure.collection, currentPage);
    
    // Explore section
    html += generateSection('explore', menuStructure.explore, currentPage);
    
    // Information section
    html += generateSection('information', menuStructure.information, currentPage);
    
    // Copyright at bottom
    html += `
        <div class="menu-copyright" style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: var(--text-light); font-size: 0.875rem;">
            © 2026 All Rights Reserved
        </div>
    `;
    
    return html;
}

// Generate a menu section
function generateSection(sectionKey, section, currentPage) {
    let html = `
        <!-- ${section.sectionTitle} Section -->
        <div class="menu-section">
            <div class="menu-section-title">${section.sectionTitle}</div>
    `;
    
    section.items.forEach(item => {
        const isActive = item.activePages.includes(currentPage);
        const activeClass = isActive ? 'active' : '';
        const onclickAttr = isActive ? '' : `onclick="window.location.href='${item.link}'"`;
        
        html += `
            <div class="menu-item ${activeClass}" ${onclickAttr}>
                ${item.title}
            </div>
        `;
    });
    
    html += `
        </div>
    `;
    
    return html;
}

// Initialize menu when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
        sideMenu.innerHTML = generateMenuHTML();
    }
});