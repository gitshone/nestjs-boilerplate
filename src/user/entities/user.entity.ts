import { Table, Column, Model, PrimaryKey, DataType, Unique, Default, HasMany } from 'sequelize-typescript';

@Table({timestamps: true, underscored: true})
export class User extends Model<User> {

    @PrimaryKey
    @Default(DataType.UUIDV1)
    @Column
    id: string;

    @Unique
    @Column
    username: string;

    @Unique
    @Column
    email: string;

    @Column
    password: string;

    @Column
    avatarUrl: string;

    @Column
    isVerified: boolean;
}