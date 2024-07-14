import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Clan_Member } from "./clan_members.model";

@Entity()
export class Clan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", {
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column("text", {
    nullable: false,
  })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Clan_Member, (clan_member) => clan_member.clan)
  clan_member: Clan_Member[];
}
