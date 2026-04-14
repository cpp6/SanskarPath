import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata = {
  title: "SanskaarPath — Ancient Values. Modern Minds. Balanced Futures.",
  description:
    "A platform that reduces mobile addiction in children by converting screen time into value-based, structured, and meaningful learning.",
  keywords: ["children", "education", "values", "screen time", "digital wellbeing", "learning"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
