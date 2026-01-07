import { Outlet ,useOutlet } from "react-router-dom";
import Header from "../components/Header";
import "../css/home.css"
function Home() {
  const outlet = useOutlet();//בשביל התצוגה של רק אלבום פתוח או רק רשימה

    // return (
    //     <div>
    //         <Header />
    //         <div>
    //             <Outlet />
    //         </div>
    //     </div>
    // );
    return (
    <div>
      <Header />

      {!outlet && (
        <div className="home-container">
          <div className="header-spacer"></div>
          <h3 className="home-title">Welcome to Your Dashboard</h3>
          <p className="welcome-message">
            Explore your personal information, manage your tasks, posts, and albums, 
            and keep track of everything that matters to you – all in one place!
          </p>
        </div>
      )}

      {outlet && <div className="header-spacer"></div>} {/* spacing below header */}
      <Outlet />
    </div>
  );
}
export default Home;


