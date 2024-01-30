import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository, ILike } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Video } from '../entities';

export class VideoRepository {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  getVideos(limit?: number, skip?: number) {
    const findManyOptions: FindManyOptions<Video> = {};

    if (limit) {
      findManyOptions.take = limit;
    }

    if (skip) {
      findManyOptions.skip = skip;
    }

    return this.videoRepository.find(findManyOptions);
  }

  findVideoById(id: number) {
    return this.videoRepository.findOneBy({ id });
  }

  async saveVideos(videos: QueryDeepPartialEntity<Video>[]): Promise<void> {
    await this.videoRepository.upsert(videos, {
      skipUpdateIfNoValuesChanged: true,
      conflictPaths: ['youtubeId'],
    });
  }

  searchVideoByTitle(query: string) {
    return this.videoRepository.findBy({
      title: ILike(`%${query}%`),
    });
  }
}
