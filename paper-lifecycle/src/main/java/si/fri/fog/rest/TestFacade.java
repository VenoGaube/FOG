package si.fri.fog.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/test")
public class TestFacade {

    @GET
    public Response getTest() {
        return Response.ok().entity("Test").build();
    }
}
