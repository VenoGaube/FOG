package si.fri.fog.services.storage.ipfs.client;

import lombok.Data;
import lombok.Value;
import org.eclipse.microprofile.rest.client.annotation.ClientHeaderParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import si.fri.fog.pojo.integrations.IpfsResponse;

import javax.ws.rs.*;
import java.io.File;

@RegisterRestClient(baseUri = "http://localhost:8000/v1/file")
public interface IpfsClient {

    @GET
    @Path("/{cid}")
    File getFile(@PathParam("cid") String cid);

    @POST
    @ClientHeaderParam(name = "Content-Type", value = "application/octet-stream")
    IpfsResponse saveFile(File file);

}
