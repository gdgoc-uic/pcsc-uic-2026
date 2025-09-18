import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";

export default function Proceedings() {
  return (
    <Container>
      <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Proceedings</h1>
      <Card>
        <p>Proceedings and links will be published after the conference.</p>
      </Card>
      </div>
    </Container>
  );
}


