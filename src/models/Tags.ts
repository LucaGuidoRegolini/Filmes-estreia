import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import {Movies} from './Movies'

@Entity('tags')
export class Tags {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => Movies, (movies) => movies.tags)
    movie!: Movies;

}