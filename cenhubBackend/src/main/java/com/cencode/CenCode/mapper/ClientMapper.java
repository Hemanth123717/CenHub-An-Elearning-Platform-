package com.cencode.CenCode.mapper;

import com.cencode.CenCode.dto.ClientDto;
import com.cencode.CenCode.dto.ClientDtoWithMentor;
import com.cencode.CenCode.dto.TestQuestionsDataDto;
import com.cencode.CenCode.entity.Client;
//import com.cencode.CenCode.entity.TestQuestionsData;

public class ClientMapper {
    public static ClientDto mapToClientDto(Client client){
        ClientDto clientDto = new ClientDto();
        clientDto.setClientId(client.getClientId());
        clientDto.setName(client.getName());
        clientDto.setCenId(client.getCenId());
        clientDto.setPassword(client.getPassword());
        clientDto.setContactNo(client.getContactNo());
        clientDto.setMailId(client.getMailId());
        clientDto.setTotalMarks(client.getTotalMarks());
        clientDto.setRole(client.getRole());

//        clientDto.setJavaEasyTestMarks(client.getJavaEasyTestMarks());
//        clientDto.setJavaMediumTestMarks(client.getJavaMediumTestMarks());
//        clientDto.setJavaHardTestMarks(client.getJavaHardTestMarks());
//        clientDto.setAptitudeTestQuestionsData(client.getAptitudeTestQuestionsData());
//        clientDto.setSubjectTestData(client.getSubjectTestData());
//        clientDto.setSubjectTestResultData(client.getSubjectTestResultData());
//        clientDto.setJavaOverallMarks(client.getJavaOverallMarks());

        clientDto.setAptitudeMcqTotalMarks(client.getAptitudeMcqTotalMarks());
        clientDto.setDbmsMcqTotalMarks(client.getDbmsMcqTotalMarks());
        clientDto.setVerbalMcqTotalMarks(client.getVerbalMcqTotalMarks());
        clientDto.setWebdevelopmentMcqTotalMarks(client.getWebdevelopmentMcqTotalMarks());
        clientDto.setJavaMcqTotalMarks(client.getJavaMcqTotalMarks());
//        clientDto.setJavaCodingTotalMarks(client.getJavaCodingTotalMarks());
        clientDto.setPythonMcqTotalMarks(client.getPythonMcqTotalMarks());
//        clientDto.setPythonCodingTotalMarks(client.getPythonCodingTotalMarks());
//        clientDto.setCppprogrammingCodingTotalMarks(client.getCppprogrammingCodingTotalMarks());
//        clientDto.setCppprogrammingCodingTotalMarks(client.getCppprogrammingCodingTotalMarks());
        clientDto.setCprogrammingMcqTotalMarks(client.getCprogrammingMcqTotalMarks());
//        clientDto.setCprogrammingCodingTotalMarks(client.getCprogrammingCodingTotalMarks());

        clientDto.setJavaMcqTestQuestions(client.getJavaMcqTestQuestions());
//        clientDto.setJavaCodingTestQuestions(client.getJavaCodingTestQuestions());
        clientDto.setJavaMcqTestQuestions(client.getJavaMcqTestQuestions());
//        clientDto.setJavaCodingTestResult(client.getJavaMcqTestResult());

        clientDto.setPythonMcqTestQuestions(client.getPythonMcqTestQuestions());
//        clientDto.setPythonCodingTestQuestions(client.getPythonCodingTestQuestions());
        clientDto.setPythonMcqTestResult(client.getPythonMcqTestResult());
//        clientDto.setPythonCodingTestResult(client.getPythonCodingTestResult());

        clientDto.setCprogrammingMcqTestQuestions(client.getCprogrammingMcqTestQuestions());
//        clientDto.setCprogrammingCodingTestQuestions(client.getCprogrammingCodingTestQuestions());
        clientDto.setCprogrammingMcqTestResult(client.getCprogrammingMcqTestResult());
//        clientDto.setCprogrammingCodingTestResult(client.getCprogrammingCodingTestResult());

        clientDto.setCppprogrammingMcqTestQuestions(client.getCppprogrammingMcqTestQuestions());
//        clientDto.setCppprogrammingCodingTestQuestions(client.getCppprogrammingCodingTestQuestions());
        clientDto.setCppprogrammingMcqTestResult(client.getCppprogrammingMcqTestResult());
//        clientDto.setCppprogrammingCodingTestResult(client.getCppprogrammingCodingTestResult());

        clientDto.setAptitudeMcqTestQuestions(client.getAptitudeMcqTestQuestions());
        clientDto.setAptitudeMcqTestResult(client.getAptitudeMcqTestResult());

        clientDto.setVerbalMcqTestQuestions(client.getVerbalMcqTestQuestions());
        clientDto.setVerbalMcqTestResult(client.getVerbalMcqTestResult());

        clientDto.setDbmsMcqTestQuestions(client.getDbmsMcqTestQuestions());
        clientDto.setDbmsMcqTestResult(client.getDbmsMcqTestResult());

        clientDto.setWebdevelopmentMcqTestQuestions(client.getWebdevelopmentMcqTestQuestions());
        clientDto.setWebdevelopmentMcqTestResult(client.getWebdevelopmentMcqTestResult());


        return clientDto;
    }

