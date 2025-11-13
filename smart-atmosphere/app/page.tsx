"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { Home, MessageCircle, Clock, Smartphone } from "lucide-react";

export default function HomePage() {
  //사용자 이름 설정
  const [userName, setUserName] = useState("사용자");
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null); //리렌더링 일어나도 변하지 않는 값 저장(DOM요소 직접접근(버튼에서 input)) //(null): 초기값설정

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("sa_user_name");
    if (stored && stored.trim().length > 0) {
      setUserName(stored);
    }
  }, []); //새로고침해도 기존로컬에 저장한 이름 불러오도록
  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      //onclick되서 true되고 + DOM렌더링된 후에
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]); //[isEditingName] : 처음 한번 + isEditingName 값(true or false)이 바뀔때마다 실행(하지만 true여야 조건 안에 들어가 수정모드 진입)

  const handleNameSave = () => {
    const trimmed = userName.trim();
    const finalName = trimmed.length === 0 ? "사용자" : trimmed;
    setUserName(finalName);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("sa_user_name", finalName);
    }
    setIsEditingName(false);
  }; //저장로직

  //날씨 api 설정
  const [weather, setWeather] = useState<{
    city: string;
    temp: number | null;
    humidity: number | null;
    condition: string;
    iconMain: string | null;
    aqi: number | null;
  }>({
    city: "위치 확인 중...",
    temp: null,
    humidity: null,
    condition: "",
    iconMain: null,
    aqi: null,
  });

  //날씨 아이콘
  const getWeatherIcon = (main: string | null) => {
    if (!main) return "/images/weather_default.png";

    const key = main.toLowerCase();

    if (key === "clear") return "/images/weather_sun.png";
    if (key === "clouds") return "/images/weather_cloud.png";
    if (key === "rain" || key === "drizzle" || key === "thunderstorm") {
      return "/images/weather_rain.png";
    }
    if (key === "snow") return "/images/weather_snow.png";

    return "/images/weather_sun_cloud.png";
  };

  //대기질
  const getAqiLabel = (aqi: number | null) => {
    if (aqi === null) return "-";
    // 1: Good, 2: Fair, 3: Moderate, 4: Poor, 5: Very Poor
    switch (aqi) {
      case 1:
        return "좋음";
      case 2:
        return "보통";
      case 3:
        return "나쁨";
      case 4:
        return "매우 나쁨";
      case 5:
        return "위험";
      default:
        return "-";
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
          const [weatherRes, airRes] = await Promise.all([
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=kr&appid=${apiKey}`
            ),
            fetch(
              `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            ),
          ]);
          const weatherData = await weatherRes.json();
          const airData = await airRes.json();
          const aqi = airData?.list?.[0]?.main?.aqi ?? null;

          setWeather({
            city: weatherData?.name ?? "알 수 없음",
            temp: weatherData?.main?.temp ?? null,
            humidity: weatherData?.main?.humidity ?? null,
            condition: weatherData?.weather?.[0]?.description ?? "",
            iconMain: weatherData?.weather?.[0]?.main ?? null,
            aqi,
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
            {isEditingName ? (
              <input
                ref={nameInputRef}
                className={styles.userNameInput}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={handleNameSave}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleNameSave();
                  }
                  if (e.key === "Escape") {
                    setIsEditingName(false);
                  }
                }}
              />
            ) : (
              <button
                type="button"
                className={styles.userNameButton}
                onClick={() => setIsEditingName(true)}
              >
                {userName} 님
              </button>
            )}
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
          <div className={styles.weatherPill}>
            <div className={styles.weatherLocation}>
              <span className={styles.weatherCity}>
                {weather.city || "위치 확인 중"}
              </span>
              <Image
                src="/images/location.png"
                alt="위치"
                width={18}
                height={18}
                className={styles.weatherIconSmall}
              />
            </div>
            <div className={styles.weatherTempBlock}>
              <Image
                src={getWeatherIcon(weather.iconMain)}
                alt="날씨 아이콘"
                width={18}
                height={18}
                className={styles.weatherIconLarge}
              />
              <span className={styles.weatherTemp}>
                {weather.temp !== null ? `${weather.temp.toFixed(1)}°C` : "--"}
              </span>
            </div>
            <div className={styles.weatherAqiBlock}>
              <div className={styles.weatherLabelRow}>
                <span className={styles.weatherLabel}>대기질</span>
                <Image
                  src="/images/air_quality.png"
                  alt="대기질"
                  width={18}
                  height={18}
                  className={styles.weatherIconSmall}
                />
              </div>
              <span className={styles.weatherSubValue}>
                {getAqiLabel(weather.aqi)}
              </span>
            </div>
            <div className={styles.weatherHumidityBlock}>
              <div className={styles.weatherLabelRow}>
                <span className={styles.weatherLabel}>습도</span>
                <Image
                  src="/images/humidity.png"
                  alt="습도"
                  width={18}
                  height={18}
                  className={styles.weatherIconSmall}
                />
              </div>
              <span className={styles.weatherSubValue}>
                {weather.humidity !== null ? `${weather.humidity}%` : "--"}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>사용자님의 정보</h2>

          <div className={styles.insightShell}>
            <p className={styles.insightDescription}>
              스마트톡 명령어를 기반으로 만들어진 사용자의 정보입니다.
            </p>
            <div className={styles.insightColumns}>
              <div className={styles.insightColLeft}>
                <div className={styles.infoCardSmall}>
                  <div className={styles.infoCardTitle}>감정</div>
                  <div className={styles.infoCardBody}>데이터 없음</div>
                </div>
                <div className={styles.infoCardSmall}>
                  <div className={styles.infoCardTitle}>선호 색상</div>
                  <div className={styles.infoCardBody}>데이터 없음</div>
                </div>
              </div>
              <div className={styles.insightColCenter}>
                <div className={styles.infoCardLarge}>
                  <div className={styles.infoCardTitle}>주요 활동</div>
                  <div className={styles.activityChartPlaceholder}>
                    활동 비율 데이터 없음
                  </div>
                </div>
              </div>
              <div className={styles.insightColRight}>
                <div className={styles.infoCardLarge}>
                  <div className={styles.infoCardTitle}>음악 취향</div>
                  <ul className={styles.musicList}>
                    <li className={styles.musicItem}>데이터 없음</li>
                  </ul>
                </div>
              </div>
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
    </div>
  );
}
