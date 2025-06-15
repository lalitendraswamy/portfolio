import {
  logo,
  backend,
  creator,
  mobile,
  web,
  github,
  menu,
  close,
  css,
  gearXpert,
  project2,
  project3,
  // yt_keyword,
  // emoji_game,
  // insta_clone,
  mysql,
  express,
  aws,
  azure,
  mui,
  gsap,
  framer,
  figma,
  git,
  html,
  javascript,
  mongodb,
  nodejs,
  reactjs,
  redux,
  tailwind,
  threejs,
  firstTestimonial,
  secondTestimonial,
  thirdTestimonial,
  prapun_kumar,
  venkat_reddy,
  prem_kumar,
} from "../assets";

// Import Tekisky separately
import g7cr_logo from "../assets/company/g7cr_logo.png";
import ve_logo from "../assets/company/ve_logo.png";
import yt_keyword from "../assets/yt_keyword.webp";
import emoji_game from "../assets/emoji_game.webp";
import insta_clone from "../assets/insta_clone.webp";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full-Stack Developer",
    icon: web,
  },
  {
    title: "Frontend Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Ui UX Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },

  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },

  {
    name: "Material Ui",
    icon: mui,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Express Js",
    icon: express,
  },
  {
    name: "Azure",
    icon: azure,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "MySql",
    icon: mysql,
  },

  {
    name: "git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Software Engineer",
    company_name: "G7 CR Technologies",
    icon: g7cr_logo,
    iconBg: "#383E56",
    date: "Jul 2024 - present",
    points: [
      "Developing and maintaining web applications using MERN technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Vihaan Electrix",
    icon: ve_logo,
    iconBg: "#383E56",
    date: "Dec 2023 - Mar 2024",
    points: [
      "Designed and built a personal branding website using the MERN stack, leading to a 30% increase in user engagement.",
      "Developed a Blog Management System with React.js, Node.js, and MongoDB, reducing content publication time by 50%.",
      "Implemented SEO strategies that boosted search engine rankings by 40% and increased organic traffic by 60%.",
      "Gained hands-on experience with JavaScript, React.js, Node.js, Express.js, and MongoDB while working in a collaborative team setting.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Lalitendra proved me wrong.",
    name: "Nallamilli Venkata Reddy",
    designation: "CEO",
    company: "Vihaan Electrix",
    image: venkat_reddy,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Lalitendra does.",
    name: "Prem Kumar Vanamu",
    designation: "COO",
    company: "Teckybot",
    image: prem_kumar,
  },
  {
    testimonial:
      "After Lalitendra optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Prapun Kumar Illapani",
    designation: "CEO",
    company: "MetaIntrospec",
    image: prapun_kumar,
  },
];

const projects = [
  {
    name: "Youtube Keyword Search Volume",
    description:
      "Youtube Keyword search volume provides valuable insights into the popularity of a term i.e, searched on YouTube....",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "bootstrap",
        color: "white-text-gradient",
      },
      {
        name: "node",
        color: "pink-text-gradient",
      },
    ],
    image: yt_keyword,
    source_code_link:
      "https://github.com/lalitendraswamy/youtubeKeywordSearchVolume",
  },
  {
    name: "Emoji Game",
    description:
      "React-based Emoji Game, which includes score tracking, win/lose conditions, and high score functionality...",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
    ],
    image: emoji_game,
    source_code_link: "https://github.com/lalitendraswamy/emojiGame",
  },
  {
    name: "Insta Share",
    description:
      "Insta Share is a clone of Instagram, which includes REST API calls for username/password authentication with client-side storage...",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "express",
        color: "white-text-gradient",
      },
      {
        name: "node",
        color: "green-text-gradient",
      },
    ],
    image: insta_clone,
    source_code_link: "https://github.com/lalitendraswamy/instaClone",
  },
];

export { services, technologies, experiences, testimonials, projects };
