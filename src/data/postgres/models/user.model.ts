import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Player } from "./player.model";
import { bcryptAdapter } from "../../../config";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  password: string;

  @BeforeInsert()
  encryptPassword() {
    this.password = bcryptAdapter.hash(this.password);
  }

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Player, (player) => player.user)
  players: Player[];
}
