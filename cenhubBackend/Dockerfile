# Use Gradle with JDK 21 for the build stage
FROM gradle:8.13.0-jdk21 AS build

# Set the working directory
WORKDIR /app

# Copy the Gradle build files
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Download dependencies
RUN ./gradlew dependencies --no-daemon

# Copy the source code and build the application
COPY src ./src
RUN ./gradlew bootJar --no-daemon

# Use a lightweight JDK image for the runtime
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Create a non-root user and switch to it
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

# Specify the command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

# docker build -t server-demo . (to run the file)
# docker tag server-demo durga1921/server-demo:latest
#
