import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import PublicRoutes from "./Router/PublicRoutes";
import RequireAdmin from "./Router/RequireAdmin";
import useUserStore from "./Stores/UserStore";
import AdminLayout from "./Layout/AdminLayout";

function App() {
  const { user } = useUserStore();

  const isAuthenticated = !!user; // Checks if user is logged in
  const userRole = user?.role || "guest"; // Get the role, defaulting to "guest" if not logged in'

  return (
    <>
      <Router basename="/mfl">
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes isAuthenticated={isAuthenticated} redirectTo="/admin/dashboard" />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<ForgetPassword />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={<RequireAdmin isAuthenticated={isAuthenticated} userRole={userRole} redirectTo="/admin/login" />}
          >
            <Route
              path="/admin/*"
              element={
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="profile/change-password" element={<ChangePassword />} />
                    <Route path="profile/edit" element={<EditProfile />} />
                    <Route path="notifications" element={<AdminNotifications />} />
                    <Route
                      path="*"
                      element={
                        <>
                          {/* Create a beautiful 404 page */}
                          <h1>404</h1>
                        </>
                      }
                    />
                  </Routes>
                </AdminLayout>
              }
            />
            <Route path="/admin" element={<Navigate to={"/admin/dashboard"} />} />
          </Route>

          {/* User Routes */}
          {/* <Route element={<RequireUser isAuthenticated={isAuthenticated} userRole={userRole} redirectTo="/login" />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
        </Route> */}

          {/* Optional: Catch all for 404 */}

          <Route
            path="*"
            element={
              isAuthenticated && userRole == "admin" ? <Navigate to={"/admin"} /> : <Navigate to={"/admin/login"} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
