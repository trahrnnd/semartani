import LeftBar from "@/components/LeftBar";
import RightBar from "@/components/RightBar";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="max-w-screen-md min-h-screen lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto flex justify-between mt-[80px]">
        <div className="">
          <LeftBar />
        </div>  
        <div className="md:mx-9 lg:min-w-[600px] w-full max-w-[600px]">
          {children}
          {modal}
        </div>
        <div className="hidden lg:flex flex-1">
          <RightBar />
        </div>
      </div>
    </div>
  );
}
