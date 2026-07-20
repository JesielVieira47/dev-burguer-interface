import { Outlet, Navigate } from "react-router-dom";
import { SidNavAdmin } from "../../components/SidNavAdmin";
import { Container } from './styles'

export function AdminLayout() {
  const { admin: isAdmin } = JSON.parse(localStorage.getItem('devburguer:userData')) || {};

  return isAdmin ? (
    <Container>
      <SidNavAdmin />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}