-- Initial Demo Data for Nool Credit FinTech Platform

-- Users (BCrypt hash for password123 is '$2a$10$wN8Wwz76uYq3j3M7V7U0Q.0LqD0b3v6gR3lqH6z6x0b3v6gR3lqH6')
INSERT INTO users (id, name, email, password, role) VALUES 
('usr-msme-01', 'Karthik Subramanian', 'msme@noolcredit.com', '$2a$10$0zT0G6Z3fD6J3aM0l6T2..iFkH/qL3g6N0j9O3u4v5w6x7y8z9A1B', 'ROLE_MSME'),
('usr-lender-01', 'Priya Sundaram', 'lender@noolcredit.com', '$2a$10$0zT0G6Z3fD6J3aM0l6T2..iFkH/qL3g6N0j9O3u4v5w6x7y8z9A1B', 'ROLE_LENDER');

-- MSME Profile
INSERT INTO msmes (id, user_id, business_name, industry, location) VALUES 
('msme-01', 'usr-msme-01', 'Sri Lakshmi Knits', 'Textile Job Work', 'Tirupur, Tamil Nadu');

-- Buyers
INSERT INTO buyers (id, name, business_id, reliability_score, successful_payments, average_payment_delay) VALUES 
('buy-01', 'ABC Garments Ltd.', 'BUY-ABC-9842', 94, 38, 6),
('buy-02', 'Knitwear Exports Global', 'BUY-KNT-1102', 88, 24, 12);

-- Invoices
INSERT INTO invoices (id, invoice_number, msme_id, buyer_id, buyer_name, buyer_business_id, invoice_amount, invoice_date, due_date, payment_terms, verification_status, verification_score, risk_score, risk_level, eligible_financing, status, notes) VALUES 
('inv-1001', 'INV-1001', 'msme-01', 'buy-01', 'ABC Garments Ltd.', 'BUY-ABC-9842', 60000.00, '2026-08-10', '2026-10-10', 'Net 60 Days', 'VERIFIED', 96, 85, 'LOW', 51000.00, 'VERIFIED', 'Textile dye and spin batch #402'),
('inv-1002', 'INV-1002', 'msme-01', 'buy-01', 'ABC Garments Ltd.', 'BUY-ABC-9842', 80000.00, '2026-08-15', '2026-10-15', 'Net 60 Days', 'VERIFIED', 94, 82, 'LOW', 68000.00, 'VERIFIED', 'Cotton jersey fabric knitting job work'),
('inv-1003', 'INV-1003', 'msme-01', 'buy-01', 'ABC Garments Ltd.', 'BUY-ABC-9842', 120000.00, '2026-08-20', '2026-10-20', 'Net 60 Days', 'VERIFIED', 95, 80, 'LOW', 102000.00, 'VERIFIED', 'Export garment finish and packaging');

-- Invoice Pool
INSERT INTO invoice_pools (id, pool_number, msme_id, msme_name, industry, total_invoice_value, weighted_risk_score, risk_level, eligible_financing, status) VALUES 
('pool-1001', 'POOL-1001', 'msme-01', 'Sri Lakshmi Knits', 'Textile Job Work', 260000.00, 82, 'LOW', 208000.00, 'SUBMITTED');

-- Pool Invoices
INSERT INTO pool_invoices (pool_id, invoice_id) VALUES 
('pool-1001', 'inv-1001'),
('pool-1001', 'inv-1002'),
('pool-1001', 'inv-1003');

-- Financing Request
INSERT INTO financing_requests (id, request_number, msme_id, msme_name, industry, location, pool_id, pool_number, invoice_count, invoice_value, risk_score, risk_level, recommended_amount, status) VALUES 
('req-1001', 'REQ-2026-089', 'msme-01', 'Sri Lakshmi Knits', 'Textile Job Work', 'Tirupur, Tamil Nadu', 'pool-1001', 'POOL-1001', 3, 260000.00, 82, 'LOW', 208000.00, 'UNDER_REVIEW');
