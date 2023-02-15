import {Expose} from 'class-transformer';

export default class UploaddetailImagesResponse {
  @Expose()
  public detailImages!: string[];
}
