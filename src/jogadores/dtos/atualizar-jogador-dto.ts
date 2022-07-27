/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
export class atualizarJogadorDto {
  @IsNotEmpty()
  readonly telefoneCelular: string;

  @IsNotEmpty()
  readonly nome: string;
}
