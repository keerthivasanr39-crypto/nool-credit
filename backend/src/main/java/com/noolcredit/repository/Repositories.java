package com.noolcredit.repository;

import com.noolcredit.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}

@Repository
interface MsmeRepository extends JpaRepository<Msme, String> {
    Optional<Msme> findByUserId(String userId);
}

@Repository
interface BuyerRepository extends JpaRepository<Buyer, String> {
    Optional<Buyer> findByName(String name);
}

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {
    List<Invoice> findByMsmeId(String msmeId);
    Optional<Invoice> findByInvoiceNumber(String invoiceNumber);
    boolean existsByInvoiceNumber(String invoiceNumber);
}

@Repository
public interface InvoicePoolRepository extends JpaRepository<InvoicePool, String> {
    List<InvoicePool> findByMsmeId(String msmeId);
}

@Repository
public interface FinancingRequestRepository extends JpaRepository<FinancingRequest, String> {
    List<FinancingRequest> findByMsmeId(String msmeId);
    List<FinancingRequest> findByStatus(String status);
}

@Repository
public interface RiskAssessmentRepository extends JpaRepository<RiskAssessment, String> {
    Optional<RiskAssessment> findByInvoiceId(String invoiceId);
}
