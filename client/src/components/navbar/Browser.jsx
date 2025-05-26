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
    setIsOpen(true);
  };

  const handleClick = () => {
    setIsOpen((prev) => !prev);
    setSearchTerm("");
  };

  const handleBlur = () => {
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
    <div className="relative w-80">
      <div className="relative">
        <input
          type="text"
          placeholder="Search a project"
          value={searchTerm}
          onChange={handleChange}
          onClick={handleClick}
          onBlur={handleBlur}
          className="pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-[#f56b79] w-full"
        />
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <ul className="absolute top-full left-0 bg-gray-800/80 text-gray-200 border rounded-md shadow-md w-full z-50">
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
