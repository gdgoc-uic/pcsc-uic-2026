import TribalPattern from "../layouts/TribalPattern";

type Props = { title: string; description?: string };

const PageHero = ({ title, description }: Props) => {
  return (
    <section className="relative bg-rose-950 text-rose-50 border-b border-white/10 overflow-hidden">
      {/* Tribal Pattern Background */}
      <div className="absolute inset-0 opacity-30 h-full w-full">
        <div className="h-full w-full">
          <TribalPattern />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 sm:py-20">        
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{title}</h1>
        {description ? (
          <p className="mt-4 max-w-3xl text-lg text-rose-100/90">{description}</p>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;


