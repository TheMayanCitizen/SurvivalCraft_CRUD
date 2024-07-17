import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.model";
import { Construction } from "./constructions.model";
import { Quest_Player } from "./quest_players.model";
import { Clan_Member } from "./clan_members.model";
import { Inventory } from "./inventory.model";

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: "int",
    nullable: false,
    default: 1,
  })
  level: number;

  @Column({
    type: "float",
    nullable: false,
    default: 0,
  })
  experience: number;

  @Column({
    type: "float",
    nullable: false,
    default: 80,
  })
  health: number;

  @Column({
    type: "float",
    nullable: false,
    default: 100,
  })
  energy: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.players)
  user: User;

  @OneToMany(() => Construction, (construction) => construction.player)
  construction: Construction[];

  @OneToMany(() => Quest_Player, (quest_player) => quest_player.player)
  quest_players: Quest_Player[];

  @OneToMany(() => Clan_Member, (clan_member) => clan_member.player)
  clan_member: Clan_Member[];

  @OneToOne(() => Inventory, (inventory) => inventory.player)
  inventory: Inventory;
}

// import { BaseEntity, CreateDateColumn, Entity,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// @Entity()
// export class Player extends BaseEntity{
//   @PrimaryGeneratedColumn()
//   id: number;

//   @OneToMany(() => Purchase, (purchase) => purchase.user)
//   purchases: Purchase[];

//   @ManyToOne(() => Videogame, (videogame) => videogame.purchases)
//   videogame: Videogame;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;

// }
