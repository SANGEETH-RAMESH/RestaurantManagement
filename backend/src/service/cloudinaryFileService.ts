import { IFileService } from "../interface/file/IFileService"; 
import uploadImage from "../cloudinary/cloudinary";

export class CloudinaryFileService implements IFileService {
    async uploadFile(fileBuffer: Buffer): Promise<string> {
        return await uploadImage(fileBuffer);
    }
}