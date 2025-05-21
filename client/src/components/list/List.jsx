import { useLoaderData } from "react-router-dom";

function List() {
    const list = useLoaderData();

    if (!list) return <div>Loading...</div>;

    return (
        <div>
            <h1>{list.title}</h1>
        </div>
    );
}

export default List;