"use client";
import PageHero from "../../components/sections/PageHero";
import { MapPin, Star, Users, Coffee, CalendarDays } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type EventType = "featured" | "parallel" | "break" | "default";

type SubItem = {
  label: string;
  venue?: string;
  session?: string;
  time?: string;
  authors?: string;
};

type TimeSlot = {
  time: string;
  activity: ReactNode;
  venue?: string;
  subItems?: SubItem[];
  eventType?: EventType;
  badge?: string;
  speakerImage?: string;
  speakerName?: string;
};

type DayProgram = {
  day: string;
  dayNumber: string;
  date: string;
  weekday: string;
  schedule: TimeSlot[];
};

const workshops123: SubItem[] = [
  {
    label:
      "Workshop 1: Transforming HCI Research in the Philippines Workshop 2026",
    venue: "OLP Hall",
  },
  {
    label:
      "Workshop 2: Quantum Computing for the Next Generation: Foundations, Myths, and Practical Pathways",
    venue: "JHS ORZ",
  },
  {
    label:
      "Workshop 3: Workshop on Models, Algorithms, Computability and Discrete Structure (WMACS)",
    venue: "JHS Comlab 1",
  },
];

const workshops12345: SubItem[] = [
  ...workshops123,
  {
    label: "Workshop 4: All-female Programming Competition",
    venue: "GS Comlab 1",
  },
  { label: "Workshop 5: Generative AI in Education", venue: "GS Comlab 2" },
];

const day2PapersAM: SubItem[] = [
  {
    session: "Session 1",
    venue: "Rm. 305 OLP",
    time: "11:00AM - 11:20AM",
    label:
      "Flotector: A Floating Waste Detection System for the Imus River through Participatory Sensing and YOLOv11",
    authors: "Ascaño, Charles Ian; Cayabyab, Giero Smith; Gamilla, Ken Lemer",
  },
  {
    session: "Session 1",
    venue: "Rm. 305 OLP",
    time: "11:20AM - 11:40AM",
    label:
      "FITPOSE: A COMPUTER VISION-BASED SYSTEM FOR REAL-TIME POSTURE ASSESSMENT IN HOME-BASED WORKOUT ENHANCEMENT",
    authors: "Abot, Nicolei Faith",
  },
  {
    session: "Session 1",
    venue: "Rm. 305 OLP",
    time: "11:40AM - 12:00PM",
    label:
      "Conversion from Nondeterminism to Determinism at the Rule Level of Spiking Neural P Systems with Structural Plasticity",
    authors: "Jimenez, Zechariah; Cabarle, Francis George",
  },
  {
    session: "Session 1",
    venue: "Rm. 305 OLP",
    time: "12:00PM - 12:20PM",
    label: "Dynamic Load Balancing and Parallel Non-Maximum Suppres",
    authors:
      "Lanting, Kurt; Chio, Mikhail Anton; Buño, Kelvin; Cabarle, Francis; de la Cruz, Ren Tristan; Ko, Daryll",
  },
  {
    session: "Session 2",
    venue: "Rm. 306 OLP",
    time: "11:00AM - 11:20AM",
    label: "On the Notions of Soundness in Spiking Neural P Systems",
    authors: "Ramirez, Ronnie II; Cabarle, Francis George",
  },
  {
    session: "Session 2",
    venue: "Rm. 306 OLP",
    time: "11:20AM - 11:40AM",
    label: "Parallel Permutation Testing for One-Way ANOVA Using CUDA",
    authors:
      "Lasala, Kyle Carlo; Manlises, Maria Monica; Go, Daphne Janelyn; Uy, Roger Luis",
  },
  {
    session: "Session 2",
    venue: "Rm. 306 OLP",
    time: "11:40AM - 12:00PM",
    label:
      "FRIAD-IR: A Framework for Image-Augmented Dynamic Information Retrieval",
    authors:
      "Heffron, Joaquin; Calabia, Bastian Nathaniel; Regonia, Paul Rossener; Gabud, Roselyn",
  },
  {
    session: "Session 2",
    venue: "Rm. 306 OLP",
    time: "12:00PM - 12:20PM",
    label:
      "Adaptive Shot Allocation for Quantum Observable with Statistical Guarantees",
    authors: "Pontiveros, Marc Jermaine; Adorna, Henry",
  },
  {
    session: "Session 3",
    venue: "Rm. 303 OLP",
    time: "11:00AM - 11:20AM",
    label:
      "Machine Learning-Based Regional K-12 Enrollment Forecasting and Volatility Classification for Adaptive Resource Allocation in the Philippines",
    authors: "Cardaño, Mc Sergel; Bulio, Nice; Muñez-Paglinawan, Neila",
  },
  {
    session: "Session 3",
    venue: "Rm. 303 OLP",
    time: "11:20AM - 11:40AM",
    label:
      "Handwritten Gregg Shorthand Brief Forms Recognition Using Convolutional Neural Networks",
    authors: "Silva, Lysha; Paglinawan-Muñez, Neila",
  },
  {
    session: "Session 3",
    venue: "Rm. 303 OLP",
    time: "11:40AM - 12:00PM",
    label:
      "Integrating Adaptive Mechanisms for Feature Selection with Mayfly Algorithm, Monarch Butterfly Optimization, and Monarch Mayfly Optimization",
    authors:
      "Antoque, Jane; Paglinawan-Muñez, Neila; Lucero, Samuel; Pillodar, Frence Clifford",
  },
  {
    session: "Session 3",
    venue: "Rm. 303 OLP",
    time: "12:00PM - 12:20PM",
    label:
      "Mixture of Experts with Soft Nearest Neighbor Loss: Resolving Expert Collapse via Representation Disentanglement",
    authors: "Agarap, Abien Fred; Azcarraga, Arnulfo",
  },
  {
    session: "Session 4",
    venue: "Rm. 304 OLP",
    time: "11:00AM - 11:20AM",
    label:
      "Predictive Models for Solar Energy Output: Performance Evaluation of K-Means and GMM Clustering with Model Interpretability",
    authors: "Jakosalem, Carlos Miguel; Abrenica, Francis Rale",
  },
  {
    session: "Session 4",
    venue: "Rm. 304 OLP",
    time: "11:20AM - 11:40AM",
    label:
      "Early Dengue Diagnosis using Machine Learning on Structured Clinical and Hematological Data",
    authors:
      "Natavio, Rani Jay; Guanzon, Katelyn Leigh; Paglinawan-Muñez, Neila",
  },
  {
    session: "Session 4",
    venue: "Rm. 304 OLP",
    time: "11:40AM - 12:00PM",
    label:
      "Comparative Study of MobileNetV2 and Hybrid MobileNetV2 with SVM Classifier for Efficient Waste Classification in Low-Resource Environments",
    authors: "Torayno, Earl Jay; Asaria, J Faye Champ; Paglinawan-Muñez, Neila",
  },
  {
    session: "Session 4",
    venue: "Rm. 304 OLP",
    time: "12:00PM - 12:20PM",
    label:
      "Apparent Age Estimation: Challenges and Outcomes - A Comparative Analysis on Apparent Age Estimation Methods and Datasets",
    authors:
      "Go, Justin Rainier; Marqueses, Lorenz Bernard; Martinez, Mikaella Kaye; Agarap, Abien Fred; Sarmiento, John Kevin Patrick",
  },
];

