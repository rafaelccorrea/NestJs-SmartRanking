/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { atualizarJogadorDto } from './dtos/atualizar-jogador-dto';
import { Jogador } from './interfaces/jogador.interface';
import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class JogadoresService {

  constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) {}
  
  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const existsJogador = await this.jogadorModel.findOne({email}).exec();

    if (existsJogador) {
      throw new BadRequestException(`Este email ${email} já está cadastrado!`)
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto)
    return await jogadorCriado.save()
  }

  async atualizarJogador(id: string, atualizarJogadorDto: atualizarJogadorDto): Promise<void> {

    const existsJogador = await this.jogadorModel.findOne({id}).exec();

    if (existsJogador) {
      throw new NotFoundException(`Este Jogador não foi encontrado!`)
    }

    await this.jogadorModel.findOneAndUpdate({id}, {$set: atualizarJogadorDto}).exec()
  }

  async buscaJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorId(id: string): Promise<Jogador> {
    const existsJogador = await this.jogadorModel.findOne({id}).exec();

    if (!existsJogador) {
      throw new NotFoundException(`O jogador com o id ${id} não foi encontrado!`);
    }
    return existsJogador;
  }

  async deletarJogador(id: string): Promise<any> {
    const existsJogador = await this.jogadorModel.findOne({id}).exec();

    if (!existsJogador) {
      throw new NotFoundException(`O jogador com o id ${id} não foi encontrado!`);
    }
    return await this.jogadorModel.deleteOne({id}).exec()
  }
}
