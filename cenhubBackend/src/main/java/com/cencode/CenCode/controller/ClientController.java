package com.cencode.CenCode.controller;

//import com.cencode.CenCode.RoleRepo;
import com.cencode.CenCode.dto.ClientDto;
import com.cencode.CenCode.dto.ClientDtoWithMentor;
import com.cencode.CenCode.entity.Client;
//import com.cencode.CenCode.entity.Role;
import com.cencode.CenCode.mapper.ClientMapper;
import com.cencode.CenCode.repository.ClientRepo;
import com.cencode.CenCode.service.ClientService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
//@RequestMapping("api/Client")
@RequestMapping("/api/Client")
@AllArgsConstructor
//@PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN', 'CLIENT')")
//@PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN', 'CLIENT')")
//@PreAuthorize("permitAll()")
public class ClientController {

    @Autowired
    private final ClientService clientService;

    @Autowired
    private final ClientRepo clientRepo;

//    public ClientController(ClientService clientService) {
//        this.clientService = clientService;
//    }

//    @Autowired
//    private PasswordEncoder passwordEncoder;

//    @GetMapping("/client/dashboard")
////    http://localhost:8080/api/Client/dashboard
//    @PreAuthorize("hasAnyRole('CLIENT', 'ADMIN')")
//    public String clientEndpoint() {
//        return "Welcome Client";
//    }
//
//
//    @PreAuthorize("hasRole('ADMIN')")
//    @GetMapping("/admin/dashboard")
////    http://localhost:8080/api/Client/dashboard
//    public String adminEndpoint() {
//        return "Welcome Admin";
//    }

//    @PostMapping("myusers/pending")
//    public ResponseEntity<?> getUsersOfPendingAdmin(@RequestBody Client admin) {
//        if (!"ROLE_ADMIN".equals(admin.getRole()) && !"ROLE_SUPERADMIN".equals(admin.getRole())) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can view their users.");
//        }
//
//        Optional<Client> client = clientRepo.findByCenId(admin.getCenId());
//
//        List<Client> users = clientRepo.findByMentor_ClientIdAndStatus(client.get().getClientId(), "pending");
//        return ResponseEntity.ok(users);
//    }

    @PostMapping("myusers/pending")
    public ResponseEntity<?> getUsersOfPendingAdmin(@RequestBody ClientDto adminDto) {
        if (!"ROLE_ADMIN".equals(adminDto.getRole()) && !"ROLE_SUPERADMIN".equals(adminDto.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can view their users.");
        }

        Optional<Client> optionalAdmin = clientRepo.findByCenId(adminDto.getCenId());
        if (optionalAdmin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found.");
        }

        List<Client> users = clientRepo.findByMentor_ClientIdAndStatus(optionalAdmin.get().getClientId(), "pending");
        return ResponseEntity.ok(users.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList()));
    }


//    @PostMapping("myusers/active")
//    public ResponseEntity<?> getUsersOfActiveAdmin(@RequestBody Client admin) {
//        if (!"ROLE_ADMIN".equals(admin.getRole()) && !"ROLE_SUPERADMIN".equals(admin.getRole())) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can view their users.");
//        }
//
//        Optional<Client> client = clientRepo.findByCenId(admin.getCenId());
//
//        List<Client> users = clientRepo.findByMentor_ClientIdAndStatus(client.get().getClientId(), "active");
//        return ResponseEntity.ok(users);
//    }

    @PostMapping("myusers/active")
    public ResponseEntity<?> getUsersOfActiveAdmin(@RequestBody ClientDto adminDto) {
        if (!"ROLE_ADMIN".equals(adminDto.getRole()) && !"ROLE_SUPERADMIN".equals(adminDto.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can view their users.");
        }

        Optional<Client> optionalAdmin = clientRepo.findByCenId(adminDto.getCenId());
        if (optionalAdmin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found.");
        }

        List<Client> users = clientRepo.findByMentor_ClientIdAndStatus(optionalAdmin.get().getClientId(), "active");
        return ResponseEntity.ok(users.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList()));
    }

//    @PostMapping("myusers/removed")
//    public ResponseEntity<?> getUsersOfRemovedAdmin(@RequestBody Client admin) {
//        if (!"ROLE_ADMIN".equals(admin.getRole()) && !"ROLE_SUPERADMIN".equals(admin.getRole())) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can view their users.");
//        }
//
//        Optional<Client> client = clientRepo.findByCenId(admin.getCenId());
//
//        List<Client> users = clientRepo.findByMentor_ClientIdAndStatus(client.get().getClientId(), "removed");
//        return ResponseEntity.ok(users);
//    }

