import { useLoaderData } from "react-router-dom";

function List() {
    const list = useLoaderData();

    if (!list) return <div>Loading...</div>;

    return (
        <div>
            <h1>{list.title}</h1>
            <p>{list.description}</p>
        </div>
    );
}

export default List;