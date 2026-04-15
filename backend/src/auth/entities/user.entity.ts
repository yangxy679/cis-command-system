import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../../roles/entities/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ default: 0 })
  loginCount: number;

  @ManyToMany(() => Role, role => role.users, { eager: true })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 检查用户是否有特定角色
  hasRole(roleName: string): boolean {
    return this.roles?.some(role => role.name === roleName) || false;
  }

  // 检查用户是否有特定权限
  hasPermission(permission: string): boolean {
    return this.roles?.some(role => role.hasPermission(permission)) || false;
  }

  // 获取用户所有权限
  getAllPermissions(): string[] {
    if (!this.roles) return [];
    return this.roles.flatMap(role => role.permissions || []);
  }
}
