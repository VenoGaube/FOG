package si.fri.fog.rest;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import si.fri.fog.pojo.Review;
import si.fri.fog.pojo.dtos.ReviewDTO;
import si.fri.fog.services.ReviewerService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/review")
public class ReviewerFacade {

    @Inject
    ReviewerService reviewerService;
    @GET
    @Path("/{id}")
    @Operation(summary = "Retrieve reviewers", description = "Retrieve a list of reviewers for article with id")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully retrieved reviewers"
            )
    })
    public Response getReviewers(@PathParam("id") String id) {
        List<Review> reviews = reviewerService.getReviews(id);
        return Response.ok().entity(reviews).build();
    }


    @POST
    @Path("/{id}")
    @Operation(summary = "Create new review", description = "Create new review for given article with id")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully created metadata"
            )
    })
    public Response submitReview(@PathParam("id") String id, ReviewDTO review) {
        reviewerService.addReview(id, review);
        return Response.ok().build();
    }
}
