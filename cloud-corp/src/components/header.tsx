import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full absolute text-white z-10">
      <nav className="relative flex flex-wrap items-center justify-between mx-auto p-8">
        <Link href="/" className="text-2xl md:text-3xl font-bold">
          Home
        </Link>
        <div className="space-x-4 text-xl">
          <Link href="/performance">Performance</Link>
          <Link href="/reliability">Reliability</Link>
          <Link href="/scale">Scale</Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
