// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { passportJwtSecret } from 'jwks-rsa';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(configService: ConfigService) {
//     super({
//       secretOrKeyProvider: passportJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: `https://${configService.get<string>('AUTH0_DOMAIN')}/.well-known/jwks.json`,
//       }),
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       audience: configService.get<string>('AUTH0_AUDIENCE'),
//       issuer: `https://${configService.get<string>('AUTH0_DOMAIN')}/`,
//       algorithms: ['RS256'],
//     });
//   }

//   validate(payload: any) {
//     return payload;
//   }
// }
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

// Define la estructura del payload JWT
interface JwtPayload {
  sub: string;
  email: string;
  iss: string;
  aud: string;
  iat: number;
  exp: number;
  // Añade aquí otros campos que esperas en tu payload
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${configService.get<string>('AUTH0_DOMAIN')}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get<string>('AUTH0_AUDIENCE'),
      issuer: `https://${configService.get<string>('AUTH0_DOMAIN')}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    // Aquí puedes añadir lógica adicional de validación si es necesario
    // Por ejemplo, verificar si el usuario existe en tu base de datos
    return payload;
  }
}
