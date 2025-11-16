import LeftBar from "@/components/LeftBar";
import "./globals.css";
import RightBar from "@/components/RightBar";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="max-w-screen-md min-h-screen lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between mt-[80px]">
            <div className="px-2 xsm:px-4 xxl:px-8">
              <LeftBar />
            </div>
            <div className="flex-[2] lg:min-w-[600px]">
              {children}
              {modal}
            </div>
            <div className="hidden lg:flex ml-4 md:ml-8 flex-1">
              <RightBar />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
