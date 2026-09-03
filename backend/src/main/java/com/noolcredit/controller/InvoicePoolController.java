package com.noolcredit.controller;

import com.noolcredit.dto.PoolDtos.*;
import com.noolcredit.entity.InvoicePool;
import com.noolcredit.service.InvoicePoolService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pools")
@RequiredArgsConstructor
public class InvoicePoolController {

    private final InvoicePoolService poolService;

    @GetMapping
    public ResponseEntity<List<InvoicePool>> getAllPools() {
        return ResponseEntity.ok(poolService.getAllPools());
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvoicePool> getPoolById(@PathVariable String id) {
        return ResponseEntity.ok(poolService.getPoolById(id));
    }

    @PostMapping
    public ResponseEntity<InvoicePool> createPool(@Valid @RequestBody PoolCreateRequest request) {
        return ResponseEntity.ok(poolService.createPool(request));
    }
}
