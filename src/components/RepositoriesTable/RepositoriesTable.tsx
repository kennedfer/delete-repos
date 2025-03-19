
interface Repository  {
  "id": number,
  "name": string,
  "createdAt": string,
  "updatedAt": string,
  "size": string,
  "commits": number,
  "branches": number,
  "description": string
}

function TableHead() {
  return <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Name</th>
      <th scope="col">Description</th>
      <th scope="col">Created At</th>
      <th scope="col">Last Update</th>
      <th scope="col">Size</th>
      <th scope="col">Commits</th>
      <th scope="col">Branches</th>
    </tr>
  </thead>
}

function TableBody({repositories}){
  console.log(repositories)

  return <tbody>
    {
      repositories.map((repository: Repository) => 
        <tr>
          <th scope="row"><input type="checkbox" /></th>
          <td>{repository.name}</td>
          <td>{repository.description}</td>
          <td>{repository.createdAt}</td>
          <td>{repository.updatedAt}</td>
          <td>{repository.size}</td>
          <td>{repository.commits}</td>
          <td>{repository.branches}</td>
        </tr>
      )
    }
  </tbody>
}

export default function RepositoriesTable({ repositories }) {
  return (
    <div>
      <table col>
        <TableHead/>
        <TableBody repositories={repositories}/>
      </table>
      <div>
        <button>prev</button>
        <button>next</button>
      </div>
    </div>
  );
}
