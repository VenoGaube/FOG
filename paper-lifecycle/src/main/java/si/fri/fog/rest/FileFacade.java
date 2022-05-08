package si.fri.fog.rest;

import lombok.extern.slf4j.Slf4j;
import si.fri.fog.services.FileService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.File;
import java.nio.file.Files;

@Slf4j
@Path("/files")
public class FileFacade {

    private final FileService fileService;

    @Inject
    public FileFacade(FileService fileService){
        this.fileService = fileService;
    }

    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    @Path("/{name}")
    public Response getFile(@PathParam("name") String name){
        File file = fileService.getUnreleasedArticle(name);
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
    @Path("/{name}")
    public Response saveFile(@PathParam("name") String name, File file){
        boolean saved = fileService.saveUnreleasedArticle(name, file);
        if (saved){
            return Response.noContent().build();
        }
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }
}
