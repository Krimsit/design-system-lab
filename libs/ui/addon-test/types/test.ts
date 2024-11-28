import type { API } from 'storybook/internal/manager-api'

export enum TestStatus {
  PASSED = 'passed',
  FAILED = 'failed',
  PENDING = 'pending',
}

export type AssertionResult = {
  ancestorTitles: string[]
  duration: number
  status: TestStatus
  fullName: string
  title: string
  failureMessages: string[]
}

export type Test = {
  name: string
  status: TestStatus
  startTime?: number
  endTime?: number
  assertionResults: AssertionResult[]
}

export type InjectedProps = {
  tests?: Test[]
}

export type HocProps = {
  api: API
  active?: boolean
}

export type HocState = {
  kind?: string
  storyName?: string
  tests?: Test[]
}
