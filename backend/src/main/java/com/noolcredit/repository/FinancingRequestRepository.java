package com.noolcredit.repository;

import com.noolcredit.entity.FinancingRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FinancingRequestRepository extends MongoRepository<FinancingRequest, String> {
    List<FinancingRequest> findByMsmeId(String msmeId);
    Optional<FinancingRequest> findByPoolId(String poolId);
    Optional<FinancingRequest> findByRequestNumber(String requestNumber);
}
