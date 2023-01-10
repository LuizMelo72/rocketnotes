import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./style.js";
import { useAuth } from "../../hooks/auth.jsx";

export function Header() {
  const { signOut } = useAuth();
  
  return(
    <Container>
      <Profile to='/profile'>
        <img 
        src="https://github.com/luizmelo72.png"
        alt="Foto do usuário"
        />

        <div>
          <span>Bem-vindo</span>
          <strong>Luiz Melo</strong>
        </div>
      </Profile>

      <Logout onClick={signOut}>
        <RiShutDownLine/>
      </Logout>

    </Container>
  )
}