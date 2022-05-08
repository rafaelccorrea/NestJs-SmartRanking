import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly JogadoresService: JogadoresService) {}

  @Post()
  async atualizarCriarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.JogadoresService.atualizarCriarJogador(criarJogadorDto);
  }

  @Get()
  async buscaJogadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.JogadoresService.consultarJogadoresEmail(email);
    } else {
      return await this.JogadoresService.buscaJogadores();
    }
  }
}
