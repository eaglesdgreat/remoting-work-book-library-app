import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import styles from './dashboardLayout.module.css'

// type DashboardLayoutProps = NonNullable<unknown>

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <div className="col-span-2 row-span-1">
        <Header />
      </div>

      <main className="col-start-2 col-span-1">
        <Outlet />
      </main>

      <div className="col-span-2">
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout