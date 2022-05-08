import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
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
  private atualizar(jogador: Jogador, criarJogadorDto: CriarJogadorDto): void {
    const { nome } = criarJogadorDto;
    jogador.nome = nome;
  }
  async atualizarCriarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;

    const existsJogador = this.jogadores.find((res) => res.email === email);

    if (existsJogador) {
      return this.atualizar(existsJogador, criarJogadorDto);
    } else {
      this.criar(criarJogadorDto);
    }
  }

  async buscaJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async consultarJogadoresEmail(email: string): Promise<Jogador> {
    const existsJogador = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (!existsJogador) {
      throw new NotFoundException(`O email ${email} não foi encontrado!`);
    }
    return existsJogador;
  }

  async deletarJogador(email: string): Promise<void> {
    const existsJogador = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== existsJogador.email,
    );
  }
}
