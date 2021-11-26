import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Movies } from "./Movies";

import { Users } from "./Users";

@Entity("cinemas")
export class Cinemas {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @OneToMany(() => Users, (user) => user.cinema, { onDelete: "CASCADE" })
  users!: Users[];

  @OneToMany(() => Movies, (movie) => movie.cinema, { onDelete: "CASCADE" })
  movies!: Movies[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
