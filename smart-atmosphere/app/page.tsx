"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Home, MessageCircle, Clock, Smartphone } from "lucide-react";

export default function HomePage() {
  const [weather, setWeather] = useState<{
    city: string;
    temp: number | null;
    humidity: number | null;
    condition: string;
  }>({
    city: "위치 확인 중...",
    temp: null,
    humidity: null,
    condition: "",
  });

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=kr&appid=${apiKey}`
          );
          const data = await res.json();

          setWeather({
            city: data?.name ?? "알 수 없음",
            temp: data?.main?.temp ?? null,
            humidity: data?.main?.humidity ?? null,
            condition: data?.weather?.[0]?.description ?? "",
          });
        } catch (err) {
          console.error("날씨 API 오류:", err);
        }
      },
      (err) => console.error("위치 접근 거부됨:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.userNameRow}>
            <span className={styles.userLabel}>사용자 님</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconButton}>+</button>
          <button className={styles.iconButton}>
            <span className={styles.menuLines} />
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.statusBar}>
            <div className={styles.statusPill}>{weather.city}</div>
            <div className={styles.statusPill}>
              {weather.temp !== null ? `${weather.temp.toFixed(1)}℃` : "-"}
            </div>
            <div className={styles.statusPill}>
              {weather.condition ? weather.condition : "날씨 정보 없음"}
            </div>
            <div className={styles.statusPill}>
              {weather.humidity !== null ? `습도 ${weather.humidity}%` : "-"}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>사용자님의 정보</h2>
          <p className={styles.sectionSubtitle}>
            아직 수집된 데이터가 없습니다. Smart Atmosphere를 사용하면 감정,
            선호 색상, 주요 활동, 음악 취향이 여기에 표시됩니다.
          </p>
          <div className={styles.insightCard}>
            <div>
              <div className={styles.insightColumnTitle}>감정</div>
              <div className={styles.insightPlaceholder}>데이터 없음</div>

              <div className={styles.insightColumnTitle}>선호 색상</div>
              <div className={styles.insightPlaceholder}>데이터 없음</div>
            </div>
            <div>
              <div className={styles.insightColumnTitle}>주요 활동</div>
              <div className={styles.insightPlaceholder}>데이터 없음</div>

              <div className={styles.insightColumnTitle}>음악 취향</div>
              <div className={styles.insightPlaceholder}>데이터 없음</div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>이전 스마트톡</h2>
          <div className={styles.talkList}>
            <article className={styles.talkItem}>
              <div className={styles.talkDate}>수요일 · 30</div>
              <div className={styles.talkText}>
                비 오는 날 독서에 맞는 분위기
              </div>
            </article>
            <article className={styles.talkItem}>
              <div className={styles.talkDate}>월요일 · 28</div>
              <div className={styles.talkText}>친구들과 홈파티 준비</div>
            </article>
            <article className={styles.talkItem}>
              <div className={styles.talkDate}>일요일 · 27</div>
              <div className={styles.talkText}>여행 준비에 어울리는 분위기</div>
            </article>
          </div>
        </section>
      </main>

      <nav className={styles.navbar}>
        <button className={`${styles.navItem} ${styles.navItemActive}`}>
          <Home size={20} strokeWidth={2} />
          <span>홈</span>
        </button>
        <button className={styles.navItem}>
          <MessageCircle size={20} strokeWidth={2} />
          <span>스마트톡</span>
        </button>
        <button className={styles.navItem}>
          <Clock size={20} strokeWidth={2} />
          <span>내 루틴</span>
        </button>
        <button className={styles.navItem}>
          <Smartphone size={20} strokeWidth={2} />
          <span>디바이스</span>
        </button>
      </nav>
    </div>
  );
}
