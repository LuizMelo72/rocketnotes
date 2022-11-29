import { Container } from "./style.js";

export function Section({ title, children }) {
  return(
    <Container>
      <h2>{title}</h2>
      {children}
    </Container>
  );
}