import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'simple-array', nullable: true })
  permissions: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isSystem: boolean;

  @Column({ nullable: true })
  priority: number;

  @ManyToMany(() => User, user => user.roles)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 检查是否包含特定权限
  hasPermission(permission: string): boolean {
    return this.permissions?.includes(permission) || false;
  }

  // 添加权限
  addPermission(permission: string): void {
    if (!this.permissions) {
      this.permissions = [];
    }
    if (!this.hasPermission(permission)) {
      this.permissions.push(permission);
    }
  }

  // 移除权限
  removePermission(permission: string): void {
    if (this.permissions) {
      this.permissions = this.permissions.filter(p => p !== permission);
    }
  }
}
