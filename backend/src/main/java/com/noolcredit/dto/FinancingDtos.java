package com.noolcredit.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class FinancingDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FinancingSubmissionRequest {
        @NotBlank
        private String poolId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DecisionRequest {
        private String reason;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class FinancingSummaryResponse {
        private String id;
        private String requestNumber;
        private String msmeId;
        private String msmeName;
        private String industry;
        private String location;
        private String poolId;
        private String poolNumber;
        private Integer invoiceCount;
        private BigDecimal invoiceValue;
        private Integer riskScore;
        private String riskLevel;
        private BigDecimal recommendedAmount;
        private String status;
        private String lenderDecision;
        private String rejectionReason;
        private String disbursementReference;
        private LocalDateTime submittedAt;
        private LocalDateTime reviewedAt;
        private List<String> positiveFactors;
        private List<String> riskFactors;
    }
}
