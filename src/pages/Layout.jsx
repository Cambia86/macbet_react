import { Outlet, Link } from "react-router-dom";


const Layout = () => {
  return (
    <>
    <header className="navbar">
      <div className="navbar-logo">
        <a href="/"></a>
      </div>
      <nav className="navbar-links">
        <ul>
          <li><a href="/#/">Home</a></li>
          <li><a href="/#/previsionList">previsionList</a></li>
          <li><a href="/#/journey">journey</a></li>
        </ul>
      </nav>

    </header>
    <Outlet />
    </>
  );
  // return (
  //   <>
  //   <div class="topnav">
  //   <a href="#news">News</a>
  //   </div>
  //     <nav>
  //       <ul>
  //         <li>
  //           <Link to="/">Home</Link>
  //         </li>
  //         <li>
  //           <Link to="/previsionList">previsionList</Link>
  //         </li>
  //         <li>
  //           <Link to="/journey">journey</Link>
  //         </li>
  //       </ul>
  //     </nav>

  //     <Outlet />
  //   </>
  // )
};

export default Layout;