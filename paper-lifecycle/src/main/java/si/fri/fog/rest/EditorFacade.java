package si.fri.fog.rest;

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
    @Path("/reviwers/{article}")
    public Response saveReviewers(@PathParam("article") String article, List<String> emails) {
        editorService.addReviewers(article, emails);
        return Response.noContent().build();
    }

    @POST
    @Path("/decision/{article}")
    public Response saveDecision(@PathParam("article") String article, String decision){
        editorService.saveFinalDecision(article, decision);
        return Response.ok().build();
    }
}
