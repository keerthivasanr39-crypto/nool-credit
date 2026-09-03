package com.noolcredit.controller;

import com.noolcredit.entity.RiskAssessment;
import com.noolcredit.service.RiskEngineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/risk")
public class RiskController {

    private final RiskEngineService riskService;

    public RiskController(RiskEngineService riskService) {
        this.riskService = riskService;
    }

    @PostMapping("/calculate/{invoiceId}")
    public ResponseEntity<RiskAssessment> calculateRisk(
            @PathVariable String invoiceId,
            @RequestParam(defaultValue = "100000") double amount,
            @RequestParam(defaultValue = "92") int buyerReliability,
            @RequestParam(defaultValue = "4") int paymentDelayDays,
            @RequestParam(defaultValue = "false") boolean duplicate
    ) {
        return ResponseEntity.ok(riskService.calculateRisk(invoiceId, amount, buyerReliability, paymentDelayDays, duplicate));
    }
}
