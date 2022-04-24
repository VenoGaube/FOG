package si.fri.fog.services.authorization;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import si.fri.fog.pojo.User;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

@ApplicationScoped
@RegisterRestClient(baseUri = "to-do")
public interface IdentityManagement {

    @Path("/{token}")
    User getUser(@PathParam("token") String token);

}
