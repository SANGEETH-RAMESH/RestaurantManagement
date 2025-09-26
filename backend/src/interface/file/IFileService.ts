export interface IFileService {
    uploadFile(fileBuffer: Buffer): Promise<string>;
}