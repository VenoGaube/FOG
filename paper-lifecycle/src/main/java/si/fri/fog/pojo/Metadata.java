package si.fri.fog.pojo;

import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Metadata {

    /**
     * We will save only email in user since identity management is handled elsewhere
     */
    String id;
    String user;
    Date submittedDate;
    String submission;
    String title;
    Stage stage;
    FinalDecision finalDecision;
    String revision;
    List<Review> reviews = new ArrayList<>();

    public void addReview(Review review){
        reviews.add(review);
    }

    public enum FinalDecision {
        ACCEPTED,
        REJECTED;
    }
}
