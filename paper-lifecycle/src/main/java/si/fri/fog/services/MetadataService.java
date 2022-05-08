package si.fri.fog.services;

import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.Review;
import si.fri.fog.pojo.Stage;
import si.fri.fog.pojo.User;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.storage.gcp.FirestoreService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.sql.Date;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class MetadataService {

    @Inject
    private FirestoreService firestoreService;

    public boolean saveMetadata(MetadataDTO metadataDTO){
        Metadata metadata = contructMetadata(metadataDTO);
        firestoreService.addMetadata(metadata);
        return true;
    }

    public Metadata getMetadata(String article){
        return firestoreService.getMetadata(article);
    }

    public List<Metadata> getMetadata(User user){
        List<String> articles = firestoreService.getArticlesFromUser(user);
        return articles.stream().map(article -> firestoreService.getMetadata(article)).collect(Collectors.toList());
    }

    public void updateMetadata(MetadataDTO metadataDTO){
        Metadata metadata = getMetadata(metadataDTO.getArticle());
        if (metadataDTO.getUser() != null){
            metadata.setUser(metadataDTO.getUser());
        }
        if (metadataDTO.getRating() != null){
            metadata.setRating(metadata.getRating());
        }
        if (metadataDTO.getStage() != null){
            metadata.setStage(Stage.getStageFromName(metadataDTO.getStage()));
        }
        if (metadataDTO.getFinalDecision() != null){
            metadata.setFinalDecision(metadataDTO.getFinalDecision());
        }
        firestoreService.updateMetadata(metadataDTO.getArticle(), metadata);
    }

    public void addReview(String article, Review review){
        Metadata metadata = getMetadata(article);
        metadata.addReview(review);
        firestoreService.updateMetadata(article, metadata);
    }

    private Metadata contructMetadata(MetadataDTO metadataDTO){
        return Metadata.builder()
                .article(metadataDTO.getArticle())
                .submittedDate(Date.from(Instant.now()))
                .rating(metadataDTO.getRating())
                .stage(Stage.SUBMITTED)
                .user(metadataDTO.getUser())
                .build();
    }
}
