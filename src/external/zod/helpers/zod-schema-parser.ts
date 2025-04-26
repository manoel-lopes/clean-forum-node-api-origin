import { z } from 'zod'
import type { SchemaParseResult } from '@/infra/validation/ports/schema-parse-result'
import { SchemaValidationError } from '@/infra/validation/errors/schema-validation.error'

export abstract class ZodSchemaParser {
  static parse<T = SchemaParseResult>(schema: z.Schema, data: unknown): T {
    const result = schema.safeParse(data)
    if (!result.success) {
      const issue = result.error.issues[0]
      const paramLabel = ZodSchemaParser.labelParam(issue.path as (string | number)[], data)
      const message = ZodSchemaParser.formatCustomMessage(issue.message.toLowerCase(), paramLabel)
      throw new SchemaValidationError(message)
    }
    return result.data
  }

  private static labelParam (path: (string | number)[], data: unknown): string {
    if (path.length >= 2) {
      const [context, field] = path
      const labels: Record<string, string> = {
        params: `route param '${field}'`,
        query: `query param '${field}'`,
      }
      if (typeof context === 'string' && labels[context]) {
        return labels[context]
      }
    }

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

  private static detectContext (data: unknown): 'params' | 'query' | 'body' | undefined {
    if (typeof data !== 'object' || data === null) return undefined
    if (ZodSchemaParser.isParamsStructure(data)) return 'params'
    if (ZodSchemaParser.isQueryStructure(data)) return 'query'
    if (ZodSchemaParser.isBodyStructure(data)) return 'body'
    return undefined
  }

  private static isParamsStructure (data: object): boolean {
    return Object.values(data).every(value => typeof value === 'string')
  }

  private static isQueryStructure (data: object): boolean {
    return Object.values(data).every(value => typeof value === 'string' || typeof value === 'number')
  }

  private static isBodyStructure (data: object): boolean {
    return Object.values(data).some(value => {
      return typeof value === 'string' || typeof value === 'number' || typeof value === 'object'
    })
  }

  private static formatCustomMessage (message: string, paramLabel: string): string {
    const patterns: { keyword: string; format: (param: string) => string }[] = [
      { keyword: 'required', format: (param) => `The ${param} is required` },
      { keyword: 'invalid', format: (param) => `Invalid ${param}` },
    ]

    const pattern = patterns.find(({ keyword }) => message.includes(keyword))
    return pattern ? pattern.format(paramLabel) : `The ${paramLabel} ${message}`
  }
}
