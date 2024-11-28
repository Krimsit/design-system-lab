import { Tabs, IconButton } from '@storybook/components'
import { PlayIcon } from '@storybook/icons'

import { TestStatus } from '../types'

import type { FC } from 'react'
import type { TestsMap } from './types'

export type ToolbarProps = {
  onRunTest: () => void
  setSelectedTab: (tab: TestStatus) => void
  tests: TestsMap
}

const Toolbar: FC<ToolbarProps> = ({ tests, setSelectedTab, onRunTest }) => (
  <Tabs
    id={TestStatus.FAILED}
    actions={{ onSelect: setSelectedTab }}
    tools={
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton onClick={onRunTest} size={'medium'}>
          <PlayIcon />
        </IconButton>
      </div>
    }
  >
    <div
      id={TestStatus.FAILED}
      title={`${tests.get(TestStatus.FAILED)?.length ?? 0} FAILED`}
    />
    <div
      id={TestStatus.PASSED}
      title={`${tests.get(TestStatus.PASSED)?.length ?? 0} PASSED`}
    />
    <div
      id={TestStatus.PENDING}
      title={`${tests.get(TestStatus.PENDING)?.length ?? 0} PENDING`}
    />
  </Tabs>
)

export default Toolbar
