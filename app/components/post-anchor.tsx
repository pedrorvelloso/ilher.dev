import { FaLink } from 'react-icons/fa'

import { H1, H2 } from './typograph'
import { Anchor } from './anchor'

const asComponent = {
  h1: H1,
  h2: H2,
}

interface PostAnchorProps {
  as?: keyof typeof asComponent
  goTo: string
}

export const PostAnchor: React.FC<PostAnchorProps> = ({
  as = 'h1',
  goTo,
  children,
}) => {
  const Tag = asComponent[as]

  return (
    <Tag id={goTo}>
      <div className="relative group">
        <span className="absolute top-0 bottom-0 -ml-5 flex items-center invisible group-hover:visible">
          <FaLink size={14} />
        </span>
        <Anchor href={`#${goTo}`} underline={false}>
          {children}
        </Anchor>
      </div>
    </Tag>
  )
}
