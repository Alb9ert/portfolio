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






export const projectData = {
    bookly: {
      number: "(01)",
      title: "Bookly",
      description: "Your personal library assistant",
      details: "Bookly is a book recomendation system that allows users to track read books, currently reading books, and books to read. It also allows users to search for books and get recommendations based on their interests. Additionaly you can add your friends and see what they are reading. The focus of the project has been making a clean UI and effiecent UX to beat competitors like Goodreads.",
      images: [bookly1, bookly2, bookly3, bookly4, bookly5, bookly6, bookly7],
      techStack: ["React", "Node.js", "Express", "MongoDB", "TailwindCSS", "TypeScript", "Google Books API", "Open Library API", "MERN Stack"],
      liveLink: "https://bookly-teal-six.vercel.app/",
      features: ["User authentication", "User profile", "User library", "User settings", "Book search", "Book recommendations", "Book tracking", "Friend system"],
    },
    cookai: {
      number: "(02)",
      title: "CookAI",
      description: "An AI recipe assistant, where you input ingredients and recieve recipes",
      details: "An AI recipe assistant, where you input ingredients and the AI will suggest recipes. Both drinkable and eatable recipes are supported. You can also save your favorite recipes for later. This project was made with the goal of learning how to use the OpenAI API and how to use it in a real world application. An intersting article that I read since is https://www.theguardian.com/world/2023/aug/10/pak-n-save-savey-meal-bot-ai-app-malfunction-recipes where someone has tried to make a recipe assistant and it malfunctioned.",
      images: [cookai1, cookai2, cookai3, cookai4],
      techStack: ["OpenAI API", "HTML", "CSS", "JavaScript", "MongoDB", "Express", "Git"],
      liveLink: "https://cookai.dk",
      features: ["Recommendation system", "User authentication", "User profile", "User library", "User settings"],
    },
    cybermatch: {
      number: "(03)",
      title: "CyberMatch",
      description: "A cyber security company website that allows users to search for jobs and internships in the cyber security field.",
      details: "CyberMatch was a collaboration project me and my friends did with the company CyberMinds. What is most intersting about this project is the use of Affinda which allowed users to simply upload their resume and the AI would extract the information and store it in a database. Overall it is a cyber security company website that allows users to search for jobs and internships in the cyber security field. It also allows users to post their own jobs and internships. The focus of the project has been making a thought through system architechture as well as working as a group effiently.",
      images: [cybermatch1, cybermatch2, cybermatch3, cybermatch4],
      techStack: ["Java", "PostgreSQL", "Spring Boot", "Affinda API", "HTML", "CSS", "Git"],
      features: ["Job search", "Job posting", "Internship search", "Internship posting", "Company profile", "Company listing", "Resume parsing", "AI-powered job matching"],
    },
    pseudomat: {
      number: "(04)",
      title: "PseudoMat",
      description: "An interpeter to execute a pseudo like language with built in mathematical features.",
      details: "An interpeter to execute a pseudo like language with built in mathematical features. It was a collaboration project we did at Aalborg University in Denmark. The focus of the project was designing and implementing a new programming language. I've learnt how to a language is made from scratch and what steps are needed to execute it.",
      images: [pseudomat1, pseudomat2, pseudomat3, pseudomat4],
      githubLink: "https://github.com/DandingB/PseudoMat",
      techStack: ["Ocaml", "OCamllex", "OCamlparser", "Dune", "Git"],

      features: ["Well defined language", "Built in mathematical features", "Interpreter", "Parser", "Lexer"],
    },
  };