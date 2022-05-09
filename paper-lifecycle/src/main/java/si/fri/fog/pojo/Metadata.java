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
    String user;
    Date submittedDate;
    String article;
    Double rating;
    Stage stage;
    FinalDecision finalDecision;
    List<Review> reviews = new ArrayList<>();

    public void addReview(Review review){
        reviews.add(review);
    }

    public enum FinalDecision {
        ACCEPTED,
        REJECTED;
    }
}
