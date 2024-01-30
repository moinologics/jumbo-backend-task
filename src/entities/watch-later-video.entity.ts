import { Entity, Column, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity({ name: 'watch_later_videos' })
@Unique('unique_user_video', ['userId', 'videoId'])
export class WatchLaterVideo extends BaseEntity {
  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'video_id', type: 'int' })
  videoId: number;

  @ManyToOne(() => User, (user) => user.watchLaterVideos)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Video, (video) => video.watchLaterVideos)
  @JoinColumn({ name: 'video_id' })
  video: Video;
}
