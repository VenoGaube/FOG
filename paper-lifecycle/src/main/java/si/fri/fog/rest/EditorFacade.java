package si.fri.fog.rest;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.User;
import si.fri.fog.services.EditorService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/admin")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class EditorFacade {

    private final EditorService editorService;

    @Inject
    public EditorFacade(EditorService editorService){
        this.editorService = editorService;
    }

    @POST
    @Path("/reviewers/{article}")
    @Operation(summary = "Set reviewers for article", description = "Set reviewers for article with given ID")
    @APIResponses({
            @APIResponse(
                    responseCode = "204",
                    description = "Successfully added reviewers"
            )
    })
    public Response saveReviewers(@PathParam("article") String article) {
        editorService.addReviewers(article);
        return Response.noContent().build();
    }

    @POST
    @Path("/decision/{id}")
    @Operation(summary = "Set decision for article", description = "Set final decisions (accept, reject, etc.) for article")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully set decision"
            )
    })
    public Response saveDecision(@PathParam("id") String id, @QueryParam("decision") String decision){
        editorService.saveFinalDecision(id, decision);
        return Response.ok().build();
    }
}
