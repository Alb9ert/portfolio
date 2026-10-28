
 // Lightweight natural-language project search: drops filler words, expands
// everyday words into related tech terms, tolerates small typos and ranks results.

const STOPWORDS = new Set(
  "a an and any app apps are about built by can do does for find from have i in is it me made my of on or project projects show some something that the to use used uses using what where which with you".split(" ")
);

// Everyday word -> terms that appear in the project data
const CONCEPTS = [
  [["ai", "ml", "llm", "gpt", "chatgpt", "intelligence", "smart", "openai"], ["openai", "ai", "affinda", "recommendation"]],
  [["database", "databases", "db", "data", "storage", "sql"], ["mongodb", "postgresql", "sql", "strapi"]],
  [["mobile", "phone", "ios", "android"], ["react native"]],
  [["web", "website", "websites", "frontend", "site", "ui"], ["react", "html", "css", "tailwindcss", "website"]],
  [["backend", "server", "api", "apis"], ["express", "node.js", "spring boot", "api", "strapi"]],
  [["language", "compiler", "interpreter", "parser", "parsing"], ["interpreter", "parser", "lexer", "ocaml", "language"]],
  [["scraping", "scraper", "crawler", "crawling"], ["webscraping", "cheerio"]],
  [["notification", "notifications", "alert", "alerts", "whatsapp", "message"], ["whatsapp", "notification"]],
  [["book", "books", "reading", "library"], ["book", "library"]],
  [["food", "recipe", "recipes", "cooking", "cook", "drinks"], ["recipe"]],
  [["job", "jobs", "career", "recruiting", "cv", "resume", "internship"], ["job", "resume", "internship"]],
  [["housing", "apartment", "apartments", "rent", "rental", "home"], ["apartment", "rental"]],
  [["security", "cyber", "cybersecurity"], ["cyber security"]],
  [["education", "learning", "course", "courses", "school", "university", "teaching"], ["course", "universities"]],
  [["java"], ["java", "spring boot"]],
  [["typescript", "ts"], ["typescript"]],
  [["javascript", "js"], ["javascript", "node.js", "react"]],
  [["math", "maths", "mathematical"], ["mathematical"]],
  [["team", "collaboration", "group"], ["collaboration", "collaborative"]],
];

// Levenshtein distance capped at 2, enough for spotting typos
function distance(a, b) {
  if (Math.abs(a.length - b.length) > 2) return 3;

  const row = Array.from({ length: b.length + 1 }, (_, i) => i);

  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];

      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1)
      );

      prev = tmp;
    }
  }

  return row[b.length];
}

const tokenize = (text) =>
  text.toLowerCase().split(/[^\p{L}\p{N}.+#]+/u).filter(Boolean);

// Project titles are the strongest search signal.
// Descriptions and features come next, followed by technical details.
const fields = (p) => {
  const title = (p.title ?? "").toLowerCase();

  const primary = [
    p.title,
    p.type,
    p.description,
    ...(p.features ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const secondary = [
    p.details,
    p.year,
    ...(p.techStack ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    title,
    titleTokens: tokenize(title),
    primary,
    secondary,
    all: `${primary} ${secondary}`,
    primaryTokens: tokenize(primary),
    allTokens: tokenize(`${primary} ${secondary}`),
  };
};

// Returns the strongest matches ranked by relevance, plus words to highlight.
export function searchProjects(projects, query) {
  const words = tokenize(query).filter((w) => !STOPWORDS.has(w));

  if (!words.length) {
    return { results: projects, highlights: [] };
  }

  const highlights = new Set();

  const scored = projects.map((project) => {
    const f = fields(project);
    let score = 0;
    let exactTitleMatch = false;
    let titlePrefixMatch = false;

    for (const word of words) {
      let best = 0;

      // 1. Exact title match gets the highest priority.
      if (f.titleTokens.includes(word)) {
        best = 20;
        exactTitleMatch = true;
        highlights.add(word);
      }

      // 2. Title prefixes match even for short queries:
      // "bo" -> "BoligBot", "pseudo" -> "PseudoMat".
      else if (
        word.length >= 2 &&
        f.titleTokens.some((token) => token.startsWith(word))
      ) {
        best = 15;
        titlePrefixMatch = true;
        highlights.add(word);
      }

      // 3. Exact matches in descriptions, types, and features.
      else if (f.primaryTokens.includes(word)) {
        best = 6;
        highlights.add(word);
      }

      // 4. Exact matches in secondary fields such as tech stack.
      else if (f.allTokens.includes(word)) {
        best = 3;
        highlights.add(word);
      }

      // 5. Prefix matches in other primary fields.
      else if (word.length >= 3) {
        const partial = f.primaryTokens.find((token) =>
          token.startsWith(word)
        );

        if (partial) {
          best = 2;
          highlights.add(word);
        }
      }

      // Related terms ("apartments" -> apartment, rental) add context.
      const related = CONCEPTS
        .filter(([keys]) => keys.includes(word))
        .flatMap(([, terms]) => terms);

      const hits = related.filter((term) =>
        term.includes(" ")
          ? f.all.includes(term)
          : f.allTokens.includes(term)
      );

      hits.forEach((hit) => highlights.add(hit));

      if (!best && hits.length) {
        best = 2.5;
      }

      const bonus = Math.min(hits.length, 2) * 0.5;

      // 6. Last resort: tolerate small typos.
      if (!best && word.length >= 4) {
        const typo = f.allTokens.find(
          (token) =>
            token.length >= 4 &&
            distance(word, token) <= (word.length > 6 ? 2 : 1)
        );

        if (typo) {
          best = 1;
          highlights.add(typo);
        }
      }

      score += best + bonus;
    }

    return {
      project,
      score,
      exactTitleMatch,
      titlePrefixMatch,
    };
  });

  const top = Math.max(0, ...scored.map((item) => item.score));

  return {
    results: scored
      .filter(
        (item) =>
          item.score > 0 &&
          (
            item.exactTitleMatch ||
            item.titlePrefixMatch ||
            item.score >= top * 0.3
          )
      )
      .sort((a, b) => {
        // Exact title matches always come first.
        if (a.exactTitleMatch !== b.exactTitleMatch) {
          return Number(b.exactTitleMatch) - Number(a.exactTitleMatch);
        }

        // Then title-prefix matches, including short searches like "bo".
        if (a.titlePrefixMatch !== b.titlePrefixMatch) {
          return Number(b.titlePrefixMatch) - Number(a.titlePrefixMatch);
        }

        // Otherwise rank by relevance score.
        return b.score - a.score;
      })
      .map((item) => item.project),

    highlights: [...highlights],
  };
}
