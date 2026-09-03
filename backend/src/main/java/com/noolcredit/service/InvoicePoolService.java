package com.noolcredit.service;

import com.noolcredit.dto.PoolDtos.*;
import com.noolcredit.entity.Invoice;
import com.noolcredit.entity.InvoicePool;
import com.noolcredit.exception.BadRequestException;
import com.noolcredit.exception.ResourceNotFoundException;
import com.noolcredit.repository.InvoicePoolRepository;
import com.noolcredit.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InvoicePoolService {

    private final InvoicePoolRepository poolRepository;
    private final InvoiceRepository invoiceRepository;

    public List<InvoicePool> getAllPools() {
        return poolRepository.findAll();
    }

    public InvoicePool getPoolById(String id) {
        return poolRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice Pool not found with id: " + id));
    }

    @Transactional
    public InvoicePool createPool(PoolCreateRequest request) {
        if (request.getInvoiceIds() == null || request.getInvoiceIds().isEmpty()) {
            throw new BadRequestException("Cannot create invoice pool without invoices");
        }

        List<Invoice> invoices = invoiceRepository.findAllById(request.getInvoiceIds());
        if (invoices.isEmpty()) {
            throw new BadRequestException("Selected invoices do not exist");
        }

        BigDecimal totalValue = BigDecimal.ZERO;
        BigDecimal weightedScoreSum = BigDecimal.ZERO;

        for (Invoice inv : invoices) {
            totalValue = totalValue.add(inv.getInvoiceAmount());
            weightedScoreSum = weightedScoreSum.add(
                    inv.getInvoiceAmount().multiply(new BigDecimal(inv.getRiskScore()))
            );
            inv.setStatus("POOLED");
            invoiceRepository.save(inv);
        }

        int weightedRiskScore = 80;
        if (totalValue.compareTo(BigDecimal.ZERO) > 0) {
            weightedRiskScore = weightedScoreSum.divide(totalValue, 0, RoundingMode.HALF_UP).intValue();
        }

        String riskLevel = weightedRiskScore >= 80 ? "LOW" : weightedRiskScore >= 60 ? "MEDIUM" : "HIGH";
        BigDecimal bundleRate = "LOW".equals(riskLevel) ? new BigDecimal("0.80") :
                                "MEDIUM".equals(riskLevel) ? new BigDecimal("0.65") : new BigDecimal("0.40");
        BigDecimal eligibleFinancing = totalValue.multiply(bundleRate);

        String poolId = "pool-" + UUID.randomUUID().toString().substring(0, 8);
        String poolNum = "POOL-" + (1000 + (int)(Math.random() * 9000));

        InvoicePool pool = InvoicePool.builder()
                .id(poolId)
                .poolNumber(poolNum)
                .msmeId("msme-01")
                .msmeName("Sri Lakshmi Knits")
                .industry("Textile Job Work")
                .invoiceIds(request.getInvoiceIds())
                .totalInvoiceValue(totalValue)
                .weightedRiskScore(weightedRiskScore)
                .riskLevel(riskLevel)
                .eligibleFinancing(eligibleFinancing)
                .status("READY")
                .build();

        return poolRepository.save(pool);
    }
}
