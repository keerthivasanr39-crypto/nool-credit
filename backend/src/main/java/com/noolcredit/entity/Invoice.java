package com.noolcredit.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "invoices")
public class Invoice {

    @Id
    private String id;

    @Indexed(unique = true)
    private String invoiceNumber;

    private String msmeId;
    private String msmeName;
    private String buyerId;
    private String buyerName;
    private String buyerGst;

    private double invoiceAmount;
    private LocalDate invoiceDate;
    private LocalDate dueDate;
    private String paymentTerms;

    private String verificationStatus; // PENDING, VERIFIED, REQUIRES_REVIEW, FAILED
    private int verificationScore;
    private int riskScore;
    private String riskLevel; // LOW, MEDIUM, HIGH
    private double eligibleFinancing;
    private String status; // AVAILABLE, POOLED, FINANCED

    private String poolId;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Invoice() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }

    public String getMsmeId() { return msmeId; }
    public void setMsmeId(String msmeId) { this.msmeId = msmeId; }

    public String getMsmeName() { return msmeName; }
    public void setMsmeName(String msmeName) { this.msmeName = msmeName; }

    public String getBuyerId() { return buyerId; }
    public void setBuyerId(String buyerId) { this.buyerId = buyerId; }

    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }

    public String getBuyerGst() { return buyerGst; }
    public void setBuyerGst(String buyerGst) { this.buyerGst = buyerGst; }

    public double getInvoiceAmount() { return invoiceAmount; }
    public void setInvoiceAmount(double invoiceAmount) { this.invoiceAmount = invoiceAmount; }

    public LocalDate getInvoiceDate() { return invoiceDate; }
    public void setInvoiceDate(LocalDate invoiceDate) { this.invoiceDate = invoiceDate; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getPaymentTerms() { return paymentTerms; }
    public void setPaymentTerms(String paymentTerms) { this.paymentTerms = paymentTerms; }

    public String getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(String verificationStatus) { this.verificationStatus = verificationStatus; }

    public int getVerificationScore() { return verificationScore; }
    public void setVerificationScore(int verificationScore) { this.verificationScore = verificationScore; }

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public double getEligibleFinancing() { return eligibleFinancing; }
    public void setEligibleFinancing(double eligibleFinancing) { this.eligibleFinancing = eligibleFinancing; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPoolId() { return poolId; }
    public void setPoolId(String poolId) { this.poolId = poolId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
