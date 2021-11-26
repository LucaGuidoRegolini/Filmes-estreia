import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cinemas } from "./Cinemas";
import { Images } from "./Image";
import { Tags } from "./Tags";

@Entity("movies")
export class Movies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;


  @Column({nullable: false })
  release_date!: Date;

  @Column({nullable: false })
  maximum_date!: Date;


  @ManyToOne(() => Cinemas, (cinema) => cinema.movies, { onDelete: "CASCADE" })
  cinema!: Cinemas;

  @ManyToOne(() => Images, (images) => images.movie, { onDelete: "CASCADE", eager: true })
  images!: Images[];

  @ManyToOne(() => Tags, (tags) => tags.movie, { onDelete: "CASCADE", eager: true })
  tags!: Tags[];

  @CreateDateColumn({ select: false })
  created_at!: Date;

  @UpdateDateColumn({ select: false })
  updated_at!: Date;

}
