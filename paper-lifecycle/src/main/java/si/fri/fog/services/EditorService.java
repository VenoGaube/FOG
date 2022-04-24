package si.fri.fog.services;

import si.fri.fog.pojo.User;

import javax.enterprise.context.ApplicationScoped;
import java.util.Collections;
import java.util.List;

@ApplicationScoped
public class EditorService {

    public void addReviewers(String article, List<String> reviewers){

    }

    public List<User> getReviewers(String article) {
        return Collections.emptyList();
    }
}
