import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";

export default function Accommodations() {
  return (
    <Container>
      <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Accommodations</h1>
      <Card>
        <p>A list of suggested accommodations near the venue will be shared.</p>
      </Card>
      </div>
    </Container>
  );
}


