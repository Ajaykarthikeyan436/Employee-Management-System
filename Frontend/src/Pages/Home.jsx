import { signOut } from "firebase/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import auth from "../config/Firebase";

const Home = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Employees", path: "/dashboard/employees" },
    { name: "Add Employee", path: "/dashboard/add-employee" },
    { name: "Profile", path: "/dashboard/profile" },
  ];

  const logout = () => {
    signOut(auth)
    navigate("/")
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 shadow-md p-4">
        <h1 className="text-xl font-bold mb-6">Employee Management</h1>
        <nav className="flex flex-col gap-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-2 rounded hover:bg-blue-200 ${pathname === item.path ? "bg-blue-500 text-white" : ""
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Welcome 👋</h2>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* Outlet for nested pages */}
        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Home