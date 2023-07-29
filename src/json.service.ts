import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import { FILE_PATH } from './main';

@Injectable()
export class JsonService implements OnModuleInit {
  public async readJsonFile<T = any>(): Promise<T> {
    return await new Promise<T>((resolve, reject) => {
      try {
        fs.readFile(FILE_PATH, 'utf8', (err, data) => {
          if (err) reject(err);
          else resolve(JSON.parse(data));
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public async writeJsonFile<T>(data: T): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      fs.writeFile(FILE_PATH, JSON.stringify(data), (err) => {
        if (err) reject(err);
        else resolve('Success');
      });
    });
  }

  onModuleInit(): void {
    if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, '[]');
  }
}
