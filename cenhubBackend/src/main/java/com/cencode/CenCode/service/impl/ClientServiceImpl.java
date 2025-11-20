package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.ClientDto;
import com.cencode.CenCode.dto.ClientDtoWithMentor;
import com.cencode.CenCode.dto.MentorDto;
import com.cencode.CenCode.dto.OtpVerificationDTO;
import com.cencode.CenCode.entity.Client;
//import com.cencode.CenCode.entity.Role;
import com.cencode.CenCode.mapper.ClientMapper;
import com.cencode.CenCode.mapper.MentorMapper;
import com.cencode.CenCode.repository.ClientRepo;
//import com.cencode.CenCode.repository.RoleRepo;
import com.cencode.CenCode.service.ClientService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService{
    @Autowired
    private ClientRepo clientRepo;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JWTService jwtService;

    @Autowired
    private JavaMailSender mailSender;


    @Scheduled(fixedRate = 10 * 60 * 1000) // Every 10 minutes
    public void resetOtpVerified() {
        System.out.println("Resetting Otp Verified Status for Single Device Login");
        LocalDateTime now = LocalDateTime.now();
        List<Client> users = clientRepo.findAll();

        List<Client> toUpdate = new ArrayList<>();

        for (Client user : users) {
            if (user.getEmailOtpExpiry() != null &&
                    user.getEmailOtpExpiry().isBefore(now.minusHours(3))) {
                user.setOtpVerified(false);
                toUpdate.add(user);
            }
        }

        if (!toUpdate.isEmpty()) {
            clientRepo.saveAll(toUpdate);
        }
    }



//    @Autowired
//    private RoleRepo roleRepo;

//    @Autowired
//    private final PasswordEncoder passwordEncoder;
//
//    @Autowired
//    public ClientServiceImpl(PasswordEncoder passwordEncoder) {
//        this.passwordEncoder = passwordEncoder;
//    }

//    @Override
//    public String addClientWithClientRole(ClientDto clientDto) {
////        Role clientRole = roleRepo.findByName("ROLE_CLIENT")
////                .orElseThrow(() -> new RuntimeException("ROLE_CLIENT not found"));
////        clientDto.getRoles().add(clientRole);
//        Optional<Client> optionalClientCenID = clientRepo.findByCenId(clientDto.getCenId());
//        if(optionalClientCenID.isPresent()){
//            return "cenIdAlreadyExist";
//        }
//        Optional<Client> optionalClientEmail = clientRepo.findByMailId(clientDto.getMailId());
//        if(optionalClientEmail.isPresent()){
//            return "mailIdAlreadyExist";
//        }
//        Optional<Client> optionalClientPhone = clientRepo.findByContactNo(clientDto.getContactNo());
//        if(optionalClientPhone.isPresent()){
//            return "mobileNumberAlreadyExist";
//        }
//        clientDto.setRole("ROLE_CLIENT");
////        clientDto.setPassword(passwordEncoder.encode(clientDto.getPassword()));
//        Client client = ClientMapper.mapToClient(clientDto);
//        Client newClient = clientRepo.save(client);
//        return "created";
//    }

//    @Override
//    public String addClientWithClientRole(ClientDto clientDto) {
//
//        Optional<Client> optionalClientCenID = clientRepo.findByCenId(clientDto.getCenId());
//        if (optionalClientCenID.isPresent()) {
//            return "cenIdAlreadyExist";
//        }
//
//        Optional<Client> optionalClientEmail = clientRepo.findByMailId(clientDto.getMailId());
//        if (optionalClientEmail.isPresent()) {
//            return "mailIdAlreadyExist";
//        }
//
//        Optional<Client> optionalClientPhone = clientRepo.findByContactNo(clientDto.getContactNo());
//        if (optionalClientPhone.isPresent()) {
//            return "mobileNumberAlreadyExist";
//        }
//
//        clientDto.setRole("ROLE_CLIENT");
//
//        // Map DTO to entity
//        Client client = ClientMapper.mapToClient(clientDto);
//
//        // Assign mentor if provided
//        if (clientDto.getMentorId() != null) {
//            Optional<Client> mentorOpt = clientRepo.findById(clientDto.getMentorId());
//            if (mentorOpt.isPresent() && "ROLE_ADMIN".equals(mentorOpt.get().getRole())) {
//                client.setMentor(mentorOpt.get());
//            } else {
//                return "invalidMentor";
//            }
//        }
//
//        // Save client
//        clientRepo.save(client);
//        return "created";
//    }

    @Override
    public String addClientWithClientRole(ClientDtoWithMentor clientDto) {

        Optional<Client> optionalClientCenID = clientRepo.findByCenId(clientDto.getCenId());
        if (optionalClientCenID.isPresent()) {
            return "cenIdAlreadyExist";
        }

        Optional<Client> optionalClientEmail = clientRepo.findByMailId(clientDto.getMailId());
        if (optionalClientEmail.isPresent()) {
            return "mailIdAlreadyExist";
        }

        Optional<Client> optionalClientPhone = clientRepo.findByContactNo(clientDto.getContactNo());
        if (optionalClientPhone.isPresent()) {
            return "mobileNumberAlreadyExist";
        }

        clientDto.setRole("ROLE_CLIENT");

        // Map DTO to entity
        Client client = ClientMapper.mapToClientWithMentor(clientDto);

        // Assign mentor if provided
        if (clientDto.getMentorId() != null) {
            Optional<Client> mentorOpt = clientRepo.findById(clientDto.getMentorId());
            if (mentorOpt.isPresent() && "ROLE_ADMIN".equals(mentorOpt.get().getRole())) {
                client.setMentor(mentorOpt.get());
            } else {
                return "invalidMentor";
            }
        }

        // Save client
        clientRepo.save(client);
        return "created";
    }


    @Override
    public ClientDto addClientWithAdminRole(ClientDto clientDto) {
//        Role clientRole = roleRepo.findByName("ROLE_CLIENT")
//                .orElseThrow(() -> new RuntimeException("ROLE_CLIENT not found"));
//        clientDto.getRoles().add(clientRole);
        clientDto.setRole("ROLE_ADMIN");
//        clientDto.setPassword(passwordEncoder.encode(clientDto.getPassword()));
        Client client = ClientMapper.mapToClient(clientDto);
        Client newClient = clientRepo.save(client);
        return ClientMapper.mapToClientDto(newClient);
    }

    @Override
    public ClientDto addClientWithSuperAdminRole(ClientDto clientDto) {
//        Role clientRole = roleRepo.findByName("ROLE_CLIENT")
//                .orElseThrow(() -> new RuntimeException("ROLE_CLIENT not found"));
//        clientDto.getRoles().add(clientRole);
        clientDto.setRole("ROLE_SUPERADMIN");
//        clientDto.setPassword(passwordEncoder.encode(clientDto.getPassword()));
        Client client = ClientMapper.mapToClient(clientDto);
        Client newClient = clientRepo.save(client);
        return ClientMapper.mapToClientDto(newClient);
    }

    @Override
    public List<ClientDto> allClients() {
        List<Client> allClients = clientRepo.findAll();
        return allClients.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList());
    }

    @Override
    public List<MentorDto> getAllMentors() {
        List<Client> client = clientRepo.findByStatusAndRole("active", "ROLE_ADMIN");
        return client.stream().map(MentorMapper::clientDtoToMentorDto).collect(Collectors.toList());
    }

