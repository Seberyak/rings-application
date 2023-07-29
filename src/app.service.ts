import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRingReqDto } from './dto/create-ring-req.dto';
import { RingEntity } from './entity/ring.entity';
import { JsonService } from './json.service';

@Injectable()
export class AppService {
  constructor(private readonly json: JsonService) {}
  async create(args: CreateRingReqDto): Promise<RingEntity> {
    const entity = new RingEntity(args.title, args.description, args.image_url);

    const data = await this.getAll();
    data.push(entity);

    await this.json.writeJsonFile(data);
    return entity;
  }

  async get(id: string): Promise<RingEntity> {
    const all = await this.getAll();
    const res = all.find((item) => item.id === id);
    if (!res) throw new NotFoundException();
    return res;
  }

  async update(id: string, args: Partial<RingEntity>): Promise<RingEntity> {
    const all = await this.getAll();
    const index = all.findIndex((item) => item.id === id);

    if (index === -1) throw new NotFoundException();
    all[index] = { ...all[index], ...args };

    await this.json.writeJsonFile(all);
    return all[index];
  }

  async getAll(): Promise<RingEntity[]> {
    return this.json.readJsonFile<RingEntity[]>();
  }

  async delete(id: string): Promise<void> {
    const all = await this.getAll();

    const index = all.findIndex((item) => item.id === id);
    if (index === -1) return;

    const updatedList = all.filter((item) => item.id !== id);
    await this.json.writeJsonFile(updatedList);
  }
}
