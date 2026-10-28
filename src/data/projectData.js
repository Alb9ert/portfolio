import minesweeper1 from "../assets/projectdetails/minesweeper1.svg";
import indoornav1 from "../assets/projectdetails/indoornav1.png";
import indoornav2 from "../assets/projectdetails/indoornav2.png";
import indoornav3 from "../assets/projectdetails/indoornav3.png";
import indoornav4 from "../assets/projectdetails/indoornav4.png";
import booklyCover from "../assets/projects/booklyFront.jpg";
import boligbotCover from "../assets/projects/boligbotFront.png";
import educadoCover from "../assets/projects/educadoFront2.jpg";
import cookaiCover from "../assets/projects/cookaiFront2.jpg";
import cybermatchCover from "../assets/projects/cybermatchFront2.png";
import pseudomatCover from "../assets/projects/pseudomatFront2.png";

import bookly1 from "../assets/projectdetails/bookly1.png";
import bookly2 from "../assets/projectdetails/bookly2.png";
import bookly3 from "../assets/projectdetails/bookly3.png";
import bookly4 from "../assets/projectdetails/bookly4.png";
import bookly5 from "../assets/projectdetails/bookly5.png";
import bookly6 from "../assets/projectdetails/bookly6.png";
import bookly7 from "../assets/projectdetails/bookly7.png";

import cookai1 from "../assets/projectdetails/cookai1.png";
import cookai2 from "../assets/projectdetails/cookai2.png";
import cookai3 from "../assets/projectdetails/cookai3.png";
import cookai4 from "../assets/projectdetails/cookai4.png";

import cybermatch1 from "../assets/projectdetails/cybermatch1.png";
import cybermatch2 from "../assets/projectdetails/cybermatch2.png";
import cybermatch3 from "../assets/projectdetails/cybermatch3.png";
import cybermatch4 from "../assets/projectdetails/cybermatch4.png";

import pseudomat1 from "../assets/projectdetails/pseudomat1.png";
import pseudomat2 from "../assets/projectdetails/pseudomat2.png";
import pseudomat3 from "../assets/projectdetails/pseudomat3.png";
import pseudomat4 from "../assets/projectdetails/pseudomat4.png";

import boligbot1 from "../assets/projectdetails/boligbot1.png";
import boligbot2 from "../assets/projectdetails/boligbot2.png";
import boligbot3 from "../assets/projectdetails/boligbot3.png";

import educado1 from "../assets/projectdetails/educado1.png";
import educado2 from "../assets/projectdetails/educado2.jpg";
import educado3 from "../assets/projectdetails/educado3.png";

