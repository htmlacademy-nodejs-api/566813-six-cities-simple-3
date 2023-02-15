import {Expose} from 'class-transformer';

export default class UploadDetailImageResponse {
  @Expose()
  public detailImage!: string[];
}
