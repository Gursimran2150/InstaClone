import path from "path";
import multer from "multer";
import * as fs from "fs";
import { constents } from "../Constents.js";

const __dirname = path.resolve();

export const uploadFileGetLink = async (req, res) => {
  const file = req.files.file;
  const userName = req.body;
  console.log("UserName-:", userName);

  try {
    if (file != "null") {
      const fileName = Date.now() + path.extname(file.name);
      const folderName = req.body.userId;
      const destination = `uploads/${folderName}/${fileName}`;
      // const fileName = Date.now() + "_" + file.name;
      fs.mkdirSync(`uploads/${folderName}`, { recursive: true });

      if (req.body.profileImage === "profile") {
        const filesInFolder = fs.readdirSync(`uploads/${folderName}`);
        if (filesInFolder.length > 0) {
          // Clear the previous file
          filesInFolder.forEach((fileInFolder) => {
            const filePath = `uploads/${folderName}/${fileInFolder}`;
            fs.unlinkSync(filePath);
          });
        }
      }
      if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        file.mv(destination, (err) => {
          if (err) {
            console.log("err->>", err);

            return res.send(constents.RESPONES.ERROR(err, " Uploading error "));
          }
          return res.send(
            constents.RESPONES.SUCCESS(
              {
                url: `${req.protocol}://${req.get(
                  "host"
                )}/${folderName}/${fileName}`,
              },
              "Successfully Genrated a link"
            )
          );
        });
      } else if (file.mimetype == "video/mp4") {
        file.mv(`uploads/videos/${fileName}`, (err) => {
          if (err) {
            console.log("err->>", err);

            return res.send(constents.RESPONES.ERROR(err, " Uploading error "));
          }
          return res.send(
            constents.RESPONES.SUCCESS(
              { url: `${req.protocol}://${req.get("host")}/${fileName}` },
              "Successfully Genrated a link"
            )
          );
        });
      } else {
        file.mv(`uploads/files/${fileName}`, (err) => {
          if (err) {
            console.log("err->>", err);
            return res.send(constents.RESPONES.ERROR(err, " Uploading error "));
          }
          return res.send(
            constents.RESPONES.SUCCESS(
              { url: `${req.protocol}://${req.get("host")}/${fileName}` },
              "Successfully Genrated a link"
            )
          );
        });
      }
    } else {
      res.send("please select file !!!");
    }
  } catch (error) {
    res.send(error);
  }
};

export const uploadFileToLocal = async (
  payload,
  pathToUpload,
  pathOnServer
) => {
  console.log("paylodad-->", payload.files.file.name);

  let fileName = Date.now() + "_" + payload.files.file.name;
  let directoryPath = pathToUpload
    ? pathToUpload
    : path.resolve(`${__dirname}/upload`);
  // create user's directory if not present.
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(path.join(__dirname, "/upload"), true);
  }
  let fileSavePath = `${directoryPath}/${fileName}`;
  let writeStream = fs.createWriteStream(fileSavePath);
  return new Promise((resolve, reject) => {
    writeStream.write(payload.files.file.buffer);
    writeStream.on("error", function (err) {
      reject(err);
    });
    writeStream.end(function (err) {
      if (err) {
        reject(err);
      } else {
        let fileUrl = pathToUpload
          ? `${process.env.BASE_URL}/upload/${fileName}`
          : `${process.env.BASE_URL}/upload/images/${fileName}`;
        resolve(fileUrl);
      }
    });
  });
};
