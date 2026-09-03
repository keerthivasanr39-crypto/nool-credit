package com.noolcredit.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "financing_requests")
public class FinancingRequest {

    @Id
    private String id;

    @Indexed(unique = true)
    private String requestNumber;

    private String msmeId;
    private String msmeName;
    private String industry;
    private String poolId;
    private String poolNumber;

    private double invoiceValue;
    private int riskScore;
    private String riskLevel;
    private double recommendedAmount;
    private double requestedAmount;

    private String status; // PENDING, UNDER_REVIEW, APPROVED, REJECTED, DISBURSEMENT_INITIATED
    private String lenderName;
    private String lenderDecision;
    private String rejectionReason;
    private LocalDateTime decisionDate;

    private LocalDateTime createdAt = LocalDateTime.now();

    public FinancingRequest() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRequestNumber() { return requestNumber; }
    public void setRequestNumber(String requestNumber) { this.requestNumber = requestNumber; }

    public String getMsmeId() { return msmeId; }
    public void setMsmeId(String msmeId) { this.msmeId = msmeId; }

    public String getMsmeName() { return msmeName; }
    public void setMsmeName(String msmeName) { this.msmeName = msmeName; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getPoolId() { return poolId; }
    public void setPoolId(String poolId) { this.poolId = poolId; }

    public String getPoolNumber() { return poolNumber; }
    public void setPoolNumber(String poolNumber) { this.poolNumber = poolNumber; }

    public double getInvoiceValue() { return invoiceValue; }
    public void setInvoiceValue(double invoiceValue) { this.invoiceValue = invoiceValue; }

    public int getRiskScore() { return riskScore; }
    public void setRiskScore(int riskScore) { this.riskScore = riskScore; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public double getRecommendedAmount() { return recommendedAmount; }
    public void setRecommendedAmount(double recommendedAmount) { this.recommendedAmount = recommendedAmount; }

    public double getRequestedAmount() { return requestedAmount; }
    public void setRequestedAmount(double requestedAmount) { this.requestedAmount = requestedAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getLenderName() { return lenderName; }
    public void setLenderName(String lenderName) { this.lenderName = lenderName; }

    public String getLenderDecision() { return lenderDecision; }
    public void setLenderDecision(String lenderDecision) { this.lenderDecision = lenderDecision; }

    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }

    public LocalDateTime getDecisionDate() { return decisionDate; }
    public void setDecisionDate(LocalDateTime decisionDate) { this.decisionDate = decisionDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
