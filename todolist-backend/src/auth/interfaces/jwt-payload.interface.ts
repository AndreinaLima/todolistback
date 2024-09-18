export interface JwtPayload {
  sub: number; // ID do usuário, ajuste o tipo conforme necessário
  username: string; // Nome de usuário ou outro identificador
}