import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getProjectsByUserId } from "../../utils/project.js";

function Browser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userProjects = await getProjectsByUserId();
        setProjects(userProjects);
      } catch (error) {
        console.error("Error loading projects: ", error);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = projects.filter((project) =>
      project.title.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
    setIsOpen(true); // abre el desplegable cuando escribes
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev); // alterna el desplegable al hacer clic
    setSearchTerm("");
  };

  const handleBlur = () => {
    // Cierra el desplegable al hacer clic fuera
    setTimeout(() => setIsOpen(false), 100);
    setSearchTerm("");
  };

  const handleSelect = (id) => {
    setSearchTerm("");
    setResults([]);
    setIsOpen(false);
    navigate(`/project/${id}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search a project"
        value={searchTerm}
        onChange={handleChange}
        onClick={handleClick}
        onBlur={handleBlur}
        className="px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-[#f56b79] w-80"
      />
      {isOpen && results.length > 0 && (
        <ul className="absolute top-full left-0 bg-gray-800/80 text-gray-200 border rounded-md shadow-md w-80 z-50">
          {results.map((project) => (
            <li
              key={project._id}
              onMouseDown={() => handleSelect(project._id)}
              className="px-2 py-1 hover:bg-gray-700 cursor-pointer bg-gray-600 truncate"
              title={project.title}
            >
              {project.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Browser;
