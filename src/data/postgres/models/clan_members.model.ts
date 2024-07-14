import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./types/clanMember.types";
import { Player } from "./player.model";
import { Clan } from "./clan.model";

@Entity()
export class Clan_Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("enum", {
    enum: Role,
    default: Role.MEMBER,
  })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => Player,
    (player) => {
      player.clan_member;
    }
  )
  player: Player;
  @ManyToOne(() => Clan, (clan) => clan.clan_member)
  clan: Clan;
}
