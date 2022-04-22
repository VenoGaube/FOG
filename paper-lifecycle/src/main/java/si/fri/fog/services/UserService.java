package si.fri.fog.services;

import si.fri.fog.pojo.Role;
import si.fri.fog.pojo.User;

import javax.enterprise.context.ApplicationScoped;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@ApplicationScoped
public class UserService {

    //TODO: Need information from identity management
    public List<User> getUsers(){
        return Collections.emptyList();
    }

    public List<User> getEditors(){
        return this.getUsers().stream().filter(user -> user.getRole() == Role.EDITOR).collect(Collectors.toList());
    }

    public User getRandomEditor(){
        List<User> editors = getEditors();
        return editors.get(new Random().nextInt(editors.size()));
    }
}
