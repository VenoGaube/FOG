package si.fri.fog.services;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import si.fri.fog.pojo.User;

import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@RegisterRestClient(baseUri = "to-do")
public interface IdentityManagement {

    @Path("/{token}")
    User getUser(@PathParam("token") String token);

}
