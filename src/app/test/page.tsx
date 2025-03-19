import RepositoriesTable from "@/components/RepositoriesTable/RepositoriesTable";

export default function TestPage(){

    const repos = [
        {
            "id":0,
            "name": "Web-Project",
            "createdAt": "2023-05-15",
            "updatedAt": "2025-03-18",
            "size": "15MB",
            "commits": 245,
            "branches": 3,
            "description": "Web application for task management"
        },
        {
            "id":1,
            "name": "Node-API",
            "createdAt": "2024-01-10",
            "updatedAt": "2025-03-17",
            "size": "8MB",
            "commits": 187,
            "branches": 2,
            "description": "RESTful API in Node.js for authentication"
        },
        {
            "id":2,
            "name": "Mobile-App",
            "createdAt": "2023-11-20",
            "updatedAt": "2025-03-19",
            "size": "25MB",
            "commits": 312,
            "branches": 4,
            "description": "Mobile application for habit tracking"
        }
    ];

    return <div>
        <span>Testando o RepositoriesTable</span>
        <RepositoriesTable repositories={repos}/>
    </div>
}