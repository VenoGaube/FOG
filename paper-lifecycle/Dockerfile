#
# Build stage
#
FROM maven:3.6.3-openjdk-11 AS build
COPY . /app
RUN mvn -f /app/pom.xml --show-version --update-snapshots --batch-mode clean package


FROM openjdk:11-jre-slim
RUN mkdir /app
WORKDIR /app
COPY --from=build ./app/target/quarkus-app /app
EXPOSE 8080
CMD ["java", "-jar", "./quarkus-run.jar"]
