import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const dots = [false, true, false];

export function Hero() {
  return (
    /* top-[100px] = top bar (36px h-9) + main navbar (64px h-16) */
    <section className="pt-[100px] bg-[#F5F6F7] pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-white" style={{ minHeight: "420px" }}>
          <div className="flex flex-col lg:flex-row min-h-[420px]">
            {/* Left: text content */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 py-10 space-y-5">
              <span className="inline-flex items-center gap-2 bg-red-50 text-brand-accent text-xs font-bold px-3 py-1.5 rounded-full w-fit">
                🔥 Big Fashion Sale
              </span>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 font-body leading-tight">
                ¡Oferta por Tiempo
                <br />
                Limitado! Hasta{" "}
                <span className="text-brand-accent">50% OFF!</span>
              </h1>
              <p className="text-gray-500 text-base">Redefine Tu Estilo Diario</p>
              <div className="flex gap-3 flex-wrap pt-1">
                <Button className="bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold rounded-full border-0 px-7">
                  Comprar ahora
                </Button>
                <Button variant="outline" className="rounded-full px-7 font-semibold">
                  Ver catálogo
                </Button>
              </div>
            </div>

            {/* Right: product placeholder */}
            <div className="flex-1 flex items-center justify-center relative bg-gradient-to-br from-red-50 to-rose-100 min-h-[240px] lg:min-h-[420px]">
              <div className="text-center select-none">
                <div className="text-7xl lg:text-8xl leading-none">👗</div>
                <div className="flex gap-2 justify-center mt-3">
                  <span className="text-5xl lg:text-6xl">👕</span>
                  <span className="text-5xl lg:text-6xl">👔</span>
                </div>
                <div className="flex gap-3 justify-center mt-3">
                  <span className="text-4xl lg:text-5xl">👟</span>
                  <span className="text-4xl lg:text-5xl">👜</span>
                </div>
              </div>
              <div className="absolute top-5 right-5 bg-brand-accent text-white text-sm font-black px-3 py-1.5 rounded-lg shadow-md">
                -50%
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {dots.map((active, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full transition-all",
                  active ? "w-5 h-2 bg-brand-accent" : "w-2 h-2 bg-gray-300"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
