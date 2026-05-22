import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "AI Global Personal Health Manager",
  description: "MVP for health logging and visit preparation"
};

const nav = ["/", "/profile", "/symptoms", "/lifestyle", "/records", "/summary", "/visit-pack"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="bg-white border-b">
          <nav className="max-w-6xl mx-auto p-4 flex flex-wrap gap-4">
            {nav.map((item) => (
              <Link key={item} href={item} className="text-medical-700 hover:underline">{item === "/" ? "Dashboard" : item.replace("/", "")}</Link>
            ))}
          </nav>
        </header>
        <main className="max-w-6xl mx-auto p-6 space-y-6">{children}</main>
      </body>
    </html>
  );
}
