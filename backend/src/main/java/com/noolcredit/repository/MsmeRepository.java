package com.noolcredit.repository;

import com.noolcredit.entity.Msme;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MsmeRepository extends MongoRepository<Msme, String> {
    Optional<Msme> findByUserId(String userId);
}
