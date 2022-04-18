package si.fri.fog.services;

import lombok.NoArgsConstructor;
import si.fri.fog.services.gcp.GoogleCloudStorageService;
import si.fri.fog.services.ipfs.IPFSStorageService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.File;

@ApplicationScoped
public class FileService {

    private final StorageService googleCloudStorageService;
    private final StorageService ipfsStorageService;

    @Inject
    public FileService(GoogleCloudStorageService googleCloudStorageService, IPFSStorageService ipfsStorageService){
        this.googleCloudStorageService = googleCloudStorageService;
        this.ipfsStorageService = ipfsStorageService;
    }

    public File getUneleasedArticle(String name){
       return this.googleCloudStorageService.getFile(name);
    }

    public boolean saveUnreleasedArticle(String name, File file){
        return this.googleCloudStorageService.saveFile(name, file);
    }
}
