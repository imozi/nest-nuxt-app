import { Injectable } from '@nestjs/common';
import { ExtendExpressMulterFile, FileTypes, formatedFiles } from './lib';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UploadService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async save(files: ExtendExpressMulterFile[], type: FileTypes, storage: string) {
    const transformFiles = files.map((file) => formatedFiles(file, type, storage));

    return new Promise((res, rej) => {
      this.eventEmitter.emit('file.uploaded', transformFiles);
      this.eventEmitter.on('file.error', (error) => {
        rej(error);
      });
      this.eventEmitter.on('file.finish', (files) => {
        res(files);
      });
    });
  }
}
