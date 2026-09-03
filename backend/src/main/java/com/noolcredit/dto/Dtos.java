package com.noolcredit.dto;

import java.time.LocalDate;
import java.util.List;

public class Dtos {

    public static class AuthRequest {
        private String email;
        private String password;
        private String role; // MSME or LENDER

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }

    public static class AuthResponse {
        private String token;
        private String userId;
        private String name;
        private String email;
        private String role;
        private String businessName;

        public AuthResponse(String token, String userId, String name, String email, String role, String businessName) {
            this.token = token;
            this.userId = userId;
            this.name = name;
            this.email = email;
            this.role = role;
            this.businessName = businessName;
        }

        public String getToken() { return token; }
        public String getUserId() { return userId; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public String getRole() { return role; }
        public String getBusinessName() { return businessName; }
    }

    public static class InvoiceCreateRequest {
        private String invoiceNumber;
        private String buyerName;
        private String buyerGst;
        private double invoiceAmount;
        private LocalDate invoiceDate;
        private LocalDate dueDate;
        private String paymentTerms;

        public String getInvoiceNumber() { return invoiceNumber; }
        public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
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
    }

    public static class CreatePoolRequest {
        private List<String> invoiceIds;
        public List<String> getInvoiceIds() { return invoiceIds; }
        public void setInvoiceIds(List<String> invoiceIds) { this.invoiceIds = invoiceIds; }
    }

    public static class SubmitFinancingRequest {
        private String poolId;
        private double requestedAmount;

        public String getPoolId() { return poolId; }
        public void setPoolId(String poolId) { this.poolId = poolId; }
        public double getRequestedAmount() { return requestedAmount; }
        public void setRequestedAmount(double requestedAmount) { this.requestedAmount = requestedAmount; }
    }

    public static class DecisionRequest {
        private String reason;
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }
}
