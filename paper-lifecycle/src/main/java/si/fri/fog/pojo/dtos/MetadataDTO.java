package si.fri.fog.pojo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import si.fri.fog.pojo.Metadata;

@Data
@NoArgsConstructor
@Builder(toBuilder = true)
@AllArgsConstructor
public class MetadataDTO {

    String id;
    String cid;
    String user;
    String title;
    String submission;
    String revision;
    String stage;

    public static MetadataDTO toMetadataDTO(Metadata metadata) {
        return MetadataDTO.builder()
                .id(metadata.getId())
                .cid(metadata.getCid())
                .title(metadata.getTitle())
                .user(metadata.getUser())
                .submission(metadata.getSubmission())
                .revision(metadata.getRevision())
                .stage(metadata.getStage().name())
                .build();
    }
}
