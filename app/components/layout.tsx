import { Navbar } from '~/components/navbar'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
