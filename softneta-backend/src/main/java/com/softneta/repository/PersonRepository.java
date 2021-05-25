/**
 * Created By: Md. Nazmus Salahin
 * Created Date:  25-May-2021
 * Time: 4:19 AM
 * Modified By:
 * Modified date:
 * (C) CopyRight Salahin ltd.
 */

package com.softneta.repository;

import com.softneta.entities.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PersonRepository extends JpaRepository<PatientEntity, UUID> {
}