    public static Client mapToClient(ClientDto clientDto){
        Client client = new Client();
        client.setClientId(clientDto.getClientId());
        client.setCenId(clientDto.getCenId());
        client.setPassword(clientDto.getPassword());
        client.setName(clientDto.getName());
        client.setContactNo(clientDto.getContactNo());
        client.setMailId(clientDto.getMailId());

        client.setAptitudeMcqTotalMarks(clientDto.getAptitudeMcqTotalMarks());
        client.setDbmsMcqTotalMarks(clientDto.getDbmsMcqTotalMarks());
        client.setVerbalMcqTotalMarks(clientDto.getVerbalMcqTotalMarks());
        client.setWebdevelopmentMcqTotalMarks(clientDto.getWebdevelopmentMcqTotalMarks());
        client.setJavaMcqTotalMarks(clientDto.getJavaMcqTotalMarks());
//        client.setJavaCodingTotalMarks(clientDto.getJavaCodingTotalMarks());
        client.setPythonMcqTotalMarks(clientDto.getPythonMcqTotalMarks());
//        client.setPythonCodingTotalMarks(clientDto.getPythonCodingTotalMarks());
//        client.setCppprogrammingCodingTotalMarks(clientDto.getCppprogrammingCodingTotalMarks());
//        client.setCppprogrammingCodingTotalMarks(clientDto.getCppprogrammingCodingTotalMarks());
        client.setCprogrammingMcqTotalMarks(clientDto.getCprogrammingMcqTotalMarks());
//        client.setCprogrammingCodingTotalMarks(clientDto.getCprogrammingCodingTotalMarks());
        client.setTotalMarks(clientDto.getTotalMarks());
        client.setRole(clientDto.getRole());

//        client.setAptitudeTestQuestionsData(clientDto.getAptitudeTestQuestionsData());?
//        client.setJavaEasyTestMarks(clientDto.getJavaEasyTestMarks());
//        client.setJavaHardTestMarks(clientDto.getJavaHardTestMarks());
//        client.setJavaMediumTestMarks(clientDto.getJavaMediumTestMarks());
//        client.setSubjectTestData(clientDto.getSubjectTestData());
//        client.setSubjectTestResultData(clientDto.getSubjectTestResultData());

        client.setJavaMcqTestQuestions(clientDto.getJavaMcqTestQuestions());
//        client.setJavaCodingTestQuestions(clientDto.getJavaCodingTestQuestions());
        client.setJavaMcqTestQuestions(clientDto.getJavaMcqTestQuestions());
        client.setJavaMcqTestResult(clientDto.getJavaMcqTestResult());
        client.setPythonMcqTestQuestions(clientDto.getPythonMcqTestQuestions());
//        client.setPythonCodingTestQuestions(clientDto.getPythonCodingTestQuestions());
        client.setPythonMcqTestResult(clientDto.getPythonMcqTestResult());
//        client.setPythonCodingTestResult(clientDto.getPythonCodingTestResult());
        client.setCprogrammingMcqTestQuestions(clientDto.getCprogrammingMcqTestQuestions());
//        client.setCprogrammingCodingTestQuestions(clientDto.getCprogrammingCodingTestQuestions());
        client.setCprogrammingMcqTestResult(clientDto.getCprogrammingMcqTestResult());
//        client.setCprogrammingCodingTestResult(clientDto.getCprogrammingCodingTestResult());
        client.setCppprogrammingMcqTestQuestions(clientDto.getCppprogrammingMcqTestQuestions());
//        client.setCppprogrammingCodingTestQuestions(clientDto.getCppprogrammingCodingTestQuestions());
        client.setCppprogrammingMcqTestResult(clientDto.getCppprogrammingMcqTestResult());
//        client.setCppprogrammingCodingTestResult(clientDto.getCppprogrammingCodingTestResult());
        client.setAptitudeMcqTestQuestions(clientDto.getAptitudeMcqTestQuestions());
        client.setAptitudeMcqTestResult(clientDto.getAptitudeMcqTestResult());
        client.setVerbalMcqTestQuestions(clientDto.getVerbalMcqTestQuestions());
        client.setVerbalMcqTestResult(clientDto.getVerbalMcqTestResult());
        client.setDbmsMcqTestQuestions(clientDto.getDbmsMcqTestQuestions());
        client.setDbmsMcqTestResult(clientDto.getDbmsMcqTestResult());
        client.setWebdevelopmentMcqTestQuestions(clientDto.getWebdevelopmentMcqTestQuestions());
        client.setWebdevelopmentMcqTestResult(clientDto.getWebdevelopmentMcqTestResult());
        return client;
    }

