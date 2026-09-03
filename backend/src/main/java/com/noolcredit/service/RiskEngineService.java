package com.noolcredit.service;

import com.noolcredit.entity.RiskAssessment;
import com.noolcredit.repository.RiskAssessmentRepository;
import org.springframework.stereotype.Service;

@Service
public class RiskEngineService {

    private final RiskAssessmentRepository riskRepo;

    public RiskEngineService(RiskAssessmentRepository riskRepo) {
        this.riskRepo = riskRepo;
    }

    public RiskAssessment calculateRisk(String invoiceId, double amount, int buyerReliabilityScore, int paymentDelayDays, boolean isDuplicate) {
        RiskAssessment assessment = new RiskAssessment();
        assessment.setInvoiceId(invoiceId);

        // Transparent formula: Start 100 points
        int buyerRel = Math.min(25, (int) (buyerReliabilityScore * 0.25));
        int payHistory = 20;
        int prevInvoices = 15;
        int txConsistency = 15;
        int invConsistency = amount > 200000 ? 6 : 10;
        int delayScore = Math.max(0, 15 - Math.min(15, paymentDelayDays / 3));
        int fraudDeduction = isDuplicate ? 30 : 0;

        int finalScore = Math.max(0, Math.min(100, buyerRel + payHistory + prevInvoices + txConsistency + invConsistency + delayScore - fraudDeduction));

        String level = finalScore >= 80 ? "LOW" : finalScore >= 60 ? "MEDIUM" : "HIGH";

        assessment.setBuyerReliability(buyerRel);
        assessment.setPaymentHistory(payHistory);
        assessment.setPreviousSuccessfulInvoices(prevInvoices);
        assessment.setTransactionConsistency(txConsistency);
        assessment.setInvoiceConsistency(invConsistency);
        assessment.setPaymentDelayScore(delayScore);
        assessment.setFraudRiskDeduction(fraudDeduction);
        assessment.setFinalScore(finalScore);
        assessment.setRiskLevel(level);

        return riskRepo.save(assessment);
    }
}
