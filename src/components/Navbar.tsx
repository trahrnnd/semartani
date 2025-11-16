import Link from "next/link";
import NextImage from "next/image"
import Search from "./Search";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-start gap-5 px-14 py-3">
        <Link href="/">
          <NextImage 
            src="/general/logo.svg"
            alt="logo"
            width={48}
            height={48}
          />
        </Link>
        <Search />
      </div>
    </header>
  );
};

export default Navbar;
