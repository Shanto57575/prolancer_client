import { getCurrentUser } from "@/services/authService";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const currentUser = await getCurrentUser();

  return <NavbarClient currentUser={currentUser} />;
}
