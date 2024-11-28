import { Icon } from '..'

import type { Meta, StoryObj } from '@storybook/react'
import type { IconProps } from '..'

export default {
  title: 'UI/Atoms/Icon',
  component: Icon,
  tags: ['component'],
  args: {
    'data-testid': 'icon',
  },
  argTypes: {
    className: {
      control: 'text',
    },
    'data-testid': {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    componentTestsFolder: 'libs/ui/src/lib/components/atoms/Icon/__tests__',
  },
} satisfies Meta<IconProps>

export const Default: StoryObj<IconProps> = {
  render: (props) => <Icon {...props} />,
}
