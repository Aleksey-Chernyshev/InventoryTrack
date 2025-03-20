import { ISubdiv, useSubdivisions } from "../../hooks/useSubdivisions"

export default function SubdivisionsPage(){
    const {loading, error, subdiv} = useSubdivisions()
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    return(
        <div>
            <div>subdivisions page</div>
            {subdiv.map((subdiv: ISubdiv) =>(
                <div key={subdiv.subdiv_id}>
                    <h3>{subdiv.subdiv_name}</h3>
                    <p>{subdiv.subdiv_address}</p>
                    {/* <p>Координаты: {subdiv.subdiv_position[0]}, {subdiv.subdiv_position[1]}</p> */}
                </div>
            ))}

        </div>
        
    )
}