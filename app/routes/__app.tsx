import { Outlet } from 'remix'

import { Layout } from '~/components/layout'

const AppLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default AppLayout
