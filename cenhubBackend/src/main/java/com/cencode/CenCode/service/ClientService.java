package com.cencode.CenCode.service;

import com.cencode.CenCode.dto.ClientDto;
import com.cencode.CenCode.dto.ClientDtoWithMentor;
import com.cencode.CenCode.dto.MentorDto;
import com.cencode.CenCode.dto.OtpVerificationDTO;
import com.cencode.CenCode.entity.Client;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClientService {
//    String addClientWithClientRole(ClientDto clientDto);
    String addClientWithClientRole(ClientDtoWithMentor clientDto);
    ClientDto addClientWithAdminRole(ClientDto clientDto);
    ClientDto addClientWithSuperAdminRole(ClientDto clientDto);
    List<ClientDto> allClients();
    public List<MentorDto> getAllMentors();
    ClientDto findByBothCenIdAndPass(Long cenId, String password);
//    Integer findTotalJavaScoreByClientId(Long clientId);
    String deleteClientById(Long Id);
    List<ClientDto> findClientByStatus(String status);
    ClientDto updateClientById(ClientDto clientDto, Long id);
    String updateClientStatusById(String status, Long id);
    ClientDto getClientById(Long id);
    Object getClientData(Long requestedCenId, String role, Long currentUserCenId);
    String deleteByClientCenId(Long id);
    ClientDto updateByCenId(ClientDto clientDto, Long id);
    ClientDto findByClientCenID(Long id);
//    boolean findByBothCenIdAndPass(Long cenId, String password);
    ClientDto updateClientTestResults(ClientDto clientDto, Long testId, String subject, String type, Long cenId);
//    List<Client> getTop5Clients();
//    List<Client> getTop20Clients();
    List<Client> getTop5Clients();
    List<Client> getTop20Clients();
    String Logout(Long CenId);

    String verifyClient(Client client);
    String verifyOtp(OtpVerificationDTO dto);
    List<ClientDto> findClients();
    List<ClientDto> findAdmins();
    List<ClientDto> findSuperAdmin();
    List<ClientDto> findActiveAdmins();
    List<ClientDto> findAdminByStatus(String status, String role);
    List<ClientDto> findTop20ActiveClient();
}
