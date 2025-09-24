// Product Data
const products = [
    {
        id: 1,
        name: "Premium Notebook Set",
        price: 299,
        category: "stationery",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "High-quality spiral notebooks perfect for taking notes in lectures. Set of 5 notebooks with different subjects.",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Wireless Bluetooth Headphones",
        price: 1299,
        category: "electronics",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "High-quality wireless headphones with noise cancellation. Perfect for studying and music. 20-hour battery life.",
        badge: "Hot Deal"
    },
    {
        id: 3,
        name: "Campus Backpack",
        price: 899,
        category: "essentials",
        image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Durable and spacious backpack with laptop compartment. Water-resistant material with multiple pockets.",
        badge: "Featured"
    },
    {
        id: 4,
        name: "Study Lamp LED",
        price: 499,
        category: "essentials",
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Adjustable LED desk lamp with multiple brightness levels. Eye-friendly lighting for late-night study sessions.",
        badge: "New"
    },
    {
        id: 5,
        name: "Engineering Textbook Bundle",
        price: 1999,
        category: "books",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Complete set of engineering textbooks for first year. Includes Mathematics, Physics, and Chemistry books.",
        badge: "Bundle Deal"
    },
    {
        id: 6,
        name: "Portable Water Bottle",
        price: 199,
        category: "essentials",
        image: "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Stainless steel water bottle with temperature retention. Keeps drinks hot for 12 hours, cold for 24 hours.",
        badge: "Eco-Friendly"
    },
    {
        id: 7,
        name: "Scientific Calculator",
        price: 799,
        category: "stationery",
        image: "https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Advanced scientific calculator with 240+ functions. Essential for engineering and science students.",
        badge: "Essential"
    },
    {
        id: 8,
        name: "Laptop Stand Adjustable",
        price: 699,
        category: "electronics",
        image: "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Ergonomic laptop stand with adjustable height and angle. Improves posture during long study sessions.",
        badge: "Trending"
    },
    {
        id: 9,
        name: "Art Supplies Kit",
        price: 599,
        category: "stationery",
        image: "https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Complete art supplies kit with pencils, colors, brushes, and sketchbook. Perfect for art students.",
        badge: "Creative"
    },
    {
        id: 10,
        name: "USB-C Hub Multi-port",
        price: 999,
        category: "electronics",
        image: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and charging port. Essential for modern laptops.",
        badge: "Tech Essential"
    },
    {
        id: 11,
        name: "Medical Textbook Set",
        price: 2499,
        category: "books",
        image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Comprehensive medical textbook collection for MBBS students. Includes Anatomy, Physiology, and Biochemistry.",
        badge: "Professional"
    },
    {
        id: 12,
        name: "Desk Organizer Set",
        price: 399,
        category: "essentials",
        image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Wooden desk organizer with compartments for pens, papers, and small items. Keeps your study space tidy.",
        badge: "Organize"
    }
];

// Global Variables
let cart = JSON.parse(localStorage.getItem('campusmart-cart')) || [];
let currentCategory = 'all';
let currentSearchTerm = '';

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartBadge = document.getElementById('cart-badge');
const cartModal = document.getElementById('cart-modal');
const productModal = document.getElementById('product-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
    loadTheme();
});



// Event Listeners Setup
function setupEventListeners() {
    // Cart button
    document.getElementById('cart-btn').addEventListener('click', openCartModal);
    
    // Close buttons
    document.getElementById('close-cart').addEventListener('click', closeCartModal);
    document.getElementById('close-product').addEventListener('click', closeProductModal);
    
    // Search functionality
    searchInput.addEventListener('input', handleSearch);
    
    // Category filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) closeCartModal();
        if (e.target === productModal) closeProductModal();
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });
}

// Product Rendering
function renderProducts() {
    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(currentSearchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); margin-bottom: 1rem;"></i>
                <h3 style="color: var(--text-light); margin-bottom: 0.5rem;">No products found</h3>
                <p style="color: var(--text-light);">Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price}</p>
                <p class="product-description">${product.description.substring(0, 80)}...</p>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    renderCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    saveCart();
    updateCartUI();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('campusmart-cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartBadge.textContent = totalItems;
    cartTotal.textContent = totalPrice;
    
    if (totalItems === 0) {
        cartBadge.style.display = 'none';
    } else {
        cartBadge.style.display = 'flex';
    }
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
}

// Modal Functions
function openCartModal() {
    renderCartItems();
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = product.price;
    document.getElementById('modal-product-description').textContent = product.description;
    
    const addToCartBtn = document.getElementById('modal-add-to-cart');
    addToCartBtn.onclick = () => {
        addToCart(productId);
        closeProductModal();
    };
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Search and Filter Functions
function handleSearch(e) {
    currentSearchTerm = e.target.value;
    renderProducts();
}

function handleCategoryFilter(e) {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    e.target.classList.add('active');
    
    // Update current category
    currentCategory = e.target.dataset.category;
    
    // Re-render products
    renderProducts();
}

// Theme Functions
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('campusmart-theme', newTheme);
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (newTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('campusmart-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon
    const icon = themeToggle.querySelector('i');
    if (savedTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Mobile Menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--bg-color)';
        navbar.style.backdropFilter = 'none';
    }
});

// Checkout function (placeholder)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('checkout-btn')) {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        
        showNotification('Checkout functionality coming soon!');
        // Here you would typically integrate with a payment gateway
    }
});


window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (window.scrollY > 100) {
        if (isDark) {
            navbar.style.background = '#1e293b'; // solid dark
            navbar.style.color = '#e5e7eb';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.color = '#1e293b';
        }
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        if (isDark) {
            navbar.style.background = 'var(--bg-secondary)';
            navbar.style.color = '#e5e7eb';
        } else {
            navbar.style.background = 'var(--bg-color)';
            navbar.style.color = '#1e293b';
        }
        navbar.style.backdropFilter = 'none';
    }
});