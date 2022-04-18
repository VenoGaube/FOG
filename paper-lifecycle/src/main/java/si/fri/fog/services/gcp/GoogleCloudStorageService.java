package si.fri.fog.services.gcp;

import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.extern.slf4j.Slf4j;
import si.fri.fog.services.StorageService;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Slf4j
@ApplicationScoped
public class GoogleCloudStorageService implements StorageService {

    private static final String PROJECT_ID = "serene-craft-346112";
    private final String BUCKET_NAME = "journal-articles-bucket";

    private Storage storage;

    @PostConstruct
    public void init(){
        this.storage = StorageOptions.getDefaultInstance().toBuilder().setProjectId(PROJECT_ID).build().getService();
    }

    @Override
    public boolean saveFile(String name, File file){
        BlobId blobId = BlobId.of(BUCKET_NAME, name);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        try {
            this.storage.create(blobInfo, Files.readAllBytes(file.toPath()));
            return true;
        } catch (IOException e) {
            log.error("Error while uploading file: ", e);
            return false;
        }
    }

    @Override
    public File getFile(String name){
        BlobId blobId = BlobId.of(BUCKET_NAME, name);
        File tempFile = new File("tempFile.pdf");
        this.storage.get(blobId).downloadTo(tempFile.toPath());
        return tempFile;
    }
}
