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
        mailService.sendEmail(editor.getEmail(), "New article to be reviewed", "Article to be reviewed: " + article + "\n Please assign reviewers!");
    }
}
