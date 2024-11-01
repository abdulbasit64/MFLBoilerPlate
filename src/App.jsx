import './App.css';

function App() {
  const { isAuthenticated } = useAuth();
  const userRole = "admin"; // This should be 'admin' or 'user' based on the logged-in user
  return (
    <>
      <Router basename="/eljo">
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoutes isAuthenticated={isAuthenticated} redirectTo="/admin/dashboard" />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/forgot-password" element={<ForgetPassword />} />
            <Route path="/admin/forgot-password2" element={<ForgetPassword2 />} />
            <Route path="/admin/forgot-password3" element={<ForgetPassword3 />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<RequireAdmin isAuthenticated={isAuthenticated} userRole={userRole} redirectTo="/admin/login" />}>
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

          <Route path="*" element={isAuthenticated && userRole == "admin" ? <Navigate to={"/admin"} /> : <Navigate to={"/admin/login"} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App