//    @Override
//    public Integer findTotalJavaScoreByClientId(Long clientId) {
//        Optional<Client> client = clientRepo.findById(clientId);
//        Map<String, Integer> testMarks = client.get().getJavaEasyTestMarks();
//        int totalTest = testMarks.size();
//        int totalMarks = testMarks.values().stream().mapToInt(Integer::intValue).sum();
//        return totalMarks;
//    }

    @Override
    public String deleteClientById(Long Id) {
        clientRepo.deleteById(Id);
        return "Client " + Id + " Removed";
    }


    @Override
    public List<ClientDto> findClientByStatus(String status) {
        List<Client> activeClient = clientRepo.findByStatus(status);
        return activeClient.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList());
    }

    @Override
    public ClientDto updateByCenId(ClientDto clientDto, Long id) {
        Optional<Client> OptionalClient = clientRepo.findByCenId(id);
        Client client = OptionalClient.get();
        UpdateClientByIdFromDto(clientDto, client);
        Client updatedClient = clientRepo.save(client);
        return ClientMapper.mapToClientDto(updatedClient);
    }

    @Override
    public ClientDto updateClientById(ClientDto clientDto, Long id) {
        Optional<Client> optionalClient = clientRepo.findById(id);
        Client client = optionalClient.get();
        UpdateClientByIdFromDto(clientDto, client);
        Client updatedClient = clientRepo.save(client);
        return ClientMapper.mapToClientDto(updatedClient);
    }

    @Override
    public String updateClientStatusById(String status, Long id) {
        Optional<Client> optionalClient = clientRepo.findByCenId(id);

        if (optionalClient.isEmpty()) {
            return "Client with ID " + id + " not found.";
        }

        if (status == null || status.isEmpty() ||
                (!status.equalsIgnoreCase("active") &&
                        !status.equalsIgnoreCase("pending") &&
                        !status.equalsIgnoreCase("removed"))) {
            return "Invalid status value provided.";
        }

        Client client = optionalClient.get();
        client.setStatus(status);
        clientRepo.save(client);

        return "Client status updated to '" + status + "' for ID: " + id;
    }


    private static void UpdateClientByIdFromDto(ClientDto clientDto, Client client){
        if(clientDto.getName() != null){
            client.setName(clientDto.getName());
        }
        if(clientDto.getMailId() != null){
            client.setMailId(clientDto.getMailId());
        }
        if(clientDto.getCenId() != null){
            client.setCenId(clientDto.getCenId());
        }
        if(clientDto.getPassword() != null){
            client.setPassword(clientDto.getPassword());
        }
        if(clientDto.getContactNo() != null){
            client.setContactNo(clientDto.getContactNo());
        }
//        if(clientDto.getAptitudeTestQuestionsData().getTestMcqResults() != null){
//            client.getAptitudeTestQuestionsData().setTestMcqResults(clientDto.getAptitudeTestQuestionsData().getTestMcqResults());
////            client.getTestQuestionsData().getTestQuestions().put(
////                    testId,
////                    clientDto.getTestQuestionsData().getTestResults().get(testId)
////            );
//        }
//        if(clientDto.getJavaEasyTestMarks() != null){
//            client.setJavaEasyTestMarks(clientDto.getJavaEasyTestMarks());
//        }
//        if(clientDto.getJavaMediumTestMarks() != null){
//            client.setJavaMediumTestMarks(clientDto.getJavaMediumTestMarks());
//        }
//        if(clientDto.getJavaHardTestMarks() != null){
//            client.setJavaHardTestMarks(clientDto.getJavaHardTestMarks());
//        }
//        if(clientDto.getJavaOverallMarks() != null){
//            client.setJavaOverallMarks(clientDto.getJavaOverallMarks());
//        }
        if(clientDto.getStatus() != null){
            client.setStatus(clientDto.getStatus());
        }
    }

    @Override
    public ClientDto getClientById(Long id) {
        Optional<Client> optionalClient = clientRepo.findById(id);
        Client client = optionalClient.get();
        return ClientMapper.mapToClientDto(client);
    }

    public Object getClientData(Long requestedCenId, String role, Long currentUserCenId) {
        // Fetch the requested client data
        Client requestedClient = clientRepo.findByCenId(requestedCenId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // SuperAdmin (cenId: 100) can access all data
        if ("ROLE_SUPERADMIN".equals(role)) {
            return requestedClient;  // Can access any client data
        }

        // Admin (cenId: 410) can access their own data and the data of Client (cenId: 430)
        if ("ROLE_ADMIN".equals(role)) {
            if (requestedCenId == currentUserCenId || requestedCenId == 430) {
                return requestedClient;  // Admin can access their own data (410) and Client data (430)
            } else {
                throw new AccessDeniedException("Admin can only access Admin and Client data.");
            }
        }

        // Client (cenId: 430) can only access their own data
        if ("ROLE_CLIENT".equals(role)) {
            if (requestedCenId == currentUserCenId) {
                return requestedClient;  // Client can only access their own data (430)
            } else {
                throw new AccessDeniedException("Client can only access their own data.");
            }
        }

        // If none of the above roles match, deny access
        throw new AccessDeniedException("Access Denied");
    }

    @Override
    @Transactional
    public String deleteByClientCenId(Long id) {
        Optional<Client> client = clientRepo.findByCenId(id);
        if(client.isPresent()){
            clientRepo.deleteByCenId(id);
            return "client with "+id+" removed";
        }
        else{
            return "client with "+id+" Not Found";
        }
    }

    @Override
    public ClientDto findByClientCenID(Long id) {
        Optional<Client> client = clientRepo.findByCenId(id);
        Client clientDetails = client.get();
        return ClientMapper.mapToClientDto(clientDetails);
    }

//    @Override
//    public boolean findByBothCenIdAndPass(Long cenId, String password) {
//        Optional<Client> optionalClient = clientRepo.findByCenIdAndPassword(cenId, password);
////        Client client = optionalClient.get();
//        return optionalClient.isPresent();
////        return verifyClientPassword(password, cenId);
//    }

    @Override
    public ClientDto findByBothCenIdAndPass(Long cenId, String password) {
        Optional<Client> optionalClient = clientRepo.findByCenIdAndPassword(cenId, password);
//        Client client = optionalClient.get();
        ClientDto clientDto = ClientMapper.mapToClientDto(optionalClient.get());
        return clientDto;
//        return verifyClientPassword(password, cenId);
    }

//    public boolean verifyClientPassword(String enteredPassword, Long cenId) {
//        // Retrieve the client from the database using their email
//        Client client = clientRepo.findByCenId(cenId)
//                .orElseThrow(() -> new UsernameNotFoundException("Client not found"));
//
//        // Get the stored (encoded) password from the client object
//        String storedEncodedPassword = client.getPassword();
//
//        // Compare entered password with stored encoded password
//        return passwordEncoder.matches(enteredPassword, storedEncodedPassword);
//    }

    @Override
    public ClientDto updateClientTestResults(ClientDto clientDto, Long testId, String subject, String type, Long cenId) {
        Optional<Client> optionalClient = clientRepo.findByCenId(cenId);
        Client client = optionalClient.get();
//        System.out.println("Got the Client");
//        System.out.println("Converted Test Id => "+Integer.parseInt(testId.toString()));
        UpdateClientByResultIdFromDto(clientDto, client, subject, type, Integer.parseInt(testId.toString()));
//        System.out.println("Updated");
        Client updatedClient = clientRepo.save(client);
        return ClientMapper.mapToClientDto(updatedClient);
    }

    @Override
    public List<Client> getTop5Clients() {
        return clientRepo.findTop5ByRoleOrderByTotalMarksDesc("ROLE_CLIENT");
    }

    @Override
    public List<Client> getTop20Clients() {
        return clientRepo.findTop20ByRoleOrderByTotalMarksDesc("ROLE_CLIENT");
    }

    @Override
    public String Logout(Long cenId) {
        Optional<Client> clientOptional = clientRepo.findByCenId(cenId);

        if (clientOptional.isPresent()) {
            Client client = clientOptional.get();
            client.setOtpVerified(false);
            clientRepo.save(client);  // You forgot this step
            return "LogoutSuccessful";
        }

        return "ClientNotFound";
    }



//    private String generateOtp(int length) {
//        Random random = new Random();
//        StringBuilder otp = new StringBuilder();
//        for (int i = 0; i < length; i++) {
//            otp.append(random.nextInt(10)); // digits from 0 to 9
//        }
//        return otp.toString();
//    }

    private String generateOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }


    @Override
    public String verifyClient(Client clientData) {
            Optional<Client> clientOpt = null;
            if(clientData.getPassword() != null){
                clientOpt = clientRepo.findByCenIdAndPassword(clientData.getCenId(), clientData.getPassword());
            }
            else{
                clientOpt = clientRepo.findByCenIdAndMailId(clientData.getCenId(), clientData.getMailId());
            }
//            Optional<Client> clientOpt = clientRepo.findByCenIdAndPassword(clientData.getCenId(), clientData.getPassword());
            if (clientOpt.isPresent()) {
                Client client = clientOpt.get();
                if ("pending".equalsIgnoreCase(client.getStatus())) {
                    return "inactive";
                }
                if ("removed".equalsIgnoreCase(client.getStatus())) {
                    return "removed";
                }
                else if(client.isOtpVerified()){
                    return "MultipleDevice";
                }
                // Generate OTP
                String otp = generateOtp();
                client.setEmailOtp(otp);
                client.setEmailOtpExpiry(LocalDateTime.now().plusMinutes(5));
                client.setOtpVerified(false);

                clientRepo.save(client);

                // Send OTP by email
                sendOtpEmail(client.getMailId(), otp);

                return "OTPSent";
            }
            return "Invalid";
        }

