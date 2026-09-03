package com.noolcredit.repository;

import com.noolcredit.entity.InvoicePool;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvoicePoolRepository extends MongoRepository<InvoicePool, String> {
    List<InvoicePool> findByMsmeId(String msmeId);
    Optional<InvoicePool> findByPoolNumber(String poolNumber);
}
