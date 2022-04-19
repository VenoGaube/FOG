package si.fri.fog.services;

import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.Stage;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.gcp.FirestoreService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.sql.Date;
import java.time.Instant;

@ApplicationScoped
public class MetadataService {

    @Inject
    private FirestoreService firestoreService;

    public boolean saveMetadata(MetadataDTO metadataDTO){
        Metadata metadata = contructMetadata(metadataDTO);
        firestoreService.addMetadata(metadata);
        return true;
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
