package com.noolcredit.config;

import com.noolcredit.entity.Invoice;
import com.noolcredit.entity.InvoicePool;
import com.noolcredit.entity.FinancingRequest;
import com.noolcredit.entity.User;
import com.noolcredit.repository.FinancingRequestRepository;
import com.noolcredit.repository.InvoicePoolRepository;
import com.noolcredit.repository.InvoiceRepository;
import com.noolcredit.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepo;
    private final InvoiceRepository invoiceRepo;
    private final InvoicePoolRepository poolRepo;
    private final FinancingRequestRepository requestRepo;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepo, InvoiceRepository invoiceRepo, InvoicePoolRepository poolRepo, FinancingRequestRepository requestRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.invoiceRepo = invoiceRepo;
        this.poolRepo = poolRepo;
        this.requestRepo = requestRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed Users
        if (userRepo.count() == 0) {
            userRepo.save(new User("Karthik Subramanian", "msme@noolcredit.com", passwordEncoder.encode("password123"), "MSME"));
            userRepo.save(new User("Priya Narayanan", "lender@noolcredit.com", passwordEncoder.encode("password123"), "LENDER"));
        }

        // Seed Invoices
        if (invoiceRepo.count() == 0) {
            Invoice inv1 = new Invoice();
            inv1.setInvoiceNumber("INV-1001");
            inv1.setMsmeId("msme-1");
            inv1.setMsmeName("Sri Lakshmi Knits");
            inv1.setBuyerName("ABC Garments Ltd");
            inv1.setBuyerGst("33AABCA1234F1Z8");
            inv1.setInvoiceAmount(60000);
            inv1.setInvoiceDate(LocalDate.of(2026, 8, 10));
            inv1.setDueDate(LocalDate.of(2026, 10, 10));
            inv1.setPaymentTerms("Net 60 Days");
            inv1.setVerificationStatus("VERIFIED");
            inv1.setVerificationScore(98);
            inv1.setRiskScore(88);
            inv1.setRiskLevel("LOW");
            inv1.setEligibleFinancing(51000);
            inv1.setStatus("POOLED");
            inv1.setPoolId("pool-1");
            invoiceRepo.save(inv1);

            Invoice inv2 = new Invoice();
            inv2.setInvoiceNumber("INV-1002");
            inv2.setMsmeId("msme-1");
            inv2.setMsmeName("Sri Lakshmi Knits");
            inv2.setBuyerName("Royal Exports India");
            inv2.setBuyerGst("33AABCR5678F1Z2");
            inv2.setInvoiceAmount(80000);
            inv2.setInvoiceDate(LocalDate.of(2026, 8, 15));
            inv2.setDueDate(LocalDate.of(2026, 10, 15));
            inv2.setPaymentTerms("Net 60 Days");
            inv2.setVerificationStatus("VERIFIED");
            inv2.setVerificationScore(94);
            inv2.setRiskScore(82);
            inv2.setRiskLevel("LOW");
            inv2.setEligibleFinancing(68000);
            inv2.setStatus("POOLED");
            inv2.setPoolId("pool-1");
            invoiceRepo.save(inv2);

            Invoice inv3 = new Invoice();
            inv3.setInvoiceNumber("INV-1003");
            inv3.setMsmeId("msme-1");
            inv3.setMsmeName("Sri Lakshmi Knits");
            inv3.setBuyerName("Chennai Weaving Mills");
            inv3.setBuyerGst("33AABCC9999F1Z1");
            inv3.setInvoiceAmount(120000);
            inv3.setInvoiceDate(LocalDate.of(2026, 8, 20));
            inv3.setDueDate(LocalDate.of(2026, 10, 20));
            inv3.setPaymentTerms("Net 60 Days");
            inv3.setVerificationStatus("VERIFIED");
            inv3.setVerificationScore(92);
            inv3.setRiskScore(79);
            inv3.setRiskLevel("MEDIUM");
            inv3.setEligibleFinancing(96000);
            inv3.setStatus("POOLED");
            inv3.setPoolId("pool-1");
            invoiceRepo.save(inv3);

            // Seed Pool
            InvoicePool pool = new InvoicePool();
            pool.setPoolNumber("POOL-1001");
            pool.setMsmeId("msme-1");
            pool.setMsmeName("Sri Lakshmi Knits");
            pool.setInvoiceCount(3);
            pool.setTotalInvoiceValue(260000);
            pool.setWeightedRiskScore(82);
            pool.setRiskLevel("LOW");
            pool.setEligibleFinancing(208000);
            pool.setStatus("REQUESTED");
            poolRepo.save(pool);

            // Seed Request
            FinancingRequest req = new FinancingRequest();
            req.setRequestNumber("REQ-1001");
            req.setMsmeId("msme-1");
            req.setMsmeName("Sri Lakshmi Knits");
            req.setIndustry("Textile Job Work");
            req.setPoolNumber("POOL-1001");
            req.setInvoiceValue(260000);
            req.setRiskScore(82);
            req.setRiskLevel("LOW");
            req.setRecommendedAmount(208000);
            req.setRequestedAmount(208000);
            req.setStatus("APPROVED");
            req.setLenderName("Apex FinCorp Capital");
            req.setLenderDecision("APPROVED");
            req.setDecisionDate(LocalDateTime.now().minusDays(1));
            requestRepo.save(req);
        }
    }
}
