package si.fri.fog.rest;

import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.MetadataService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/metadata")
public class MetadataFacade {

    private final MetadataService metadataService;

    @Inject
    public MetadataFacade(MetadataService metadataService){
        this.metadataService = metadataService;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveMetadata(MetadataDTO metadataDTO){
        boolean saved = metadataService.saveMetadata(metadataDTO);
        if (saved) {
            return Response.ok().build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @GET
    @Path("/{article}")
    public Response getMetadata(@PathParam("article") String article){
        Metadata metadata = metadataService.getMetadata(article);
        if (metadata != null) {
            return Response.ok().entity(metadata).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @PUT
    @Path("/{article}")
    public Response updateStage(@PathParam("article") String article, MetadataDTO metadataDTO){
        metadataService.updateMetadata(metadataDTO.toBuilder().article(article).build());
        return Response.ok().build();
    }
}