//    @Override
//    public String verifyOtp(OtpVerificationDTO dto) {
//        Optional<Client> clientOpt = clientRepo.findByCenId(dto.getCenId());
//        if (clientOpt.isEmpty()) {
//            return "notFound";
//        }
//        Client client = clientOpt.get();
//
//        if (client.getEmailOtp() != null
//                && client.getEmailOtp().equals(dto.getEmailOtp())
//                && client.getEmailOtpExpiry() != null
//                && client.getEmailOtpExpiry().isAfter(LocalDateTime.now())) {
//            client.setOtpVerified(true);
//            client.setEmailOtp(null);
//            client.setEmailOtpExpiry(null);
//            clientRepo.save(client);
//            return "OTPVerified";
//        }
//        return "expired";
//    }

    @Override
    public String verifyOtp(OtpVerificationDTO dto) {
        Optional<Client> clientOpt = clientRepo.findByCenId(dto.getCenId());
        if (clientOpt.isEmpty()) {
            return "notFound";
        }

        Client client = clientOpt.get();

        if (client.getEmailOtp() != null
                && client.getEmailOtp().equals(dto.getEmailOtp())
                && client.getEmailOtpExpiry() != null
                && client.getEmailOtpExpiry().isAfter(LocalDateTime.now())) {

            // Mark OTP as verified
            client.setOtpVerified(true);
            client.setEmailOtp(null);
//            client.setEmailOtpExpiry(null);
            clientRepo.save(client);

            // Authenticate user using AuthenticationManager
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(client.getCenId(), client.getPassword())
            );

            if (authentication.isAuthenticated()) {
                // Generate and return JWT token
                return jwtService.generateToken(client.getCenId());
            } else {
                return "AuthenticationFailed";
            }
        }

        return "expired";
    }


    public void sendOtpEmail(String toEmail, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("CenHub OTP Login");
        message.setText("Your OTP code is: " + otp + "\nIt expires in 5 minutes.");

        mailSender.send(message);
    }




    @Override
    public List<ClientDto> findClients() {
        List<Client> clients = clientRepo.findByRole("ROLE_CLIENT");
        return clients.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList());
    }

    @Override
    public List<ClientDto> findAdmins() {
        List<Client> clients = clientRepo.findByRole("ROLE_ADMIN");
        return clients.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList());
    }

    @Override
    public List<ClientDto> findSuperAdmin() {
        List<Client> clients = clientRepo.findByRole("ROLE_SUPERADMIN");
        return clients.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList());
    }

    @Override
    public List<ClientDto> findActiveAdmins() {
        List<Client> client = clientRepo.findByStatusAndRole("active", "ROLE_ADMIN");
        return client.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList());
    }

    @Override
    public List<ClientDto> findAdminByStatus(String status, String role) {
        List<Client> client = clientRepo.findByStatusAndRole(status, role);
        return client.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList());
    }

    @Override
    public List<ClientDto> findTop20ActiveClient() {
        List<Client> clients = clientRepo.findTop20ByRoleAndStatusOrderByTotalMarksDesc("ROLE_CLIENT", "active");
        return clients.stream().map(ClientMapper::mapToClientDto).collect(Collectors.toList());
    }

    private void UpdateClientByResultIdFromDto(ClientDto clientDto, Client client, String subject, String type, Integer testId){

        System.out.println("Converted Test Id In UpdatedClient => "+testId);
        int marksIndex = 4;


        int totalMcqMarks = 0;
        if ("aptitude".equals(subject)) {
            if ("mcq".equals(type) && clientDto.getAptitudeMcqTestResult() != null) {
                client.getAptitudeMcqTestResult().put(testId, clientDto.getAptitudeMcqTestResult().get(testId));

//                totalMcqMarks = 0;
//                for (List<String> results : client.getAptitudeMcqTestResult().values()) {
////                    for (String result : results) {
////                        totalMcqMarks += Integer.parseInt(result);  // Assuming result is the score in String format
////                    }
//                    if(results.getLast().equals("NULL") || results.getLast().equals("")){
////                        System.out.println(0);
//                        totalMcqMarks += 0;
//                    }
//                    else{
////                        System.out.println(results.getLast());
//                        totalMcqMarks += Integer.parseInt(results.getLast());
//                    }
//                }
//                System.out.println("TotalMarks => "+totalMcqMarks);
//                client.setAptitudeMcqTotalMarks(totalMcqMarks);


//                for (List<String> results : client.getAptitudeMcqTestResult().values()) {
//                    // Get the last result (score) from the list
//                    if(results.size()==0){
//                        break;
//                    }
//                    String result = results.get(results.size() - 2); // more explicit than getLast()
//                    System.out.println("Results => "+results);
//                    System.out.println("Result => "+result);
//
//                    // Check for empty or "0" score
//                    if ("0".equals(result) || result.isEmpty()) {
//                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
//                    } else {
//                        try {
//                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
//                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
//                        }
//                    }
//                }
//
//                System.out.println("Total Marks => " + totalMcqMarks);
//                client.setAptitudeMcqTotalMarks(totalMcqMarks);

                for (List<String> results : client.getAptitudeMcqTestResult().values()) {
                    if (results == null || results.size() < 2) {
                        continue; // Skip if list is null or too small
                    }

                    String result = results.get(results.size() - marksIndex); // second last element

//                    System.out.println("Results => " + results);
//                    System.out.println("Result => " + result);

                    if ("0".equals(result) || result.isEmpty()) {
                        totalMcqMarks += 0;
                    } else {
                        try {
                            totalMcqMarks += Integer.parseInt(result);
                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);
                        }
                    }
                }

//                System.out.println("Total Marks => " + totalMcqMarks);
                client.setAptitudeMcqTotalMarks(totalMcqMarks);

            }
        } else if ("java".equals(subject)) {
            if ("mcq".equals(type) && clientDto.getJavaMcqTestResult() != null) {
                client.getJavaMcqTestResult().put(testId, clientDto.getJavaMcqTestResult().get(testId));
                totalMcqMarks = 0;
//                for (List<String> results : client.getJavaMcqTestResult().values()) {
//                    if(results.size()==0){
//                        break;
//                    }
//                    String result = results.get(results.size() - 1); // more explicit than getLast()
//
//                    // Check for empty or "0" score
//                    if ("0".equals(result) || result.isEmpty()) {
//                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
//                    } else {
//                        try {
//                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
//                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
//                        }
//                    }
//                }
//                client.setJavaMcqTotalMarks(totalMcqMarks);
                for (List<String> results : client.getJavaMcqTestResult().values()) {
                    if (results == null || results.size() < 2) {
                        continue; // Skip if list is null or too small
                    }

                    String result = results.get(results.size() - marksIndex); // second last element

//                    System.out.println("Results => " + results);
//                    System.out.println("Result => " + result);

                    if ("0".equals(result) || result.isEmpty()) {
                        totalMcqMarks += 0;
                    } else {
                        try {
                            totalMcqMarks += Integer.parseInt(result);
                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);
                        }
                    }
                }

//                System.out.println("Total Marks => " + totalMcqMarks);
                client.setJavaMcqTotalMarks(totalMcqMarks);
            }