const day2PapersPM: SubItem[] = [
  {
    session: "Session 1 (PM)",
    venue: "Rm. 305 OLP",
    time: "2:30PM - 2:50PM",
    label: "Gated Learning-Progress Exploration",
    authors:
      "Tumampos, Mikael Vincent; Guirnela, Ervin Joshua; Peña, Christine",
  },
  {
    session: "Session 1 (PM)",
    venue: "Rm. 305 OLP",
    time: "2:50PM - 3:10PM",
    label:
      "DermaTector: Increasing Efficiency in Diagnostics of Sun-Induced Skin Diseases Utilizing EfficientNet",
    authors:
      "Llamera, Josh Mickel; Marticio, Viktor Harold; Paule, Faith Moselle",
  },
  {
    session: "Session 1 (PM)",
    venue: "Rm. 305 OLP",
    time: "3:10PM - 3:30PM",
    label:
      "GaitAware: A Lightweight Hybrid Gait Analysis System Using BlazePose-BiLSTM and CNN for Identifying Potential Gait Abnormalities",
    authors:
      "Binanitan, John Rebb; Bautista, Timothy James; Espino, Zalzon III",
  },
  {
    session: "Session 1 (PM)",
    venue: "Rm. 305 OLP",
    time: "3:30PM - 3:50PM",
    label:
      "Neuro-Symbolic AI and Autoformalization: Restoring Determinism in the Age of Probabilistic Computing",
    authors: "ISANAN, JUNEL ALJE",
  },
  {
    session: "Session 2 (PM)",
    venue: "Rm. 306 OLP",
    time: "2:30PM - 2:50PM",
    label:
      "Defending against Membership Inference Attacks through Contrastive Representation Learning",
    authors:
      "Agarap, Abien Fred; Aguinaldo, Miguel Anton; Madrigal, Rafael; Benavides, Inigo Miguel; Venturina, Sara Ann",
  },
  {
    session: "Session 2 (PM)",
    venue: "Rm. 306 OLP",
    time: "2:50PM - 3:10PM",
    label:
      "An Ensemble Prediction Model Using LightGBM and Bidirectional LSTM for Bitcoin Price Dip Detection",
    authors: "Barria, Rameses; Pilapil, Marc Dylan; Peña, Christine",
  },
  {
    session: "Session 2 (PM)",
    venue: "Rm. 306 OLP",
    time: "3:10PM - 3:30PM",
    label: "Nonbalanced and Nonhomogenous Spiking Neural dP Systems",
    authors:
      "Naraval, Victor Dominic; Cabarle, Francis George; Buño, Kelvin; de la Cruz, Ren Tristan; Ko, Daryll Carlsten",
  },
  {
    session: "Session 2 (PM)",
    venue: "Rm. 306 OLP",
    time: "3:30PM - 3:50PM",
    label:
      "Uncertainty-Aware Temporal Transformer Modeling with Masked Self-Attention and Missingness Encoding for Early Sepsis Risk Stratification from ICU Time-Series Data",
    authors:
      "Floreta, Zak; Bitayo, Brix; Binangbang, Derrick; Omictin, Jether; Pardillo, Jun Albert",
  },
  {
    session: "Session 3 (PM)",
    venue: "Rm. 303 OLP",
    time: "2:30PM - 2:50PM",
    label:
      "A Hybrid Machine Learning Framework for Predictive Maintenance of Bearings in Philippine Power Plants",
    authors:
      "Consunji, Beaux Nathania Immanuelle; Muli, Lamberlain; Zapico, Joshua Paolo; Vergara, John Paul",
  },
  {
    session: "Session 3 (PM)",
    venue: "Rm. 303 OLP",
    time: "2:50PM - 3:10PM",
    label:
      "Accelerating Symptom Detection in Canine Ocular Diseases: A Comparative Analysis and Heterogeneous Ensemble of YOLOv8 and RT-DETR",
    authors: "Rosillosa, Kristian Angelo Ray; Manlangit, Venzhower",
  },
  {
    session: "Session 3 (PM)",
    venue: "Rm. 303 OLP",
    time: "3:10PM - 3:30PM",
    label:
      "A Scalable and Computationally Efficient Implementation of a Macroscopic Traffic Model for Urban Networks",
    authors: "Soriano, Jaymar",
  },
  {
    session: "Session 3 (PM)",
    venue: "Rm. 303 OLP",
    time: "3:30PM - 3:50PM",
    label:
      "Distributed SNP: A High-Performance Hybrid MPI+CUDA Framework for Spiking Neural P Systems",
    authors:
      "Lipat, Job; Luzada, Jarred Sueño; Cabarle, Francis George; Martínez-del-Amor, Miguel Ángel; Orellana-Martín, David",
  },
  {
    session: "Session 4 (PM)",
    venue: "Rm. 304 OLP",
    time: "2:30PM - 2:50PM",
    label:
      "TUDLO: Parameter-Efficient Fine-Tuning for Tagalog and Cebuano Early-Grade Mathematics Explanation Generation",
    authors: "Ramos, Trisha Jean, Roxas, Rachel Edita",
  },
  {
    session: "Session 4 (PM)",
    venue: "Rm. 304 OLP",
    time: "2:50PM - 3:10PM",
    label:
      "Evaluating Large Language Models in Filipino Underspecified, Multi-Turn Conversations",
    authors: "Pintor, Renee Rosary; Wang, Lisa Juress; Pepito, Glenn",
  },
  {
    session: "Session 4 (PM)",
    venue: "Rm. 304 OLP",
    time: "3:10PM - 3:30PM",
    label:
      "MAMBO (Multi AI Model Bench Operations): A Framework for Dynamic Model Switching and Benchmarking On-Device AI",
    authors: "Bernabe, Marveen Antonio; Madrid, Val Randolf",
  },
  {
    session: "Session 4 (PM)",
    venue: "Rm. 304 OLP",
    time: "3:30PM - 3:50PM",
    label:
      "Galaw at Gunita: Extended Reality Murals for Experiencing Filipino Art",
    authors:
      "Delos Reyes, Jomar; Dy, Sealtiel; Sales, Rica Mae; Uy, Orrin Landon; Monserrat, Toni-Jan Keith; Fernandez, Ryan Austin; Deja, Jordan Aiko",
  },
];

