import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";

export default function Registration() {
  return (
    <Container>
      <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Registration</h1>
      <Card>
        <p>Registration details and links will be provided.</p>
        <div style={{ display: "flex", gap: 12 }}>
          <Button>Register Now</Button>
          <Button variant="secondary">Early-Bird Rates</Button>
        </div>
      </Card>
      </div>
    </Container>
  );
}


