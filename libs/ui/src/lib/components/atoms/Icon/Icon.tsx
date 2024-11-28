import { forwardRef } from 'react'

export type IconProps = {
  className?: string
  'data-testid'?: string
}

const Icon = forwardRef<HTMLDivElement, IconProps>(
  ({ className, 'data-testid': dataTestId }, incomingRef) => (
    <div ref={incomingRef} className={className} data-testid={dataTestId}>
      123
    </div>
  ),
)

Icon.displayName = 'Icon'

export default Icon
