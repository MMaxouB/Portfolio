import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      {/* 
        Selected Projects, Expertise Preview, Timeline Preview, etc. 
        will be implemented in subsequent phases as per PORTFOLIO_SPEC.md 
      */}
    </div>
  );
}
