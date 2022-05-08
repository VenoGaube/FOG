package si.fri.fog.pojo;

import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {

    private String text;
    private Date date;
    private String user;
}
