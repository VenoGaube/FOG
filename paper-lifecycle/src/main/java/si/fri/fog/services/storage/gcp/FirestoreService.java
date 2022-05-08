package si.fri.fog.services.storage.gcp;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import lombok.extern.slf4j.Slf4j;
import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.User;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Slf4j
@ApplicationScoped
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

    public Metadata getMetadata(String article){
        String documentId = getDocumentIdFromArticle(article);
        try {
            return firestore.collection(METADATA_COLLECTION).document(documentId).get().get().toObject(Metadata.class);
        } catch (InterruptedException | ExecutionException e) {
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
        data.put("reviews", metadata.getReviews());

        firestore.collection(METADATA_COLLECTION).document(documentId).update(data);
    }

    public List<String> getArticlesFromUser(User user){
        var metadatas = firestore.collection(METADATA_COLLECTION);
        Query query = metadatas.whereEqualTo("user", user.getEmail());

        try {
            return query.get().get().getDocuments().stream().map(e -> (String)e.get("article")).collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException(e);
        }
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
