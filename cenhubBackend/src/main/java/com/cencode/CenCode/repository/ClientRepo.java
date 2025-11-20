package com.cencode.CenCode.repository;

import com.cencode.CenCode.dto.ClientDto;
import com.cencode.CenCode.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepo extends JpaRepository<Client, Long> {
    List<Client> findByStatus(String status);
    void deleteByCenId(Long cenId);
    Optional<Client> findByContactNo(Long contactNo);
    Optional<Client> findByCenId(Long cenId);
//    Optional<Client> findByCenIdAndPassword(Long cenId, String password);
    Optional<Client> findByCenIdAndPassword(Long cenId, String password);
    Optional<Client> findByCenIdAndMailId(Long cenId, String mailId);
//    List<Client> findByMentor_ClientId(Long mentorId);
    List<Client> findByMentor_ClientIdAndStatus(Long clientId, String status);
    List<Client> findTop5ByOrderByTotalMarksDesc();
    List<Client> findTop20ByOrderByTotalMarksDesc();
    List<Client> findTop5ByRoleOrderByTotalMarksDesc(String role);
    List<Client> findTop20ByRoleOrderByTotalMarksDesc(String role);
    List<Client> findByStatusAndRole(String status, String role);
    Optional<Client> findByMailId(String mailId);
    List<Client> findByRole(String role);
//    List<Client> findTop20ByRoleAndStatusOrderByCenIdDesc(String role, String status);
    List<Client> findTop20ByRoleAndStatusOrderByTotalMarksDesc(String role, String status);

}
