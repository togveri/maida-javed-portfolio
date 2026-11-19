// All content below is sourced from github.com/MaidaJaved23 (profile README + public repositories).

export const profile = {
  name: "Maida Javed",
  handle: "MaidaJaved23",
  github: "https://github.com/MaidaJaved23",
  role: "Software Developer · Full-Stack Web Developer",
  degree: "BSCS Graduate",
  university: "Virtual University of Pakistan",
  location: "Pakistan",
  belief:
    "I believe technology is at its best when it solves real problems, simplifies everyday experiences, and creates opportunities for people.",
  intro:
    "Computer Science Graduate (BSCS) from the Virtual University of Pakistan, with practical project experience in full-stack web development, Python programming, database management, and responsive application development.",
  exploring:
    "Beyond software development, I continue exploring Artificial Intelligence, prompt engineering, Internet of Things (IoT), networking, and cybersecurity. My certifications from Cisco Networking Academy and Coursera reflect my commitment to continuous learning.",
  bring:
    "A problem-solving mindset, curiosity, adaptability, attention to detail, and a genuine interest in turning ideas into practical applications. I value clean development practices, thoughtful database design, user-focused functionality, and collaborative learning.",
  goal:
    "To contribute to a forward-thinking technology team as a Software Developer or Full-Stack Web Developer, gain hands-on industry experience, work on real-world products, and continuously grow into an accomplished software engineer.",
  signoff: "Designed with curiosity, code, and a steady supply of tea.",
  stats: { repos: 7, followers: 11, certifications: 9, languages: 4 },
};

export type FeaturedProject = {
  title: string;
  kind: string;
  stack: string[];
  points: string[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Food Waste Reduction System",
    kind: "Full-stack web application",
    stack: ["PHP", "MySQL", "Bootstrap", "JavaScript", "HTML", "CSS"],
    points: [
      "Designed and implemented a CRUD-based application to streamline food donation workflows.",
      "Developed an interactive dashboard to monitor donation status and NGO availability.",
      "Implemented role-based access control for Donors and NGOs.",
      "Designed normalized database schemas to support donation requests.",
    ],
  },
  {
    title: "Online Book Sharing Platform",
    kind: "Python web application",
    stack: ["Python", "Django / Flask", "HTML", "CSS", "Bootstrap", "JavaScript"],
    points: [
      "Built a peer-to-peer book-swapping platform with modular backend structure.",
      "Implemented location-based search to filter book availability within geographic radii.",
      "Created a responsive, mobile-friendly interface.",
      "Developed inventory features for listing, tracking, and managing book collections.",
    ],
  },
];

export type Repo = {
  name: string;
  title: string;
  language: "Python" | "HTML";
  summary: string;
  concepts: string[];
  preview?: string;
  stars?: number;
};

const gh = (r: string) => `https://github.com/MaidaJaved23/${r}`;
export const repoUrl = gh;

export const repos: Repo[] = [
  {
    name: "Personal-Finance-Student-Attendance-Management-System",
    title: "Personal Finance & Student Attendance",
    language: "HTML",
    summary:
      "Two console programs for a training institute: an Expense Tracker that saves and reloads expenses from CSV, and an Attendance Cleaner that tidies names and counts unique students.",
    concepts: ["File handling", "Exceptions", "Sets", "Comprehensions"],
    preview:
      "https://maidajaved23.github.io/Personal-Finance-Student-Attendance-Management-System/preview.html",
    stars: 1,
  },
  {
    name: "Smart-Grocery-Store-Management-System",
    title: "Smart Grocery Store Management",
    language: "Python",
    summary:
      "Menu-driven console app that manages products, stock, sales and reports: add, search, update stock, process sales, and generate a store report with low-stock alerts.",
    concepts: ["Lists of dicts", "Loops", "Conditionals", "Functions"],
  },
  {
    name: "Python-Conditions-and-Loops",
    title: "Scholarship & Pharmacy Systems",
    language: "Python",
    summary:
      "Two applications: a Student Scholarship Eligibility System using conditional rules, and a Smart Pharmacy Inventory & Sales system that calculates revenue and flags restocking.",
    concepts: ["if / elif / else", "for loops", "Validation", "ER diagram"],
    preview: "https://maidajaved23.github.io/Python-Conditions-and-Loops/preview.html",
  },
  {
    name: "Smart-Electricity-Bill-Calculator",
    title: "Smart Electricity Bill Calculator",
    language: "HTML",
    summary:
      "Calculates tiered electricity bills for multiple households, validates input, and reports total revenue, successful calculations, the average bill and the highest bill.",
    concepts: ["while / for loops", "Accumulators", "try / except", "Tiered logic"],
    preview: "https://maidajaved23.github.io/Smart-Electricity-Bill-Calculator/preview.html",
  },
  {
    name: "Smart-Canteen-Discount-System",
    title: "Smart Canteen Discount System",
    language: "HTML",
    summary:
      "A college-canteen bill program that applies tiered and membership-based discounts, showing the original bill, discount rate, discount amount and final payable amount.",
    concepts: ["Conditionals", "String methods", "f-strings", "Percentages"],
    preview: "https://maidajaved23.github.io/Smart-Canteen-Discount-System/preview.html",
  },
  {
    name: "Python-Functions-Strings-and-Lists-Assessment",
    title: "Functions, Strings, Lists & Tuples",
    language: "HTML",
    summary:
      "Assessment covering reusable functions, string slicing and formatting, lists and tuples — with a Class Marks Analyzer and a Result Card Generator, plus an animated visual preview.",
    concepts: ["*args / **kwargs", "Slicing", "List comprehension", "Tuples"],
    preview:
      "https://maidajaved23.github.io/Python-Functions-Strings-and-Lists-Assessment/preview.html",
  },
];

