package com.noolcredit.repository;

import com.noolcredit.entity.RiskAssessment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RiskAssessmentRepository extends MongoRepository<RiskAssessment, String> {
    Optional<RiskAssessment> findByInvoiceId(String invoiceId);
}
