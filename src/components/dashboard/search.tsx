interface SearchBarProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder,
    value,
    onChange,
  }) => {
    return (
      <input
        type="text"
        className="border border-gray-300 rounded-lg p-3 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-[#1b232e] dark:text-white"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  };
  