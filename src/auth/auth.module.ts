import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma.service';
import * as fs from 'fs';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: fs.readFileSync('./private_key.pem'),
      publicKey: fs.readFileSync('./public_key.pem'),
      signOptions: { expiresIn: '24h', algorithm: 'RS256' },
    }),
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
