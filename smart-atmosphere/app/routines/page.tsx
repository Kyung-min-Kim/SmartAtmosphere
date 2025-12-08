"use client";

import { Routine } from "@/types/routine";
import RoutineCard from "./RoutineCard";
import styles from "./routines.module.css";
import Image from "next/image";
import Link from "next/link";

export default function RoutinePage() {
  const routines: Routine[] = [
    {
      id: "1",
      time: "21:00",
      location: "우리 집",
      weather: "27°C",
      humidity: "60%",
      devicesOn: ["스피커", "책상 조명"],
      devicesOff: ["스탠드"],
      feeling: "😊",
      music: "Jazz",
      color: "#4934C7",
    },
    {
      id: "2",
      time: "19:00",
      location: "우리 집",
      weather: "30°C",
      humidity: "50%",
      devicesOn: ["스피커"],
      devicesOff: [],
      feeling: "😆",
      music: "K-POP",
      color: "#F3A45B",
    },
  ];

  const hasRoutines = routines.length > 0;

  return (
    <div className={styles.page}>
      <Link href="/routines/new" className={styles.addRoutine}>
        <span className={styles.addIcon}>
          <Image src="/images/calender.png" alt="달력" width={20} height={20} />
        </span>
        <span className={styles.addText}>내 루틴 추가하기</span>
      </Link>

      {hasRoutines && (
        <main className={styles.list}>
          {routines.map((item) => (
            <RoutineCard key={item.id} data={item} />
          ))}
        </main>
      )}
    </div>
  );
}
