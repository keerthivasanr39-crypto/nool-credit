-- Schema for Nool Credit FinTech Platform

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS msmes (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64),
    business_name VARCHAR(255) NOT NULL,
    industry VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS buyers (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    business_id VARCHAR(64) UNIQUE NOT NULL,
    reliability_score INT DEFAULT 90,
    successful_payments INT DEFAULT 0,
    average_payment_delay INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR(64) PRIMARY KEY,
    invoice_number VARCHAR(64) UNIQUE NOT NULL,
    msme_id VARCHAR(64) NOT NULL,
    buyer_id VARCHAR(64) NOT NULL,
    buyer_name VARCHAR(255) NOT NULL,
    buyer_business_id VARCHAR(64) NOT NULL,
    invoice_amount DECIMAL(15, 2) NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE NOT NULL,
    payment_terms VARCHAR(64) DEFAULT 'Net 60 Days',
    verification_status VARCHAR(32) DEFAULT 'PENDING',
    verification_score INT DEFAULT 95,
    risk_score INT DEFAULT 85,
    risk_level VARCHAR(32) DEFAULT 'LOW',
    eligible_financing DECIMAL(15, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'VERIFIED',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS invoice_pools (
    id VARCHAR(64) PRIMARY KEY,
    pool_number VARCHAR(64) UNIQUE NOT NULL,
    msme_id VARCHAR(64) NOT NULL,
    msme_name VARCHAR(255) NOT NULL,
    industry VARCHAR(255) NOT NULL,
    total_invoice_value DECIMAL(15, 2) NOT NULL,
    weighted_risk_score INT DEFAULT 80,
    risk_level VARCHAR(32) DEFAULT 'LOW',
    eligible_financing DECIMAL(15, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'READY',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pool_invoices (
    pool_id VARCHAR(64) NOT NULL,
    invoice_id VARCHAR(64) NOT NULL,
    PRIMARY KEY (pool_id, invoice_id)
);

CREATE TABLE IF NOT EXISTS financing_requests (
    id VARCHAR(64) PRIMARY KEY,
    request_number VARCHAR(64) UNIQUE NOT NULL,
    msme_id VARCHAR(64) NOT NULL,
    msme_name VARCHAR(255) NOT NULL,
    industry VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    pool_id VARCHAR(64) NOT NULL,
    pool_number VARCHAR(64) NOT NULL,
    invoice_count INT NOT NULL,
    invoice_value DECIMAL(15, 2) NOT NULL,
    risk_score INT NOT NULL,
    risk_level VARCHAR(32) NOT NULL,
    recommended_amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(32) DEFAULT 'UNDER_REVIEW',
    lender_decision VARCHAR(32),
    rejection_reason TEXT,
    disbursement_reference VARCHAR(64),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS risk_assessments (
    id VARCHAR(64) PRIMARY KEY,
    invoice_id VARCHAR(64),
    buyer_reliability INT NOT NULL,
    payment_history INT NOT NULL,
    successful_invoices INT NOT NULL,
    transaction_consistency INT NOT NULL,
    amount_consistency INT NOT NULL,
    payment_delay INT NOT NULL,
    fraud_risk INT DEFAULT 0,
    final_score INT NOT NULL,
    risk_level VARCHAR(32) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
