import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Player } from "./player.model";
import { Clan } from "./clan.model";
import { ClanMemberRole } from "./types/clanMember.types";

@Entity()
export class Clan_Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("enum", {
    enum: ClanMemberRole,
    default: ClanMemberRole.MEMBER,
  })
  role: ClanMemberRole;

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
