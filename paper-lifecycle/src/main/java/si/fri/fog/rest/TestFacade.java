package si.fri.fog.rest;

import si.fri.fog.services.messaging.MailService;
import si.fri.fog.services.web3.BlockchainEventListener;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.io.IOException;

@Path("/test")
public class TestFacade {

    private MailService mailService = new MailService();

    private BlockchainEventListener blockchainEventListener = new BlockchainEventListener();

    @GET
    public Response getTest(){
        mailService.sendEmail("magerl.zan@gmail.com", "Test", "Lets hope it works");
        return Response.ok().build();
    }

    @GET
    @Path("/events")
    public Response getEvents() throws IOException {
        blockchainEventListener.checkEvents();
        return Response.ok().build();
    }
}
