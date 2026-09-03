package com.noolcredit.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "risk_assessments")
public class RiskAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String invoiceId;
    private int buyerReliability; // 0-25
    private int paymentHistory; // 0-20
    private int previousSuccessfulInvoices; // 0-15
    private int transactionConsistency; // 0-15
    private int invoiceConsistency; // 0-10
    private int paymentDelayScore; // 0-15
    private int fraudRiskDeduction; // 0-30

    private int finalScore; // 0-100
    private String riskLevel; // LOW, MEDIUM, HIGH

    public RiskAssessment() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getInvoiceId() { return invoiceId; }
    public void setInvoiceId(String invoiceId) { this.invoiceId = invoiceId; }

    public int getBuyerReliability() { return buyerReliability; }
    public void setBuyerReliability(int buyerReliability) { this.buyerReliability = buyerReliability; }

    public int getPaymentHistory() { return paymentHistory; }
    public void setPaymentHistory(int paymentHistory) { this.paymentHistory = paymentHistory; }

    public int getPreviousSuccessfulInvoices() { return previousSuccessfulInvoices; }
    public void setPreviousSuccessfulInvoices(int previousSuccessfulInvoices) { this.previousSuccessfulInvoices = previousSuccessfulInvoices; }

    public int getTransactionConsistency() { return transactionConsistency; }
    public void setTransactionConsistency(int transactionConsistency) { this.transactionConsistency = transactionConsistency; }

    public int getInvoiceConsistency() { return invoiceConsistency; }
    public void setInvoiceConsistency(int invoiceConsistency) { this.invoiceConsistency = invoiceConsistency; }

    public int getPaymentDelayScore() { return paymentDelayScore; }
    public void setPaymentDelayScore(int paymentDelayScore) { this.paymentDelayScore = paymentDelayScore; }

    public int getFraudRiskDeduction() { return fraudRiskDeduction; }
    public void setFraudRiskDeduction(int fraudRiskDeduction) { this.fraudRiskDeduction = fraudRiskDeduction; }

    public int getFinalScore() { return finalScore; }
    public void setFinalScore(int finalScore) { this.finalScore = finalScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
}
