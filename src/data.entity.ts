import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Data {
    @PrimaryColumn()
    name: string;

    @Column()
    value: string;
}