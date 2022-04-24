package si.fri.fog.rest;

import si.fri.fog.pojo.User;
import si.fri.fog.services.ReviewerService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.util.List;

public class ReviewerFacade {

    @Inject
    ReviewerService reviewerService;

    @GET
    @Path("/reviewers/{article}")
    public Response getReviewers(@PathParam("article") String article) {
        List<User> reviewers = reviewerService.getReviewers(article);
        return Response.ok().entity(reviewers).build();
    }
}
