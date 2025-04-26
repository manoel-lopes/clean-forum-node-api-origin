import { z } from 'zod'
import type { SchemaParseResult } from '@/infra/validation/ports/schema-parse-result'
import { SchemaValidationError } from '@/infra/validation/errors/schema-validation.error'

export abstract class ZodSchemaParser {
  static parse<T = SchemaParseResult>(schema: z.Schema, data: unknown): T {
    const result = schema.safeParse(data)
    if (!result.success) {
      const issue = result.error.issues[0]
      const paramLabel = ZodSchemaParser.labelParam(issue.path, data)
      const message = ZodSchemaParser.formatCustomMessage(issue.message.toLowerCase(), paramLabel)
      throw new SchemaValidationError(message)
    }
    return result.data
  }

  private static labelParam (path: (string | number)[], data: unknown): string {
    const context = ZodSchemaParser.detectContext(data)
    const field = path[path.length - 1]
    if (context) {
      const labels: Record<string, string> = {
        params: `route param '${field}'`,
        query: `query param '${field}'`,
        body: `${field}`
      }
      return labels[context]
    }

    return `${field}`
  }

  private static detectContext (data: unknown) {
    const contexts = [
      { check: ZodSchemaParser.isParamsStructure, context: 'params' },
      { check: ZodSchemaParser.isQueryStructure, context: 'query' },
      { check: ZodSchemaParser.isBodyStructure, context: 'body' }
    ]
    if (data && typeof data === 'object') {
      return contexts.find(({ check }) => check(data))?.context
    }
  }

  private static isParamsStructure (data: object) {
    return Object.values(data).every(value => typeof value === 'string')
  }

  private static isQueryStructure (data: object) {
    return Object.values(data).every(value => typeof value === 'string' || typeof value === 'number')
  }

  private static isBodyStructure (data: object) {
    return Object.values(data).some(value => {
      return typeof value === 'string' || typeof value === 'number' || typeof value === 'object'
    })
  }

  private static formatCustomMessage (message: string, paramLabel: string) {
    const patterns: { keyword: string; format: (param: string) => string }[] = [
      { keyword: 'required', format: (param) => `The ${param} is required` },
      { keyword: 'invalid', format: (param) => `Invalid ${param}` },
    ]

    const pattern = patterns.find(({ keyword }) => message.includes(keyword))
    return pattern ? pattern.format(paramLabel) : `The ${paramLabel} ${message}`
  }
}