const day3Papers: SubItem[] = [
  {
    session: "Session 1",
    venue: "Rm. 305 OLP",
    time: "9:15AM - 9:35AM",
    label:
      "Towards More Empathic Programming Environments - An Experimental Empathic AI-Enhanced IDE",
    authors:
      "Go, Justin Rainier; Caliboso, Roemer Gabriel; Andaya, Kurt Christian; Go, Aaron Daniel; Cu, Jocelynn",
  },
  {
    session: "Session 1",
    venue: "Rm. 305 OLP",
    time: "9:35AM - 9:55AM",
    label:
      "Augmenting a Force Directed Layout Algorithm in Drawing Adjacent Transposition Graphs",
    authors: "Antonio, Harold; Albarracin, Francis; Ordanel, Ivy",
  },
  {
    session: "Session 1",
    venue: "Rm. 305 OLP",
    time: "9:55AM - 10:15AM",
    label:
      "Novel CUDA and Segment Tree-Accelerated Simulated Annealing Approaches to the Time-Dependent Knapsack Problem",
    authors:
      "Chua, Harvey Shawn; Asturiano, Christian Emmanuel; Uy, Nicole Kate; Uy, Roger Luis",
  },
  {
    session: "Session 1",
    venue: "Rm. 305 OLP",
    time: "10:15AM - 10:35AM",
    label: "Judo Throw Recognition Using Computer Vision Techniques",
    authors: "Arenas, Angelo Gabriel; Madrid, Val Randol; Araneta, Jesus",
  },
  {
    session: "Session 2",
    venue: "Rm. 306 OLP",
    time: "9:15AM - 9:35AM",
    label:
      "Toward Multimodal Monitoring of Systemic Lupus Erythematosus: A Swin-SNN Cross-Modal Attention Approach",
    authors: "Manulat, Thomas Danjo",
  },
  {
    session: "Session 2",
    venue: "Rm. 306 OLP",
    time: "9:35AM - 9:55AM",
    label:
      "Evaluation of Target Encoding Methods Across Linear and Tree-Based Models for Cardiovascular Disease Prediction",
    authors: "Cahilog, Kenneth; Linao, Carl Andrew; Peña, Christine",
  },
  {
    session: "Session 2",
    venue: "Rm. 306 OLP",
    time: "9:55AM - 10:15AM",
    label:
      "Scrum vs. Extreme Programming (XP) vs Kanban in the Age of AI and DevOps: A Comparative Analysis of Cultural Resilience to Modern Development Challenges",
    authors: "Bernardez, Fernand; Torres, Francis Luis",
  },
  {
    session: "Session 2",
    venue: "Rm. 306 OLP",
    time: "10:15AM - 10:35AM",
    label:
      "ATHENA: An Image Captioning Pipeline for Constrained Underwater Environments",
    authors: "Roy, Rodrigo Emmanuel; Chan, Krisha Anne",
  },
  {
    session: "Session 3",
    venue: "Rm. 307 OLP",
    time: "9:15AM - 9:35AM",
    label:
      "Self-Training an Image Binary Classification Model using a Multi-Agent System",
    authors:
      "Cambarijan, Angel Sheinen; Repuesto, Charlene; Talip, Deo; Bajo, Jake; Aliac, Chris Jordan",
  },
  {
    session: "Session 3",
    venue: "Rm. 307 OLP",
    time: "9:35AM - 9:55AM",
    label:
      "ReHaPT: Integrating Machine Learning and Computer Vision for a Hand Rehabilitation Recognition System",
    authors:
      "Paguiligan, James Archer; Azcarraga, Judith; Cataluña, Jorice Erika; Seperidad, Abigail",
  },
  {
    session: "Session 3",
    venue: "Rm. 307 OLP",
    time: "9:55AM - 10:15AM",
    label:
      "Bridging the Gap Between Synthetic and Real Handwriting: Using Visual AI to Accurately Parse Structured Logic Proofs",
    authors:
      "Bascug, Felisa Melanie Fay; Gemina, Roddneil; Mendoza, Basil Xavier; Arellano, Catherine",
  },
  {
    session: "Session 3",
    venue: "Rm. 307 OLP",
    time: "10:15AM - 10:35AM",
    label:
      "Queue Management System with Smart Feedback, Sentiment Analysis and Geolocation in Holy Child College of Davao",
    authors: "Chan, Amy Rosal; Fabian, Alrheem",
  },
  {
    session: "Session 4",
    venue: "Rm. 304 OLP",
    time: "9:15AM - 9:35AM",
    label:
      "Integrating Deep Learning Models to Improve Cheating Detection in UPOU's Specialized Online Assessment Platform",
    authors: "Tuazon, Joseph",
  },
  {
    session: "Session 4",
    venue: "Rm. 304 OLP",
    time: "9:35AM - 9:55AM",
    label:
      "Solving the Senior High School Timetabling Problem using a Multi-Agent Reinforcement Learning Approach",
    authors:
      "Reyes, Alroy Leon; Cabredo, Rafael; Cuya, Vhonne; Ocampo, Gabriel",
  },
  {
    session: "Session 4",
    venue: "Rm. 304 OLP",
    time: "9:55AM - 10:15AM",
    label:
      "Birdview: Human Crowd Density Visualization Tool from Video Feed to Floor Plan using Deep Learning and Homography",
    authors: "Dela Cruz, Shanmykel Ace; Regis, Michael Anthony Jay",
  },
  {
    session: "Session 4",
    venue: "Rm. 304 OLP",
    time: "10:15AM - 10:35AM",
    label:
      "Technical Validation of an MDP-Based Adaptive Geometry Learning System via Q-Learning and LLM Hints",
    authors:
      "Abellana, Paul Thomas; Chavez, Francis Benedict; Catubig, Niña Margarette; Sta Romana, Cherry Lyn; Tito, Almara",
  },
  {
    session: "Session 5",
    venue: "Rm. 303 OLP",
    time: "9:15AM - 9:35AM",
    label:
      "Analysis of Machine Learning Approaches for Real-Time Human Exercise Classification Using Pose Estimation Joint Angles",
    authors: "Limbo, Moses",
  },
  {
    session: "Session 5",
    venue: "Rm. 303 OLP",
    time: "9:35AM - 9:55AM",
    label: "Sign Lang: Developing a VR Game for FSL Learning",
    authors: "Chan, Caryl Rae; Abarico, Michelle Kim Angela; Vidal, Eric",
  },
  {
    session: "Session 5",
    venue: "Rm. 303 OLP",
    time: "9:55AM - 10:15AM",
    label:
      "FIRE!: A Fire Simulation Game that Educates Filipinos on Fire Safety",
    authors:
      "Benito, Matthew Josh Benedict; Gomez, Enrique Jose Stefan; Que, Nate Brevin",
  },
  {
    session: "Session 5",
    venue: "Rm. 303 OLP",
    time: "10:15AM - 10:35AM",
    label: "Text Mining Analysis of Review Bombing Incidents in Filipino Films",
    authors:
      "Gonzales, Joshua Nicolai; Cariaga, Josh Enrico; Alonzo, Ron Fourier; Barcelita, Aaron John; Reyes, Nathaniel Kurt; Gonda, Raphael",
  },
];

