import { Outlet } from "react-router-dom";
import { Navigation, Footer } from "@/widgets";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <div className={styles.app}>
      <Navigation />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
