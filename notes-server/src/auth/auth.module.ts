// import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
//   providers: [JwtStrategy],
//   exports: [PassportModule],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        publicKey: configService.get<string>('AUTH0_PUBLIC_KEY'),
        verifyOptions: {
          algorithms: ['RS256'],
          issuer: 'https://dev-zlbc32xylykj6yh1.us.auth0.com/',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [PassportModule, JwtModule, JwtAuthGuard],
})
export class AuthModule {}
