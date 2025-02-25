const SearchBar = () => {
  return (
    <div className="bg-orange-500 py-4">
      <div className="max-w-7xl mx-auto px-4 flex gap-2">
        <input
          type="text"
          placeholder="Start your search..."
          className="flex-1 px-4 py-2 rounded-md"
        />
        <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
          Create Package
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
