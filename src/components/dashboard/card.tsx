interface ProjectCardProps {
    title: string;
    description: string;
    onEdit: () => void;
    onVisit: () => void;
  }
  
  export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    onEdit,
    onVisit,
  }) => {
    return (
      <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white transition hover:shadow-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between">
          <button
            onClick={onVisit}
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Visit Project
          </button>
          <button
            onClick={onEdit}
            className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Edit
          </button>
        </div>
      </div>
    );
  };
  