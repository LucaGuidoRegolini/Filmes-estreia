import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import {Movies} from './Movies'

@Entity('images')
export class Images {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    path!: string;

    @ManyToOne(() => Movies, (movies) => movies.images)
    movie!: Movies[];

}