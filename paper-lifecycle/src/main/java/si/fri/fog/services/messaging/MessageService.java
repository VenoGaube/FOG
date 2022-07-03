package si.fri.fog.services.messaging;

import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.Stage;
import si.fri.fog.pojo.User;
import si.fri.fog.services.authorization.UserService;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class MessageService {

    private final UserService userService;
    private final MailService mailService;

    @Inject
    public MessageService(UserService userService, MailService mailService){
        this.userService = userService;
        this.mailService = mailService;
    }

    public void notifyEditor(String article){
        User editor = userService.getRandomEditor();
        mailService.sendEmail(editor.getEmail(), "New article was submitted", "Article to be reviewed: " + article + "\n Please assign reviewers!");
    }

    public void notifyReviewer(String article, User reviewer){
        mailService.sendEmail(reviewer.getEmail(), "New article to be reviewed", "Please review the following article: " + article);
    }

    public void notifyAuthor(String article, User author, Stage decision){
        mailService.sendEmail(author.getEmail(), "Status of your article: " + article, "Your article was: " + decision.name());
    }

    public void notifyAuthorSubmission(String email, String article) {
        mailService.sendEmail(email, "Article submission", "Your article: " + article + " was successfully submitted!");
    }

}
