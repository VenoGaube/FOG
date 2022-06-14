package si.fri.fog.services;

import si.fri.fog.pojo.Review;
import si.fri.fog.pojo.User;
import si.fri.fog.pojo.dtos.ReviewDTO;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.sql.Date;
import java.time.Instant;
import java.util.Collections;
import java.util.List;

@ApplicationScoped
public class ReviewerService {

    @Inject
    MetadataService metadataService;

    public List<User> getReviewers(String article) {
        return Collections.emptyList();
    }

    public void addReview(String article, ReviewDTO reviewDTO){
        Review review = buildReview(reviewDTO);
        metadataService.addReview(article, review);
    }

    private Review buildReview(ReviewDTO reviewDTO){
        return Review.builder()
                .user(reviewDTO.getUser())
                .date(Date.from(Instant.now()))
                .text(reviewDTO.getText())
                .build();
    }
}
