import { Outlet } from "react-router-dom";
import Header from "../components/Header";
function Home() {

    return (
        <div>
            <Header />
            <div>
                <Outlet />
            </div>
        </div>
    );
}
export default Home;


