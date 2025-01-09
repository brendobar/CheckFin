import type { Metadata } from "next";
import styles from './auth.module.css'
import classNames from "classnames";

export const metadata: Metadata = {
  title: "Auth Page",
  description: "Checkfin Auth Page",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={styles.authWrapper}>
          {children}
      </div>
  );
}
