import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Quest_Player } from "./quest_players.model";

@Entity()
export class Quest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
  })
  name: string;

  @Column({
    type: "text",
    nullable: false,
  })
  description: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  reward: string;

  @Column("float", {
    nullable: false,
  })
  exp: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Quest_Player, (quest_player) => quest_player.quest)
  questsPlayer: Quest_Player[];
}
