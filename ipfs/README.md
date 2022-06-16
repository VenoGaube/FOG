# IPFS service
Service for uploading and consuming publication on IPFS network.

### Setup IPFS Service Localy
1. Get official IPFS image `docker pull ipfs/go-ipfs`.
2. In `./ipfs` create `app.env` file.
```
SERVER_ADDRESS=0.0.0.0:8000
GIN_MODE=debug
IPFS_ADDRESS=http://localhost:5001
```
3. Run `docker-compose up`.
4. Send request on base url `http://localhost:8000`.
5. Fix volumes in docker-compose.yaml


### IPFS in Docker container
Run docker container with command bellow:
```bash
docker run -d --name ipfs_host -v {staging_dir}:/export -v {data_dir}:/data/ipfs -p 4001:4001 -p 4001:4001/udp -p 127.0.0.1:8080:8080 -p 127.0.0.1:5001:5001 ipfs/go-ipfs:latest
```
Example `staging_dir` could be something like `D:/Dokumenti/Documents/Faks/FC/ipfs/staging`. Same goes for `data_dir`.
