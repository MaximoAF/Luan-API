import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      throw new Error('ADMIN_PASSWORD no está configurada en las variables de entorno');
    }
    if (password !== adminPassword) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const token = await this.jwtService.signAsync({ sub: 'admin', role: 'admin' });
    return { access_token: token };
  }
}
