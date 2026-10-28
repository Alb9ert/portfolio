import {
  siReact, siNodedotjs, siExpress, siMongodb, siTailwindcss, siTypescript, siGoogle, siInternetarchive,
  siWhatsapp, siAxios, siStrapi, siPostgresql, siGithubactions, siOpenai, siHtml5, siCss3,
  siJavascript, siGit, siOpenjdk, siSpringboot, siOcaml, siC,
  siThreedotjs, siPrisma, siDocker, siVitest, siZod, siReactquery,
} from "simple-icons";

// Generic database logo in the same { path, hex } shape as Simple Icons, for
// projects where the specific SQL database isn't named
const sqlDatabase = {
  path: "M12 2C7.58 2 4 3.34 4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5c0-1.66-3.58-3-8-3zm0 2c3.87 0 6 .94 6 1s-2.13 1-6 1-6-.94-6-1 2.13-1 6-1zM6 7.6C7.5 8.47 9.66 9 12 9s4.5-.53 6-1.4V11c0 .5-2.2 2-6 2s-6-1.5-6-2V7.6zm0 6c1.5.87 3.66 1.4 6 1.4s4.5-.53 6-1.4V19c0 .5-2.2 2-6 2s-6-1.5-6-2v-5.4z",
  hex: "336791",
};

// Tech names as written in projectData -> Simple Icons logo.
// Anything not listed here is shown without a logo.
export const techIcons = {
  React: siReact,
  "React Native": siReact,
  "Node.js": siNodedotjs,
  Express: siExpress,
  MongoDB: siMongodb,
  TailwindCSS: siTailwindcss,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Google Books API": siGoogle,
  "Open Library API": siInternetarchive,
  "WhatsApp API": siWhatsapp,
  "Cheerio/Axios Webscraping": siAxios,
  Strapi: siStrapi,
  PostgreSQL: siPostgresql,
  "SQL Database": sqlDatabase,
  "CI/CD": siGithubactions,
  "OpenAI API": siOpenai,
  HTML: siHtml5,
  CSS: siCss3,
  Git: siGit,
  C: siC,
  TanStack: siReactquery,
  "TanStack Start": siReactquery,

  "Three.js": siThreedotjs,
  "PostgreSQL + PostGIS": siPostgresql,
  Prisma: siPrisma,
  "Tailwind CSS": siTailwindcss,
  Docker: siDocker,
  Vitest: siVitest,
  Zod: siZod,
  Java: siOpenjdk,
  "Spring Boot": siSpringboot,
  Ocaml: siOcaml,
  OCamllex: siOcaml,
  OCamlparser: siOcaml,
  Dune: siOcaml,
};
