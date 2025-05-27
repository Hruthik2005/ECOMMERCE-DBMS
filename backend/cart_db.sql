USE user_auth;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 9.99,
  description TEXT,
  image_url VARCHAR(255) DEFAULT 'images/placeholder.jpg',
  stock INT NOT NULL DEFAULT 10
);

-- Cart table
CREATE TABLE IF NOT EXISTS cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY user_product (user_id, product_id)
);

-- Insert sample products (from your existing products array)
INSERT INTO products (name, category, price) VALUES
('Smartphone', 'electronics', 599.99),
('Laptop', 'electronics', 999.99),
('T-Shirt', 'clothing', 29.99),
('Jeans', 'clothing', 59.99),
('Blender', 'home', 79.99),
('Vacuum Cleaner', 'home', 149.99);