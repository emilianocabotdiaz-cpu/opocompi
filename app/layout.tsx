import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpoCompi - Asistente IA para Policia Nacional",
  description: "Asistente IA, tests y acompanamiento para opositores a Policia Nacional.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
