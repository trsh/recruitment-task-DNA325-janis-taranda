import { Column, Entity, Index, ObjectIdColumn } from 'typeorm';

@Entity()
export class IPInfoCache {
  @ObjectIdColumn()
  public id: number;

  @Index({ unique: true })
  @Column()
  public ip: string;

  @Column({ type: 'json' })
  public info: object;
}
