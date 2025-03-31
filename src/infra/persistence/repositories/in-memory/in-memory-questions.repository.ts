import type { QuestionsRepository } from '@/application/repositories/questions.repository'
import { Question } from '@/domain/entities/question/question.entity'
import { BaseInMemoryRepository as BaseRepository } from './base/base-in-memory.repository'

export class InMemoryQuestionsRepository
  extends BaseRepository<Question>
  implements QuestionsRepository {

  async findById (questionId: string): Promise<Question | null> {
    const question = await this.findOneBy('id', questionId)
    return question
  }

  async findByTitle (title: string): Promise<Question | null> {
    const question = await this.findOneBy('title', title)
    return question
  }

  async delete (questionId: string): Promise<void> {
    await this.deleteOneBy('id', questionId)
  }
}
