import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Todo } from './todo/todo.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbUrl = `postgresql://${configService.get<string>('DB_USERNAME')}:${configService.get<string>('DB_PASSWORD')}@dpg-crl4ejrtq21c73e7qdrg-a.ohio-postgres.render.com:${configService.get<number>('DB_PORT')}/${configService.get<string>('DB_DATABASE')}`;
        return {
          type: 'postgres',
          url: dbUrl,
          entities: [Todo, User],
          synchronize: true,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
      inject: [ConfigService],
    }),

    TodoModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}