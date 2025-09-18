import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";

export default function AcceptedPapers() {
  return (
    <Container>
      <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Accepted Papers</h1>
      <Card>
        <p>List of accepted papers will be posted here.</p>
      </Card>
      </div>
    </Container>
  );
}


