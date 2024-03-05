import { Module } from '@nestjs/common'
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { DatabaseModule } from "./database/database.module";
import { FilesModule } from './files/files.module';
import { TodoModule } from './todo/todo.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/api',
      rootPath: path.resolve(__dirname, 'static'),
    }),
    DatabaseModule,
    FilesModule,
    TodoModule,

  ]
})

export class AppModule { }
