package si.fri.fog.services.ipfs;

import si.fri.fog.services.StorageService;

import javax.enterprise.context.ApplicationScoped;
import java.io.File;

@ApplicationScoped
public class IPFSStorageService implements StorageService {

    @Override
    public boolean saveFile(String name, File file) {
        return false;
    }

    @Override
    public File getFile(String name) {
        return null;
    }
}
