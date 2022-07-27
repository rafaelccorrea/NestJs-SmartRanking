/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule }from '@nestjs/mongoose'
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.mongodb, 
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
    ),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
