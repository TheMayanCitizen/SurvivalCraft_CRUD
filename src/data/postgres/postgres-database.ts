import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Player } from "./models/player.model";
import { Clan } from "./models/clan.model";
import { Clan_Member } from "./models/clan_members.model";
import { Construction } from "./models/constructions.model";
import { Inventory } from "./models/inventory.model";
import { Item } from "./models/item.model";
import { Quest } from "./models/quest.models";
import { Quest_Player } from "./models/quest_players.model";
import { Resource } from "./models/resource.model";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  private datasource: DataSource;

  constructor(options: Options) {
    this.datasource = new DataSource({
      type: "postgres",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      entities: [
        User,
        Player,
        Clan,
        Clan_Member,
        Construction,
        Inventory,
        Item,
        Quest,
        Quest_Player,
        Resource,
      ],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async connect() {
    try {
      await this.datasource.initialize();
      console.log("Connected to database 😃");
    } catch (error) {
      console.log(error);
    }
  }
}
