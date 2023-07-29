import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateRingReqDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  image_url?: string;
}
