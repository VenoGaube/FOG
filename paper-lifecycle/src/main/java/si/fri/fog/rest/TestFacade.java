package si.fri.fog.rest;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import si.fri.fog.services.web3.BlockchainEventListener;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.io.IOException;

@Path("/test")
public class TestFacade {

    private BlockchainEventListener blockchainEventListener = new BlockchainEventListener();

    @GET
    @Path("/events")
    @Operation(summary = "Test connection to blockchain", description = "Test connection to blockchain")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully connected to blockchain"
            )
    })
    public Response getEvents() throws IOException {
        blockchainEventListener.checkEvents();
        return Response.ok().build();
    }
}
