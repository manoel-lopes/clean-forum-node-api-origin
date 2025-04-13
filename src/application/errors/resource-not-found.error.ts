type Resource = 'User' | 'Question' | 'Answer'

export class ResourceNotFoundError extends Error {
  constructor (resource: Resource) {
    super(`${resource} not found`)
    this.name = 'ResourceNotFoundError'
  }
}
