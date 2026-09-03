package com.noolcredit.controller;

import com.noolcredit.dto.Dtos;
import com.noolcredit.entity.FinancingRequest;
import com.noolcredit.service.FinancingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/financing")
public class FinancingController {

    private final FinancingService financingService;

    public FinancingController(FinancingService financingService) {
        this.financingService = financingService;
    }

    @GetMapping("/msme")
    public ResponseEntity<List<FinancingRequest>> getMsmeRequests() {
        return ResponseEntity.ok(financingService.getRequestsByMsme("msme-1"));
    }

    @GetMapping("/lender")
    public ResponseEntity<List<FinancingRequest>> getLenderRequests() {
        return ResponseEntity.ok(financingService.getAllRequests());
    }

    @PostMapping("/request")
    public ResponseEntity<FinancingRequest> submitRequest(@RequestBody Dtos.SubmitFinancingRequest req) {
        return ResponseEntity.ok(financingService.submitRequest(req, "msme-1", "Sri Lakshmi Knits"));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<FinancingRequest> approveRequest(@PathVariable String id) {
        return ResponseEntity.ok(financingService.approveRequest(id, "Apex FinCorp Capital"));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<FinancingRequest> rejectRequest(@PathVariable String id, @RequestBody Dtos.DecisionRequest req) {
        return ResponseEntity.ok(financingService.rejectRequest(id, req.getReason()));
    }
}
