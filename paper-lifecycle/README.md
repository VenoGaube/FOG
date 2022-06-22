# Paper lifecycle

## Selected technologies

Backend service is developed in Java using Quarkus framework. The application is dockerized and deployed on Google Cloud Platform (on a Cloud Run - Google's managed serverless platform). The service exposes different REST endpoints that can be used to communicate between different other systems.
We use different data storage solutions:
* Google Cloud Storage (file storage): for not yet released articles
* IPFS: for released articles (integrated)
* Google Firestore (NoSQL document database): metadata and other data that the service needs

## Main functionalities

The main objective of the project is to provide backend services for different processes in the Decentralized Journal project.

List of functionalities:
* provide REST endpoints for frontend
* provide REST endpoints for paper manipulation (e.g. submission, review process, acceptance, rejection, etc)
* provide services that communicate with the databases, file storage and IPFS
* provide services that will listen to Blockchain events and act accordingly (just a demo, since we did not integrate)
* notifying users that there were changes to the paper stage (submission, acceptance, rejection, ...) via email


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

If you want that IPFS also works, you need to also check how to run that project: https://github.com/VenoGaube/FOG/tree/main/ipfs

### Deployment

Microservice is available at: https://paper-lifecycle-rnxu55ua6a-uc.a.run.app

Microservice run on Cloud Run on Google Cloud platform. In order to deploy a new version,
run:

> deploy.bat

And redeploy on Google Cloud Platform.

#### Credentials

Create project on Google Cloud Platform and change variables in the project that are dependent on that: Google Cloud Storage bucket, Google Cloud Firestore collections.

In order to mail service to work you also need to create an account on SendGrid and change sender email and put SendGrid API token to environment variable.