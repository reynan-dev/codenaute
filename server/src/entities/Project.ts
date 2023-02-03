import { Field , ObjectType } from 'type-graphql';
import { Column, DeleteDateColumn, Entity, ManyToMany, ManyToOne, OneToOne } from 'typeorm';
import { IsBoolean, IsDate, IsString } from 'class-validator';

import BaseEntity from 'entities/base/BaseEntity';
import Language from 'entities/Language';
import File from 'entities/File';
import SandpackTemplate from 'entities/SandpackTemplate';
import Member from 'entities/Member';

@Entity()
@ObjectType()
export default class Project extends BaseEntity {
    @Column()
    @Field()
    @IsString()
    name: string;

    @Column()
    @Field()
    @ManyToMany(() => Member, {eager: true})
    members: Member[];

    @Column()
    @Field()
    @ManyToOne(() => Language, {eager: true})
    language: Language;

    @Column({nullable: true})
    @Field()
    @ManyToOne(() => SandpackTemplate, {eager: true})
    template: SandpackTemplate;

    @Column({nullable: true})
    @Field()
    @OneToOne(() => File, {eager: true})
    activeFile: File;

	@Column('boolean', { default: false })
    @Field()
    @IsBoolean()
    isTemplate: boolean;

	@Column('boolean', { default: false })
    @Field()
    @IsBoolean()
    isPublic: boolean;

    @DeleteDateColumn()
	@IsDate()
	deletedAt: Date;
}
