package si.fri.fog.services;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import si.fri.fog.pojo.Role;
import si.fri.fog.pojo.User;

import javax.inject.Inject;

public class AuthenticationService {

    @Inject
    @RestClient
    public IdentityManagement identityManagement;

    public boolean hasPermissions(String token, Role role){
        User user = identityManagement.getUser(token);
        return user != null && user.getRole() == role;
    }

    public User getUser(String token){
        return identityManagement.getUser(token);
    }
}
