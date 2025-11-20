package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.ClientDto;
import com.cencode.CenCode.dto.ClientDtoWithMentor;
import com.cencode.CenCode.dto.MentorDto;
import com.cencode.CenCode.dto.OtpVerificationDTO;
import com.cencode.CenCode.entity.Client;
import com.cencode.CenCode.mapper.ClientMapper;
import com.cencode.CenCode.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/public/client")
public class ClientRegistrationController {
    @Autowired
    private ClientService clientService;


    @PostMapping("clientSignUp")
//    http://localhost:8080/api/public/client/clientSignUp
    private ResponseEntity<String> addClient(@RequestBody ClientDtoWithMentor clientDto){
        String newClientDto = clientService.addClientWithClientRole(clientDto);
        return new ResponseEntity<>(newClientDto, HttpStatus.OK);
    }

    @PostMapping("addAdminClient")
//    http://localhost:8080/api/Client/addAdminClient
    private ResponseEntity<ClientDto> addAdminClient(@RequestBody ClientDto clientDto){
        ClientDto newClientDto = clientService.addClientWithAdminRole(clientDto);
        return new ResponseEntity<>(newClientDto, HttpStatus.OK);
    }

    @PostMapping("addSuperAdminClient")
//    http://localhost:8080/api/public/client/addSuperAdminClient
    private ResponseEntity<ClientDto> addSuperAdminClient(@RequestBody ClientDto clientDto){
        ClientDto newClientDto = clientService.addClientWithSuperAdminRole(clientDto);
        return new ResponseEntity<>(newClientDto, HttpStatus.OK);
    }

//    @GetMapping("clientLogin/{id}/{password}")
//    //    http://localhost:8080/api/Client/clientLogin/
//    public ResponseEntity<ClientDto> loginAsClient(@PathVariable Long id, @PathVariable String password){
//        return new ResponseEntity<>(clientService.findByBothCenIdAndPass(id,password), HttpStatus.OK);
////        return ;
//    }

    @PostMapping("clientLogin")
    public ResponseEntity<ClientDto> loginAsClient(@RequestBody Map<String, String> credentials) {
        Long id = Long.parseLong(credentials.get("id"));
        String password = credentials.get("password");
        ClientDto dto = clientService.findByBothCenIdAndPass(id, password);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @PostMapping("authenticate")
    public ResponseEntity<String> Login(@RequestBody Client client) {
        return new ResponseEntity<>(clientService.verifyClient(client), HttpStatus.OK);
    }

    @PostMapping("verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpVerificationDTO dto) {
        String response = clientService.verifyOtp(dto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("mentors")
    //    http://localhost:8080/api/public/client/mentors
    public ResponseEntity<List<MentorDto>> getAllMentors() {
        List<MentorDto> response = clientService.getAllMentors();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
