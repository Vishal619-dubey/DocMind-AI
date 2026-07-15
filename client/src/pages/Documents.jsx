import SearchBar from "../components/documents/SearchBar";
import FilterBar from "../components/documents/FilterBar";
import DocumentGrid from "../components/documents/DocumentGrid";

export default function Documents() {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        My Documents
      </h1>

      <p className="text-slate-400 mt-2">
        Manage all your uploaded files.
      </p>

      <SearchBar />

      <FilterBar />

      <DocumentGrid />

    </div>
  );
}