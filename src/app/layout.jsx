import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Unir PDF - Combina tus archivos PDF",
  description: "Aplicación web para unir múltiples archivos PDF de forma visual, ordenable e intuitiva. Procesamiento 100% en el navegador.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
