import type { TestStatus } from '../types'

export type ReadableTest = {
  fullPath: string
  duration: number
  errorMessage?: string
}

export type TestsMap = Map<TestStatus, ReadableTest[]>
