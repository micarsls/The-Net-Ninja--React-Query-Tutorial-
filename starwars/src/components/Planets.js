import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Planet from "./Planet";

const fetchPlanets = async (page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
    const [page, setPage] = useState(1);
    const {data, status} = useQuery(['planets', page], () => fetchPlanets(page) );

    return (
        <div>
            <h2>Planets</h2>

            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'success' && (
                <>
                    <button onClick={() => setPage(old => Math.max(old -1, 1))} disabled={page === 1}>Previous</button>
                    <span>{ page }</span>
                    <button onClick={() => setPage(old=> (!data || !data.next ? old:old+1))} disabled={!data || !data.next}>Next</button>
                    <div>
                        {data.results.map(planet => <Planet planet={planet} key={planet.name}/>)}
                    </div>
                </>
            )}
        </div>
    );
}

export default Planets;