# Paper lifecycle

## Selected technologies

Backend service will be developed in Java using Quarkus framework. The application will be dockerized and deployed on Google Cloud Platform (on a Cloud Run - Google's managed serverless platform). The service will expose different REST endpoints that will be used to communicate between different other systems.
We will also need different data storage solutions:
* Google Cloud Storage (file storage): for not yet accepted articles
* IPFS: released articles
* Google Firestore (NoSQL document database): metadata and other data

## Main objectives/requirements

The main objective of the project is to provide backend services for different processes in the Decentralized Journal project.

List of functionalities:
* provide REST endpoints for frontend
* provide REST endpoints for paper manipulation (e.g. submission, review process)
* provide services that will communicate with the databases and IPFS
* provide services that will listen to Blockchain events and act accordingly

## Tasks togethter with rationale

Tasks:
* Creation of the basic standalone application that can be easily packed, containerized and deployed
* Exposing REST endpoints for submission of paper that will be triggered through frontend
* Implementation of service that will forward authorization tokens (DID) to Identity management service and retrieve needed user information (role, email, etc.)
* Implementation of notification service that will send emails when articles are submitted, reviewed, accepted etc.
* Creation of service that will listend for blockchain triggered events and act accordingly
* Implementation of services that will take care for storing and retriving data from different data storage sources
* Some basic CRUD services for basic system entities

## Building the application

Launch the Maven:

> ./mvnw package

### Run 

Compile it:

> ./mvnw package

Then run it:

> java -jar ./target/quarkus-app/quarkus-run.jar

Build it with Docker:

> docker build -t paper-lifecycle .

Run it with Docker:

> docker run -p 8080:8080 paper-lifecycle


### Deployment

Microservice is available at: https://paper-lifecycle-rnxu55ua6a-uc.a.run.app

Microservice run on Cloud Run on Google Cloud platform. In order to deploy a new version,
run:

> deploy.bat

And redeploy on Google Cloud Platform.

Continuous deployment will be set up if really needed, because we have a shared repository and are problems with credentials. Moreover, there will probably be not a lot of deployments.
