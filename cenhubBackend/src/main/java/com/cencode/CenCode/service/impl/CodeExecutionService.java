package com.cencode.CenCode.service.impl;


import com.cencode.CenCode.entity.CodingQuestion;
import com.cencode.CenCode.entity.Testcases;
import com.cencode.CenCode.repository.CodingQuestionRepository;
import com.cencode.CenCode.repository.TestcaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
public class CodeExecutionService {

    @Autowired
    private CodingQuestionRepository repo;

    @Autowired
    private TestcaseRepository testcaseRepo;

    private final boolean isWindows = System.getProperty("os.name").toLowerCase().contains("win");

    public CodingQuestion findQuestionById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public List<CodingQuestion> getAllQuestions() {
        return repo.findAll();
    }

    public Map<String, String> executeCode(String language, String code, String input) {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String extension = "", fileName = null, outputFile = null;

        try {
            switch (language) {
                case "cpp" -> {
                    extension = ".cpp";
                    fileName = "temp_" + timestamp + extension;
                    outputFile = "temp_" + timestamp + (isWindows ? ".exe" : "");
                    writeToFile(fileName, code);
                    String compileCmd = "g++ " + fileName + " -o " + outputFile;
                    String compileErr = runCommand(compileCmd);
                    if (!compileErr.isEmpty()) return Map.of("error", compileErr);
                    return runBinary(outputFile, input);
                }
                case "c" -> {
                    extension = ".c";
                    fileName = "temp_" + timestamp + extension;
                    outputFile = "temp_" + timestamp + (isWindows ? ".exe" : "");
                    writeToFile(fileName, code);
                    String compileCmd = "gcc " + fileName + " -o " + outputFile;
                    String compileErr = runCommand(compileCmd);
                    if (!compileErr.isEmpty()) return Map.of("error", compileErr);
                    return runBinary(outputFile, input);
                }
                case "java" -> {
                    fileName = "Main.java";
                    writeToFile(fileName, code);
                    String compileErr = runCommand("javac Main.java");
                    if (!compileErr.isEmpty()) return Map.of("error", compileErr);
                    return runBinary("java Main", input);
                }
                case "python" -> {
                    fileName = "temp_" + timestamp + ".py";
                    writeToFile(fileName, code);
                    return runBinary((isWindows ? "python" : "python3") + " " + fileName, input);
                }
                default -> {
                    return Map.of("error", "Unsupported language");
                }
            }
        } catch (IOException e) {
            return Map.of("error", "Internal error: " + e.getMessage());
        } finally {
            cleanup(fileName, outputFile, language);
        }
    }

    public List<Map<String, String>> runTestCases(Long questionId, String language, String code) {
        List<Testcases> testcases = testcaseRepo.findByQuestionId(questionId);
        if (testcases.isEmpty()) return List.of(Map.of("error", "No test cases found"));

        List<Map<String, String>> results = new ArrayList<>();
        for (Testcases tc : testcases) {
            var result = executeCode(language, code, tc.getTestcaseInput());
            var actual = result.getOrDefault("output", result.getOrDefault("error", ""));
            var passed = actual.trim().equals(tc.getTestcaseOutput().trim());

            results.add(Map.of(
                    "input", tc.getTestcaseInput(),
                    "expectedOutput", tc.getTestcaseOutput(),
                    "actualOutput", actual,
                    "status", passed ? "Pass" : "Fail"
            ));
        }
        return results;
    }

    private void writeToFile(String filename, String content) throws IOException {
        Files.writeString(Paths.get(filename), content);
    }

    private String runCommand(String command) throws IOException {
        Process process = new ProcessBuilder(command.split(" ")).start();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            return reader.lines().reduce("", (acc, line) -> acc + line + "\n");
        }
    }

    private Map<String, String> runBinary(String command, String input) throws IOException {
        Process process = new ProcessBuilder(command.split(" ")).start();
        if (!input.isEmpty()) {
            try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()))) {
                writer.write(input);
                writer.flush();
            }
        }

        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            reader.lines().forEach(line -> output.append(line).append("\n"));
        }

        try {
            int exitCode = process.waitFor();
            if (exitCode != 0) return Map.of("error", "Non-zero exit code");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return Map.of("error", "Interrupted");
        }

        return Map.of("output", output.toString().trim());
    }

    private void cleanup(String file, String bin, String lang) {
        try {
            if (file != null) Files.deleteIfExists(Paths.get(file));
            if (bin != null) Files.deleteIfExists(Paths.get(bin));
            if ("java".equals(lang)) Files.deleteIfExists(Paths.get("Main.class"));
        } catch (IOException ignored) {
        }
    }
}
