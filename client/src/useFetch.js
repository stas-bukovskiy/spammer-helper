import {useEffect, useState} from "react";

const useFetch = (uri) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8085/api" + uri);
            const data = await response.json();
            console.log("Data: ", data);
            if (response.status !== 200) {
                console.log("Error fetching data: ", response.status, response.json());
                throw new Error(data.message);
            }

            setData(data);
            setLoading(false);
        };
        fetchData()
            .catch((e) => {
                console.error(e);
                setError(e);
                setLoading(false);
            });
    }, [uri]);

    return {data, loading, error};
}

export default useFetch;