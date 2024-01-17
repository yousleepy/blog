import Image from "next/image";
import Link from "next/link";
export default function JeffHeader() {
  return (
    <div className="h-44">
      <div className="columns-3 p-5 text-stone-800 bg-gradient-to-r from-white via-white to-blue-900 border-b-blue-800">
        <Link href="/">
          <Image
            className="w-40 absolute -m-5 rounded-r-2xl"
            src="/logo.png"
            alt="Logo"
            width={256}
            height={256}
          />
        </Link>
        <div className="w-full align-middle text-center text-2xl font-bold">
          Jeff&apos;s Dev stuffs
        </div>
        <div className="text-right"></div>
      </div>
    </div>
  );
}
