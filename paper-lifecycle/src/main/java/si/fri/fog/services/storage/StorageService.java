package si.fri.fog.services.storage;

import java.io.File;

public interface StorageService {

    /**
     * Saves file to storage
     * @param name Name of the file
     * @param file File to be saved
     * @return true if saving is successful, otherwise it returns false
     */
    Object saveFile(String name, File file);

    /**
     * It returns file from storage
     * @param name Name of the fetched file
     * @return Requested file
     */
    File getFile(String name);
}
