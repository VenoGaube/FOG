package si.fri.fog.rest;

import si.fri.fog.services.MailService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/test")
public class TestFacade {

    private MailService mailService = new MailService();

    @GET
    public Response getTest(){
        mailService.sendEmail("magerl.zan@gmail.com", "Test", "Lets hope it works");
        return Response.ok().build();
    }
}
