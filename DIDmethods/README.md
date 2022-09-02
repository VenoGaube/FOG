# DID Methods
Student: Gregor Novak

### Used technologies
- Solidity: Smart contract for DID registry
- Flask & Python: Backend for DID registry and DID resolver
- JavaScript, jQuery, HTML, CSS: Frontend for DID resolver and demonstration UI
- Ganache & Truffle: For simulating Ethereum network and deploying smart contract
- Docker: Using DID registry and DID resolver with Docker containers

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


### Final result
DID method, called "paper" was implemented, which handles the DIDs associated with papers.
Papers are DID subjects and its authors are DID controllers.
With DID method author can edit paper's basic data as well as delete it.
Along with DID method, DID resolver for method was also implemented. With DID resolver, we can retrieve DID document for specific DID.


## Running the code
For running the code, Python is required.
<br>
To install Python requirements, navigate to `DIDmethods` directory and run:
```
pip install -r requirements.txt
```

### Ganache workspace  and smart contract deployment
To create Ethereum network for development purposes, you can use Ganache and Truffle. Install both to your computer and create new Ganache workspace.
Once you have created new Ganache workspace, you can add it to MetaMask in your browser. Then you can import addresses from workspace to use them as wallets.
Note that first wallet in the workspace will be used for smart contract deployment.

Now you can deploy a smart contract for DID registry. Navigate to `DIDmethods/method_registry` and run the following command:
```
truffle migrate
```

This will migrate the smart contract in the `method_registry` project and deploy it.

### DID registry backend
DID registry backend needs to be running if we want for demonstration UI and DID resolver to work correctly,
since they both use its endpoints to get/post data. 

You can run DID registry backend by navigating to `DIDmethods/method_registry` directory and run the following in the terminal:
```
python app.py
```

You can also run DID resolver app in Docker container.
First, build Docker image. Make sure you are located in `DIDmethods/method_registry` directory and run:
```
docker image build -t method_registry .
```
This will build Docker image called `method_registry`.

Because for demonstration purposes, papers are saved directly to the disk, mounting the directory with papers is needed when running the Docker image.
You must specify the absolute path to the papers directory in the host, to mount it to the papers directory in the Docker container.
Specifying local directory as absolute path is different from OS to OS and according to which terminal you are using.
If you are using Windows, this can be done in the PowerShell, with the following command (from the `DIDmethods/method_registry` folder):
```
docker run -p 5002:5002 -v ${pwd}/res/papers:/app/res/papers method_registry:latest 
```

### DID resolver
Using DID resolver is similar to DID registry backend.

You can navigate to  `DIDmethods/did_resolver` directory and run:
```
python app.py
```

DID resolver UI will be available at `http://127.0.0.1:5000`.

Or you can use it with Docker. Make sure you are located in `DIDmethods/did_resolver` directory and run:
```
docker image build -t did_resolver .
```
This will build Docker image called `did_resolver`.

Now you can run image with the command:
```
docker run -p 5000:5000 did_resolver:latest 
```

DID resolver app can now be used in the same manner as if run without Docker container.

### Demonstration UI
Demonstration UI doesn't use Docker. You can therefore only run it with python. Navigate to `DIDmethods/UI` and run:

```
python ui_app.py
```

UI will be available at `http://127.0.0.1`.

