package com.noolcredit.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "buyers")
public class Buyer {

    @Id
    private String id;

    private String name;
    private String gstin;
    private int reliabilityScore; // 0-100
    private int successfulPayments;
    private int averagePaymentDelayDays;

    public Buyer() {}

    public Buyer(String name, String gstin, int reliabilityScore, int successfulPayments, int averagePaymentDelayDays) {
        this.name = name;
        this.gstin = gstin;
        this.reliabilityScore = reliabilityScore;
        this.successfulPayments = successfulPayments;
        this.averagePaymentDelayDays = averagePaymentDelayDays;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGstin() { return gstin; }
    public void setGstin(String gstin) { this.gstin = gstin; }

    public int getReliabilityScore() { return reliabilityScore; }
    public void setReliabilityScore(int reliabilityScore) { this.reliabilityScore = reliabilityScore; }

    public int getSuccessfulPayments() { return successfulPayments; }
    public void setSuccessfulPayments(int successfulPayments) { this.successfulPayments = successfulPayments; }

    public int getAveragePaymentDelayDays() { return averagePaymentDelayDays; }
    public void setAveragePaymentDelayDays(int averagePaymentDelayDays) { this.averagePaymentDelayDays = averagePaymentDelayDays; }
}
