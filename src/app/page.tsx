import Image from "next/image";
import CastForm from "@/components/CastForm";
import Link from "next/link"

export default function Home() {
  return (
    <main className="w-[90%] lg:w-full min-h-screen m-auto gap-4 flex flex-col justify-center items-center font-sans">
      <h1 className="font-bold text-4xl">PocketCast</h1>
      <Image 
        src="/logo.svg" 
        alt="PocketCast Logo" 
        className="rounded-lg lg:w-96 w-80"
        width={1080}
        height={1080} />
      <h3 className="lg:w-96 w-80 mb-2">Mint your favorite casts from <Link className="text-[#8465CB] font-bold" href="https://farcaster.com" target="_blank">Farcaster</Link> as NFTs on <Link href="https://base.org" target="_blank" className="text-[#2856F6] font-bold">Base</Link>, powered by <Link href="https://pinata.cloud" target="_blank" className="text-[#6A58F6] font-bold">Pinata</Link></h3>
      <CastForm />
    </main>
  );
}
