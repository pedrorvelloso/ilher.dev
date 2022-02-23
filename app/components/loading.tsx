import { useEffect, useState } from 'react'
import { useTransition } from 'remix'
import { AnimatePresence, motion } from 'framer-motion'
import { useSpinDelay } from 'spin-delay'

export const PageLoading = () => {
  const transition = useTransition()
  const showLoader = useSpinDelay(Boolean(transition.state !== 'idle'), {
    delay: 480,
    minDuration: 1000,
  })

  const [pendingPath, setPendingPath] = useState('')
  const [action, setAction] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) return
    if (transition.state === 'idle') return
    setAction(transition.state)
  }, [mounted, transition.state])

  useEffect(() => {
    if (!mounted) return
    if (transition.state === 'idle') return
    setPendingPath(transition.location.pathname)
  }, [mounted, transition])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
          className="fixed bottom-0 right-0 left-0 m-4 flex justify-end"
        >
          <div className="bg-white flex items-center gap-8 py-5 px-9 rounded-lg shadow-md border border-gray-400 w-full sm:w-fit">
            <div className="hidden sm:flex flex-col gap-2 p-3">
              <motion.div
                transition={{
                  x: { yoyo: Infinity, ease: 'easeOut', duration: 0.5 },
                }}
                animate={{ x: [-10, 10] }}
                className="bg-darkerBlue w-2 h-2 rounded-full"
              />
              <motion.div
                transition={{
                  x: {
                    yoyo: Infinity,
                    ease: 'easeOut',
                    duration: 0.5,
                    delay: 0.2,
                  },
                }}
                animate={{ x: [-10, 10] }}
                className="bg-accent w-2 h-2 rounded-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-gray-800 font-bold">{action}</span>
              <span className="text-gray-500 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {pendingPath}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
