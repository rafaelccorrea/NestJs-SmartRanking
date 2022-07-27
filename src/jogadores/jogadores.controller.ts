/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
import { CriarJogadorDto } from './dtos/criar-jogador.dto'
import { atualizarJogadorDto } from './dtos/atualizar-jogador-dto'
import { JogadoresService } from './jogadores.service'
import { Jogador } from './interfaces/jogador.interface'
import { JogadoresValidacao } from './pipes/jogadores-validacao.pipe'

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly JogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criar(@Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador>{
    return await this.JogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async atualizar(
    @Body() atualizarJogadorDto: atualizarJogadorDto,
    @Param('id', JogadoresValidacao) id: string): Promise<void>{
    await this.JogadoresService.atualizarJogador(id, atualizarJogadorDto);
  }

  @Get()
  async buscaJogadores(): Promise<Jogador[]> {
      return await this.JogadoresService.buscaJogadores()
  }

  @Get('/:id')
  async buscaJogadorId(
    @Param('id', JogadoresValidacao) id: string): Promise<Jogador> {
      return await this.JogadoresService.consultarJogadorId(id)
  }

  @Delete('/:id')
  async deletarJogadores(
    @Param('id', JogadoresValidacao) id: string,
  ): Promise<void> {
    this.JogadoresService.deletarJogador(id);
  }
}
