package com.noolcredit.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

public class PoolDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PoolCreateRequest {
        @NotEmpty
        private Set<String> invoiceIds;
        private String notes;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PoolResponse {
        private String id;
        private String poolNumber;
        private String msmeId;
        private String msmeName;
        private String industry;
        private Set<String> invoiceIds;
        private BigDecimal totalInvoiceValue;
        private Integer weightedRiskScore;
        private String riskLevel;
        private BigDecimal eligibleFinancing;
        private String status;
    }
}
