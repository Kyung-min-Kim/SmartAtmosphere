import "./globals.css";
import NavBar from "./components/navBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div
          style={{
            minHeight: "100dvh",
            display: "grid",
            gridTemplateRows: "1fr auto",
          }}
        >
          {children}
          <NavBar />
        </div>
      </body>
    </html>
  );
}
