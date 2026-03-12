import PageHero from "../../components/sections/PageHero";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, Info } from "lucide-react";

const GOOGLE_FORMS_URL = "https://forms.gle/hqxPkvvTMph5UgTg8";

type FeeRow = { label: string; amount: string; note?: string };

const earlyBirdFees: FeeRow[] = [
  { label: "Undergraduate students", amount: "₱3,600" },
  { label: "Authors and participants", amount: "₱5,000" },
];

const regularFees: FeeRow[] = [
  { label: "Undergraduate students", amount: "₱4,200" },
  { label: "Authors and participants", amount: "₱5,800" },
  {
    label: "Student audience only*",
    amount: "₱100",
    note: "No conference kit and no food",
  },
];

const option1Inclusions = [
  "Conference kits",
  "AM and PM snacks",
  "Lunch",
  "Conference dinner (Day 2)",
  "Certificate of attendance",
];

const option2Inclusions = [
  "Workshop kit",
  "Snacks",
  "Lunch",
  "Certificate of attendance",
];

const FeeTable = ({ rows }: { rows: FeeRow[] }) => (
  <div className="overflow-hidden rounded-lg border border-brick-red-600">
    {rows.map((row, i) => (
      <div
        key={row.label}
        className={`flex items-center justify-between gap-4 px-5 py-3.5 ${
          i % 2 === 0 ? "bg-brick-red-800/60" : "bg-brick-red-800/30"
        }`}
      >
        <div className="min-w-0">
          <span className="text-white text-sm sm:text-base font-medium">
            {row.label}
          </span>
          {row.note && (
            <p className="text-white/80 text-xs mt-0.5">{row.note}</p>
          )}
        </div>
        <span className="text-white font-bold text-base sm:text-lg whitespace-nowrap">
          {row.amount}
        </span>
      </div>
    ))}
  </div>
);

const InclusionList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item} className="flex items-center gap-2.5 text-white/90 text-sm sm:text-base">
        <CheckCircle className="w-4 h-4 text-rose-300 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const RegisterButton = () => (
  <Link
    href={GOOGLE_FORMS_URL}
    target="_blank"
    rel="noreferrer"
    aria-label="Open online registration form in a new tab"
    className="inline-flex items-center gap-2 bg-white text-brick-red-700 px-7 py-3.5 rounded-lg font-bold text-base sm:text-lg hover:bg-rose-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
  >
    Proceed to Online Registration
    <ArrowUpRight className="w-5 h-5" />
  </Link>
);

export default function RegistrationPage() {
  return (
    <main className="pt-[116px] min-h-screen bg-brick-red-950 text-white">
      <PageHero
        title="Registration"
        description="Participants, paper presenters, and authors for the PCSC Main Conference and Student Research Workshop must register for the conference."
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-14">

        {/* Option 1 */}
        <section aria-labelledby="option1-heading">
          <div className="mb-6">
            <h2
              id="option1-heading"
              className="text-xl sm:text-2xl font-bold text-white mb-1"
            >
              Option 1: Main Conference and Workshop
            </h2>
            <p className="text-white/85 text-sm">April 23 – 25, 2026</p>
          </div>

          <div className="space-y-6">
            {/* Early Bird */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-rose-200 mb-3 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-300" />
                Early Bird
                <span className="text-white/80 font-normal text-sm">
                  — on or before March 23, 2026
                </span>
              </h3>
              <FeeTable rows={earlyBirdFees} />
            </div>

            {/* Regular Registration */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-rose-200 mb-3 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-white/50" />
                Regular Registration
                <span className="text-white/80 font-normal text-sm">
                  — March 30, 2026 onwards
                </span>
              </h3>
              <FeeTable rows={regularFees} />
            </div>

            {/* Inclusions */}
            <div className="bg-brick-red-800/50 border border-brick-red-600 rounded-xl p-5 sm:p-6">
              <h4 className="text-sm font-semibold text-rose-200 uppercase tracking-wide mb-4">
                Registration fee includes
              </h4>
              <InclusionList items={option1Inclusions} />
            </div>
          </div>
        </section>

        {/* Divider */}
        <hr className="border-brick-red-700" />

        {/* Option 2 */}
        <section aria-labelledby="option2-heading">
          <div className="mb-6">
            <h2
              id="option2-heading"
              className="text-xl sm:text-2xl font-bold text-white mb-1"
            >
              Option 2: Workshop Only — Day 1
            </h2>
            <p className="text-white/85 text-sm">April 23, 2026</p>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg border border-brick-red-600">
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-brick-red-800/60">
                <span className="text-white text-sm sm:text-base font-medium">
                  Participants — Whole-day
                </span>
                <span className="text-white font-bold text-base sm:text-lg whitespace-nowrap">
                  ₱1,000
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-brick-red-800/30">
                <span className="text-white text-sm sm:text-base font-medium">
                  Participants — Half-day
                </span>
                <span className="text-white font-bold text-base sm:text-lg whitespace-nowrap">
                  ₱500
                </span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="bg-brick-red-800/50 border border-brick-red-600 rounded-xl p-5 sm:p-6">
              <h4 className="text-sm font-semibold text-rose-200 uppercase tracking-wide mb-4">
                Registration fee includes
              </h4>
              <InclusionList items={option2Inclusions} />
            </div>
          </div>
        </section>

        {/* Note */}
        <div className="flex gap-3 bg-brick-red-800/50 border border-brick-red-600 rounded-xl px-5 py-4">
          <Info className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
          <p className="text-white/80 text-sm leading-relaxed">
            *Student audience only rate does not include the conference kit or
            meals. All other registrations include a certificate of attendance.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-2">
          <p className="text-white/85 text-sm mb-5">
            Click the button below to complete your registration via Google
            Forms.
          </p>
          <RegisterButton />
        </div>
      </div>
    </main>
  );
}
