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


## Deployment

Microservice is available at: https://paper-lifecycle-rnxu55ua6a-uc.a.run.app

Microservice run on Cloud Run on Google Cloud platform. In order to deploy a new version,
run:

> deploy.bat

And redeploy on Google Cloud Platform.

Continuous deployment will be set up if really needed, because we have a shared repository and are problems with credentials. Moreover, there will probably be not a lot of deployments.