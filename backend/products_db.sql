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

-- Insert sample products
INSERT INTO products (name, category, price, description) VALUES
('Smartphone', 'electronics', 599.99, 'Latest model smartphone with advanced features'),
('Laptop', 'electronics', 999.99, 'High-performance laptop for work and gaming'),
('T-Shirt', 'clothing', 29.99, 'Comfortable cotton t-shirt'),
('Jeans', 'clothing', 59.99, 'Classic blue jeans'),
('Blender', 'home', 79.99, 'Powerful kitchen blender'),
('Vacuum Cleaner', 'home', 149.99, 'Cordless vacuum cleaner');