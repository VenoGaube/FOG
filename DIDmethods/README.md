# DID Methods
Student: Gregor Novak

### Used technologies
For DID registry, which will be needed for defining DID methods within this topic, 
use of smart contracts for saving paper data etc. is planned. These smart contracts are part of other topics within our decentralized journal,
but we can get all the necessary data from them and because of this, we can avoid duplicating code for similar purposes within our project.
DID documents are planned to be represented with JSON, while API and other parts of DID method drivers are planned to be implemented with Python and its simple framework Flask.
DID resolver UI will be implemented with HTML, CSS and JavaScript with the help of jQuery only, to keep implementation as simple as possible,
since the whole implementation is planned to be deployed with Docker container.

### Main objectives
Because the need for other DID methods and DIDs for our project, that would be covered in this topic, did not arise,
implementation of DID method for papers and potentially paper reviews is planned. With this method, users will be able to prove their paper authorship
and/or reviewership of specific papers.
Specifically, this topic will cover:
- defining how smart contracts of our project can be used as DID registry for our DID method,
- defining how data, stored on blockchain/IPFS/our knowledge base can be used to generate DID documents,
- implementation of DID driver and API for resolving DIDs and fetching their data,
- implementation of DID resolver, which will combine DID driver and API with frontend UI for resolving
    (retrieving data) of our DIDs for papers, and potentially reviews.

Paper DIDs will have the following structure (paper being the name of DID method):
- `did:paper:[paper-id]`

If DIDs for reviews will also be used, method is planned to be called `journal` (after our project) and DIDs will have the following structure:
- `did:journal:paper:[paper-id]`
- `did:journal:review:[review-id]`


### Progress so far
Work on DID resolver has started and first version of the UI already exists. Some API endpoints have been defined,
but because, our project is not yet functional since we need to integrate different parts of the whole decentralized journal, these endpoints don't yet return actual DID data.
<br>
Currently, further work is on hold. It will be continued, when at least some integration is successfully achieved
so that we can better understand how the data, needed for DID documents is being stored and used.   

## Running the DID resolver implementation
For running the code, Python is required.
<br>
To install Python requirements, navigate to `DIDmethods/did_resolver` directory and run:
```
pip install -r requirements.txt
```

You can run DID resolver app from your IDE or you can use the following command from the `DIDmethods/did_resolver` directory in the terminal:
```
python app.py
```

App UI will be available on `http://127.0.0.1:5000`.

### Running with Docker
You can also run DID resolver app in Docker container.
First, build Docker image. Make sure you are located in `DIDmethods/did_resolver` directory and run:
```
docker image build -t did_resolver .
```
This will build Docker image called `did_resolver`.

To run the latest version of the image, use following command.
```
docker run -p 5000:5000 did_resolver:latest 
```

App can now be used in the same manner as if run without Docker container.