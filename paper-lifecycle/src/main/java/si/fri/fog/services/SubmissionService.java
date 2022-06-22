package si.fri.fog.services;

import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.messaging.MessageService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.io.File;

@ApplicationScoped
public class SubmissionService {

    @Inject
    FileService fileService;

    @Inject
    MetadataService metadataService;

    @Inject
    MessageService messageService;


    public boolean saveUnreleasedArticle(String id, File file){
        String name = fileService.saveUnreleasedArticle(file);
        if (name != null){
            MetadataDTO metadataDTO = MetadataDTO.toMetadataDTO(metadataService.getMetadata(id));
            metadataDTO.setSubmission(name);
            metadataService.updateMetadata(metadataDTO);
            messageService.notifyEditor(metadataDTO.getTitle());
            messageService.notifyAuthorSubmission(metadataDTO.getUser(), metadataDTO.getTitle());
            return true;
        }
        return false;
    }

    public File getUnreleasedArticle(String id) {
        Metadata metadata = metadataService.getMetadata(id);
        return fileService.getUnreleasedArticle(metadata.getSubmission());
    }

    public File getReleasedArticle(String id){
        Metadata metadata = metadataService.getMetadata(id);
        return fileService.getReleasedArticle(metadata.getCid());
    }

}
