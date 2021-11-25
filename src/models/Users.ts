import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcryptjs";
import { Cinemas } from "./Cinemas";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ select: false, nullable: false })
  password!: string;

  @Column()
  role!: string;

  @ManyToOne(() => Cinemas, (cinema) => cinema.users, { onDelete: "CASCADE", eager: true })
  cinema!: Cinemas;

  @CreateDateColumn({ select: false })
  created_at!: Date;

  @UpdateDateColumn({ select: false })
  updated_at!: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hasPassword() {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  }
}
