package si.fri.fog.services;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import lombok.extern.slf4j.Slf4j;

import javax.enterprise.context.ApplicationScoped;
import java.io.IOException;

@Slf4j
@ApplicationScoped
public class MailService {

    private static final String API_KEY = "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";
    private static final String SENDER_MAIL = "fog-computing@protonmail.com";
    private final SendGrid sendGrid = new SendGrid(API_KEY);

    public void sendEmail(String receiverEmail, String subject, String contentBody) {
        Email from = new Email(SENDER_MAIL);
        Email to = new Email(receiverEmail);
        Content content = new Content("text/plain", contentBody);
        Mail mail = new Mail(from, subject, to, content);

        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            log.info("Response: {}, {}, {}", response.getStatusCode(), response.getBody(), response.getHeaders());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
