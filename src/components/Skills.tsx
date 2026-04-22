import {
  FileCode2,        // HTML5
  SquareCode,       // CSS3
  Braces,           // JavaScript
  Atom,             // React
  Palette,          // Tailwind CSS
  Server,           // Node.js
  Route,            // Express
  Database,         // MongoDB
  GitBranch,        // Git
  Github,           // GitHub
  PenTool,          // Figma
  Terminal,         // General coding
} from "lucide-react";

const Skills = () => {
  const skills = [
    { name: "HTML5", icon: <FileCode2 className="text-orange-600" size={32} /> },
    { name: "CSS3", icon: <SquareCode className="text-blue-600" size={32} /> },
    { name: "JavaScript", icon: <Braces className="text-yellow-500" size={32} /> },
    { name: "React", icon: <Atom className="text-cyan-500" size={32} /> },
    { name: "Tailwind CSS", icon: <Palette className="text-teal-500" size={32} /> },
    { name: "Node.js", icon: <Server className="text-green-600" size={32} /> },
    { name: "Express", icon: <Route className="text-gray-700" size={32} /> },
    { name: "MongoDB", icon: <Database className="text-green-500" size={32} /> },
    { name: "Git", icon: <GitBranch className="text-red-600" size={32} /> },
    { name: "GitHub", icon: <Github className="text-gray-800" size={32} /> },
    { name: "Figma", icon: <PenTool className="text-purple-600" size={32} /> },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50" id="skills">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          My Skills
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center gap-3 hover:shadow-lg transition duration-200 border border-gray-100"
            >
              <div className="text-4xl">{skill.icon}</div>
              <span className="font-medium text-gray-700">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;