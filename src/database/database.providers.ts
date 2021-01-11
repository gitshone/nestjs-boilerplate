import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {

      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'postgres',
        port: parseInt(process.env.DB_PORT, 10) ?? 5435,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
      });

      sequelize.addModels([User]);
      await sequelize.sync({alter: true});
      return sequelize;
    },
  },
];