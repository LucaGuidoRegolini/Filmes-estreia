import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cinemas } from "./Cinemas";
import { Images } from "./Image";

@Entity("movies")
export class Movies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({nullable: false })
  about!: string;

  @Column({nullable: false })
  release_date!: Date;

  @Column({nullable: false })
  maximum_date!: Date;

  @Column({default: true })
  blocked!: boolean;

  @ManyToOne(() => Cinemas, (cinema) => cinema.movies, { onDelete: "CASCADE" })
  cinema!: Cinemas;

  @OneToMany(() => Images, (images) => images.movie, { onDelete: "CASCADE", eager: true })
  images!: Images[];

  @CreateDateColumn({ select: false })
  created_at!: Date;

  @UpdateDateColumn({ select: false })
  updated_at!: Date;

}
