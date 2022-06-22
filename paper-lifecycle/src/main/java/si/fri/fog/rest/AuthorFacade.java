package si.fri.fog.rest;

import lombok.extern.slf4j.Slf4j;
import si.fri.fog.pojo.Role;
import si.fri.fog.pojo.User;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.authorization.AuthenticationService;
import si.fri.fog.services.MetadataService;
import si.fri.fog.services.authorization.UserService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Slf4j
@Path("/author")
public class AuthorFacade {

    @Inject
    UserService userService;

    @Inject
    MetadataService metadataService;

    @GET
    @Path("/{email}/article/")
    public Response getArticles(@PathParam("email") String email){
        User user = userService.getUser(email);
        return Response.ok().entity(metadataService.getMetadata(user)).build();
    }

}
