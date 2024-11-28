import { addons, types } from 'storybook/internal/manager-api'
import { Panel } from './components'
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants'

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    title: 'Tests',
    type: types.PANEL,
    render: ({ active }) => <Panel active={active} />,
    paramKey: PARAM_KEY,
  })
})
