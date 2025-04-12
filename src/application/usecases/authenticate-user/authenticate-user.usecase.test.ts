import type { UsersRepository } from '@/application/repositories/users.repository'
import {
  InMemoryUsersRepository,
} from '@/infra/persistence/repositories/in-memory/in-memory-users.repository'
import { makeUser } from '@/util/factories/domain/make-user'
import { AuthenticateUserUseCase } from './authenticate-user.usecase'

type Sut = {
  sut: AuthenticateUserUseCase
  usersRepository: UsersRepository
}

const fakePasswordHasher = {
  hash: async (password: string) => password,
  compare: async (password: string, hashedPassword: string) =>
    password === hashedPassword,
}

function makeSut (): Sut {
  const usersRepository = new InMemoryUsersRepository()
  const sut = new AuthenticateUserUseCase(usersRepository, fakePasswordHasher)
  return { sut, usersRepository }
}

describe('AuthenticateUserUseCase', () => {
  const request = {
    email: 'any_email',
    password: 'any_password',
  }

  it('should not authenticate a inexistent user', async () => {
    const { sut } = makeSut()

    await expect(sut.execute(request)).rejects.toThrow('User not found')
  })

  it('should not authenticate a user passing the wrong password', async () => {
    const { sut, usersRepository } = makeSut()

    const user = makeUser()
    await usersRepository.save({
      ...user,
      password: await fakePasswordHasher.hash('right_password'),
    })

    await expect(sut.execute({
      email: user.email,
      password: 'wrong_password',
    })).rejects.toThrow('Invalid password')
  })

  it('should authenticate the user', async () => {
    const { sut, usersRepository } = makeSut()

    const user = makeUser()
    await usersRepository.save({
      ...user,
      email: request.email,
      password: await fakePasswordHasher.hash(request.password),
    })

    const response = await sut.execute(request)

    expect(response.id).toBeDefined()
    expect(response.name).toBe(user.name)
    expect(response.email).toBe(request.email)
  })
})