const programSchedule: DayProgram[] = [
  {
    day: "April 23, 2026",
    dayNumber: "Day 1",
    date: "April 23",
    weekday: "Thursday",
    schedule: [
      {
        time: "8:00AM - onwards",
        activity: "Registration",
        venue: "OLP Hall",
        eventType: "default",
      },
      {
        time: "8:00AM – 10:30AM",
        activity: "Parallel Workshops",
        subItems: workshops123,
        eventType: "parallel",
        badge: "Workshop",
      },
      {
        time: "10:30AM – 10:45AM",
        activity: "Morning Snacks",
        venue: "OLP Hall",
        eventType: "break",
      },
      {
        time: "10:45AM – 12:00NN",
        activity: "Parallel Workshops (cont.)",
        subItems: workshops123,
        eventType: "parallel",
        badge: "Workshop",
      },
      {
        time: "12:00PM – 1:00PM",
        activity: "Lunch Break",
        venue: "OLP Hall",
        eventType: "break",
      },
      {
        time: "1:00PM – 2:30PM",
        activity: "Parallel Workshops (cont.)",
        subItems: workshops12345,
        eventType: "parallel",
        badge: "Workshop",
      },
      {
        time: "2:30PM – 2:45PM",
        activity: "Afternoon Snacks",
        venue: "OLP Hall",
        eventType: "break",
      },
      {
        time: "2:45PM – 5:00PM",
        activity: "Parallel Workshops (cont.)",
        subItems: workshops12345,
        eventType: "parallel",
        badge: "Workshop",
      },
    ],
  },
  {
    day: "April 24, 2026",
    dayNumber: "Day 2",
    date: "April 24",
    weekday: "Friday",
    schedule: [
      {
        time: "8:00AM – 9:00AM",
        activity: "Registration",
        venue: "OLP Hall",
        eventType: "default",
      },
      {
        time: "9:00AM – 9:15AM",
        venue: "OLP Hall",
        badge: "Opening",
        eventType: "featured",
        activity: (
          <>
            <strong className="text-base">Opening Ceremonies</strong>
            <div className="mt-2 space-y-2 text-sm text-white/80">
              <div>
                <p className="font-semibold text-white/60 text-xs uppercase tracking-wider mb-1">
                  Welcome Messages
                </p>
                <p>
                  <em>S. Ma. Leonora Espallardo, RVM</em> — VP Administration,
                  University of the Immaculate Conception
                </p>
                <p>
                  <em>Mr. Ceasar Ian P. Benablo, MIT</em> — Dean, CCS,
                  University of the Immaculate Conception
                </p>
              </div>
              <div>
                <p className="font-semibold text-white/60 text-xs uppercase tracking-wider mb-1">
                  Opening Remarks
                </p>
                <p>
                  <em>Dr. Cherry Lyn Sta. Romana</em> — President, CSP; Dean,
                  CCS, Cebu Institute of Technology University
                </p>
                <p>
                  <em>Dr. Judith J. Azcarraga</em> — Vice President, CSP; PCSC
                  2026 Conference Chair; Associate Professor, De La Salle
                  University
                </p>
                <p>
                  <em>Assoc Prof. Kristine Mae M. Adlaon</em> — Secretary, CSP;
                  PCSC 2026 Local-Conference Chair; Associate Professor,
                  University of the Immaculate Conception
                </p>
              </div>
            </div>
          </>
        ),
      },
      {
        time: "9:15AM – 10:00AM",
        venue: "OLP Hall",
        badge: "Plenary Talk 1",
        eventType: "featured",
        speakerImage: "/images/talks/sison.JPG",
        speakerName: "Prof. Raymund Sison",
        activity: (
          <>
            <strong className="text-base">
              "Quality Education in Resource-challenged Schools with the help of
              Technology"
            </strong>
            <p className="mt-1 text-sm text-white/80">
              <em>Prof. Raymund Sison</em> — University Fellow and Full
              Professor, College of Computer Studies, De La Salle University
            </p>
          </>
        ),
      },
      {
        time: "10:00AM – 10:15AM",
        activity: "Morning Snacks",
        venue: "OLP Hall",
        eventType: "break",
      },
      {
        time: "10:15AM – 11:00AM",
        venue: "OLP Hall",
        badge: "Plenary Talk 2",
        eventType: "featured",
        speakerImage: "/images/talks/virtusio.JPG",
        speakerName: "Dr. John Jethro Virtusio",
        activity: (
          <>
            <strong className="text-base">
              "Computer Vision Applications Across Disciplines"
            </strong>
            <p className="mt-1 text-sm text-white/80">
              <em>Dr. John Jethro Virtusio</em> — College of Computer Studies,
              De La Salle University
            </p>
          </>
        ),
      },
      {
        time: "11:00AM – 12:30PM",
        activity: "Parallel Sessions (Paper Presentations)",
        subItems: day2PapersAM,
        eventType: "parallel",
        badge: "Session",
      },
      {
        time: "12:30PM – 1:30PM",
        activity: "Lunch Break",
        venue: "OLP Hall",
        eventType: "break",
      },
      {
        time: "1:30PM – 2:15PM",
        venue: "OLP Hall",
        badge: "Plenary Talk 3",
        eventType: "featured",
        speakerImage: "/images/talks/mariano.jpeg",
        speakerName: "Dr. Vladimir Mariano",
        activity: (
          <>
            <strong className="text-base">
              "Embodied AI for All: Bringing Intelligence to the Physical Edge"
            </strong>
            <p className="mt-1 text-sm text-white/80">
              <em>Dr. Vladimir Mariano</em> — NICER Project, National University
            </p>
          </>
        ),
      },
      {
        time: "2:15PM – 2:30PM",
        activity: "Afternoon Snacks",
        venue: "OLP Hall",
        eventType: "break",
      },
      {
        time: "2:30PM – 4:00PM",
        activity: "Parallel Sessions (Paper Presentations)",
        subItems: day2PapersPM,
        eventType: "parallel",
        badge: "Session",
      },
      {
        time: "4:00PM – 5:30PM",
        venue: "OLP Hall",
        badge: "Fireside Chat",
        eventType: "featured",
        activity: (
          <>
            <strong className="text-base">Oldies but Goldies</strong>
            <p className="mt-1 text-sm text-white/80 italic">
              "Advances and Challenges in Computing Research in the Age of AI"
            </p>
            <p className="mt-1 text-sm text-white/80">
              Facilitated by: <em>Dr. Henry Adorna</em>
            </p>
          </>
        ),
      },
      {
        time: "5:30PM – 6:00PM",
        activity: "Board Meeting and President's Report",
        venue: "OLP Hall",
        eventType: "default",
      },
      {
        time: "6:00PM – 8:00PM",
        activity: "Conference Dinner",
        venue: "OLP Hall",
        eventType: "default",
      },
    ],
  },
  {
    day: "April 25, 2026",
    dayNumber: "Day 3",
    date: "April 25",
    weekday: "Saturday",
    schedule: [
      {
        time: "8:00AM – 9:00AM",
        activity: "Registration",
        venue: "OLP Hall",
        eventType: "default",
      },
      {
        time: "9:00AM – 9:15AM",
        activity: "Opening Remarks / Recapitulation",
        venue: "OLP Hall",
        eventType: "default",
      },
      {
        time: "9:15AM – 10:45AM",
        activity: "Parallel Sessions (Short Paper Presentations)",
        subItems: day3Papers,
        eventType: "parallel",
        badge: "Session",
      },
      {
        time: "10:45AM – 11:00AM",
        activity: "Morning Snacks",
        venue: "OLP Hall",
        eventType: "break",
      },
      {
        time: "11:00AM – 12:30PM",
        venue: "OLP Hall",
        badge: "Closing",
        eventType: "featured",
        activity: (
          <>
            <strong className="text-base">Closing Ceremonies</strong>
            <div className="mt-2 space-y-0.5 text-sm text-white/80">
              <p>Results of Election of New Board Members</p>
              <p>Announcement of Special Awards</p>
            </div>
          </>
        ),
      },
      {
        time: "12:30PM – 1:30PM",
        activity: "Lunch Break",
        venue: "OLP Hall",
        eventType: "break",
      },
    ],
  },
];

