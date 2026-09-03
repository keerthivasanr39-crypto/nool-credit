package com.noolcredit.dto;

import lombok.*;
import java.util.List;

public class RiskDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RiskCalculationResponse {
        private String invoiceId;
        private int buyerReliability; // max 25
        private int paymentHistory; // max 20
        private int successfulInvoices; // max 15
        private int transactionConsistency; // max 15
        private int amountConsistency; // max 10
        private int paymentDelay; // max 15
        private int fraudDeductions;
        private int finalScore; // 0-100
        private String riskLevel;
        private List<String> positiveFactors;
        private List<String> riskFactors;
    }
}
