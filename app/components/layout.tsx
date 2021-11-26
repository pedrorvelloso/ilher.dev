import { Navbar } from '~/components/navbar'

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  )
}
