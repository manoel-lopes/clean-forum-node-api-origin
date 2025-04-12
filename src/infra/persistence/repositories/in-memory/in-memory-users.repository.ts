import type { UsersRepository } from '@/application/repositories/users.repository'
import type { User } from '@/domain/entities/user/user.entity'
import { BaseInMemoryRepository as BaseRepository } from './base/base-in-memory.repository'

export class InMemoryUsersRepository extends BaseRepository<User> implements UsersRepository {
  async delete(userId: string): Promise<void> {
    await this.deleteOneBy('id', userId)
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = await this.findOneBy('email', email)
    return user
  }
}
