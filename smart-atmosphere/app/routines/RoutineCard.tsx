// app/routines/RoutineCard.tsx
"use client";

import styles from "./routines.module.css";
import type { Routine } from "@/types/routine";
import Image from "next/image";

type Props = {
  data: Routine;
};

export default function RoutineCard({ data }: Props) {
  return (
    <section className={styles.card}>
      {/* 상단 헤더 영역 */}
      <header className={styles.headerRow}>
        <div className={styles.headerLeft}>
          <span className={styles.headerIcon}>
            <Image
              src="/images/calender.png"
              alt="달력"
              width={23}
              height={23}
            />
          </span>
          <span className={styles.title}>{data.title}</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.headerBtn}>+</button>
          <button className={styles.headerBtn}>−</button>
        </div>
      </header>

      {/* 본문 영역 전체 그리드 */}
      <div className={styles.bodyGrid}>
        {/* 왼쪽 : 시간 / 위치 / 날씨 / 습도 */}
        <div className={styles.metaCard}>
          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>
              <Image
                src="/images/routine_clock.png"
                alt="시간"
                width={13}
                height={13}
              />
            </span>
            <span className={styles.metaLabel}>시간</span>
            <span className={styles.metaValue}>{data.time}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>
              <Image
                src="/images/routine_location.png"
                alt="위치"
                width={13}
                height={13}
              />
            </span>
            <span className={styles.metaLabel}>위치</span>
            <span className={styles.metaValue}>{data.location}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>
              <Image
                src="/images/routine_weather.png"
                alt="날씨"
                width={13}
                height={13}
              />
            </span>
            <span className={styles.metaLabel}>날씨</span>
            <span className={styles.metaValue}>{data.weather}</span>
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>
              <Image
                src="/images/routine_humide.png"
                alt="습도"
                width={13}
                height={13}
              />
            </span>
            <span className={styles.metaLabel}>습도</span>
            <span className={styles.metaValue}>{data.humidity}</span>
          </div>
        </div>

        {/* 가운데/오른쪽 1행 : ON / OFF 타일 */}
        <div className={styles.toggleCard}>
          <div className={styles.toggleHeader}>
            <span className={styles.toggleLabel}>ON</span>
          </div>
          <div className={styles.toggleBody}>
            <span className={styles.deviceIcon}>💡</span>
            <span className={styles.deviceIcon}>🔊</span>
          </div>
        </div>

        <div className={styles.toggleCard}>
          <div className={styles.toggleHeaderOff}>
            <span className={styles.toggleLabel}>OFF</span>
          </div>
          <div className={styles.toggleBody}>
            <span className={styles.deviceIcon}>💡</span>
          </div>
        </div>

        {/* 2행 : 감정 / 음악 / 색상 작은 카드들 */}
        <div className={styles.smallInfoCard}>
          <div className={styles.smallLabel}>감정</div>
          <div className={styles.smallBody}>{data.mood}</div>
        </div>

        <div className={styles.smallInfoCard}>
          <div className={styles.smallLabel}>음악</div>
          <div className={styles.smallBody}>{data.music}</div>
        </div>

        <div className={styles.smallInfoCard}>
          <div className={styles.smallLabel}>색상</div>
          <div className={styles.colorDotWrapper}>
            <span
              className={styles.colorDot}
              style={{ backgroundColor: data.colorHex }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
