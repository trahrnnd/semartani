import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="w-screen min-h-screen">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
