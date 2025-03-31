import type { User } from '@/domain/entities/user/user.entity'

export type UsersRepository = {
  save: (user: User) => Promise<void>
  findById(userId: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
