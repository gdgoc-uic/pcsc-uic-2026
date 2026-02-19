import PageHero from "@/app/components/sections/PageHero";
import { Users, Target, Lightbulb } from "lucide-react";

type Organizer = {
  name: string;
  affiliation: string;
};

type Workshop = {
  id: number;
  title: string;
  objective: string;
  website: string;
  organizers: Organizer[];
};

const workshops: Workshop[] = [
  {
    id: 1,
    title: "Transforming HCI Research in the Philippines Workshop 2026",
    objective:
      "The workshop aims to catalyze and advance Human-Computer Interaction (HCI) research in the Philippines by fostering collaboration and knowledge exchange among researchers and practitioners. By bringing together diverse perspectives and experiences, we aim to explore innovative approaches and solutions to contemporary HCI challenges in the Philippine context.",
    website: "https://sigchimnl.org/chirp/chirp2025/",
    organizers: [
      { name: "Briane Paul Samson", affiliation: "De La Salle University" },
      { name: "Jordan Aiko Deja", affiliation: "De La Salle University" },
    ],
  },
  {
    id: 2,
    title: "Quantum Computing for the Next Generation: Foundations, Myths, and Practical Pathways",
    objective:
      "This workshop addresses a critical void in the Philippine educational system by providing students with foundational quantum computing skills absent from standard IT and computer science curricula. By blending mathematical theory with hands-on practice, the program equips participants to build quantum circuits, debunk industry myths, and understand the urgent shift toward quantum-safe cryptography. Ultimately, the workshop prepares Filipino students to solve complex problems in optimization and machine learning, ensuring they can compete and contribute effectively within the rapidly evolving global quantum ecosystem.",
    website: "https://www.qcsp.ph/",
    organizers: [
      { name: "Bobby Corpus", affiliation: "Quantum Computing Society of the Philippines" }
    ],
  },
  {
    id: 3,
    title: "Workshop on Mathematical Aspects of Computer Science",
    objective:
      "WMACS provides a venue for teachers, researchers and graduate students of Computer Science, Computing, and Mathematics to share, upgrade knowledge, and foster active collaborative research on areas of Computer Science which are mathematical or theoretical in character.",
    website: "https://lclab.dcs.upd.edu.ph/home/wmacs/wmacs-2026",
    organizers: [
      { name: "Henry Adorna", affiliation: "Computing Society of the Philippines" }
    ],
  },
  {
    id: 4,
    title: "Generative AI in Education",
    objective:
      "This workshop provides educators with a grounded understanding of generative AI’s mechanics to effectively navigate its rapid impact on student learning and research. By identifying specific opportunities and risks, participants will learn to design educational activities that harness AI as a learning enhancement rather than a replacement for human effort. Ultimately, the session moves beyond the extremes of ineffective bans or uncritical use, equipping educators with practical strategies to integrate these tools while strictly preserving academic integrity and the development of critical thinking skills.",
    website: "Launching Soon",
    organizers: [
      { name: "Thomas James Tiam-Lee", affiliation: "De La Salle University" }
    ],
  },
  {
    id: 5,
    title: "PCSC Programming Competition",
    objective: "Programming Competition organized by the Computing Society of the Philippines – Special Interest Group for Women in Computing. The event will be held at the University of the Immaculate Conception, Davao City on April 23, 2026 from 1:30 – 3:30 PM. Each school may send at most 2 teams of 3 female students per team. Each team should be represented by a coach.",
    website: "https://tinyurl.com/pcsc-programming-competition",
    organizers: [
      { name: "Computing Society of the Philippines – Special Interest Group for Women in Computing", affiliation: "" },
      { name: "CodeChum", affiliation: "" }
    ]
  },
];

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .filter((part) => part.length > 0 && part[0] === part[0].toUpperCase())
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
};

const WorkshopPage = () => {
  return (
    <div className="pt-20 bg-brick-red-600">
      <PageHero
        title="Workshops"
        description="Explore specialized workshops designed to provide hands-on learning experiences and foster collaboration among researchers and practitioners."
      />

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
        {/* Workshops List */}
        <section aria-label="Conference Workshops" className="space-y-10">
          {workshops.map((workshop) => (
            <article
              key={workshop.id}
              className="rounded-lg border border-brick-red-600 bg-brick-red-800 p-8 sm:p-10 ring-1 ring-white/5"
            >
              {/* Workshop Title */}
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-8">
                {workshop.title}
              </h2>

              <div className="grid gap-8 lg">
                {/* Objective */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brick-red-600">
                      <Target
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                      Objective and Relevance
                    </h3>
                  </div>
                  <p className="text-rose-100/90 leading-relaxed">
                    {workshop.objective}
                  </p>
                </div>
                </div>
              {/* Website */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brick-red-600">
                      <Lightbulb className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Website</h3>
                  </div>
                  <a
                    href={workshop.website}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-12 text-rose-100 hover:text-white break-all"
                  >
                    {workshop.website}
                  </a>
                </div>
              {/* Organizers */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brick-red-600">
                    <Users
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Organizers
                  </h3>
                </div>

                <div className="flex flex-wrap gap-6">
                  {workshop.organizers.map((organizer) => (
                    <div
                      key={organizer.name}
                      className="flex items-center gap-4"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-brick-red-400 to-brick-red-600 flex items-center justify-center text-white text-sm sm:text-base font-bold flex-shrink-0">
                        {getInitials(organizer.name)}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {organizer.name}
                        </p>
                        <p className="text-rose-200/80 text-sm">
                          {organizer.affiliation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Call to Action */}
        <section
          aria-label="Workshop Proposal"
          className="mt-16 text-center"
        >
          <div className="rounded-lg border border-white/10 bg-brick-red-800/50 p-8 sm:p-12 ring-1 ring-inset ring-white/5">
            <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
              Interested in Organizing a Workshop?
            </h2>
            <p className="text-rose-100/90 max-w-2xl mx-auto mb-6">
              We welcome proposals for workshops that align with the conference
              themes. Submit your proposal to be part of PCSC 2026.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-brick-red-700 shadow-sm hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default WorkshopPage;
