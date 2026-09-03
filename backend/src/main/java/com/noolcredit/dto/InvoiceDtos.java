package com.noolcredit.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class InvoiceDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InvoiceCreateRequest {
        @NotBlank
        private String invoiceNumber;

        private String buyerId;
        private String buyerName;
        private String buyerBusinessId;

        @NotNull
        @DecimalMin("1000.00")
        private BigDecimal invoiceAmount;

        @NotNull
        private LocalDate invoiceDate;

        @NotNull
        private LocalDate dueDate;

        private String paymentTerms;
        private String notes;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InvoiceVerificationResponse {
        private String invoiceNumber;
        private boolean numberValid;
        private boolean infoComplete;
        private boolean amountValid;
        private boolean dueDateValid;
        private boolean duplicateCheckPassed;
        private int verificationScore;
        private String verificationStatus;
        private List<String> warnings;
    }
}
