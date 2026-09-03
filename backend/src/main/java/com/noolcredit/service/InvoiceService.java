package com.noolcredit.service;

import com.noolcredit.dto.Dtos;
import com.noolcredit.entity.Invoice;
import com.noolcredit.entity.RiskAssessment;
import com.noolcredit.repository.InvoiceRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepo;
    private final RiskEngineService riskService;

    public InvoiceService(InvoiceRepository invoiceRepo, RiskEngineService riskService) {
        this.invoiceRepo = invoiceRepo;
        this.riskService = riskService;
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepo.findAll();
    }

    public List<Invoice> getInvoicesByMsme(String msmeId) {
        return invoiceRepo.findByMsmeId(msmeId);
    }

    public Optional<Invoice> getInvoiceById(String id) {
        return invoiceRepo.findById(id);
    }

    public Invoice createAndVerifyInvoice(Dtos.InvoiceCreateRequest req, String msmeId, String msmeName) {
        boolean duplicate = invoiceRepo.existsByInvoiceNumber(req.getInvoiceNumber());

        Invoice invoice = new Invoice();
        invoice.setInvoiceNumber(req.getInvoiceNumber());
        invoice.setMsmeId(msmeId != null ? msmeId : "msme-1");
        invoice.setMsmeName(msmeName != null ? msmeName : "Sri Lakshmi Knits");
        invoice.setBuyerName(req.getBuyerName());
        invoice.setBuyerGst(req.getBuyerGst());
        invoice.setInvoiceAmount(req.getInvoiceAmount());
        invoice.setInvoiceDate(req.getInvoiceDate());
        invoice.setDueDate(req.getDueDate());
        invoice.setPaymentTerms(req.getPaymentTerms() != null ? req.getPaymentTerms() : "Net 60 Days");
        invoice.setStatus("AVAILABLE");

        if (duplicate) {
            invoice.setVerificationStatus("REQUIRES_REVIEW");
            invoice.setVerificationScore(60);
        } else {
            invoice.setVerificationStatus("VERIFIED");
            invoice.setVerificationScore(96);
        }

        // Run Risk Engine
        RiskAssessment risk = riskService.calculateRisk(invoice.getId(), req.getInvoiceAmount(), 92, 4, duplicate);
        invoice.setRiskScore(risk.getFinalScore());
        invoice.setRiskLevel(risk.getRiskLevel());

        double financingRate = risk.getRiskLevel().equals("LOW") ? 0.85 : risk.getRiskLevel().equals("MEDIUM") ? 0.70 : 0.50;
        invoice.setEligibleFinancing(Math.round(req.getInvoiceAmount() * financingRate));

        return invoiceRepo.save(invoice);
    }
}
