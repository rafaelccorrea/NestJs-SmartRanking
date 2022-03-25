import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/Jogador';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly JogadoresService: JogadoresService) {}

  @Post()
  async atualizarCriarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.JogadoresService.atualizarCriarJogador(criarJogadorDto);
  }

  @Get()
  async buscaJogadores(): Promise<Jogador[]> {
    return await this.JogadoresService.buscaJogadores();
  }
}