//            else if ("coding".equals(type) && clientDto.getJavaCodingTestResult() != null) {
//                client.getJavaCodingTestResult().put(testId, clientDto.getJavaCodingTestResult().get(testId));
//                totalMcqMarks = 0;
////                for (List<String> results : client.getJavaCodingTestResult().values()) {
////                    String result = results.get(results.size() - 1); // more explicit than getLast()
////
////                    // Check for empty or "0" score
////                    if ("0".equals(result) || result.isEmpty()) {
////                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
////                    } else {
////                        try {
////                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
////                        } catch (NumberFormatException e) {
////                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
////                        }
////                    }
////                }
////                client.setJavaCodingTotalMarks(totalMcqMarks);
//            }
        } else if ("cprogramming".equals(subject)) {
            if ("mcq".equals(type) && clientDto.getCprogrammingMcqTestResult() != null) {
                client.getCprogrammingMcqTestResult().put(testId, clientDto.getCprogrammingMcqTestResult().get(testId));
                totalMcqMarks = 0;
//                for (List<String> results : client.getCprogrammingMcqTestResult().values()) {
//                    if(results.size()==0){
//                        break;
//                    }
//                    String result = results.get(results.size() - 2); // more explicit than getLast()
//
//                    // Check for empty or "0" score
//                    if ("0".equals(result) || result.isEmpty()) {
//                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
//                    } else {
//                        try {
//                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
//                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
//                        }
//                    }
//                }
//                client.setCprogrammingMcqTotalMarks(totalMcqMarks);
                for (List<String> results : client.getCprogrammingMcqTestResult().values()) {
                    if (results == null || results.size() < marksIndex) {
                        continue; // Skip if list is null or too small
                    }

                    String result = results.get(results.size() - 2); // second last element

//                    System.out.println("Results => " + results);
//                    System.out.println("Result => " + result);

                    if ("0".equals(result) || result.isEmpty()) {
                        totalMcqMarks += 0;
                    } else {
                        try {
                            totalMcqMarks += Integer.parseInt(result);
                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);
                        }
                    }
                }

//                System.out.println("Total Marks => " + totalMcqMarks);
                client.setCprogrammingMcqTotalMarks(totalMcqMarks);
            }
