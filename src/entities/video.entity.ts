import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { WatchLaterVideo } from './watch-later-video.entity';

@Entity({ name: 'videos' })
@Unique('unique_youtube_video', ['youtubeId'])
export class Video extends BaseEntity {
  @Column({ name: 'youtube_id', type: 'char', length: 15 })
  youtubeId: string;

  @Column({ name: 'title', type: 'text' })
  title: string;

  @Column({ name: 'video_url', type: 'varchar' })
  videoUrl: string;

  @Column({ name: 'thumbnail_url', type: 'text' })
  thumbnailUrl: string;

  @Column({ name: 'channel_url', type: 'text' })
  channelUrl: string;

  @Column({ name: 'published_at', type: 'timestamptz' })
  publishedAt: Date;

  @OneToMany(
    () => WatchLaterVideo,
    (watchLaterVideo) => watchLaterVideo.video,
    { cascade: true },
  )
  watchLaterVideos: WatchLaterVideo[];
}
