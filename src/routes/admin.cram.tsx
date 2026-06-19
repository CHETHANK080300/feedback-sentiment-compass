import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

// This layout file will act as a security gate for all /admin/cram routes
export const Route = createFileRoute("/admin/cram")({
  beforeLoad: ({ location }) => {
    // In a real app, we would check the user's role here
    // For this simulation, we'll just log the access attempt
    console.log(`Accessing CRAM Module: ${location.pathname}`);

    // Simulate RBAC: if user was not 'Compliance Admin' or similar, we would redirect
    // const { user } = useAuth();
    // if (!user || !user.roles.includes('COMPLIANCE_ADMIN')) {
    //   throw redirect({ to: '/login', search: { redirect: location.href } });
    // }
  },
  component: CramLayout,
});

function CramLayout() {
  return <Outlet />;
}
