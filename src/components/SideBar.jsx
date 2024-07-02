import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p> List of Cities</p>
      <footer className={styles.footer}>
        {" "}
        <p className={styles.copyright}></p>&copy; {new Date().getFullYear()} by
        Bhanu Prakash R
      </footer>
    </div>
  );
}

export default SideBar;
