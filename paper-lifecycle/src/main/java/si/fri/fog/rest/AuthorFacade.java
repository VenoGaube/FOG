package si.fri.fog.rest;

import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.rest.client.annotation.ClientHeaderParam;
import si.fri.fog.pojo.Role;
import si.fri.fog.pojo.User;
import si.fri.fog.services.AuthenticationService;
import si.fri.fog.services.MetadataService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Slf4j
@Path("/author")
public class AuthorFacade {

    @Inject
    AuthenticationService authenticationService;

    @Inject
    MetadataService metadataService;

    @GET
    @Path("/article")
    public Response getArticles(@HeaderParam("Authorization") String token){
        if (token == null) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        if (authenticationService.hasPermissions(token, Role.AUTHOR)) {
            User user = authenticationService.getUser(token);
            return Response.ok().entity(metadataService.getMetadata(user)).build();
        }
        return Response.status(Response.Status.FORBIDDEN).build();
    }
}