//            else if ("coding".equals(type) && clientDto.getCprogrammingCodingTestResult() != null) {
//                client.getCprogrammingCodingTestResult().put(testId, clientDto.getCprogrammingCodingTestResult().get(testId));
//                totalMcqMarks = 0;
////                for (List<String> results : client.getCprogrammingCodingTestResult().values()) {
////                    String result = results.get(results.size() - 1); // more explicit than getLast()
////
////                    // Check for empty or "0" score
////                    if ("0".equals(result) || result.isEmpty()) {
////                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
////                    } else {
////                        try {
////                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
////                        } catch (NumberFormatException e) {
////                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
////                        }
////                    }
////                }
////                client.setCprogrammingCodingTotalMarks(totalMcqMarks);
//            }
        } else if ("cppprogramming".equals(subject)) {
            if ("mcq".equals(type) && clientDto.getCppprogrammingMcqTestResult() != null) {
                client.getCppprogrammingMcqTestResult().put(testId, clientDto.getCppprogrammingMcqTestResult().get(testId));
                totalMcqMarks = 0;
//                for (List<String> results : client.getCppprogrammingMcqTestResult().values()) {
//                    if(results.size()==0){
//                        break;
//                    }
//                    String result = results.get(results.size() - 2); // more explicit than getLast()
//
//                    // Check for empty or "0" score
//                    if ("0".equals(result) || result.isEmpty()) {
//                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
//                    } else {
//                        try {
//                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
//                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
//                        }
//                    }
//                }
//                client.setCppprogrammingMcqTotalMarks(totalMcqMarks);
                for (List<String> results : client.getCppprogrammingMcqTestResult().values()) {
                    if (results == null || results.size() < 2) {
                        continue; // Skip if list is null or too small
                    }

                    String result = results.get(results.size() - marksIndex); // second last element

//                    System.out.println("Results => " + results);
//                    System.out.println("Result => " + result);

                    if ("0".equals(result) || result.isEmpty()) {
                        totalMcqMarks += 0;
                    } else {
                        try {
                            totalMcqMarks += Integer.parseInt(result);
                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);
                        }
                    }
                }

//                System.out.println("Total Marks => " + totalMcqMarks);
                client.setCppprogrammingMcqTotalMarks(totalMcqMarks);
            }
