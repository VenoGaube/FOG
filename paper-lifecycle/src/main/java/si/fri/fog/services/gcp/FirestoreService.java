package si.fri.fog.services.gcp;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import lombok.extern.slf4j.Slf4j;
import si.fri.fog.pojo.Metadata;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Slf4j
public class FirestoreService {

    private static final String PROJECT_ID = "serene-craft-346112";

    private static final String METADATA_COLLECTION = "metadata";

    private Firestore firestore;

    @PostConstruct
    public void init() {
        FirestoreOptions firestoreOptions =
                FirestoreOptions.getDefaultInstance().toBuilder()
                        .setProjectId(PROJECT_ID)
                        .build();
        firestore = firestoreOptions.getService();
    }

    public void addMetadata(Metadata metadata){
        ApiFuture<WriteResult> result = firestore.collection(METADATA_COLLECTION).document().set(metadata);
        try {
            log.info("Added metadata {} at time {}", metadata, result.get().getUpdateTime());
        } catch (ExecutionException | InterruptedException e) {
            log.error("Error while saving new metadata to Firestore");
            throw new RuntimeException(e);
        }
    }

    public void updateMetadata(String article, Metadata metadata){
        String documentId = getDocumentIdFromArticle(article);
        Map<String, Object> data = new HashMap<>();
        data.put("user", metadata.getUser());
        data.put("submittedDate", metadata.getSubmittedDate());
        data.put("article", article);
        data.put("rating", metadata.getRating());
        data.put("stage", metadata.getStage());

        firestore.collection(METADATA_COLLECTION).document(documentId).update(data);
    }

    private String getDocumentIdFromArticle(String article) {
        var metadatas = firestore.collection(METADATA_COLLECTION);
        Query query = metadatas.whereEqualTo("article", article);

        try {
            var documents = query.get().get().getDocuments();
            if (documents.size() != 1){
                throw new RuntimeException("For given query for article " + article +  " there is more than just one document");
            }
            return documents.get(0).getId();

        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
    }
}
