import { TestStatus } from '../types'

import type { Test } from '../types'
import type { TestsMap, ReadableTest } from './types'

export const parseTestResults = (tests: Test[]): TestsMap => {
  const statusMap = new Map<TestStatus, ReadableTest[]>()

  tests.forEach((test) => {
    test.assertionResults.forEach((result) => {
      const readableTest: ReadableTest = {
        fullPath: [...result.ancestorTitles, result.title].join(' > '),
        duration: result.duration,
        errorMessage:
          result.status === TestStatus.FAILED
            ? result.failureMessages.join('\n')
            : undefined,
      }

      if (!statusMap.has(result.status)) {
        statusMap.set(result.status, [])
      }

      statusMap.get(result.status)?.push(readableTest)
    })
  })

  return statusMap
}
