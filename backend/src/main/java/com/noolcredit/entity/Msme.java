package com.noolcredit.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "msmes")
public class Msme {

    @Id
    private String id;

    private String userId;
    private String businessName;
    private String industry;
    private String location;
    private String gstin;
    private String udyamNumber;

    public Msme() {}

    public Msme(String userId, String businessName, String industry, String location, String gstin, String udyamNumber) {
        this.userId = userId;
        this.businessName = businessName;
        this.industry = industry;
        this.location = location;
        this.gstin = gstin;
        this.udyamNumber = udyamNumber;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getIndustry() { return industry; }
    public void setIndustry(String industry) { this.industry = industry; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getGstin() { return gstin; }
    public void setGstin(String gstin) { this.gstin = gstin; }

    public String getUdyamNumber() { return udyamNumber; }
    public void setUdyamNumber(String udyamNumber) { this.udyamNumber = udyamNumber; }
}
