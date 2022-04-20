package si.fri.fog.pojo;

import lombok.*;

import java.util.Date;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Metadata {

    String user;
    Date submittedDate;
    String article;
    Double rating;
    Stage stage;

}
