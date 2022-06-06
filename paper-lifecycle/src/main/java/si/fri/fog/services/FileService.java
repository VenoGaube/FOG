package si.fri.fog.services;

import com.google.common.hash.HashCode;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hasher;
import com.google.common.hash.Hashing;
import com.google.common.io.Files;
import si.fri.fog.services.storage.gcp.GoogleCloudStorageService;
import si.fri.fog.services.storage.ipfs.IPFSStorageService;
import si.fri.fog.services.storage.StorageService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.File;
import java.io.IOException;

@ApplicationScoped
public class FileService {

    private final StorageService googleCloudStorageService;
    private final StorageService ipfsStorageService;

    private static final HashFunction HASH_FUNCTION = Hashing.sha256();

    @Inject
    public FileService(GoogleCloudStorageService googleCloudStorageService, IPFSStorageService ipfsStorageService){
        this.googleCloudStorageService = googleCloudStorageService;
        this.ipfsStorageService = ipfsStorageService;
    }

    public File getUnreleasedArticle(String name){
        return this.googleCloudStorageService.getFile(name);
    }

    public String saveUnreleasedArticle(File file){
        String fileName = hashFileName(file);
        boolean success = this.googleCloudStorageService.saveFile(fileName, file);
        if (success) {
            return fileName;
        }
        return null;
    }

    public static String hashFileName(File file) {
        try {
            return Files.hash(file, HASH_FUNCTION).toString();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
