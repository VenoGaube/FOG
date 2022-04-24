package si.fri.fog.services;

import si.fri.fog.pojo.User;

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


}
