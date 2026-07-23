export const InfoGrid = () => {
  return (
    <section className="bg-rose-900 text-rose-50">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 grid gap-8 md:grid-cols-3">
        <div className="rounded-lg bg-rose-950/40 p-6 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold">Dates</h3>
          <p className="mt-2 text-rose-100">May 9–11, 2024</p>
        </div>
        <div className="rounded-lg bg-rose-950/40 p-6 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold">Venue</h3>
          <p className="mt-2 text-rose-100">
            De La Salle University — Laguna Campus, Biñan, Laguna
          </p>
        </div>
        <div className="rounded-lg bg-rose-950/40 p-6 ring-1 ring-white/10">
          <h3 className="text-lg font-semibold">Areas of Interest</h3>
          <p className="mt-2 text-rose-100 text-sm">
            AI, NLP, Software Engineering, Databases, Networks, Algorithms,
            Emerging Areas, and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoGrid;
