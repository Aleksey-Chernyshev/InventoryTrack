import Header from "../../components/layout/header/Header";
import MapComponent from "../../components/screens/map/MapComponent/MapComponent";
import {useSubdivisions } from "../../hooks/useSubdivisions"

export default function SubdivisionsPage(){
    const {loading, error, subdiv} = useSubdivisions()
    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    return(
        <div>
            <Header title={'Подразделения'} />
            <div>
                {subdiv.map(sub => (
                    <div key={sub.subdiv_id} style={{ marginBottom: '20px' }}>
                        <h2>{sub.subdiv_name}</h2>
                        <p>{sub.subdiv_address}</p>
                        {/* <p>Coordinates: {sub.subdiv_position[0]}, {sub.subdiv_position[1]}</p> */}
                        <h3>Departments:</h3>
                        <ul>
                            {sub.departments.map((dept, idx) => (
                                <li key={idx}>
                                    {dept.department_name} - {dept.department_location}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <MapComponent/>
        </div>
        
    )
}