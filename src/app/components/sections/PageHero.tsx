type Props = { title: string; description?: string };

const PageHero = ({ title, description }: Props) => {
  return (
    <section className="bg-rose-900 text-rose-50 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-3xl text-rose-100">{description}</p>
        ) : null}
      </div>
    </section>
  );
};

export default PageHero;


