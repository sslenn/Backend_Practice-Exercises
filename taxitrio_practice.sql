-- =====================================================
-- TaxiTrio / Taxi Booking System Practice Database
-- PostgreSQL Version
-- =====================================================

-- Optional: Drop tables if they already exist
-- This allows you to re-run the script safely during practice

DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS users CASCADE;


-- =====================================================
-- 1. USERS TABLE
-- =====================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    role VARCHAR(30) DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- 2. ROUTES TABLE
-- =====================================================

CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    origin VARCHAR(100) NOT NULL,
    destination VARCHAR(100) NOT NULL,
    distance_km NUMERIC(8,2),
    base_price NUMERIC(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- 3. DRIVERS TABLE
-- =====================================================

CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    status VARCHAR(30) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- 4. VEHICLES TABLE
-- =====================================================

CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    driver_id INT REFERENCES drivers(id) ON DELETE SET NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    plate_number VARCHAR(50) UNIQUE NOT NULL,
    seat_capacity INT NOT NULL,
    status VARCHAR(30) DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- 5. BOOKINGS TABLE
-- =====================================================

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    route_id INT NOT NULL REFERENCES routes(id) ON DELETE RESTRICT,
    driver_id INT REFERENCES drivers(id) ON DELETE SET NULL,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE SET NULL,
    pickup_date TIMESTAMP NOT NULL,
    passenger_count INT NOT NULL CHECK (passenger_count > 0),
    total_price NUMERIC(10,2) NOT NULL CHECK (total_price >= 0),
    status VARCHAR(30) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- 6. PAYMENTS TABLE
-- =====================================================

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    payment_method VARCHAR(50) NOT NULL,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    payment_status VARCHAR(30) DEFAULT 'pending',
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- 7. REVIEWS TABLE
-- =====================================================

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    booking_id INT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =====================================================
-- INSERT SAMPLE USERS
-- Passwords are fake hashed values for practice only
-- =====================================================

INSERT INTO users (name, email, password, phone, role)
VALUES
('Dara Sok', 'dara@example.com', 'hashed_password_123', '012345678', 'customer'),
('Sophea Chan', 'sophea@example.com', 'hashed_password_123', '098765432', 'customer'),
('Rithy Kim', 'rithy@example.com', 'hashed_password_123', '011223344', 'customer'),
('Admin User', 'admin@taxitrio.com', 'hashed_admin_password', '099999999', 'admin');


-- =====================================================
-- INSERT SAMPLE ROUTES
-- =====================================================

INSERT INTO routes (origin, destination, distance_km, base_price, is_active)
VALUES
('Phnom Penh', 'Siem Reap', 318.00, 85.00, TRUE),
('Phnom Penh', 'Sihanoukville', 230.00, 70.00, TRUE),
('Phnom Penh', 'Kampot', 150.00, 55.00, TRUE),
('Phnom Penh', 'Kep', 170.00, 60.00, TRUE),
('Phnom Penh', 'Battambang', 291.00, 80.00, TRUE),
('Phnom Penh', 'Kampong Cham', 124.00, 45.00, TRUE),
('Phnom Penh', 'Mondulkiri', 375.00, 120.00, TRUE),
('Phnom Penh', 'Ratanakiri', 590.00, 160.00, TRUE),
('Siem Reap', 'Battambang', 165.00, 50.00, TRUE),
('Sihanoukville', 'Kampot', 100.00, 40.00, TRUE);


-- =====================================================
-- INSERT SAMPLE DRIVERS
-- =====================================================

INSERT INTO drivers (name, phone, license_number, status)
VALUES
('Vanna Reach', '010111222', 'DRV-PP-001', 'available'),
('Sokha Lim', '010333444', 'DRV-PP-002', 'available'),
('Piseth Long', '010555666', 'DRV-PP-003', 'busy'),
('Mony Dara', '010777888', 'DRV-PP-004', 'available');


-- =====================================================
-- INSERT SAMPLE VEHICLES
-- =====================================================

INSERT INTO vehicles (driver_id, vehicle_type, plate_number, seat_capacity, status)
VALUES
(1, 'Toyota Prius', '2AB-1234', 4, 'available'),
(2, 'Toyota Alphard', '2AC-5678', 6, 'available'),
(3, 'Hyundai Starex', '2AD-9999', 9, 'busy'),
(4, 'Lexus RX300', '2AE-8888', 4, 'available');


-- =====================================================
-- INSERT SAMPLE BOOKINGS
-- =====================================================

INSERT INTO bookings (
    user_id,
    route_id,
    driver_id,
    vehicle_id,
    pickup_date,
    passenger_count,
    total_price,
    status
)
VALUES
(1, 1, 1, 1, '2026-06-10 09:00:00', 2, 85.00, 'confirmed'),
(2, 2, 2, 2, '2026-06-12 14:30:00', 4, 70.00, 'pending'),
(3, 3, 3, 3, '2026-06-15 08:00:00', 6, 55.00, 'completed'),
(1, 5, 4, 4, '2026-06-20 10:00:00', 2, 80.00, 'cancelled');


-- =====================================================
-- INSERT SAMPLE PAYMENTS
-- =====================================================

INSERT INTO payments (
    booking_id,
    payment_method,
    amount,
    payment_status,
    paid_at
)
VALUES
(1, 'ABA Pay', 85.00, 'paid', '2026-06-09 18:30:00'),
(2, 'Cash', 70.00, 'pending', NULL),
(3, 'ABA Pay', 55.00, 'paid', '2026-06-14 20:00:00'),
(4, 'Cash', 80.00, 'cancelled', NULL);


-- =====================================================
-- INSERT SAMPLE REVIEWS
-- =====================================================

INSERT INTO reviews (
    booking_id,
    user_id,
    rating,
    comment
)
VALUES
(3, 3, 5, 'Good driver and comfortable trip.'),
(1, 1, 4, 'The ride was smooth and on time.');


-- =====================================================
-- USEFUL PRACTICE QUERIES
-- =====================================================

-- View all users
SELECT * FROM users;

-- View all active routes
SELECT * FROM routes
WHERE is_active = TRUE
ORDER BY origin ASC;

-- View all bookings with user and route information
SELECT 
    b.id AS booking_id,
    u.name AS customer_name,
    r.origin,
    r.destination,
    b.pickup_date,
    b.passenger_count,
    b.total_price,
    b.status
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN routes r ON b.route_id = r.id
ORDER BY b.created_at DESC;

-- View booking history for one user
SELECT 
    b.id AS booking_id,
    r.origin,
    r.destination,
    b.pickup_date,
    b.passenger_count,
    b.total_price,
    b.status
FROM bookings b
JOIN routes r ON b.route_id = r.id
WHERE b.user_id = 1
ORDER BY b.created_at DESC;

-- View completed bookings with payment information
SELECT 
    b.id AS booking_id,
    u.name AS customer_name,
    p.payment_method,
    p.amount,
    p.payment_status,
    p.paid_at
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN payments p ON b.id = p.booking_id
WHERE b.status = 'completed';

-- View drivers and their vehicles
SELECT 
    d.id AS driver_id,
    d.name AS driver_name,
    d.phone,
    d.status AS driver_status,
    v.vehicle_type,
    v.plate_number,
    v.seat_capacity,
    v.status AS vehicle_status
FROM drivers d
LEFT JOIN vehicles v ON d.id = v.driver_id;

-- Count bookings by status
SELECT 
    status,
    COUNT(*) AS total_bookings
FROM bookings
GROUP BY status;

-- Total revenue from paid payments
SELECT 
    SUM(amount) AS total_revenue
FROM payments
WHERE payment_status = 'paid';
