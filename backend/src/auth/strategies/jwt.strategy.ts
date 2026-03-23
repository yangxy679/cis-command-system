import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    // 验证用户是否存在且状态正常
    const user = await this.authService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    // 检查用户状态
    if (user.status !== 'active') {
      throw new UnauthorizedException('账户已被禁用，请联系管理员');
    }

    // 返回的用户信息会被附加到请求对象上
    return {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      fullName: user.fullName,
      departmentId: user.departmentId,
      position: user.position,
    };
  }
}