    @PostMapping("myusers/removed")
    public ResponseEntity<?> getUsersOfRemovedAdmin(@RequestBody ClientDto adminDto) {
        if (!"ROLE_ADMIN".equals(adminDto.getRole()) && !"ROLE_SUPERADMIN".equals(adminDto.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admins can view their users.");
        }

        Optional<Client> optionalAdmin = clientRepo.findByCenId(adminDto.getCenId());
        if (optionalAdmin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found.");
        }

        List<Client> users = clientRepo.findByMentor_ClientIdAndStatus(optionalAdmin.get().getClientId(), "removed");

        return ResponseEntity.ok(users.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList()));
    }




    @GetMapping("activeSuperAdmins")
//    http://localhost:8080/api/Client/activeAdmins
private ResponseEntity<List<ClientDto>> findActiveSuperAmdin(){
    return new ResponseEntity<>(clientService.findAdminByStatus("active", "ROLE_SUPERADMIN"), HttpStatus.OK);
}

    @GetMapping("pendingSuperAdmins")
//    http://localhost:8080/api/Client/activeAdmins
    private ResponseEntity<List<ClientDto>> findPendingSuperAdmin(){
        return new ResponseEntity<>(clientService.findAdminByStatus("pending", "ROLE_SUPERADMIN"), HttpStatus.OK);
    }

    @GetMapping("removedSuperAdmins")
//    http://localhost:8080/api/Client/activeAdmins
    private ResponseEntity<List<ClientDto>> findRemovedSuperAdmin(){
        return new ResponseEntity<>(clientService.findAdminByStatus("removed", "ROLE_SUPERADMIN"), HttpStatus.OK);
    }



    @GetMapping("activeAdmins")
//    http://localhost:8080/api/Client/activeAdmins
    private ResponseEntity<List<ClientDto>> findActiveAdmins(){
        return new ResponseEntity<>(clientService.findAdminByStatus("active", "ROLE_ADMIN"), HttpStatus.OK);
    }

    @PatchMapping("Logout/{cenId}")
    private ResponseEntity<String> userLogout(@PathVariable Long cenId){
        return new ResponseEntity<>(clientService.Logout(cenId), HttpStatus.OK);
    }

    @GetMapping("renderRefresh")
//    http://localhost:8080/api/Client/renderRefresh
    public ResponseEntity<String> renderRefresh(){
        return new ResponseEntity<>("refreshed", HttpStatus.OK);
    }

    @GetMapping("pendingAdmins")
//    http://localhost:8080/api/Client/activeAdmins
    private ResponseEntity<List<ClientDto>> findPendingAdmins(){
        return new ResponseEntity<>(clientService.findAdminByStatus("pending", "ROLE_ADMIN"), HttpStatus.OK);
    }

    @GetMapping("removedAdmins")
//    http://localhost:8080/api/Client/activeAdmins
    private ResponseEntity<List<ClientDto>> findRemovedAdmins(){
        return new ResponseEntity<>(clientService.findAdminByStatus("removed", "ROLE_ADMIN"), HttpStatus.OK);
    }

    @GetMapping("Top20ActiveClients")
//    http://localhost:8080/api/Client/Top20ActiveClients
    private ResponseEntity<List<ClientDto>> findTop20ActiveClient(){
        return new ResponseEntity<>(clientService.findTop20ActiveClient(), HttpStatus.OK);
    }

    @GetMapping("activeClients")
//    http://localhost:8080/api/Client/activeAdmins
    private ResponseEntity<List<ClientDto>> findActiveClients(){
        return new ResponseEntity<>(clientService.findAdminByStatus("active", "ROLE_CLIENT"), HttpStatus.OK);
    }

    @GetMapping("pendingClients")
//    http://localhost:8080/api/Client/activeAdmins
    private ResponseEntity<List<ClientDto>> findPendingClients(){
        return new ResponseEntity<>(clientService.findAdminByStatus("pending", "ROLE_CLIENT"), HttpStatus.OK);
    }

    @GetMapping("removedClients")
//    http://localhost:8080/api/Client/activeAdmins
    private ResponseEntity<List<ClientDto>> findRemovedClients(){
        return new ResponseEntity<>(clientService.findAdminByStatus("removed", "ROLE_CLIENT"), HttpStatus.OK);
    }