export type SkillGroup = { title: string; icon: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { title: "Backend & Programming", icon: "code", items: ["Python", "PHP", "C++", "Django", "Flask"] },
  { title: "Frontend", icon: "layout", items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery"] },
  { title: "Databases", icon: "database", items: ["MySQL", "PostgreSQL", "SQL", "Microsoft SQL Server"] },
  {
    title: "Networking & Linux",
    icon: "network",
    items: ["Linux", "Cisco Packet Tracer", "Wireshark", "Git"],
  },
  {
    title: "Tools & Design",
    icon: "palette",
    items: ["VS Code", "PyCharm", "XAMPP", "Figma", "Canva", "Photoshop", "VirtualBox"],
  },
];

export const additionalTools = [
  "Dev-C++",
  "Visual Studio",
  "MySQL Workbench",
  "VMware",
  "Kali Linux",
  "Microsoft Office Suite",
];

export const competencies = [
  {
    area: "Software Development",
    detail: "Full-stack web development, object-oriented programming (OOP), API integration",
  },
  { area: "Web Interfaces", detail: "Responsive design, Bootstrap-based UI development" },
  { area: "Databases", detail: "SQL, MySQL, PostgreSQL, database normalization" },
  {
    area: "Networking & Security",
    detail: "Network configuration (L2/L3), cybersecurity fundamentals, Linux",
  },
  { area: "Problem Solving", detail: "Data structures and algorithms, analysis of algorithms" },
];

export const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    short: "BS Computer Science",
    school: "Virtual University of Pakistan",
    status: "Completed",
    cgpa: "3.01",
    coursework: [
      "Artificial Intelligence",
      "Fundamentals of Algorithms",
      "Data Warehousing",
      "Linear Algebra",
      "Statistics and Probability",
      "Theory of Automata",
      "Digital Logic Design",
      "Cloud Computing",
    ],
  },
  {
    degree: "Associate Degree in Computer Science",
    short: "Associate Degree",
    school: "Virtual University of Pakistan",
    status: "Completed",
    cgpa: "3.16",
    coursework: [
      "Object-Oriented Programming",
      "Data Structures and Algorithms",
      "Computer Networks",
      "Visual Programming",
      "Discrete Mathematics",
      "Software Engineering II",
      "Web Design and Development",
      "Relational Database Management Systems",
      "Information Security",
    ],
  },
];

export const certifications = [
  { title: "Digital Awareness", issuer: "Cisco Networking Academy" },
  { title: "Cyber Threat Management", issuer: "Cisco Networking Academy" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy" },
  { title: "Introduction to Modern AI", issuer: "Cisco Networking Academy" },
  { title: "Prompt Like an Engineer", issuer: "Cisco Networking Academy" },
  { title: "AI for Brainstorming and Planning", issuer: "Coursera" },
  { title: "AI Fundamentals", issuer: "Coursera" },
  { title: "IoT for Everyone", issuer: "Coursera" },
  { title: "Python", issuer: "Coursera" },
];

export const languages = [
  { name: "Urdu", level: "Native", value: 100 },
  { name: "English", level: "B2", value: 75 },
  { name: "Mandarin Chinese", level: "HSK1 & HSK2", value: 35 },
  { name: "Arabic", level: "Basic", value: 20 },
];

export const interests = [
  "Artificial Intelligence",
  "Prompt Engineering",
  "Internet of Things",
  "Networking",
  "Cybersecurity",
];
