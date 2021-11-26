import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cinemas } from "./Cinemas";
import { Images } from "./Image";

@Entity("movies")
export class Movies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ default: "" })
  about!: string;

  @Column({ nullable: false })
  release_date!: Date;

  @Column({ nullable: false })
  maximum_date!: Date;

  @Column({ default: true })
  blocked!: boolean;

  @ManyToOne(() => Cinemas, (cinema) => cinema.movies)
  cinema!: Cinemas;

  @OneToMany(() => Images, (images) => images.movie, { eager: true })
  images!: Images[];

  @CreateDateColumn({ select: false })
  created_at!: Date;

  @UpdateDateColumn({ select: false })
  updated_at!: Date;
}
