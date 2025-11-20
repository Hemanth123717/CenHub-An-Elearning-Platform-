package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.MentorDto;
import com.cencode.CenCode.entity.Client;

public class MentorMapper {
    public static MentorDto clientDtoToMentorDto(Client client){
        MentorDto mentorDto = new MentorDto();
        mentorDto.setClientId(client.getClientId());
        mentorDto.setName(client.getName());
        mentorDto.setMailId(client.getMailId());
        mentorDto.setContactNo(client.getContactNo());
        return mentorDto;
    }
}