const eventTypeIcon: Record<EventType, ReactNode> = {
  featured: <Star className="h-3.5 w-3.5" />,
  parallel: <Users className="h-3.5 w-3.5" />,
  break: <Coffee className="h-3.5 w-3.5" />,
  default: <CalendarDays className="h-3.5 w-3.5" />,
};

const eventTypeBadgeClass: Record<EventType, string> = {
  featured: "bg-amber-400/20 text-amber-300 border border-amber-400/30",
  parallel: "bg-sky-400/20 text-sky-300 border border-sky-400/30",
  break: "bg-white/10 text-white/50 border border-white/10",
  default: "bg-white/10 text-white/60 border border-white/10",
};

const eventTypeCardClass: Record<EventType, string> = {
  featured:
    "border-l-4 border-l-amber-400 bg-brick-red-800/80 border border-white/10",
  parallel:
    "border-l-4 border-l-sky-400 bg-brick-red-800/60 border border-white/10",
  break: "bg-transparent border border-dashed border-white/15",
  default: "bg-brick-red-800/60 border border-white/10",
};

type TimelineRowProps = {
  slot: TimeSlot;
  isLast: boolean;
};

const TimelineRow = ({ slot, isLast }: TimelineRowProps) => {
  const type = slot.eventType ?? "default";
  const isBreak = type === "break";
  const hasPaperSubItems = slot.subItems?.some(
    (sub) => sub.session && sub.time && sub.authors,
  );

  return (
    <div className="timeline-row flex gap-0 sm:gap-4 group">
      {/* Left: time + rail */}
      <div className="hidden sm:flex flex-col items-center w-36 shrink-0">
        <span className="text-xs font-mono text-white/50 text-right w-full leading-tight pt-1">
          {slot.time}
        </span>
      </div>

      {/* Center: dot + vertical line */}
      <div className="hidden sm:flex flex-col items-center shrink-0 w-6">
        <div
          className={`mt-2 h-2.5 w-2.5 rounded-full shrink-0 ring-2 ring-offset-2 ring-offset-brick-red-950 z-10 ${
            type === "featured"
              ? "bg-amber-400 ring-amber-400/50"
              : type === "parallel"
                ? "bg-sky-400 ring-sky-400/50"
                : type === "break"
                  ? "bg-white/20 ring-white/10"
                  : "bg-white/40 ring-white/20"
          }`}
        />
        {!isLast && <div className="w-px flex-1 bg-white/10 mt-1" />}
      </div>

      {/* Right: card */}
      <div className="flex-1 pb-4 min-w-0">
        {/* Mobile: time badge */}
        <div className="sm:hidden mb-1">
          <span className="text-xs font-mono text-white/50">{slot.time}</span>
        </div>

        {isBreak ? (
          <div
            className={`rounded-lg px-4 py-2.5 flex items-center gap-3 ${eventTypeCardClass[type]}`}
          >
            <Coffee className="h-3.5 w-3.5 shrink-0 text-white/40" />
            <span className="text-sm text-white/50">
              {slot.activity as string}
            </span>
            {slot.venue && (
              <span className="ml-auto flex items-center gap-1 text-xs text-white/30">
                <MapPin className="h-3 w-3" />
                {slot.venue}
              </span>
            )}
          </div>
        ) : (
          <div
            className={`rounded-lg p-4 transition-colors hover:brightness-110 ${eventTypeCardClass[type]}`}
          >
            {/* Badge row */}
            {slot.badge && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${eventTypeBadgeClass[type]}`}
              >
                {eventTypeIcon[type]}
                {slot.badge}
              </span>
            )}

            {/* Activity + Speaker Image */}
            <div className="flex items-start gap-4">
              <div className="flex-1 text-white leading-snug min-w-0">
                {slot.activity}
              </div>
              {slot.speakerImage && (
                <div className="shrink-0 flex flex-col items-center gap-1.5">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden ring-2 ring-amber-400/40 ring-offset-2 ring-offset-brick-red-800">
                    <Image
                      src={slot.speakerImage}
                      alt={slot.speakerName ?? "Speaker"}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Venue */}
            {slot.venue && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-white/50">
                <MapPin className="h-3 w-3 shrink-0" />
                {slot.venue}
              </div>
            )}

            {/* SubItems */}
            {slot.subItems && slot.subItems.length > 0 && (
              <div className="mt-3">
                {hasPaperSubItems ? (
                  <div className="space-y-3">
                    {Object.values(
                      slot.subItems.reduce<Record<string, SubItem[]>>(
                        (acc, sub) => {
                          const session = sub.session ?? "Session";
                          const venue = sub.venue ?? "Venue TBA";
                          const key = `${session}|${venue}`;
                          if (!acc[key]) {
                            acc[key] = [];
                          }
                          acc[key].push(sub);
                          return acc;
                        },
                        {},
                      ),
                    ).map((sessionPapers) => {
                      const [firstPaper] = sessionPapers;
                      return (
                        <div
                          key={`${firstPaper.session}-${firstPaper.venue}`}
                          className="rounded-md bg-brick-red-950/50 border border-white/10 px-3 py-3"
                        >
                          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between mb-2">
                            <p className="text-xs font-semibold text-white/85 uppercase tracking-wide">
                              {firstPaper.session}
                            </p>
                            {firstPaper.venue && (
                              <p className="flex items-center gap-1 text-xs text-white/45">
                                <MapPin className="h-2.5 w-2.5 shrink-0" />
                                {firstPaper.venue}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            {sessionPapers.map((paper) => (
                              <div
                                key={`${paper.session}-${paper.time}-${paper.label}`}
                                className="rounded-md border border-white/10 bg-brick-red-900/40 px-2.5 py-2"
                              >
                                {paper.time && (
                                  <p className="text-[11px] font-mono uppercase tracking-wide text-sky-200/80">
                                    {paper.time}
                                  </p>
                                )}
                                <p className="mt-1 text-xs text-white/90 leading-snug">
                                  {paper.label}
                                </p>
                                {paper.authors && (
                                  <p className="mt-1 text-xs text-white/55 leading-snug">
                                    {paper.authors}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                    {slot.subItems.map((sub) => (
                      <div
                        key={sub.label}
                        className="rounded-md bg-brick-red-950/50 border border-white/10 px-3 py-2"
                      >
                        <p className="text-xs text-white/90 leading-snug">
                          {sub.label}
                        </p>
                        {sub.venue && (
                          <p className="mt-1 flex items-center gap-1 text-xs text-white/40">
                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                            {sub.venue}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProgramPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = pageRef.current?.querySelectorAll(".timeline-row") ?? [];

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const headers = pageRef.current?.querySelectorAll(".day-header") ?? [];
      headers.forEach((header) => {
        gsap.fromTo(
          header,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-[116px] bg-brick-red-950">
      <PageHero title="Program" />

      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        {/* Intro */}
        <p className="text-white text-base sm:text-lg max-w-3xl text-center mx-auto mb-16">
          The 26th Philippine Computing Science Congress is organized by the{" "}
          <a
            href="https://csp.org.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brick-red-200 underline underline-offset-2"
          >
            Computing Society of the Philippines
          </a>{" "}
          to enable local and neighboring computing educators, researchers, ICT
          professionals, and students to interact and share their work in
          computing, computer science, computational science, and ICT.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {(["featured", "parallel", "break", "default"] as EventType[]).map(
            (t) => (
              <span
                key={t}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${eventTypeBadgeClass[t]}`}
              >
                {eventTypeIcon[t]}
                {t === "featured"
                  ? "Plenary / Keynote"
                  : t === "parallel"
                    ? "Parallel Sessions"
                    : t === "break"
                      ? "Break"
                      : "General"}
              </span>
            ),
          )}
        </div>

        {/* Days */}
        <div className="space-y-20">
          {programSchedule.map((dayProgram) => (
            <section
              key={dayProgram.day}
              id={dayProgram.dayNumber.toLowerCase().replace(" ", "-")}
            >
              {/* Day Header */}
              <div className="day-header flex items-center gap-4 mb-8">
                <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-brick-red-700 border border-white/20">
                  <span className="text-xs font-bold text-white/60 uppercase tracking-widest leading-none">
                    {dayProgram.weekday.slice(0, 3)}
                  </span>
                  <span className="text-2xl font-black text-white leading-none">
                    {dayProgram.date.split(" ")[1]}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-brick-red-300">
                      {dayProgram.dayNumber}
                    </span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-xs text-white/50">
                      {dayProgram.weekday}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {dayProgram.day}
                  </h2>
                </div>
                <div className="flex-1 h-px bg-white/10 ml-2 hidden sm:block" />
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                {dayProgram.schedule.map((slot, index) => (
                  <TimelineRow
                    key={`${dayProgram.day}-${index}`}
                    slot={slot}
                    isLast={index === dayProgram.schedule.length - 1}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProgramPage;
