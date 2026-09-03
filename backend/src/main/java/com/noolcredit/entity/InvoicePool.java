package com.noolcredit.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "invoice_pools")
public class InvoicePool {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String poolNumber;

    private String msmeId;
    private String msmeName;

    private int invoiceCount;
    private double totalInvoiceValue;
    private int weightedRiskScore;
    private String riskLevel;
    private double eligibleFinancing;
    private String status; // CREATED, REQUESTED, APPROVED, REJECTED

    private LocalDateTime createdAt = LocalDateTime.now();

    public InvoicePool() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPoolNumber() { return poolNumber; }
    public void setPoolNumber(String poolNumber) { this.poolNumber = poolNumber; }

    public String getMsmeId() { return msmeId; }
    public void setMsmeId(String msmeId) { this.msmeId = msmeId; }

    public String getMsmeName() { return msmeName; }
    public void setMsmeName(String msmeName) { this.msmeName = msmeName; }

    public int getInvoiceCount() { return invoiceCount; }
    public void setInvoiceCount(int invoiceCount) { this.invoiceCount = invoiceCount; }

    public double getTotalInvoiceValue() { return totalInvoiceValue; }
    public void setTotalInvoiceValue(double totalInvoiceValue) { this.totalInvoiceValue = totalInvoiceValue; }

    public int getWeightedRiskScore() { return weightedRiskScore; }
    public void setWeightedRiskScore(int weightedRiskScore) { this.weightedRiskScore = weightedRiskScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public double getEligibleFinancing() { return eligibleFinancing; }
    public void setEligibleFinancing(double eligibleFinancing) { this.eligibleFinancing = eligibleFinancing; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