export const projectData = {
  bookly: {
    title: "Bookly",
    type: "Web app",
    year: "2025",
    cover: booklyCover,
    month: "January",
    description: "Your personal library assistant",
    details:
      "Bookly is a book tracking and recommendation platform where readers keep track of what they've read, what they're reading now and what they want to read next. Personal recommendations are generated from each user's ratings and reading history, and a fast search across the Google Books and Open Library catalogues makes any title easy to find. A friend system lets users follow what the people they know are reading. The goal was to beat apps like Goodreads on usability, with a cleaner UI and a smoother experience, and Bookly grew to around 30 regular users. Building it taught me a lot about user management and how to design applications that handle large amounts of data. Not everything is solid yet: the authentication in particular isn't built as securely as it should be, and some bugs remain. Seeing those weaknesses up close taught me how authentication should be done properly, and that's a lesson I take into future projects.",
    images: [bookly1, bookly2, bookly3, bookly4, bookly5, bookly6, bookly7],
    techStack: ["React", "Express", "TypeScript", "SQL Database", "Google Books API", "Open Library API"],
    liveLink: "https://bookly-teal-six.vercel.app/",
    features: [
      "Personal book recommendations",
      "Search algorithm",
      "Handling large amounts of data",
      "API integrations",
      "Friend system",
    ],
  },
  boligbot: {
    title: "BoligBot",
    type: "Web app",
    year: "2025",
    cover: boligbotCover,
    month: "September",
    description: "An apartment agent that notifies you when new rental apartments in Copenhagen are listed",
    details:
      "BoligBot watches the rental listings on Kereby and Heimstaden and sends a WhatsApp message the moment a new apartment in Copenhagen goes up. The Copenhagen rental market is extremely competitive and good apartments are often gone within minutes, so being first matters. Scheduled cron jobs scrape the sites around the clock, detect new listings and notify every user in real time. And it worked: BoligBot helped two of my friends land the apartments they live in today. The service is currently closed to new users, but the site is still live, so you can look around.",
    images: [boligbot1, boligbot2, boligbot3],
    techStack: [
      "React",
      "WhatsApp API",
      "Cron Jobs",
      "TypeScript",
      "Cheerio/Axios Webscraping",
      "MongoDB",
      "TailwindCSS",
    ],
    liveLink: "https://boligbot.vercel.app",
    liveNote: "Closed to new users, but the site is still live to explore",
    features: ["Web scraping", "Scheduled cron jobs", "WhatsApp notifications"],
  },
  educado: {
    title: "Educado",
    type: "Mobile app",
    year: "2025",
    cover: educadoCover,
    month: "December",
    description: "Educado is a collaborative project between universities.",
    details:
      "The project is owned by Egalitarian, an organisation backed by the European Union through the Erasmus+ programme and devoted to both the management of waste in Brazil and increasing the opportunities for the waste workers at the country's biggest dumpsite. Egalitarian is a collaboration between the University of Brasília (Brazil), Minho University (Portugal), Saxion University (the Netherlands), and Aalborg University (Denmark). The project taught me how to work in large organizational structures, and I personally got the oppurtunity to go to the Netherlands.",
    images: [educado1, educado2, educado3],
    techStack: ["React Native", "Strapi", "PostgreSQL", "CI/CD"],
    githubLink: "https://github.com/ErasmusEgalitarian",
    features: [
      "Complex project management",
      "CI/CD pipelines",
      "Text translations",
      "Reducing technical debt",
    ],
  },
  cookai: {
    title: "CookAI",
    type: "Website",
    year: "2024",
    cover: cookaiCover,
    month: "February",
    description: "An AI recipe assistant: enter the ingredients you have and get recipes back",
    details:
      "CookAI was the very first website I built. You enter the ingredients you have, the AI suggests recipes for both food and drinks, and you can save your favourites for later. Honestly, it's not well made: it's written in plain HTML, CSS and JavaScript without any framework, and it shows. But the idea was strong, and it pulled in a lot of users right after launch. As general AI assistants got better, they made a dedicated recipe app less necessary and the usage faded. Even so, it's the project that taught me the most early on, from integrating the OpenAI API into a real application to handling users and authentication with JWT, and it showed me how much the details matter once real people use what you build.",
    readMore: {
      label: "The Guardian: a supermarket's AI meal planner that suggested dangerous recipes",
      href: "https://www.theguardian.com/world/2023/aug/10/pak-n-save-savey-meal-bot-ai-app-malfunction-recipes",
    },
    images: [cookai1, cookai2, cookai3, cookai4],
    techStack: [
      "OpenAI API",
      "HTML",
      "CSS",
      "JavaScript",
      "MongoDB",
      "Express",
      "Git",
    ],
    features: ["OpenAI integration", "Authentication with JWT", "My first website: rough, but it taught me a lot"],
  },
  cybermatch: {
    title: "CyberMatch",
    type: "Web app",
    year: "2024",
    cover: cybermatchCover,
    month: "September",
    description:
      "A cyber security company website that allows users to search for jobs and internships in the cyber security field.",
    details:
      "CyberMatch was a collaboration project me and my friends did with the company CyberMinds. What is most intersting about this project is the use of Affinda which allowed users to simply upload their resume and the AI would extract the information and store it in a database. Overall it is a cyber security company website that allows users to search for jobs and internships in the cyber security field. It also allows users to post their own jobs and internships. The focus of the project has been making a thought through system architechture as well as working as a group effiently.",
    images: [cybermatch1, cybermatch2, cybermatch3, cybermatch4],
    techStack: [
      "Java",
      "PostgreSQL",
      "Spring Boot",
      "Affinda API",
      "HTML",
      "CSS",
      "Git",
    ],
    features: ["Document processing", "Anonymous data handling", "Social media features"],
  },
  pseudomat: {
    title: "PseudoMat",
    type: "Programming language",
    year: "2025",
    cover: pseudomatCover,
    month: "December",
    description:
      "An interpeter to execute a pseudo like language with built in mathematical features.",
    details:
      "An interpeter to execute a pseudo like language with built in mathematical features. It was a collaboration project we did at Aalborg University in Denmark. The focus of the project was designing and implementing a new programming language. I've learnt how to a language is made from scratch and what steps are needed to execute it.",
    images: [pseudomat1, pseudomat2, pseudomat3, pseudomat4],
    githubLink: "https://github.com/DandingB/PseudoMat",
    techStack: ["Ocaml", "OCamllex", "OCamlparser", "Dune", "Git"],

    features: [
      "Built in mathematical features",
      "Interpreter",
      "Parser",
      "Lexer",
    ],
  },
  minesweeper: {
    title: "Minesweeper",
    type: "Terminal game",
    year: "2023",
    month: "October",
    cover: minesweeper1,
    description: "The classic game, written in C and played right in the terminal",
    details:
      "Minesweeper was the first program I ever built: the classic game, written in C and played right in the terminal. It's far from pretty. Everything lives in one big file, and the code shows I was just starting out. But building it without any external libraries meant writing all the game logic myself, from placing the mines and counting neighbours to revealing empty areas and detecting wins and losses, which turned out to be surprisingly complex. It's also the project where I learned to use Git, and it was a lot of fun to make.",
    images: [minesweeper1],
    githubLink: "https://github.com/Alb9ert/Minesweeper",
    techStack: ["C", "Git"],
    features: ["Complete Minesweeper game", "No external libraries"],
  },
  indoornav: {
    title: "Indoor Nav",
    type: "Web app (PWA)",
    year: "2026",
    month: "June",
    stared: true,
    cover: indoornav1,
    description: "Indoor navigation system for the AAU Copenhagen campus",
    details:
      "Indoor Nav is my bachelor project: a full-stack web app that helps students and staff find their way around Aalborg University's Copenhagen campus. You search for any room, pick a simple, fast or accessible route, and get directions across floors and buildings, shown on an interactive 2D map or a 3D view of the stacked floors. Routes are calculated with A* pathfinding over a graph of the buildings, and the floor plans are calibrated against real-world coordinates so positions on the map match the actual campus. Spatial data lives in PostgreSQL with PostGIS, and the floors are rendered in 3D with Three.js. It's the most complex software design I've worked on.",
    images: [indoornav1, indoornav2, indoornav3, indoornav4],
    liveLink: "https://nav.ollioddi.dk/",
    githubLink: "https://github.com/AAU-Bachelor-Group/Indoor-nav",
    techStack: ["React", "TanStack Start", "TypeScript", "Three.js", "PostgreSQL + PostGIS", "Prisma", "Tailwind CSS", "Docker", "Vitest", "Zod"],
    features: ["3D modelling", "A* pathfinding", "Complex software design", "Real-world floor plan calibration"],
  },
};

// Projects ordered newest first, numbered 01, 02, ... in that order. Used by the project
// list and the "Next project" link, so new projects slot in by their date automatically.
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateValue = (p) => Number(p.year) * 12 + Math.max(MONTHS.indexOf(p.month), 0);

export const projectsByDate = Object.entries(projectData)
  .map(([id, project]) => ({ id, ...project }))
  .sort((a, b) => dateValue(b) - dateValue(a))
  .map((project, i) => ({ ...project, number: String(i + 1).padStart(2, "0") }));