    public static Client mapToClientWithMentor(ClientDtoWithMentor clientDto){
        Client client = new Client();
        client.setClientId(clientDto.getClientId());
        client.setCenId(clientDto.getCenId());
        client.setPassword(clientDto.getPassword());
        client.setName(clientDto.getName());
        client.setContactNo(clientDto.getContactNo());
        client.setMailId(clientDto.getMailId());

        client.setAptitudeMcqTotalMarks(clientDto.getAptitudeMcqTotalMarks());
        client.setDbmsMcqTotalMarks(clientDto.getDbmsMcqTotalMarks());
        client.setVerbalMcqTotalMarks(clientDto.getVerbalMcqTotalMarks());
        client.setWebdevelopmentMcqTotalMarks(clientDto.getWebdevelopmentMcqTotalMarks());
        client.setJavaMcqTotalMarks(clientDto.getJavaMcqTotalMarks());
//        client.setJavaCodingTotalMarks(clientDto.getJavaCodingTotalMarks());
        client.setPythonMcqTotalMarks(clientDto.getPythonMcqTotalMarks());
//        client.setPythonCodingTotalMarks(clientDto.getPythonCodingTotalMarks());
//        client.setCppprogrammingCodingTotalMarks(clientDto.getCppprogrammingCodingTotalMarks());
//        client.setCppprogrammingCodingTotalMarks(clientDto.getCppprogrammingCodingTotalMarks());
        client.setCprogrammingMcqTotalMarks(clientDto.getCprogrammingMcqTotalMarks());
//        client.setCprogrammingCodingTotalMarks(clientDto.getCprogrammingCodingTotalMarks());
        client.setTotalMarks(clientDto.getTotalMarks());
        client.setRole(clientDto.getRole());

//        client.setAptitudeTestQuestionsData(clientDto.getAptitudeTestQuestionsData());?
//        client.setJavaEasyTestMarks(clientDto.getJavaEasyTestMarks());
//        client.setJavaHardTestMarks(clientDto.getJavaHardTestMarks());
//        client.setJavaMediumTestMarks(clientDto.getJavaMediumTestMarks());
//        client.setSubjectTestData(clientDto.getSubjectTestData());
//        client.setSubjectTestResultData(clientDto.getSubjectTestResultData());

        client.setJavaMcqTestQuestions(clientDto.getJavaMcqTestQuestions());
//        client.setJavaCodingTestQuestions(clientDto.getJavaCodingTestQuestions());
        client.setJavaMcqTestQuestions(clientDto.getJavaMcqTestQuestions());
        client.setJavaMcqTestResult(clientDto.getJavaMcqTestResult());
        client.setPythonMcqTestQuestions(clientDto.getPythonMcqTestQuestions());
//        client.setPythonCodingTestQuestions(clientDto.getPythonCodingTestQuestions());
        client.setPythonMcqTestResult(clientDto.getPythonMcqTestResult());
//        client.setPythonCodingTestResult(clientDto.getPythonCodingTestResult());
        client.setCprogrammingMcqTestQuestions(clientDto.getCprogrammingMcqTestQuestions());
//        client.setCprogrammingCodingTestQuestions(clientDto.getCprogrammingCodingTestQuestions());
        client.setCprogrammingMcqTestResult(clientDto.getCprogrammingMcqTestResult());
//        client.setCprogrammingCodingTestResult(clientDto.getCprogrammingCodingTestResult());
        client.setCppprogrammingMcqTestQuestions(clientDto.getCppprogrammingMcqTestQuestions());
//        client.setCppprogrammingCodingTestQuestions(clientDto.getCppprogrammingCodingTestQuestions());
        client.setCppprogrammingMcqTestResult(clientDto.getCppprogrammingMcqTestResult());
//        client.setCppprogrammingCodingTestResult(clientDto.getCppprogrammingCodingTestResult());
        client.setAptitudeMcqTestQuestions(clientDto.getAptitudeMcqTestQuestions());
        client.setAptitudeMcqTestResult(clientDto.getAptitudeMcqTestResult());
        client.setVerbalMcqTestQuestions(clientDto.getVerbalMcqTestQuestions());
        client.setVerbalMcqTestResult(clientDto.getVerbalMcqTestResult());
        client.setDbmsMcqTestQuestions(clientDto.getDbmsMcqTestQuestions());
        client.setDbmsMcqTestResult(clientDto.getDbmsMcqTestResult());
        client.setWebdevelopmentMcqTestQuestions(clientDto.getWebdevelopmentMcqTestQuestions());
        client.setWebdevelopmentMcqTestResult(clientDto.getWebdevelopmentMcqTestResult());
        return client;
    }
}


