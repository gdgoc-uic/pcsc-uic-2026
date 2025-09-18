import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";

export default function SRW() {
  return (
    <Container>
      <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ margin: 0 }}>Student Research Workshop</h1>
      <Card>
        <p>
          The PCSC Student Research Workshop invites students at various stages of research to present their work and
          receive mentorship and feedback from the community. This is an opportunity to showcase innovative technologies
          and preliminary experiments.
        </p>
      </Card>
      </div>
    </Container>
  );
}


