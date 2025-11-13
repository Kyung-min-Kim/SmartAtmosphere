// app/components/NavBar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, Clock, Smartphone } from "lucide-react";
import styles from "./navbar.module.css";

const TABS = [
  { href: "/", label: "홈", icon: Home },
  { href: "/chat", label: "스마트톡", icon: MessageCircle },
  { href: "/routines", label: "내 루틴", icon: Clock },
  { href: "/devices", label: "디바이스", icon: Smartphone },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className={styles.navbar}>
      {TABS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`${styles.navItem} ${active ? styles.active : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <Icon
              size={24}
              strokeWidth={2}
              stroke={active ? "#000000" : "rgba(0,0,0,0.5)"}
              fill={active ? "#000000" : "none"}
            />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
