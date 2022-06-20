package si.fri.fog.rest;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import si.fri.fog.pojo.Metadata;
import si.fri.fog.pojo.dtos.MetadataDTO;
import si.fri.fog.services.FileService;
import si.fri.fog.services.MetadataService;

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

    private final FileService fileService;
    private final MetadataService metadataService;

    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Path("/submission/{id}")
    public Response getFile(@PathParam("id") String id){
        Metadata metadata = metadataService.getMetadata(id);
        File file = fileService.getUnreleasedArticle(metadata.getSubmission());
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
    public Response saveSubmission(@PathParam("id") String id, File file){
        String name = fileService.saveUnreleasedArticle(file);
        if (name != null){
            MetadataDTO metadataDTO = MetadataDTO.toMetadataDTO(metadataService.getMetadata(id));
            metadataDTO.setSubmission(name);
            metadataService.updateMetadata(metadataDTO);
            return Response.noContent().build();
        }
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Path("/submission/released/{id}")
    public Response getReleasedFile(@PathParam("id") String id){
        Metadata metadata = metadataService.getMetadata(id);
        File file = fileService.getReleasedArticle(metadata.getCid());
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

    @Deprecated
    @POST
    @Path("/revision/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response saveRevision(@PathParam("id") String id, File file){
        String name = fileService.saveUnreleasedArticle(file);
        if (name != null){
            MetadataDTO metadataDTO = MetadataDTO.toMetadataDTO(metadataService.getMetadata(id));
            metadataDTO.setRevision(name);
            metadataService.updateMetadata(metadataDTO);
            return Response.noContent().build();
        }
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}
