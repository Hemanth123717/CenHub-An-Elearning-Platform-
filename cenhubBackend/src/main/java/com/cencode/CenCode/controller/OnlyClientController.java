package com.cencode.CenCode.controller;

import com.cencode.CenCode.dto.ClientDto;
import com.cencode.CenCode.entity.Client;
import com.cencode.CenCode.mapper.ClientMapper;
import com.cencode.CenCode.repository.ClientRepo;
import com.cencode.CenCode.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("api/client")
//@PreAuthorize("hasAnyRole('ADMIN', 'CLIENT', 'SUPERADMIN')")
public class OnlyClientController {

    @Autowired
    ClientService clientService;

    @GetMapping("/clientByCenId/{cenId}")
    public ResponseEntity<Object> getClientData(@PathVariable Long cenId) {
        // Get the authenticated user's role and cenId
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String role = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(", "));

        // Get the current user's cenId (i.e., the authenticated user's ID)
        Long currentUserCenId = Long.parseLong(authentication.getName());  // Assuming the cenId is used as the username

        // Fetch client data based on role and requested cenId
        Object clientData = clientService.getClientData(cenId, role, currentUserCenId);

        return ResponseEntity.ok(clientData);
    }
}
