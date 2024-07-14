import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Item } from "./item.model";
import { Resource } from "./resource.model";
import { Player } from "./player.model";

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", {
    nullable: false,
  })
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Player, (player) => player.inventory)
  player: Player;

  @ManyToOne(() => Item, (item) => item.inventory)
  item: Item;

  @ManyToOne(() => Resource, (resource) => resource.inventory)
  resource: Resource;
}