    @GetMapping("clients")
//    @PreAuthorize("hasAnyRole('CLIENT', 'ADMIN', 'SUPERADMIN')")
    private ResponseEntity<List<ClientDto>> findOnlyStudents(){
        List<ClientDto> clientDtos = clientService.findClients();
        return new ResponseEntity<>(clientDtos, HttpStatus.OK);
    }

    @GetMapping("admins")
//    @PreAuthorize("hasAnyRole('ADMIN', 'SUPERADMIN')")
    private ResponseEntity<List<ClientDto>> findOnlyAdmins(){
        List<ClientDto> clientDtos = clientService.findAdmins();
        return new ResponseEntity<>(clientDtos, HttpStatus.OK);
    }

    @GetMapping("superAdmins")
//    @PreAuthorize("hasRole('SUPERADMIN')")
    private ResponseEntity<List<ClientDto>> findOnlySuperAdmins(){
        List<ClientDto> clientDtos = clientService.findSuperAdmin();
        return new ResponseEntity<>(clientDtos, HttpStatus.OK);
    }

    @GetMapping("allClients")
//    http://localhost:8080/api/Client/allClients
    public ResponseEntity<List<ClientDto>> findAll(){
        List<ClientDto> clients = clientService.allClients();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }


    @PostMapping("addClient")
//    http://localhost:8080/api/Client/addClient
    private ResponseEntity<String> addClient(@RequestBody ClientDtoWithMentor clientDto){
        String newClientDto = clientService.addClientWithClientRole(clientDto);
        return new ResponseEntity<>(newClientDto, HttpStatus.OK);
    }

    @GetMapping("allClients/{status}")
//    http://localhost:8080/api/Client/allClients/{status}
    public ResponseEntity<List<ClientDto>> allClientsById(@PathVariable String status){
            List<ClientDto> allActiveClients = clientService.findClientByStatus(status);
            return new ResponseEntity<>(allActiveClients, HttpStatus.OK);
    }

//    private static final Logger logger = LoggerFactory.getLogger(ClientController.class);
//
//
//    @GetMapping("allClients")
//    public ResponseEntity<List<ClientDto>> getAllClients() {
//        try {
//            List<ClientDto> clients = clientService.allClients();
//            return new ResponseEntity<>(clients, HttpStatus.OK);
//        } catch (Exception e) {
//            logger.error("Error fetching clients", e);
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @GetMapping("allClients/{status}")
////    http://localhost:8080/api/Client/allClients/{status}
//    public ResponseEntity<List<ClientDto>> allClientsById(@PathVariable String status){
//        try {
//            List<ClientDto> allActiveClients = clientService.findClientByStatus(status);
//            return new ResponseEntity<>(allActiveClients, HttpStatus.OK);
//        }
//        catch (Exception e){
//            logger.error("Error fetching clients", e);
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @GetMapping("javaTotalMarks/{id}")
//    http://localhost:8080/api/Client/javaTotalMarks/{id}
//    private ResponseEntity<String> totalJavaScoreByClientId(@PathVariable Long id){
//        Integer totalMarks = clientService.findTotalJavaScoreByClientId(id);
//        return new ResponseEntity<>("Total Java marks : "+totalMarks, HttpStatus.OK);
//    }


    @DeleteMapping("removeClient/{id}")
//    http://localhost:8080/api/Client/removeClient/{id}
    public ResponseEntity<String> deleteClientById(@PathVariable Long id){
        String deleteClient = clientService.deleteClientById(id);
        return new ResponseEntity<>(deleteClient, HttpStatus.OK);
    }

    @PatchMapping("updateClient/{id}")
//    http://localhost:8080/api/Client/updateClient/{id}
    public ResponseEntity<ClientDto> updateClientById(@RequestBody ClientDto clientDto, @PathVariable("id") Long id){
        ClientDto updatedClient = clientService.updateClientById(clientDto,id);
        return new ResponseEntity<>(updatedClient, HttpStatus.OK);
    }

