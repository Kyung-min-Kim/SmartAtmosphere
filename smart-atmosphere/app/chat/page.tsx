"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./chat.module.css";

export default function ChatPage() {
  // 메시지 목록
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);

  const [input, setInput] = useState("");

  // 스크롤 자동으로 내려가기 위함(밑에 <div ref={chatEndRef} />위치로 이동)
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  // 메세지 추가될때마다 스크롤 가장 아래로 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); //scollIntoView는 브라우저 내장함수
  }, [messages]); //render끝나면 chatEndRef current안에 <div> 들어가있고, ?붙인 이유는 null이 아닐때마다 실행하기 위해서

  // 메시지 전송
  const sendMessage = () => {
    if (!input.trim()) return; //비어있음 무시

    const userMsg = { sender: "user", text: input }; //유저메세지
    setMessages((prev) => [...prev, userMsg]); //유저메세지 배열 추가 ([...prev, userMsg]: 기존 배열 복사하고 그 뒤에 새 메세지 붙이기)
    setInput("");

    // (나중에 LLM API 연결할 자리)
    setTimeout(() => {
      const fakeAi = { sender: "ai", text: "응, 그렇게 할게!" };
      setMessages((prev) => [...prev, fakeAi]);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글/일본어 등 조합 중일 때는 Enter 무시
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <h2 className={styles.title}></h2>
      </header>

      <main className={styles.chatArea}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user" ? styles.userMessage : styles.aiMessage
            }
          >
            {msg.text}
          </div>
        ))}

        <div ref={chatEndRef} />
      </main>

      <footer className={styles.inputBar}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Smart Atmosphere에게 부탁해보세요"
          onKeyDown={handleKeyDown}
        />
        <button className={styles.sendBtn} onClick={sendMessage}>
          보내기
        </button>
      </footer>
    </div>
  );
}