//            else if ("coding".equals(type) && clientDto.getCppprogrammingCodingTestResult() != null) {
//                client.getCppprogrammingCodingTestResult().put(testId, clientDto.getCppprogrammingCodingTestResult().get(testId));
//                totalMcqMarks = 0;
////                for (List<String> results : client.getCppprogrammingCodingTestResult().values()) {
////                    String result = results.get(results.size() - 1); // more explicit than getLast()
////
////                    // Check for empty or "0" score
////                    if ("0".equals(result) || result.isEmpty()) {
////                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
////                    } else {
////                        try {
////                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
////                        } catch (NumberFormatException e) {
////                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
////                        }
////                    }
////                }
////                client.setCppprogrammingCodingTotalMarks(totalMcqMarks);
//            }
        } else if ("python".equals(subject)) {
            if ("mcq".equals(type) && clientDto.getPythonMcqTestResult() != null) {
                client.getPythonMcqTestResult().put(testId, clientDto.getPythonMcqTestResult().get(testId));
                totalMcqMarks = 0;
//                for (List<String> results : client.getPythonMcqTestResult().values()) {
//                    if(results.size()==0){
//                        break;
//                    }
//                    String result = results.get(results.size() - 2); // more explicit than getLast()
//
//                    // Check for empty or "0" score
//                    if ("0".equals(result) || result.isEmpty()) {
//                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
//                    } else {
//                        try {
//                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
//                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
//                        }
//                    }
//                }
//                client.setPythonMcqTotalMarks(totalMcqMarks);

                for (List<String> results : client.getPythonMcqTestResult().values()) {
                    if (results == null || results.size() < 2) {
                        continue; // Skip if list is null or too small
                    }

                    String result = results.get(results.size() - marksIndex); // second last element

//                    System.out.println("Results => " + results);
//                    System.out.println("Result => " + result);

                    if ("0".equals(result) || result.isEmpty()) {
                        totalMcqMarks += 0;
                    } else {
                        try {
                            totalMcqMarks += Integer.parseInt(result);
                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);
                        }
                    }
                }

//                System.out.println("Total Marks => " + totalMcqMarks);
                client.setPythonMcqTotalMarks(totalMcqMarks);
            }
