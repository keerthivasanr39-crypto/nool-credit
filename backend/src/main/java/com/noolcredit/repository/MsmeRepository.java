package com.noolcredit.repository;

import com.noolcredit.entity.Msme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MsmeRepository extends JpaRepository<Msme, String> {
    Optional<Msme> findByUserId(String userId);
}
