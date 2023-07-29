import { IsString, IsUrl } from 'class-validator';

export class CreateRingReqDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsUrl()
  image_url: string;
}
