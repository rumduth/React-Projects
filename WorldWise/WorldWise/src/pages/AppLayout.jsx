import styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar.jsx";
import Map from "../components/Map";
import User from "../components/User";
import { useAuth } from "../contexts/FakeAuthContext";
export default function AppLayout() {
  const { user } = useAuth();
  return (
    <div className={styles.app}>
      <Sidebar />

      <User />
      <Map />
    </div>
  );
}
