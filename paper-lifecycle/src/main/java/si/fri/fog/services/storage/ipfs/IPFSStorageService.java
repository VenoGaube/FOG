package si.fri.fog.services.storage.ipfs;

import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import si.fri.fog.services.storage.StorageService;
import si.fri.fog.services.storage.ipfs.client.IpfsClient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.File;

@Slf4j
@ApplicationScoped
public class IPFSStorageService implements StorageService {

    @Inject
    @RestClient
    IpfsClient ipfsClient;

    @Override
    public String saveFile(String name, File file) {
        return ipfsClient.saveFile(file).getCid();
    }

    @Override
    public File getFile(String name) {
        return ipfsClient.getFile(name);
    }
}
