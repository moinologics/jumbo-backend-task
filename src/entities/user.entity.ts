import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { WatchLaterVideo } from './watch-later-video.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Unique('unique_email', ['email'])
  @Column({ type: 'char', length: 30 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @OneToMany(() => WatchLaterVideo, (watchLaterVideo) => watchLaterVideo.user, {
    cascade: true,
  })
  watchLaterVideos: WatchLaterVideo[];
}
