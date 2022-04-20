package si.fri.fog.pojo.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder(toBuilder = true)
@AllArgsConstructor
public class MetadataDTO {

    String user;
    String article;
    Double rating;
    String stage;

}
