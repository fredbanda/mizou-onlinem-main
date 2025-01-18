import Image from "next/image";

export default function Home() {
  return (
<div className="flex flex-col items-center text-blue-600 justify-center h-screen">
  <Image src="/logo.png" alt="Logo" width={100} height={100} />
  <h1 className="text-heading1-bold text-blue-800 ">Welcome to Next.js!</h1>
</div>
  );
}
