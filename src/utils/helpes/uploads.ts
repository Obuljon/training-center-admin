import * as path from 'path';
import * as crypto from 'crypto';
import { GridFsStorage } from 'multer-gridfs-storage';
import { config } from 'dotenv';
import { GridFSBucket } from 'mongodb';
import { Request, Express } from 'express';
const { extname } = path;

config();

const uri: string = process.env.MOGODB_URI;

export var storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + extname(file.originalname);
        req.body[file.fieldname] = filename;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});



export function checkFileType(
  req: Request,
  file: Express.Multer.File,
  cb: CallableFunction,
) {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = path.extname(file.originalname).toLocaleLowerCase();
  const extname = fileTypes.test(extName);
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}
