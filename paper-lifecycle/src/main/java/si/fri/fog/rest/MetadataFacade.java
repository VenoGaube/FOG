package si.fri.fog.rest;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
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

    @GET
    public Response getArticles(){
        return Response.ok().entity(metadataService.getMetadata()).build();
    }

    @POST
    @Path("/new")
    @Consumes(MediaType.APPLICATION_JSON)
    @Operation(summary = "Create new article", description = "Create new metadata that is connected to the article")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully created metadata"
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Something went wrong with creating the article"
            )
    })
    public Response newArticle(MetadataDTO metadataDTO){
        String id = metadataService.saveMetadata(metadataDTO);
        if (id != null) {
            return Response.ok().entity(id).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @GET
    @Path("/{id}")
    @Operation(summary = "Retrieve article metadata", description = "Retrieve metadata that is connect to the article with given id")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully retrieved metadata"
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Something went wrong with retrieving the article metadata"
            )
    })
    public Response getMetadata(@PathParam("id") String id){
        Metadata metadata = metadataService.getMetadata(id);
        if (metadata != null) {
            return Response.ok().entity(metadata).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @Operation(summary = "Updating article", description = "Update article metadata")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully updateds metadata"
            )
    })
    @PUT
    @Path("/{id}")
    public Response updateMetadata(@PathParam("id") String id, MetadataDTO metadataDTO){
        metadataService.updateMetadata(metadataDTO.toBuilder().id(id).build());
        return Response.ok().build();
    }
}
