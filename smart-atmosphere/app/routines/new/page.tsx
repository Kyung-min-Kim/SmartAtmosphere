"use client";

import { useState } from "react";
import styles from "./newRoutine.module.css";
import Link from "next/link";

export default function NewRoutinePage() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 나중에 여기서 GraphQL mutation 호출해서 DB에 저장
    console.log({ title, time, location });
    alert("나중에 GraphQL 연결해서 진짜 저장할 예정 ✨");
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/routines" className={styles.back}>
          ← 루틴 목록으로
        </Link>
        <h1 className={styles.title}>내 루틴 추가하기</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>루틴 이름</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 밤 독서 모드"
          />
        </label>

        <label className={styles.field}>
          <span>시간</span>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>위치</span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="예: 우리 집 거실"
          />
        </label>

        {/* 나중에: 날씨 / 습도 / ON 디바이스 / OFF 디바이스 / 감정 / 음악 / 색상 등 추가 */}

        <button type="submit" className={styles.submit}>
          루틴 저장하기
        </button>
      </form>
    </div>
  );
}