    @PatchMapping("/updateClientStatus/{id}")
    public ResponseEntity<String> updateClient(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        String result = clientService.updateClientStatusById(status, id);

        if (result.contains("not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        } else if (result.contains("Invalid status")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }

        return ResponseEntity.ok(result);
    }


    @GetMapping("client/{id}")
//    http://localhost:8080/api/Client/client/{id}
    public ResponseEntity<ClientDto> findClientById(@PathVariable Long id){
        ClientDto clientDto = clientService.getClientById(id);
        return new ResponseEntity<>(clientDto, HttpStatus.OK);
    }

//    @GetMapping("clientLogin/{id}/{password}")
////    http://localhost:8080/api/Client/clientLogin/{id}/{password}
//    public boolean loginAsClient(@PathVariable Long id, @PathVariable String password){
//        return clientService.findByBothCenIdAndPass(id,password);
//    }

//    @GetMapping("clientLogin/{id}/{password}")
//    //    http://localhost:8080/api/Client/clientLogin/
//    public ResponseEntity<ClientDto> loginAsClient(@PathVariable Long id, @PathVariable String password){
//        return new ResponseEntity<>(clientService.findByBothCenIdAndPass(id,password), HttpStatus.OK);
////        return ;
//    }


    @DeleteMapping("removeClientByCenId/{cenId}")
//    http://localhost:8080/api/Client/removeClientByCenId/{cenId}
    public ResponseEntity<String> deleteClientByCenId(@PathVariable("cenId") Long cenId){
        String clientRemoved = clientService.deleteByClientCenId(cenId);
        return new ResponseEntity<>(clientRemoved, HttpStatus.OK);
    }

    @PatchMapping("updateClientByCenId/{cenId}")
//    http://localhost:8080/api/Client/updateClientByCenId/{cenId}
    public ResponseEntity<ClientDto> updateByClientCenId(@RequestBody ClientDto clientDto,@PathVariable Long cenId){
        ClientDto updatedClient = clientService.updateByCenId(clientDto,cenId);
        return new ResponseEntity<>(updatedClient, HttpStatus.OK);
    }

    @PatchMapping("updateClientResultByCenId/{cenId}/{subject}/{type}/{testId}")
//    http://localhost:8080/api/Client/updateClientResultByCenId/{cenId}/{subject}/{type}/{testId}
    public ResponseEntity<ClientDto> updateByClientResultByCenId(@RequestBody ClientDto clientDto,@PathVariable Long cenId,@PathVariable String subject, @PathVariable String type, @PathVariable Long testId){
//        System.out.println("CenId => "+cenId+" TestId=> "+testId+" Subject=> "+subject+" Type=> "+type);
        ClientDto updatedClient = clientService.updateClientTestResults(clientDto, testId, subject, type, cenId);
        return new ResponseEntity<>(updatedClient, HttpStatus.OK);
    }

//    @GetMapping("clientByCenId/{cenId}")
////    http://localhost:8080/api/Client/clientByCenId/{cenId}
//    public ResponseEntity<ClientDto> findClientByCenId(@PathVariable Long cenId){
//        ClientDto clientDto = clientService.findByClientCenID(cenId);
//        if(clientDto == null){
//            return new ResponseEntity<>(clientDto, HttpStatus.UNAUTHORIZED);
//        }
//        return new ResponseEntity<>(clientDto, HttpStatus.OK);
//    }

        @GetMapping("clientByCenId/{cenId}")
        public ResponseEntity<ClientDto> findClientByCenId(@PathVariable Long cenId, Principal principal) {
            // Get logged-in username
            String username = principal.getName();

            // Find the logged-in user (assumes username is email or unique identifier)
            Optional<Client> loggedInUser = clientRepo.findByCenId(cenId); // adjust if using username instead of email
            if (loggedInUser.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }

            Client user = loggedInUser.get();

            // Allow if user is ADMIN or if the requested cenId matches the logged-in user's cenId
            if (user.getRole().equals("ROLE_ADMIN") || user.getCenId().equals(cenId)) {
                Optional<Client> client = clientRepo.findByCenId(cenId);
                if (client.isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity<>(ClientMapper.mapToClientDto(client.get()), HttpStatus.OK);
            }

            // Otherwise, access is denied
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }


    @GetMapping("clients/overAllTop5")
    public ResponseEntity<List<Client>> getTop5Clients() {
        return new ResponseEntity<>(clientService.getTop5Clients(), HttpStatus.OK);
    }

    @GetMapping("clients/overAllTop20")
    public ResponseEntity<List<Client>> getTop20Clients() {
        return new ResponseEntity<>(clientService.getTop20Clients(), HttpStatus.OK);
    }

//    @GetMapping("/clients/top5")
//    public List<ClientDto> getTop5Clients() {
//        return clientService.getTop5Clients()
//                .stream()
//                .map(client -> new ClientDto(client.getName(), client.getTotalMarks(), client.getCenId()))
//                .collect(Collectors.toList());
//    }


}
