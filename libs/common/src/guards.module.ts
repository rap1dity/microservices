import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from "common/common/guards/roles.guard"; // путь к твоему гварду

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'DEV',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [JwtAuthGuard, RolesGuard],
  exports: [JwtAuthGuard, JwtModule, RolesGuard],
})
export class GuardsModule {}