//            else if ("coding".equals(type) && clientDto.getPythonCodingTestResult() != null) {
//                client.getPythonCodingTestResult().put(testId, clientDto.getPythonCodingTestResult().get(testId));
//                totalMcqMarks = 0;
////                for (List<String> results : client.getPythonCodingTestResult().values()) {
////                    String result = results.get(results.size() - 1); // more explicit than getLast()
////
////                    // Check for empty or "0" score
////                    if ("0".equals(result) || result.isEmpty()) {
////                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
////                    } else {
////                        try {
////                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
////                        } catch (NumberFormatException e) {
////                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
////                        }
////                    }
////                }
////                client.setPythonCodingTotalMarks(totalMcqMarks);
//            }
        } else if ("verbal".equals(subject)) {
            if ("mcq".equals(type) && clientDto.getVerbalMcqTestResult() != null) {
                client.getVerbalMcqTestResult().put(testId, clientDto.getVerbalMcqTestResult().get(testId));
                totalMcqMarks = 0;
//                for (List<String> results : client.getVerbalMcqTestResult().values()) {
//                    if(results.size()==0){
//                        break;
//                    }
//                    String result = results.get(results.size() - 2); // more explicit than getLast()
//
//                    // Check for empty or "0" score
//                    if ("0".equals(result) || result.isEmpty()) {
//                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
//                    } else {
//                        try {
//                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
//                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
//                        }
//                    }
//                }
//                client.setVerbalMcqTotalMarks(totalMcqMarks);
                for (List<String> results : client.getVerbalMcqTestResult().values()) {
                    if (results == null || results.size() < 2) {
                        continue; // Skip if list is null or too small
                    }

                    String result = results.get(results.size() - marksIndex); // second last element

//                    System.out.println("Results => " + results);
//                    System.out.println("Result => " + result);

                    if ("0".equals(result) || result.isEmpty()) {
                        totalMcqMarks += 0;
                    } else {
                        try {
                            totalMcqMarks += Integer.parseInt(result);
                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);
                        }
                    }
                }

//                System.out.println("Total Marks => " + totalMcqMarks);
                client.setVerbalMcqTotalMarks(totalMcqMarks);
            }
        } else if ("webdevelopment".equals(subject)) {
            if ("mcq".equals(type) && clientDto.getWebdevelopmentMcqTestResult() != null) {
                client.getWebdevelopmentMcqTestResult().put(testId, clientDto.getWebdevelopmentMcqTestResult().get(testId));
                totalMcqMarks = 0;
//                for (List<String> results : client.getWebdevelopmentMcqTestResult().values()) {
//                    if(results.size()==0){
//                        break;
//                    }
//                    String result = results.get(results.size() - 2); // more explicit than getLast()
//
//                    // Check for empty or "0" score
//                    if ("0".equals(result) || result.isEmpty()) {
//                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
//                    } else {
//                        try {
//                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
//                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
//                        }
//                    }
//                }
//                client.setWebdevelopmentMcqTotalMarks(totalMcqMarks);
                for (List<String> results : client.getWebdevelopmentMcqTestResult().values()) {
                    if (results == null || results.size() < 2) {
                        continue; // Skip if list is null or too small
                    }

                    String result = results.get(results.size() - marksIndex); // second last element

//                    System.out.println("Results => " + results);
//                    System.out.println("Result => " + result);

                    if ("0".equals(result) || result.isEmpty()) {
                        totalMcqMarks += 0;
                    } else {
                        try {
                            totalMcqMarks += Integer.parseInt(result);
                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);
                        }
                    }
                }

//                System.out.println("Total Marks => " + totalMcqMarks);
                client.setWebdevelopmentMcqTotalMarks(totalMcqMarks);
            }
        } else if ("dbms".equals(subject)) {
            if ("mcq".equals(type) && clientDto.getDbmsMcqTestResult() != null) {
                client.getDbmsMcqTestResult().put(testId, clientDto.getDbmsMcqTestResult().get(testId));
                totalMcqMarks = 0;
//                for (List<String> results : client.getDbmsMcqTestResult().values()) {
//                    if(results.size()==0){
//                        break;
//                    }
//                    String result = results.get(results.size() - 2); // more explicit than getLast()
//
//                    // Check for empty or "0" score
//                    if ("0".equals(result) || result.isEmpty()) {
//                        totalMcqMarks += 0;  // Treat empty or "0" as 0 marks
//                    } else {
//                        try {
//                            totalMcqMarks += Integer.parseInt(result);  // Parse and add the score
//                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);  // Handle invalid score data
//                        }
//                    }
//                }
//                client.setDbmsMcqTotalMarks(totalMcqMarks);
                for (List<String> results : client.getDbmsMcqTestResult().values()) {
                    if (results == null || results.size() < 2) {
                        continue; // Skip if list is null or too small
                    }

                    String result = results.get(results.size() - marksIndex); // second last element

//                    System.out.println("Results => " + results);
//                    System.out.println("Result => " + result);

                    if ("0".equals(result) || result.isEmpty()) {
                        totalMcqMarks += 0;
                    } else {
                        try {
                            totalMcqMarks += Integer.parseInt(result);
                        } catch (NumberFormatException e) {
//                            System.err.println("Invalid score format: " + result);
                        }
                    }
                }

//                System.out.println("Total Marks => " + totalMcqMarks);
                client.setDbmsMcqTotalMarks(totalMcqMarks);
            }
        }

        totalMcqMarks = 0;
        totalMcqMarks += Optional.ofNullable(client.getJavaMcqTotalMarks()).orElse(0);
//        totalMcqMarks += Optional.ofNullable(client.getJavaCodingTotalMarks()).orElse(0);
        totalMcqMarks += Optional.ofNullable(client.getPythonMcqTotalMarks()).orElse(0);
