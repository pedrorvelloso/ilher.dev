import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DrawerProps {
  isOpen?: boolean
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, children }) => {
  useEffect(() => {
    const body = document.getElementsByTagName('body')[0]
    const html = document.getElementsByTagName('html')[0]

    if (isOpen) {
      body.style.overflowY = 'hidden'
      html.style.overflowY = 'hidden'
      window.scrollTo(0, 0)
    } else {
      body.style.overflowY = ''
      html.style.overflowY = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0, transition: { bounce: false } }}
          exit={{ x: '-100%', transition: { bounce: false } }}
          className="fixed top-0 h-screen w-screen md:w-2/5 visible lg:invisible bg-drawer z-50"
        >
          <div className="py-5 mx-10vw md:mx-3 px-0 lg:px-12 max-w-screen-lg">
            {children}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
