import { DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

dotenv.config();

export const connectionOptions: MongoConnectionOptions = {
  type: 'mongodb',
  url: process.env['MONGO_DB_CONNECTION_URL'],
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: true, // NOTE: this is dangrous, in development only
};

const AppDataSource = new DataSource(connectionOptions);

export default AppDataSource;
