import Header from "../../components/layout/header/Header";
import DevicesTable from "../../components/screens/devices/DevicesTable/DevicesTable";


export default function DevicesPage(){

    return(
        <div>
            <Header title={"Устройства"} />
            <DevicesTable />
            
        </div>
    )
}