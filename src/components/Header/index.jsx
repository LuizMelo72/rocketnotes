import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./style.js";

export function Header() {
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

      <Logout>
        <RiShutDownLine/>
      </Logout>

    </Container>
  )
}