import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { User } from './user.entity';

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
  priority: number; // 优先级，数字越小优先级越高

  @ManyToMany(() => User, user => user.roles)
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
