import { render } from '@testing-library/react'

import { Icon } from '..'

import type { IconProps } from '..'

const renderComponent = (props?: Partial<IconProps>) =>
  render(<Icon {...props} />)

describe('Icon tests', () => {
  test('success test', async () => {
    const { getByTestId } = renderComponent({
      'data-testid': 'icon',
    })

    expect(getByTestId('icon')).not.toBeNull()
  })

  test('success test 2', async () => {
    const { getByTestId } = renderComponent({
      'data-testid': 'icon',
    })

    expect(getByTestId('icon')).not.toBeNull()
  })

  test('error test', async () => {
    const { getByTestId } = renderComponent({
      'data-testid': 'icon',
    })

    expect(getByTestId('icon2')).not.toBeNull()
  })

  test('error test 2', async () => {
    const { getByTestId } = renderComponent({
      'data-testid': 'icon',
    })

    expect(getByTestId('icon2')).not.toBeNull()
  })
})
