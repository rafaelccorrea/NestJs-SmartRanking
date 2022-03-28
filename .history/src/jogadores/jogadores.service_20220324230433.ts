import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async atualizarCriarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {

    const { email } = criarJogadorDto

    const existsJogador = await this.jogadores.find(res => res.email === email)

    if(existsJogador){
      return this.atualizar()
    }else{
      this.criar(criarJogadorDto);
    }

  }

  async buscaJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  private atualizar(jogador: Jogador, criarJogadorDto: CriarJogadorDto): void {
    const { nome } = criarJogadorDto;
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };
    // Console.log =>  this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}}`);

    this.jogadores.push(jogador);
  }
}
