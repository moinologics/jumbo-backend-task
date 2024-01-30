import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('fetchNewVideos')
  fetchNewVideos() {
    return this.videoService.saveTrandingVideos();
  }

  @Get('search')
  async searchVideoByTitle(@Query('query') query: string) {
    const videos = await this.videoService.searchVideoByTitle(query);
    return videos;
  }

  @Get()
  getVideos(@Query() { limit, skip }: { limit: number; skip: number }) {
    if (isNaN(skip) || isNaN(limit)) {
      throw new HttpException(
        'skip & limit can be number only',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.videoService.getVideos(limit, skip);
  }

  @UseGuards(AuthGuard)
  @Get('WatchLater')
  getUserWatchLaterList(@Req() req) {
    const userId = req.user.id;
    return this.videoService.getUserWatchLaterList(userId);
  }

  @Get(':id')
  async getVideoById(@Param('id') id: number) {
    const video = await this.videoService.getVideoById(id);
    if (!video) {
      throw new HttpException('video not found', HttpStatus.NOT_FOUND);
    }
    return video;
  }

  @UseGuards(AuthGuard)
  @Post(':id/WatchLater')
  async createWatchLater(@Req() req, @Param('id') videoId: number) {
    const userId = req.user.id;
    await this.videoService.createWatchLater(userId, videoId);
    return { message: 'video added to watch later' };
  }

  @UseGuards(AuthGuard)
  @Delete(':id/WatchLater')
  async deleteVideoFromUserWatchLaterList(
    @Req() req,
    @Param('id') videoId: number,
  ) {
    const userId = req.user.id;
    await this.videoService.deleteVideoFromUserWatchLaterList(userId, videoId);
    return { message: 'video removed from watch later' };
  }
}
