import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';

@Entity('users')
export class UserExtended {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  rank: string; // 军衔

  @Column({ nullable: true })
  department: string; // 部门

  @Column({ nullable: true })
  position: string; // 职位

  @Column({ nullable: true })
  phone: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ nullable: true })
  lastLoginIp: string;

  @Column({ default: 0 })
  loginCount: number;

  @Column({ type: 'json', nullable: true })
  preferences: Record<string, any>;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 计算属性
  get displayName(): string {
    return this.fullName || this.username;
  }

  get roleNames(): string[] {
    return this.roles?.map(role => role.name) || [];
  }

  hasRole(roleName: string): boolean {
    return this.roles?.some(role => role.name === roleName) || false;
  }

  hasPermission(permission: string): boolean {
    return this.roles?.some(role => 
      role.permissions?.some(p => p === permission)
    ) || false;
  }
}
