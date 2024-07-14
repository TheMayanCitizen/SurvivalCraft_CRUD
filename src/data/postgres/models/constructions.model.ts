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

@Entity()
export class Construction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.construction)
  player: Player;

  @Column("varchar", {
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  type: string;

  @Column({
    type: "int",
    nullable: false,
  })
  level: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
