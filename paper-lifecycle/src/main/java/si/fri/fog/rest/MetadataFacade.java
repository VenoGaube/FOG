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
    @Path("/new")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response newArticle(MetadataDTO metadataDTO){
        String id = metadataService.saveMetadata(metadataDTO);
        if (id != null) {
            return Response.ok().entity(id).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @GET
    @Path("/{id}")
    public Response getMetadata(@PathParam("id") String id){
        Metadata metadata = metadataService.getMetadata(id);
        if (metadata != null) {
            return Response.ok().entity(metadata).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @PUT
    @Path("/{id}")
    public Response updateStage(@PathParam("id") String id, MetadataDTO metadataDTO){
        metadataService.updateMetadata(metadataDTO.toBuilder().id(id).build());
        return Response.ok().build();
    }
}
