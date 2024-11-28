import { useState } from 'react'
import { SyntaxHighlighter } from '@storybook/components'
import { ChevronDownIcon, ChevronUpIcon } from '@storybook/icons'
import { styled } from 'storybook/internal/theming'

import type { FC } from 'react'
import type { ReadableTest } from './types'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: ${({ theme }) => theme.appBorderRadius};
  background-color: ${({ theme }) => theme.background.bar};
`

const Control = styled.div<{ hasError: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: ${({ theme }) => theme.appBorderRadius};
  background-color: ${({ theme }) => theme.background.bar};
  transition: background-color 0.25s ease-in-out;
  cursor: ${({ hasError }) => (hasError ? 'pointer' : 'inherit')};

  &:hover {
    background-color: ${({ theme, hasError }) => hasError && theme.background.hoverable};
  }
`

const Title = styled.div`
  flex: 1;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
`

const Duration = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color.secondary}
`

export const ErrorMessage = styled.div`
  font-family: monospace;
  white-space: pre-wrap;
  padding: 8px 16px;
`

const TestMessage: FC<ReadableTest> = ({
  fullPath,
  errorMessage = '',
  duration,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  // biome-ignore lint/suspicious/noControlCharactersInRegex: <explanation>
  const cleanMessage = errorMessage.replace(/\u001b\[[0-9;]*m/g, '')
  const lines = cleanMessage.split('\n')
  const hasError = Boolean(errorMessage)

  const handleToggleOpen = () => setIsOpen(!isOpen)

  return (
    <Root>
      <Control hasError={hasError} onClick={handleToggleOpen}>
        {hasError && (isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />)}
        <Title>{fullPath}</Title>
        <Duration>{duration}ms</Duration>
      </Control>
      {isOpen && (
        <ErrorMessage>
          {lines.map((line, index) => {
            if (line.trim().startsWith('<')) {
              return (
                <SyntaxHighlighter key={index} language={'html'}>
                  {line}
                </SyntaxHighlighter>
              )
            }

            if (line.includes('/')) {
              return (
                <SyntaxHighlighter key={index} language={'text'}>
                  {line}
                </SyntaxHighlighter>
              )
            }

            return (
              <SyntaxHighlighter key={index} language={'text'}>
                {line}
              </SyntaxHighlighter>
            )
          })}
        </ErrorMessage>
      )}
    </Root>
  )
}

export default TestMessage
