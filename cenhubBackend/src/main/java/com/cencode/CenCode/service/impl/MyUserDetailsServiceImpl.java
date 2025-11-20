package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.entity.Client;
import com.cencode.CenCode.entity.ClientPrincipal;
import com.cencode.CenCode.repository.ClientRepo;
import com.cencode.CenCode.service.MyUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class MyUserDetailsServiceImpl implements MyUserDetailsService {

    @Autowired
    private ClientRepo clientRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Optional<Client> optionalClient = clientRepo.findByCenId(Long.parseLong(username));
//
//        if(!optionalClient.isPresent()){
//            throw new UsernameNotFoundException("User with CenID "+username+" Not found");
//        }
//        Client client = optionalClient.get();
//        return new ClientPrincipal(client);
        try {
            Long cenId = Long.parseLong(username);
            Optional<Client> optionalClient = clientRepo.findByCenId(cenId);
            if (!optionalClient.isPresent()) {
                throw new UsernameNotFoundException("User with CenID " + username + " not found");
            }
            return new ClientPrincipal(optionalClient.get());
        } catch (NumberFormatException e) {
            throw new UsernameNotFoundException("Invalid CenID format: " + username);
        }
    }
}
