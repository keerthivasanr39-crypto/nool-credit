package com.noolcredit.service;

import com.noolcredit.dto.Dtos;
import com.noolcredit.entity.FinancingRequest;
import com.noolcredit.entity.Invoice;
import com.noolcredit.entity.InvoicePool;
import com.noolcredit.repository.FinancingRequestRepository;
import com.noolcredit.repository.InvoicePoolRepository;
import com.noolcredit.repository.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class FinancingService {

    private final InvoicePoolRepository poolRepo;
    private final FinancingRequestRepository requestRepo;
    private final InvoiceRepository invoiceRepo;

    public FinancingService(InvoicePoolRepository poolRepo, FinancingRequestRepository requestRepo, InvoiceRepository invoiceRepo) {
        this.poolRepo = poolRepo;
        this.requestRepo = requestRepo;
        this.invoiceRepo = invoiceRepo;
    }

    public InvoicePool createPool(List<String> invoiceIds, String msmeId, String msmeName) {
        List<Invoice> invoices = invoiceRepo.findAllById(invoiceIds);

        double totalValue = invoices.stream().mapToDouble(Invoice::getInvoiceAmount).sum();
        double weightedScore = invoices.stream()
                .mapToDouble(i -> i.getRiskScore() * i.getInvoiceAmount())
                .sum() / (totalValue > 0 ? totalValue : 1);

        int finalWeightedScore = (int) Math.round(weightedScore);
        String riskLevel = finalWeightedScore >= 80 ? "LOW" : finalWeightedScore >= 60 ? "MEDIUM" : "HIGH";
        double financingRate = riskLevel.equals("LOW") ? 0.85 : riskLevel.equals("MEDIUM") ? 0.70 : 0.50;
        double eligibleFinancing = Math.round(totalValue * financingRate);

        InvoicePool pool = new InvoicePool();
        pool.setPoolNumber("POOL-" + (1000 + poolRepo.count() + 1));
        pool.setMsmeId(msmeId != null ? msmeId : "msme-1");
        pool.setMsmeName(msmeName != null ? msmeName : "Sri Lakshmi Knits");
        pool.setInvoiceCount(invoices.size());
        pool.setTotalInvoiceValue(totalValue);
        pool.setWeightedRiskScore(finalWeightedScore);
        pool.setRiskLevel(riskLevel);
        pool.setEligibleFinancing(eligibleFinancing);
        pool.setStatus("CREATED");

        InvoicePool savedPool = poolRepo.save(pool);

        // Update invoices to POOLED
        for (Invoice inv : invoices) {
            inv.setStatus("POOLED");
            inv.setPoolId(savedPool.getId());
            invoiceRepo.save(inv);
        }

        return savedPool;
    }

    public FinancingRequest submitRequest(Dtos.SubmitFinancingRequest req, String msmeId, String msmeName) {
        Optional<InvoicePool> poolOpt = poolRepo.findById(req.getPoolId());
        InvoicePool pool = poolOpt.orElse(null);

        FinancingRequest finReq = new FinancingRequest();
        finReq.setRequestNumber("REQ-" + (1000 + requestRepo.count() + 1));
        finReq.setMsmeId(msmeId != null ? msmeId : "msme-1");
        finReq.setMsmeName(msmeName != null ? msmeName : "Sri Lakshmi Knits");
        finReq.setIndustry("Textile Job Work");
        finReq.setPoolId(req.getPoolId());
        finReq.setPoolNumber(pool != null ? pool.getPoolNumber() : "POOL-1001");
        finReq.setInvoiceValue(pool != null ? pool.getTotalInvoiceValue() : 260000);
        finReq.setRiskScore(pool != null ? pool.getWeightedRiskScore() : 82);
        finReq.setRiskLevel(pool != null ? pool.getRiskLevel() : "LOW");
        finReq.setRecommendedAmount(pool != null ? pool.getEligibleFinancing() : 208000);
        finReq.setRequestedAmount(req.getRequestedAmount() > 0 ? req.getRequestedAmount() : finReq.getRecommendedAmount());
        finReq.setStatus("UNDER_REVIEW");

        return requestRepo.save(finReq);
    }

    public FinancingRequest approveRequest(String id, String lenderName) {
        FinancingRequest req = requestRepo.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus("DISBURSEMENT_INITIATED");
        req.setLenderName(lenderName != null ? lenderName : "Apex FinCorp Capital");
        req.setLenderDecision("APPROVED");
        req.setDecisionDate(LocalDateTime.now());
        return requestRepo.save(req);
    }

    public FinancingRequest rejectRequest(String id, String reason) {
        FinancingRequest req = requestRepo.findById(id).orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus("REJECTED");
        req.setLenderDecision("REJECTED");
        req.setRejectionReason(reason);
        req.setDecisionDate(LocalDateTime.now());
        return requestRepo.save(req);
    }

    public List<FinancingRequest> getAllRequests() {
        return requestRepo.findAll();
    }

    public List<FinancingRequest> getRequestsByMsme(String msmeId) {
        return requestRepo.findByMsmeId(msmeId);
    }
}
