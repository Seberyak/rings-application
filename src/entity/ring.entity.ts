import { v4 } from 'uuid';

export class RingEntity {
  id: string = v4();

  constructor(
    public title: string,
    public description: string,
    public image_url: string,
  ) {}
}
