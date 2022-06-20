package si.fri.fog.services;

import lombok.extern.slf4j.Slf4j;
import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.Stage;
import si.fri.fog.pojo.User;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.messaging.MessageService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.File;
import java.util.Collections;
import java.util.List;

@Slf4j
@ApplicationScoped
public class EditorService {

    @Inject
    MetadataService metadataService;

    @Inject
    MessageService messageService;

    @Inject
    FileService fileService;

    public void addReviewers(String article, List<String> reviewers){
        //TODO: Blockchain logic - using smart contract
    }

    public void saveFinalDecision(String id, String decision){
        Metadata metadata = metadataService.getMetadata(id);
        Stage finalDecision;
        String cid = null;
        if (decision.equals("accepted")) {
            finalDecision = Stage.ACCEPTED;
            File file = fileService.getUnreleasedArticle(metadata.getSubmission());
            cid = fileService.saveReleasedArticle(file);
        } else {
            finalDecision = Stage.REJECTED;
        }
        MetadataDTO metadataDTO = MetadataDTO.builder()
                .id(id)
                .cid(cid)
                .stage(finalDecision.toString())
                .build();
        metadataService.updateMetadata(metadataDTO);
        //messageService.notifyAuthor(metadata.getTitle(), metadataService.getUser(metadata.getTitle()), finalDecision);
    }
}
