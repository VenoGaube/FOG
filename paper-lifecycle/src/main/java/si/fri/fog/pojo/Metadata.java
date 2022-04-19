package si.fri.fog.pojo;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
@Builder
public class Metadata {

    String user;
    Date submittedDate;
    String article;
    Double rating;
    Stage stage;

}
