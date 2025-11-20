package com.cencode.CenCode.service.impl;

import com.cencode.CenCode.dto.DBMSDto;
import com.cencode.CenCode.entity.DBMS;
import com.cencode.CenCode.mapper.DBMSMapper;
import com.cencode.CenCode.repository.DBMSRepo;
import com.cencode.CenCode.service.DBMSService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DBMSServiceImpl implements DBMSService {

    @Autowired
    private DBMSRepo dbmsRepo;

    @Override
    public List<DBMSDto> allQuestions() {
        List<DBMS> dbmsList = dbmsRepo.findAll();
        return dbmsList.stream().map(DBMSMapper::mapToDBMSDto).collect(Collectors.toList());
    }

    @Override
    public DBMSDto findById(Long id) {
        Optional<DBMS> optionalDBMS = dbmsRepo.findById(id);
        DBMS dbms = optionalDBMS.get();
        return DBMSMapper.mapToDBMSDto(dbms);
    }

    @Override
    public List<DBMSDto> findQuestionsByIds(Long[] questionsList) {
        List<DBMS> dbmsDtoList = new ArrayList<>();
        for(int i=0;i<questionsList.length;i++){
            Optional<DBMS> optionalDBMS = dbmsRepo.findById(questionsList[i]);
            DBMS dbms = optionalDBMS.get();
            dbmsDtoList.add(dbms);
        }
//        System.out.println("Questions List "+aptitudeDtoList);
        return dbmsDtoList.stream().map(DBMSMapper::mapToDBMSDto).collect(Collectors.toList());
    }

    @Override
    public DBMSDto updateById(DBMSDto dbmsDto, Long id) {
        Optional<DBMS> optionalDBMS = dbmsRepo.findById(id);
        DBMS dbms = optionalDBMS.get();
        dbmsMethodFromDto(dbms, dbmsDto);
        DBMS updatedDBMS = dbmsRepo.save(dbms);
        return DBMSMapper.mapToDBMSDto(updatedDBMS);
    }

    private static void dbmsMethodFromDto(DBMS dbms, DBMSDto dbmsDto){
        if(dbmsDto.getQuestion() != null){
            dbms.setQuestion(dbmsDto.getQuestion());
        }
        if(dbmsDto.getOption1() != null){
            dbms.setOption1(dbmsDto.getOption1());
        }
        if(dbmsDto.getOption2() != null){
            dbms.setOption2(dbmsDto.getOption2());
        }
        if(dbmsDto.getOption3() != null){
            dbms.setOption3(dbmsDto.getOption3());
        }
        if(dbmsDto.getOption4() != null){
            dbms.setOption4(dbmsDto.getOption4());
        }
        if(dbmsDto.getExplanation() != null){
            dbms.setExplanation(dbmsDto.getExplanation());
        }
        if(dbmsDto.getCorrectOption() != null){
            dbms.setCorrectOption(dbmsDto.getCorrectOption());
        }
        if(dbmsDto.getStatus() != null){
            dbms.setStatus(dbmsDto.getStatus());
        }
    }

    @Override
    public List<DBMSDto> allActiveDBMS(String status) {
        List<DBMS> dbmsList = dbmsRepo.findByStatus(status);
        return dbmsList.stream().map(DBMSMapper::mapToDBMSDto).collect(Collectors.toList());
    }
}
