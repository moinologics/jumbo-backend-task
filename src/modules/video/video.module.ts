import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User, Video, WatchLaterVideo } from '../../entities';
import {
  UserRepository,
  VideoRepository,
  WatchLaterVideoRepository,
} from '../../repositories';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, User, WatchLaterVideo]),
    JwtModule,
  ],
  controllers: [VideoController],
  providers: [
    VideoService,
    VideoRepository,
    UserRepository,
    WatchLaterVideoRepository,
  ],
})
export class VideoModule {}