//        totalMcqMarks += Optional.ofNullable(client.getPythonCodingTotalMarks()).orElse(0);
        totalMcqMarks += Optional.ofNullable(client.getCppprogrammingMcqTotalMarks()).orElse(0);
//        totalMcqMarks += Optional.ofNullable(client.getCppprogrammingCodingTotalMarks()).orElse(0);
        totalMcqMarks += Optional.ofNullable(client.getCprogrammingMcqTotalMarks()).orElse(0);
//        totalMcqMarks += Optional.ofNullable(client.getCprogrammingCodingTotalMarks()).orElse(0);
        totalMcqMarks += Optional.ofNullable(client.getAptitudeMcqTotalMarks()).orElse(0);
        totalMcqMarks += Optional.ofNullable(client.getDbmsMcqTotalMarks()).orElse(0);
        totalMcqMarks += Optional.ofNullable(client.getWebdevelopmentMcqTotalMarks()).orElse(0);
        totalMcqMarks += Optional.ofNullable(client.getVerbalMcqTotalMarks()).orElse(0);

        client.setTotalMarks(totalMcqMarks);

        }


//        if (subject == "aptitude"){
//            if(type == "mcq"){
//                if (clientDto.getAptitudeMcqTestResult() != null){
//                    client.getAptitudeMcqTestResult().put(testId, clientDto.getAptitudeMcqTestResult().get(testId));
//                }
//            }
//        } else if (subject == "java") {
//            if (type == "mcq") {
//                if (clientDto.getJavaMcqTestResult() != null) {
//                    client.getJavaMcqTestResult().put(testId, clientDto.getJavaMcqTestResult().get(testId));
//                }
//            } else if (type == "coding") {
//                if (clientDto.getJavaCodingTestResult() != null) {
//                    client.getJavaCodingTestResult().put(testId, clientDto.getJavaCodingTestResult().get(testId));
//                }
//            }
//        } else if (subject == "cprogramming") {
//            if (type == "mcq") {
//                if (clientDto.getCprogrammingMcqTestResult() != null) {
//                    client.getCprogrammingMcqTestResult().put(testId, clientDto.getCprogrammingMcqTestResult().get(testId));
//                }
//            } else if (type == "coding") {
//                if (clientDto.getCprogrammingCodingTestResult() != null) {
//                    client.getCprogrammingCodingTestResult().put(testId, clientDto.getCprogrammingCodingTestResult().get(testId));
//                }
//            }
//        } else if (subject == "cppprogramming") {
//            if (type == "mcq") {
//                if (clientDto.getCppprogrammingMcqTestResult() != null) {
//                    client.getCppprogrammingMcqTestResult().put(testId, clientDto.getCppprogrammingMcqTestResult().get(testId));
//                }
//            } else if (type == "coding") {
//                if (clientDto.getCppprogrammingCodingTestResult() != null) {
//                    client.getCppprogrammingCodingTestResult().put(testId, clientDto.getCppprogrammingCodingTestResult().get(testId));
//                }
//            }
//        } else if (subject == "python") {
//            if (type == "mcq") {
//                if (clientDto.getPythonMcqTestResult() != null) {
//                    client.getPythonMcqTestResult().put(testId, clientDto.getPythonMcqTestResult().get(testId));
//                }
//            } else if (type == "coding") {
//                if (clientDto.getPythonCodingTestResult() != null) {
//                    client.getPythonCodingTestResult().put(testId, clientDto.getPythonCodingTestResult().get(testId));
//                }
//            }
//        } else if (subject == "verbal") {
//            if (type == "mcq") {
//                if (clientDto.getVerbalMcqTestResult() != null) {
//                    client.getVerbalMcqTestResult().put(testId, clientDto.getVerbalMcqTestResult().get(testId));
//                }
//            }
//        } else if (subject == "webdevelopment") {
//            if (type == "mcq") {
//                if (clientDto.getWebdevelopmentMcqTestResult() != null) {
//                    client.getWebdevelopmentMcqTestResult().put(testId, clientDto.getWebdevelopmentMcqTestResult().get(testId));
//                }
//            }
//        } else if (subject == "dbms") {
//            if (type == "mcq") {
//                if (clientDto.getDbmsMcqTestResult() != null) {
//                    client.getDbmsMcqTestResult().put(testId, clientDto.getDbmsMcqTestResult().get(testId));
//                }
//            }
//        }


//        if(clientDto.getAptitudeTestQuestionsData().getTestMcqResults() != null){
////            client.getTestQuestionsData().setTestResults(clientDto.getTestQuestionsData().getTestResults());
//            client.getAptitudeTestQuestionsData().getTestMcqResults().put(
//                    testId,
//                    clientDto.getAptitudeTestQuestionsData().getTestMcqResults().get(testId)
//            );
//        }
    }
//    private static void UpdateClientByResultIdFromDto(ClientDto clientDto, Client client, Integer testId) {
//        if (clientDto.getTestQuestionsData() != null &&
//                clientDto.getTestQuestionsData().getTestResults() != null &&
//                clientDto.getTestQuestionsData().getTestResults().containsKey(testId)) {
//
//            var testResult = clientDto.getTestQuestionsData().getTestResults().get(testId);
//            client.getTestQuestionsData().getTestQuestions().put(testId, testResult);
//        }
//    }

//}
