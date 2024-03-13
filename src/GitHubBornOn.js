import { get } from "aws-amplify/api"
import { useEffect, useState } from "react";

export const GitHubBornOn = () => {
    const [born, updatedBornTime] = useState([]);

    const fetchBorn = async () => {
        const restOperation = await get ({
            apiName: "cryptoapi",
            path: "/born",
        });

        const { body } = await restOperation.response;
        const json = await body.json();
        updatedBornTime(json.bornTime);
    };

    useEffect(() => {
        fetchBorn();
    }, []);

    return (
        <h2>
            The GitHub user {born.login} was born on {born.created_at}
        </h2>
    );
};



