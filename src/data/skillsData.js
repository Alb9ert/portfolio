import {
  siTypescript, siJavascript, siOpenjdk, siC, siPython, siOcaml,
  siReact, siReactquery, siTailwindcss, siVite, siHtml5, siNextdotjs,
  siNodedotjs, siExpress, siGo, siSpringboot, siFastapi, siGraphql,
  siJsonwebtokens, siZod, siStripe,
  siMongodb, siPostgresql,
  siGit, siGithubactions, siDocker, siLinux,
  siJest, siEslint,
  siOpenai, siClaude,
  siUml, siScrumalliance,
} from "simple-icons";

// How much I use each skill, instead of made-up percentages
export const levels = {
  daily: { label: "Daily", bars: 3, description: "What I build with at work and in my projects" },
  confident: { label: "Confident", bars: 2, description: "Shipped real things with it" },
  familiar: { label: "Familiar", bars: 1, description: "Used it and can get up to speed fast" },
};

// `icon` is a Simple Icons entry. Skills without a brand logo get either a coloured
// text `badge` or a generic `glyph` (see GLYPHS in Skills.jsx), both tinted by `color`
export const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", level: "daily", icon: siTypescript },
      { name: "JavaScript", level: "daily", icon: siJavascript },
      { name: "Java", level: "confident", icon: siOpenjdk },
      { name: "C", level: "confident", icon: siC },
      { name: "Go", level: "confident", icon: siGo },
      { name: "SQL", level: "confident", badge: "SQL", color: "#336791" },
      { name: "PowerShell", level: "confident", badge: "PS", color: "#5391FE" },
      { name: "Python", level: "familiar", icon: siPython },
      { name: "VBA", level: "familiar", badge: "VBA", color: "#867DB1" },
      { name: "OCaml", level: "familiar", icon: siOcaml },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: "daily", icon: siReact },
      { name: "TanStack", level: "daily", icon: siReactquery },
      { name: "Tailwind CSS", level: "daily", icon: siTailwindcss },
      { name: "Vite", level: "daily", icon: siVite },
      { name: "HTML & CSS", level: "daily", icon: siHtml5 },
      { name: "React Native", level: "confident", icon: siReact },
      { name: "Next.js", level: "familiar", icon: siNextdotjs },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: "daily", icon: siNodedotjs },
      { name: "Express", level: "daily", icon: siExpress },
      { name: "REST APIs", level: "daily", badge: "API", color: "#10B981" },
      { name: "Authentication", level: "confident", icon: siJsonwebtokens },
      { name: "Validation", level: "confident", icon: siZod },
      { name: "Payments", level: "confident", icon: siStripe },
      { name: "Spring Boot", level: "familiar", icon: siSpringboot },
      { name: "Python web APIs", level: "familiar", icon: siFastapi },
      { name: "GraphQL", level: "familiar", icon: siGraphql },
    ],
  },
  {
    title: "Data",
    skills: [
      { name: "Document databases", level: "daily", icon: siMongodb },
      { name: "Relational databases", level: "confident", icon: siPostgresql },
      { name: "ORMs", level: "daily", glyph: "database", color: "#0EA5E9" },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Git & GitHub", level: "daily", icon: siGit },
      { name: "GitHub Actions CI/CD", level: "daily", icon: siGithubactions },
      { name: "Docker", level: "confident", icon: siDocker },
      { name: "Linux & terminal", level: "confident", icon: siLinux },
      { name: "Hosting & deployment", level: "confident", glyph: "cloud", color: "#6366F1" },
      { name: "Power Automate", level: "confident", badge: "PA", color: "#0066FF" },
      { name: "Azure", level: "familiar", badge: "Az", color: "#0078D4" },
    ],
  },
  {
    title: "Testing & Quality",
    skills: [
      { name: "Testing", level: "confident", icon: siJest },
      { name: "Linting", level: "confident", icon: siEslint },
      { name: "Static code analysis", level: "familiar", glyph: "scan", color: "#F59E0B" },
    ],
  },
  {
    title: "AI",
    skills: [
      { name: "LLM integration", level: "daily", icon: siOpenai },
      { name: "AI coding tools", level: "daily", icon: siClaude },
    ],
  },
  {
    title: "Fundamentals & Design",
    skills: [
      { name: "Data structures & algorithms", level: "confident", glyph: "graph", color: "#EC4899" },
      { name: "Design patterns", level: "confident", glyph: "shapes", color: "#14B8A6" },
      { name: "UML", level: "confident", icon: siUml },
      { name: "System architecture modelling", level: "confident", glyph: "diagram", color: "#8B5CF6" },
      { name: "Agile / Scrum", level: "confident", icon: siScrumalliance },
    ],
  },
];
