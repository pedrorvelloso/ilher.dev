import { Navbar } from '~/components/navbar'
import { Footer } from './footer'

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
