import stream from "stream";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYFILEPATH = path.join(__dirname, "../../googleKey.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

export const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1bp6VedipwKZ6AOB2PePgZWKgNDyuMlcC"],
    },
    fields: "id",
  });
  return { id: data.id, url: `https://drive.google.com/uc?export=view&id=${data.id}` };;
};

export const deleteFile = async (fileId) => {
    const response = await google.drive({ version: "v3", auth }).files.delete(
        { fileId: fileId });
    console.log(response.status);
}
