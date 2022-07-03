package si.fri.fog.rest;

import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.ExampleObject;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.Role;
import si.fri.fog.pojo.User;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.authorization.AuthenticationService;
import si.fri.fog.services.MetadataService;
import si.fri.fog.services.authorization.UserService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Slf4j
@Path("/author")
public class AuthorFacade {

    @Inject
    UserService userService;

    @Inject
    MetadataService metadataService;

    @GET
    @Path("/{email}/article/")
    @Operation(summary = "Get user's articles", description = "Get all articles from given user")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully retrieved articles",
                    content = @Content(
                            schema = @Schema(implementation = Metadata[].class)
                    )
            )
    })
    public Response getArticles(@Parameter(description = "The email for", required = true) @PathParam("email") String email) {
        User user = userService.getUser(email);
        return Response.ok().entity(metadataService.getMetadata(user)).build();
    }

}
