package si.fri.fog.rest;

import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.MetadataService;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/metadata")
public class MetadataFacade {

    private final MetadataService metadataService;

    @Inject
    public MetadataFacade(MetadataService metadataService){
        this.metadataService = metadataService;
    }

    @POST
    public Response saveMetadata(MetadataDTO metadataDTO){
        boolean saved = metadataService.saveMetadata(metadataDTO);
        if (saved) {
            return Response.ok().build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }
}
