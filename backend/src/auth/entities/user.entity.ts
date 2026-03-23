import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin', // 总指挥
  ADMIN = 'admin', // 管理员
  INSTRUCTOR = 'instructor', // 指导员
  DEPARTMENT_MANAGER = 'department_manager', // 部门经理
  TEAM_LEADER = 'team_leader', // 团队负责人
  MEMBER = 'member', // 普通成员
  GUEST = 'guest', // 访客
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  @Index()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  departmentId: string;

  @Column({ nullable: true })
  position: string;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @Column({ nullable: true })
  lastLoginIp: string;

  @Column({ default: 0 })
  loginCount: number;

  @Column({ nullable: true })
  emailVerifiedAt: Date;

  @Column({ nullable: true })
  phoneVerifiedAt: Date;

  @Column({ type: 'json', nullable: true })
  preferences: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      // 只有在密码被修改时才重新哈希
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // 辅助方法
  isActive(): boolean {
    return this.status === UserStatus.ACTIVE;
  }

  isSuperAdmin(): boolean {
    return this.role === UserRole.SUPER_ADMIN;
  }

  isAdmin(): boolean {
    return [UserRole.SUPER_ADMIN, UserRole.ADMIN].includes(this.role);
  }

  isInstructor(): boolean {
    return this.role === UserRole.INSTRUCTOR;
  }

  isManager(): boolean {
    return [
      UserRole.SUPER_ADMIN,
      UserRole.ADMIN,
      UserRole.DEPARTMENT_MANAGER,
      UserRole.TEAM_LEADER,
    ].includes(this.role);
  }

  canManageUser(targetUser: User): boolean {
    // 超级管理员可以管理所有用户
    if (this.isSuperAdmin()) return true;

    // 管理员可以管理非管理员用户
    if (this.isAdmin() && !targetUser.isAdmin()) return true;

    // 部门经理可以管理同部门非经理用户
    if (
      this.role === UserRole.DEPARTMENT_MANAGER &&
      this.departmentId === targetUser.departmentId &&
      !targetUser.isManager()
    ) {
      return true;
    }

    // 团队负责人可以管理同团队普通成员
    if (
      this.role === UserRole.TEAM_LEADER &&
      this.departmentId === targetUser.departmentId &&
      targetUser.role === UserRole.MEMBER
    ) {
      return true;
    }

    return false;
  }

  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}