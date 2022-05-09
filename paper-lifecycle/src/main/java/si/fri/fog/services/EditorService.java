package si.fri.fog.services;

import lombok.extern.slf4j.Slf4j;
import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.User;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.messaging.MessageService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.Collections;
import java.util.List;

@Slf4j
@ApplicationScoped
public class EditorService {

    @Inject
    MetadataService metadataService;

    @Inject
    MessageService messageService;

    public void addReviewers(String article, List<String> reviewers){
        //TODO: Blockchain logic - using smart contract
    }

    public void saveFinalDecision(String article, String decision){
        Metadata.FinalDecision finalDecision;
        if (decision.equals("accepted")) {
            finalDecision = Metadata.FinalDecision.ACCEPTED;
        } else {
            finalDecision = Metadata.FinalDecision.REJECTED;
        }
        MetadataDTO metadataDTO = MetadataDTO.builder()
                .article(article)
                .finalDecision(finalDecision)
                .build();
        metadataService.updateMetadata(metadataDTO);
        messageService.notifyAuthor(article, metadataService.getUser(article), finalDecision);
    }
}
