import { useCallback, useEffect, useState } from 'react'
import { useParameter } from 'storybook/internal/manager-api'
import { Loader, ScrollArea } from '@storybook/components'
import { styled } from 'storybook/internal/theming'
import axios from 'axios'

import { parseTestResults } from './utils'
import Toolbar from './Toolbar'
import TestMessage from './TestMessage'
import { testsServerUrl } from './constants'
import { TestStatus } from '../types'

import type { FC } from 'react'
import type { AxiosResponse } from 'axios'
import type { Test, QueryData } from '../types'
import type { TestsMap } from './types'

export type PanelProps = {
  active: boolean
}

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex: 1;
`

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const Tests = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
`

const Panel: FC<PanelProps> = ({ active }) => {
  const componentTestsFolder = useParameter('componentTestsFolder') as string
  const [tests, setTests] = useState<TestsMap>(new Map())
  const [isLoading, setLoading] = useState<boolean>(true)
  const [selectedTab, setSelectedTab] = useState<TestStatus>(TestStatus.FAILED)

  const handleSendRequest = useCallback((testPath: string) => {
    setLoading(true)
    setTests(new Map())

    axios
      .post<Test[], AxiosResponse<Test[]>, QueryData>(testsServerUrl, {
        testPath,
      })
      .then((res) => {
        setTests(parseTestResults(res.data))
      })
      .finally(() => setLoading(false))
  }, [])

  const handleRunTests = () => handleSendRequest(componentTestsFolder)

  useEffect(() => {
    active && componentTestsFolder && handleSendRequest(componentTestsFolder)
  }, [active, handleSendRequest, componentTestsFolder])

  if (!active) return null

  return isLoading ? (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  ) : (
    <Root>
      <Toolbar
        tests={tests}
        onRunTest={handleRunTests}
        setSelectedTab={setSelectedTab}
      />
      <ScrollArea vertical>
        <Tests>
          {tests?.get(selectedTab)?.map((item) => (
            <TestMessage key={item.fullPath} {...item} />
          ))}
        </Tests>
      </ScrollArea>
    </Root>
  )
}

export default Panel
