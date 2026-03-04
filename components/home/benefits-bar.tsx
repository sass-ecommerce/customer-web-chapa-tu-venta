const categories = [
  { emoji: "👕", label: "Camisetas" },
  { emoji: "🧥", label: "Chaquetas" },
  { emoji: "👔", label: "Camisas" },
  { emoji: "👖", label: "Jeans" },
  { emoji: "👜", label: "Bolsos" },
  { emoji: "👠", label: "Zapatos" },
  { emoji: "⌚", label: "Relojes" },
  { emoji: "🧢", label: "Gorras" },
  { emoji: "⊞", label: "Ver todo" },
];

export function BenefitsBar() {
  return (
    <section className="bg-white border-y border-gray-200 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center gap-6 lg:gap-8 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map(({ emoji, label }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-[#1A1A1A] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200">
                {emoji}
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap group-hover:text-gray-900 transition-colors">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
