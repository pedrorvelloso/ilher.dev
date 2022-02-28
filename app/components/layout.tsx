import { Navbar } from '~/components/navbar'
import { Footer } from '~/components/footer'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
