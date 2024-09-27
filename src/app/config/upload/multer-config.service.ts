import { ConflictException, Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { editFileName, isExistFile } from './lib';
import { EnvironmentService } from '../environment';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly environments: EnvironmentService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const dir = join(process.cwd(), this.environments.get('STORAGE_PATH'), file.fieldname);

          callback(null, dir);
        },
        filename: (req, file, callback) => {
          const { originalname, repl } = editFileName(file);

          file.originalname = originalname;

          return callback(null, repl);
        },
      }),
      fileFilter: async (req, file, callback) => {
        const { repl } = editFileName(file as Express.Multer.File);
        const filePath = join(process.cwd(), this.environments.get('STORAGE_PATH'), file.fieldname, repl);

        const isExist = await isExistFile(filePath);

        if (isExist) {
          return callback(new ConflictException(`Файл ${file.originalname} уже существует`), false);
        }

        callback(null, true);
      },
    };
  }
}
