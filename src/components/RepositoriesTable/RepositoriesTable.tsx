export default function RepositoriesTable({ repositories, page, setPage }) {
  return (
    <div>
      {repositories.map((repository) => (
        <div key={repository.id}>{repository.name}</div>
      ))}
      <div>
        <button onClick={() => setPage((prev) => prev - 1)}>prev</button>
        <button onClick={() => setPage((prev) => prev + 1)}>next</button>
      </div>
    </div>
  );
}
