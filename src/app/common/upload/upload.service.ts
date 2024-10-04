import { Injectable } from '@nestjs/common';
import { ExtendExpressMulterFile, FileTypes, formatedFiles } from './lib';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UploadService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async save(files: ExtendExpressMulterFile[], type: FileTypes, storage: string) {
    const transformFiles = files.map((file) => formatedFiles(file, type, storage));

    this.eventEmitter.emit('file.uploaded', transformFiles);
    return transformFiles;
  }
}
