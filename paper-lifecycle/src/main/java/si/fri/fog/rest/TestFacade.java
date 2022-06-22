package si.fri.fog.rest;

import si.fri.fog.services.web3.BlockchainEventListener;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.IOException;

@Path("/test")
public class TestFacade {

    private BlockchainEventListener blockchainEventListener = new BlockchainEventListener();

    @GET
    @Path("/events")
    public Response getEvents() throws IOException {
        blockchainEventListener.checkEvents();
        return Response.ok().build();
    }
}
