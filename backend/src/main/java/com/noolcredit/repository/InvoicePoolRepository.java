package com.noolcredit.repository;

import com.noolcredit.entity.InvoicePool;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvoicePoolRepository extends JpaRepository<InvoicePool, String> {
    List<InvoicePool> findByMsmeId(String msmeId);
    Optional<InvoicePool> findByPoolNumber(String poolNumber);
}
