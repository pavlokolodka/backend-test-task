import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/entity/users.entity';
import { Role } from './roles/entity/roles.entity';
import { UserRoles } from './roles/entity/user-roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({ envFilePath: '.env' }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Role, UserRoles],
    synchronize: true,
}),
  UsersModule,
  RolesModule,
  AuthModule
],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
