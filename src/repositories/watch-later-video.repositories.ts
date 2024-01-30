import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchLaterVideo } from '../entities';

export class WatchLaterVideoRepository {
  constructor(
    @InjectRepository(WatchLaterVideo)
    private watchLatervideoRepository: Repository<WatchLaterVideo>,
  ) {}

  addVideoToUserWatchList(userId: number, videoId: number) {
    return this.watchLatervideoRepository.insert({
      userId,
      videoId,
    });
  }

  deleteVideoFromUserWatchLaterList(userId: number, videoId: number) {
    return this.watchLatervideoRepository.delete({ userId, videoId });
  }

  getWatchLaterVideosByUserId(userId: number) {
    return this.watchLatervideoRepository.find({
      // select: ['watchLaterVideos'], //{ password: false, watchLaterVideos: false },
      where: { userId },
      relations: ['video'],
    });
  }
}
