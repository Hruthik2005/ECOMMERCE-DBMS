// --- PAGE REDIRECTION LOGIC ---
const page = window.location.pathname.split('/').pop();
if (
  (page === "index.html" || page === "" || page === "cart.html" || page === "checkout.html") &&
  localStorage.getItem("loggedIn") !== "true"
) {
  window.location.href = "login.html";
}
if (
  (page === "login.html" || page === "register.html") &&
  localStorage.getItem("loggedIn") === "true"
) {
  window.location.href = "index.html";
}

// --- LOGIN ---
function login() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const msg = document.getElementById("loginMessage");
  
  // Show loading message
  msg.innerHTML = '<div>Processing...</div>';
  
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: username,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json(); // Parse the JSON response
    } else {
      throw new Error("Invalid credentials");
    }
  })
  .then(data => {
    msg.innerHTML = '<div class="success">Login successful! Redirecting...</div>';
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("userId", data.userId); // Save the userId
    setTimeout(() => {
      window.location.href = "index.html";
    }, 800);
  })
  .catch(error => {
    console.error('Error:', error);
    msg.innerHTML = '<div class="error">Invalid username or password.</div>';
  });
}

// --- REGISTER ---
function register() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const msg = document.getElementById("registerMessage");
  
  if (username.length < 3 || password.length < 4) {
    msg.innerHTML = '<div class="error">Username must be at least 3 characters and password 4.</div>';
    return;
  }
  
  // Show loading message
  msg.innerHTML = '<div>Creating account...</div>';
  
  fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: username,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      msg.innerHTML = '<div class="success">Registration successful! Redirecting to login...</div>';
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    } else {
      msg.innerHTML = '<div class="error">Username already exists or server error.</div>';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    msg.innerHTML = '<div class="error">Server error. Please try again later.</div>';
  });
}

// --- LOGOUT ---
function logout() {
  localStorage.setItem("loggedIn", "false");
  window.location.href = "login.html";
}

// --- CART LOGIC (database version) ---
function updateCartCount() {
  const userId = localStorage.getItem("userId");
  if (!userId || !document.getElementById("cartCount")) return;
  
  fetch(`http://localhost:3000/cart/${userId}`)
    .then(response => response.json())
    .then(items => {
      const totalItems = items.reduce((total, item) => total + item.quantity, 0);
      document.getElementById("cartCount").textContent = totalItems;
    })
    .catch(error => console.error('Error updating cart count:', error));
}

// --- SHOP PAGE LOGIC (index.html) ---
const products = [
  { name: "Smartphone", category: "electronics" },
  { name: "Laptop", category: "electronics" },
  { name: "T-Shirt", category: "clothing" },
  { name: "Jeans", category: "clothing" },
  { name: "Blender", category: "home" },
  { name: "Vacuum Cleaner", category: "home" }
];

function renderProducts(category = "all") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  
  // Show loading state
  grid.innerHTML = "<p>Loading products...</p>";
  
  // Fetch products from server
  fetch(`http://localhost:3000/products/category/${category}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(products => {
      grid.innerHTML = "";
      
      if (!products || products.length === 0) {
        grid.innerHTML = "<p>No products found in this category.</p>";
        return;
      }
      
      // Render each product
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <h3>${product.name}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <p>${product.description || ''}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      grid.innerHTML = "<p>Error loading products. Please try again.</p>";
    });
}

function addToCart(productId) {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please log in to add items to cart");
    window.location.href = "login.html";
    return;
  }
  
  fetch('http://localhost:3000/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      productId: productId
    })
  })
  .then(response => response.json())
  .then(data => {
    alert("Product added to cart!");
    updateCartCount();
  })
  .catch(error => {
    console.error('Error adding to cart:', error);
    alert("Error adding to cart. Please try again.");
  });
}

// --- CART PAGE LOGIC (cart.html) ---
function renderCartPage() {
  const cartList = document.getElementById("cartList");
  const cartTable = document.getElementById("cartTable");
  const cartEmpty = document.getElementById("cartEmpty");
  
  if (!cartList) return;
  
  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "login.html";
    return;
  }
  
  fetch(`http://localhost:3000/cart/${userId}`)
    .then(response => response.json())
    .then(items => {
      if (items.length === 0) {
        if (cartTable) cartTable.style.display = "none";
        if (cartEmpty) cartEmpty.style.display = "block";
        return;
      }
      
      if (cartTable) cartTable.style.display = "";
      if (cartEmpty) cartEmpty.style.display = "none";
      
      cartList.innerHTML = '';
      
      items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
          <td><button class="remove-btn" onclick="removeFromCart(${item.product_id})">Remove</button></td>
        `;
        cartList.appendChild(tr);
      });
      
      // Update total items count
      const totalItems = items.reduce((total, item) => total + item.quantity, 0);
      if (document.getElementById("cartTotalItems")) {
        document.getElementById("cartTotalItems").textContent = totalItems;
      }
    })
    .catch(error => {
      console.error('Error loading cart:', error);
      if (cartList) cartList.innerHTML = "<tr><td colspan='4'>Error loading cart</td></tr>";
    });
}

function removeFromCart(productId) {
  const userId = localStorage.getItem("userId");
  if (!userId) return;
  
  fetch(`http://localhost:3000/cart/${userId}/${productId}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    renderCartPage();
    updateCartCount();
  })
  .catch(error => console.error('Error removing item:', error));
}