//package com.cencode.CenCode.mapper;
//
//import com.cencode.CenCode.dto.ClientDto;
//import com.cencode.CenCode.dto.TestQuestionsDataDto;
//import com.cencode.CenCode.entity.Client;
//import com.cencode.CenCode.entity.TestQuestionsData;
//
//import java.util.List;
//
//public class ClientMapper {
//
//    // Convert Client entity to ClientDto
//    public static ClientDto mapToClientDto(Client client) {
//        ClientDto clientDto = new ClientDto();
//        clientDto.setClientId(client.getClientId());
//        clientDto.setName(client.getName());
//        clientDto.setCenId(client.getCenId());
//        clientDto.setPassword(client.getPassword());
//        clientDto.setContactNo(client.getContactNo());
//        clientDto.setMailId(client.getMailId());
//        clientDto.setJavaOverallMarks(client.getJavaOverallMarks());
//
//        // Handle ClientTestData mapping
////        if (client.getClientTestData() != null) {
////            TestQuestionsDataDto testQuestionsDataDto = TestQuestionsDataMapper.mapToTestQuestionsDataDto(client.getClientTestData());
////            clientDto.setClientTestData(testQuestionsDataDto);
////        }
//
//        return clientDto;
//    }
//
//    // Convert ClientDto back to Client entity
//    public static Client mapToClient(ClientDto clientDto, List<String> subjects) {
//        Client client = new Client();
//        client.setClientId(clientDto.getClientId());
//        client.setCenId(clientDto.getCenId());
//        client.setPassword(clientDto.getPassword());
//        client.setName(clientDto.getName());
//        client.setContactNo(clientDto.getContactNo());
//        client.setMailId(clientDto.getMailId());
//        client.setJavaOverallMarks(clientDto.getJavaOverallMarks());
//
//        // Handle ClientTestData mapping
////        if (clientDto.getClientTestData() != null) {
////            TestQuestionsData clientTestData = TestQuestionsDataMapper.mapToTestQuestionsData(clientDto.getClientTestData(), subjects);
////            client.setClientTestData(clientTestData);
////        }
//
//        return client;
//    }
//}
