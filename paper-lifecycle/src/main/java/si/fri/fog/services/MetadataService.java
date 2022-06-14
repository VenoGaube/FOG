package si.fri.fog.services;

import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.Review;
import si.fri.fog.pojo.Stage;
import si.fri.fog.pojo.User;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.authorization.UserService;
import si.fri.fog.services.storage.gcp.FirestoreService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.sql.Date;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@ApplicationScoped
public class MetadataService {

    @Inject
    FirestoreService firestoreService;

    @Inject
    UserService userService;

    public String saveMetadata(MetadataDTO metadataDTO){
        metadataDTO.setId(UUID.randomUUID().toString());
        Metadata metadata = contructMetadata(metadataDTO);
        boolean success = firestoreService.addMetadata(metadata);
        if (success) {
            return metadata.getId();
        }
        return null;
    }

    public Metadata getMetadata(String id){
        return firestoreService.getMetadata(id);
    }

    public List<Metadata> getMetadata(User user){
        List<String> articles = firestoreService.getArticlesFromUser(user);
        return articles.stream().map(article -> firestoreService.getMetadata(article)).collect(Collectors.toList());
    }

    public User getUser(String id){
        String email = firestoreService.getMetadata(id).getUser();
        return userService.getUser(email);
    }

    public void updateMetadata(MetadataDTO metadataDTO){
        Metadata metadata = getMetadata(metadataDTO.getId());
        if (metadataDTO.getTitle() != null) {
            metadata.setTitle(metadataDTO.getTitle());
        }
        if (metadataDTO.getSubmission() != null) {
            metadata.setSubmission(metadataDTO.getSubmission());
        }
        if (metadataDTO.getRevision() != null) {
            metadata.setRevision(metadataDTO.getRevision());
        }
        if (metadataDTO.getUser() != null){
            metadata.setUser(metadataDTO.getUser());
        }
        if (metadataDTO.getStage() != null){
            metadata.setStage(Stage.getStageFromName(metadataDTO.getStage()));
        }
        if (metadataDTO.getFinalDecision() != null){
            metadata.setFinalDecision(metadataDTO.getFinalDecision());
        }
        firestoreService.updateMetadata(metadataDTO.getId(), metadata);
    }

    public void addReview(String article, Review review){
        Metadata metadata = getMetadata(article);
        metadata.addReview(review);
        firestoreService.updateMetadata(article, metadata);
    }

    private Metadata contructMetadata(MetadataDTO metadataDTO){
        return Metadata.builder()
                .id(metadataDTO.getId())
                .submission(metadataDTO.getSubmission())
                .revision(metadataDTO.getRevision())
                .submittedDate(Date.from(Instant.now()))
                .stage(Stage.SUBMITTED)
                .user(metadataDTO.getUser())
                .title(metadataDTO.getTitle())
                .finalDecision(metadataDTO.getFinalDecision())
                .build();
    }
}
