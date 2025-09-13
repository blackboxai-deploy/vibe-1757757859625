import "./globals.css";
import { SimpleLayout } from "./simple-layout";

export const metadata = {
  title: "Beauty Clinic Management System",
  description: "Comprehensive management system for beauty and aesthetic clinic operations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <SimpleLayout>{children}</SimpleLayout>
      </body>
    </html>
  );
}