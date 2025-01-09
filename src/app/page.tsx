import styles from "./page.module.css";
import classNames from "classnames";

export default function Home() {
  return (
    <div className={classNames(styles.page, 'py-96')}>
        hello
    </div>
  );
}
