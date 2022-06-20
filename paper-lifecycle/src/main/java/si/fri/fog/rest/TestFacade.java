package si.fri.fog.rest;

import si.fri.fog.services.messaging.MailService;
import si.fri.fog.services.storage.StorageService;
import si.fri.fog.services.storage.ipfs.IPFSStorageService;
import si.fri.fog.services.web3.BlockchainEventListener;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;

@Path("/test")
public class TestFacade {

    private MailService mailService = new MailService();

    private BlockchainEventListener blockchainEventListener = new BlockchainEventListener();

    @Inject
    IPFSStorageService storageService;

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

    @GET
    @Path("/ipfs/{cid}")
    public Response getIpfs(@PathParam("cid") String cid) {
        return Response.ok().entity(storageService.getFile(cid)).build();
    }

    @POST
    @Path("/ipfs")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response saveToIpfs(File file){
        return Response.ok().entity(storageService.saveFile("", file)).build();
    }
}
