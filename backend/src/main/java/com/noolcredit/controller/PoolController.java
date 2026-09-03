package com.noolcredit.controller;

import com.noolcredit.dto.Dtos;
import com.noolcredit.entity.InvoicePool;
import com.noolcredit.repository.InvoicePoolRepository;
import com.noolcredit.service.FinancingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pools")
public class PoolController {

    private final FinancingService financingService;
    private final InvoicePoolRepository poolRepo;

    public PoolController(FinancingService financingService, InvoicePoolRepository poolRepo) {
        this.financingService = financingService;
        this.poolRepo = poolRepo;
    }

    @GetMapping
    public ResponseEntity<List<InvoicePool>> getPools() {
        return ResponseEntity.ok(poolRepo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoicePool> getPoolById(@PathVariable String id) {
        return poolRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<InvoicePool> createPool(@RequestBody Dtos.CreatePoolRequest req) {
        return ResponseEntity.ok(financingService.createPool(req.getInvoiceIds(), "msme-1", "Sri Lakshmi Knits"));
    }
}
