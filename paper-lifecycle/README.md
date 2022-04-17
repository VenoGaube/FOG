# Paper lifecycle

## Goals

The main objective of the project is to provide backend services for different processes in the Decentralized Journal project.

List of functionalities:
* provide REST endpoints for Frontend
* provide REST endpoints for paper manipulation (e.g. during review process)
* provide services that will communicate with the databases and IPFS

## Building the application

Launch the Maven:

> ./mvnw package

## Run 

Compile it:

> ./mvnw package

Then run it:

> java -jar ./target/quarkus-app/quarkus-run.jar

Build it with Docker:

> docker build -t paper-lifecycle .

Run it with Docker:

> docker run -p 8080:8080 paper-lifecycle