function clearCart() {
  const userId = localStorage.getItem("userId");
  if (!userId) return;
  
  if (!confirm("Are you sure you want to clear your cart?")) return;
  
  fetch(`http://localhost:3000/cart/${userId}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
    renderCartPage();
    updateCartCount();
  })
  .catch(error => console.error('Error clearing cart:', error));
}

// --- CHECKOUT PAGE LOGIC (checkout.html) ---
function renderCheckoutSummary() {
  const cart = getCart();
  if (document.getElementById("checkoutTotalItems")) {
    document.getElementById("checkoutTotalItems").textContent = cart.length;
  }
}

// --- NAVIGATION BUTTONS (index.html) ---
function setupNavButtons() {
  const navButtons = document.querySelectorAll("nav button");
  navButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      navButtons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      const category = this.getAttribute("data-category");
      renderProducts(category);
    });
  });
}

// --- ON PAGE LOAD EVENTS ---
document.addEventListener("DOMContentLoaded", function() {
  updateCartCount();
  // Shop page setup
  if (document.getElementById("productGrid")) {
    renderProducts("all");
    setupNavButtons();
  }
  // Cart page setup
  if (document.getElementById("cartList")) {
    renderCartPage();
  }
  // Checkout page setup
  if (document.getElementById("checkoutTotalItems")) {
    renderCheckoutSummary();
  }
  
  // Load products when page loads
  renderProducts("all");
  
  // Add click handlers for category buttons
  const categoryButtons = document.querySelectorAll('nav button');
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      // Load products for this category
      renderProducts(button.dataset.category);
    });
  });
});

// Add this function to load products
function renderProducts(category = "all") {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  
  // Show loading state
  grid.innerHTML = "<p>Loading products...</p>";
  
  // Fetch products from server
  fetch(`http://localhost:3000/products/category/${category}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(products => {
      grid.innerHTML = "";
      
      if (!products || products.length === 0) {
        grid.innerHTML = "<p>No products found in this category.</p>";
        return;
      }
      
      // Render each product
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <h3>${product.name}</h3>
          <p class="price">$${product.price.toFixed(2)}</p>
          <p>${product.description || ''}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      grid.innerHTML = "<p>Error loading products. Please try again.</p>";
    });
}

// Add this function to handle category button clicks
function setupCategoryButtons() {
  const buttons = document.querySelectorAll('nav button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Set active state
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      
      // Load products for the selected category
      renderProducts(button.dataset.category);
    });
  });
}

// Add this function to initialize the page
function initShopPage() {
  // Check if user is logged in
  const loggedIn = localStorage.getItem('loggedIn');
  if (!loggedIn) {
    window.location.href = 'login.html';
    return;
  }
  
  // Setup category buttons
  setupCategoryButtons();
  
  // Load all products by default
  renderProducts('all');
  
  // Update cart count
  updateCartCount();
}

// Add this function to update cart count
function updateCartCount() {
  const countElement = document.getElementById('cartCount');
  if (!countElement) return;
  
  const userId = localStorage.getItem('userId');
  if (!userId) {
    countElement.textContent = '0';
    return;
  }
  
  fetch(`http://localhost:3000/cart/${userId}`)
    .then(response => response.json())
    .then(items => {
      const totalItems = items.reduce((total, item) => total + item.quantity, 0);
      countElement.textContent = totalItems;
    })
    .catch(error => {
      console.error('Error updating cart count:', error);
      countElement.textContent = '0';
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initShopPage);

// Function to handle logout
function logout() {
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
}

// Function to add item to cart
function addToCart(productId) {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('Please log in to add items to cart');
    window.location.href = 'login.html';
    return;
  }
  
  fetch('http://localhost:3000/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      productId: productId
    })
  })
  .then(response => response.json())
  .then(data => {
    alert('Item added to cart!');
    updateCartCount();
  })
  .catch(error => {
    console.error('Error adding to cart:', error);
    alert('Failed to add item to cart. Please try again.');
  });
}
