import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { youtube } from '@googleapis/youtube';
import {
  UserRepository,
  VideoRepository,
  WatchLaterVideoRepository,
} from '../../repositories';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VideoService {
  constructor(
    private readonly configService: ConfigService,
    private readonly videoRepository: VideoRepository,
    private readonly watchLaterRepository: WatchLaterVideoRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async fetchTrandingVideoFromYoutube() {
    const videos = [];
    const yt = youtube({
      version: 'v3',
      auth: this.configService.get('YOUTUBE_API_KEY'),
    });
    const result = await yt.videos.list({
      maxResults: 200,
      part: ['snippet'],
      chart: 'mostPopular',
      regionCode: 'IN',
    });
    for (const video of result.data.items) {
      const v = {
        youtubeId: video.id,
        title: video.snippet.title,
        // description: video.snippet.description,
        publishedAt: new Date(video.snippet.publishedAt),
        thumbnailUrl: video.snippet.thumbnails.default.url,
        videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
        channelUrl: `https://www.youtube.com/channel/${video.snippet.channelId}`,
      };
      videos.push(v);
    }
    return videos;
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async saveTrandingVideos() {
    const videos = await this.fetchTrandingVideoFromYoutube();
    await this.videoRepository.saveVideos(videos);
    Logger.log(`new videos added`);
  }

  async createWatchLater(userId: number, videoId: number) {
    const video = await this.videoRepository.findVideoById(videoId);
    if (!video) {
      throw new HttpException('Video Not Found', HttpStatus.NOT_FOUND);
    }
    try {
      return await this.watchLaterRepository.addVideoToUserWatchList(userId, videoId);
    } catch (error) {
      let message = 'something went wrong';
      let code = HttpStatus.INTERNAL_SERVER_ERROR;
      if(error.driverError) {
        if(error.constraint === 'unique_user_video') {
          message = 'video already added';
          code = HttpStatus.BAD_REQUEST;
        }
      }
      throw new HttpException(message, code);
    }
  }

  deleteVideoFromUserWatchLaterList(userId: number, videoId: number) {
    return this.watchLaterRepository.deleteVideoFromUserWatchLaterList(
      userId,
      videoId,
    );
  }

  getUserWatchLaterList(userId: number) {
    return this.watchLaterRepository.getWatchLaterVideosByUserId(userId);
  }

  getVideos(limit?: number, skip?: number) {
    return this.videoRepository.getVideos(limit, skip);
  }

  getVideoById(id: number) {
    return this.videoRepository.findVideoById(id);
  }

  searchVideoByTitle(query: string) {
    return this.videoRepository.searchVideoByTitle(query);
  }
}
