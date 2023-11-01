import RequireAuth from "@/components/RequireAuth";

const ProtectedRoute = RequireAuth(ProtectedComponent);

const DashboardComponent = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Other dashboard content */}
      <ProtectedRoute />
    </div>
  );
};

export default DashboardComponent;
