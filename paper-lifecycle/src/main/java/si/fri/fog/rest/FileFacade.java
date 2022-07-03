package si.fri.fog.rest;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.FileService;
import si.fri.fog.services.MetadataService;
import si.fri.fog.services.SubmissionService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.File;
import java.nio.file.Files;

@Slf4j
@Path("/files")
@AllArgsConstructor(onConstructor_ = @Inject)
public class FileFacade {

    @Inject
    SubmissionService submissionService;

    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Path("/submission/{id}")
    @Operation(summary = "Get submission", description = "Get unreleased article with given id")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully retrieved submission"
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Something went wrong with retrieving the submission"
            )
    })
    public Response getFile(@PathParam("id") String id){
        File file = submissionService.getUnreleasedArticle(id);
        if (file != null) {
            java.nio.file.Path path = file.toPath();
            StreamingOutput output = o -> {
                Files.copy(path, o);
                Files.deleteIfExists(path);
            };
            return Response.ok().entity(output).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @POST
    @Path("/submission/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Operation(summary = "Upload submission", description = "Upload submitted article and connect it with article with given id")
    @APIResponses({
            @APIResponse(
                    responseCode = "204",
                    description = "Successfully created submission"
            ),
            @APIResponse(
                    responseCode = "500",
                    description = "Something went wrong with saving the submission"
            )
    })
    public Response saveSubmission(@PathParam("id") String id, File file){
        boolean success = submissionService.saveUnreleasedArticle(id, file);
        if (success){
            return Response.noContent().build();
        }
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Path("/submission/released/{id}")
    @Operation(summary = "Get released article", description = "Get released article with given id")
    @APIResponses({
            @APIResponse(
                    responseCode = "200",
                    description = "Successfully retrieved released article"
            ),
            @APIResponse(
                    responseCode = "400",
                    description = "Something went wrong with retrieving the released article"
            )
    })
    public Response getReleasedFile(@PathParam("id") String id){
        File file = submissionService.getReleasedArticle(id);
        if (file != null) {
            java.nio.file.Path path = file.toPath();
            StreamingOutput output = o -> {
                Files.copy(path, o);
                Files.deleteIfExists(path);
            };
            return Response.ok().entity(output).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

}
