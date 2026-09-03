package com.noolcredit.repository;

import com.noolcredit.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, String> {
    Optional<Buyer> findByBusinessId(String businessId);
}
