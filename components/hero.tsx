import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="container min-h-[250px] sm:min-h-[300px] relative overflow-hidden isolate after:content-[''] after:block after:absolute after:inset-0 after:bg-gradient-hero after:z-[-1]">
      <Image
        src="/images/hero.jpg"
        fill
        alt="Person lifting barbell"
        style={{ objectFit: "cover", objectPosition: "center", filter: "grayscale(1)", zIndex: -2 }}
      />
      <div className="absolute p-6 top-1/2 left-0 -translate-y-1/2">
        <h1 className="font-bold text-2xl text-slate-100">Sweat, Smile and Repeat</h1>
        <p className="text-slate-200 mt-2 mb-8">Check out the most effective exercises</p>
        <Link href="/exercises" className={buttonVariants({ variant: "secondary" })}>
          Explore Exercises
        </Link>
      </div>
    </section>
  );
}
