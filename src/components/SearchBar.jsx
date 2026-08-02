function SearchBar({ search, setSearch }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="🔍 Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;