package com.noolcredit.repository;

import com.noolcredit.entity.Buyer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BuyerRepository extends MongoRepository<Buyer, String> {
    Optional<Buyer> findByBusinessId(String businessId);
}
