import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "个人健康中控台",
  description: "每日健康记录、AI健康管家、双轨观察与咨询入口"
};

const nav = ["/", "/daily", "/timeline", "/insights", "/tcm", "/consult", "/profile", "/symptoms", "/lifestyle", "/records", "/summary", "/visit-pack"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="bg-white border-b">
          <nav className="max-w-6xl mx-auto p-4 flex flex-wrap gap-4">
            {nav.map((item) => (
              <Link key={item} href={item} className="text-medical-700 hover:underline">{item === "/" ? "中控台" : item.replace("/", "")}</Link>
            ))}
          </nav>
        </header>
        <main className="max-w-6xl mx-auto p-6 space-y-6">{children}</main>
      </body>
    </html>
  );
}
