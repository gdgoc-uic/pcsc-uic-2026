import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Container } from "../components/ui/Container";


export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-04-23T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          minHeight: "64vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          overflow: "hidden",
        }}
      >
        <Container>
          <div
            style={{
              position: "relative",
              zIndex: 3,
              maxWidth: "550px",
              margin: "0",
              marginLeft: "-50rem",
              padding: "2rem",
              background: "white",
              borderRadius: "0",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ display: "grid", gap: 20 }}>
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "clamp(2.5rem, 5vw, 3rem)",
                    fontWeight: "900",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "#111827",
                    marginBottom: "1.5rem",
                  }}
                >
                  26th Philippine Computing
                  Science Congress
                </h1>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.25rem",
                    lineHeight: 1.5,
                    color: "#4b5563",
                    fontWeight: "400",
                  }}
                >
                  April 23 - 25, 2026
                  <br />
                  University of the Immaculate Conception, Davao City
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Link to="/registration" style={{ textDecoration: "none" }}>
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: "#e11d48",
                      color: "white",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "16px",
                    padding: "16px 32px",
                    borderRadius: "0",
                    boxShadow: "0 2px 8px rgba(49, 130, 206, 0.2)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Register Now
                  </Button>
                </Link>
                <Link to="/author-guidelines" style={{ textDecoration: "none" }}>
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: "#e11d48",
                      color: "white",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "16px",
                    padding: "14px 30px",
                    borderRadius: "0",
                    transition: "all 0.2s ease",
                    }}
                  >
                    Author Guidelines
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Countdown Section */}
      <section style={{ padding: "3rem 0", background: "white" }}>
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              textAlign: "center",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <div style={{ 
              padding: "2rem 1rem",
              borderRight: "2px solid #e11d48",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "3.5rem",
                  fontWeight: "900",
                  color: "#111827",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {timeLeft.days}
              </h2>
              <p style={{ 
                margin: 0, 
                color: "#4b5563", 
                fontSize: "1.1rem",
                fontWeight: "500",
                textTransform: "capitalize"
              }}>
                Days
              </p>
            </div>
            <div style={{ 
              padding: "2rem 1rem",
              borderRight: "2px solid #e11d48",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "3.5rem",
                  fontWeight: "900",
                  color: "#111827",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {timeLeft.hours}
              </h2>
              <p style={{ 
                margin: 0, 
                color: "#4b5563", 
                fontSize: "1.1rem",
                fontWeight: "500",
                textTransform: "capitalize"
              }}>
                Hours
              </p>
            </div>
            <div style={{ 
              padding: "2rem 1rem",
              borderRight: "2px solid #e11d48",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "3.5rem",
                  fontWeight: "900",
                  color: "#111827",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {timeLeft.minutes}
              </h2>
              <p style={{ 
                margin: 0, 
                color: "#4b5563", 
                fontSize: "1.1rem",
                fontWeight: "500",
                textTransform: "capitalize"
              }}>
                Minutes
              </p>
            </div>
            <div style={{ 
              padding: "2rem 1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "3.5rem",
                  fontWeight: "900",
                  color: "#111827",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {timeLeft.seconds}
              </h2>
              <p style={{ 
                margin: 0, 
                color: "#4b5563", 
                fontSize: "1.1rem",
                fontWeight: "500",
                textTransform: "capitalize"
              }}>
                Seconds
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* About PCSC 2026 */}
      <section
        style={{
          padding: "5rem 0",
          background: "white",
          position: "relative",
        }}
      >
        <Container>
          <div style={{ display: "grid", gap: 48 }}>
            <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: "900",
                  color: "#e11d48",
                  letterSpacing: "-0.02em",
                  marginBottom: "1.5rem",
                }}
              >
                About PCSC 2026
              </h2>
              <p style={{ 
                margin: 0, 
                color: "#4b5563", 
                fontSize: "1.25rem", 
                lineHeight: 1.7,
                fontWeight: "400"
              }}>
                <strong style={{ color: "#3182ce" }}>PCSC DAVAO</strong> will inspire you to think bigger about the way you work. Join us for
                never-before-seen technology releases, talks about tools and solutions, sessions from industry
                leaders, good coffee, and good people. Here's an overview of what you can expect — we can't wait
                to hang out!
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 24,
                maxWidth: 1200,
                margin: "0 auto",
              }}
            >
              <Card 
                padding={32}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 0,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: "4px", 
                  background: "#e11d48" 
                }} />
                <div style={{ display: "grid", gap: 16 }}>
                  <p style={{ 
                    margin: 0, 
                    color: "#e11d48", 
                    fontWeight: "700", 
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase"
                  }}>
                    WEDNESDAY 23 APRIL
                  </p>
                  <h3 style={{ 
                      margin: 0,
                      fontSize: "1.5rem",
                    color: "#111827",
                    fontWeight: "700",
                    lineHeight: 1.3
                  }}>
                    DAY 01: INNOVATIVE TECHNOLOGIES UNVEILED
                  </h3>
                  <div style={{
                    height: "120px",
                    background: "#f3f4f6",
                    borderRadius: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    fontWeight: "500"
                  }}>
                    Conference Image Placeholder
                  </div>
                </div>
        </Card>
              <Card 
                padding={32}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 0,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: "4px", 
                  background: "#e11d48" 
                }} />
                <div style={{ display: "grid", gap: 16 }}>
                  <p style={{ 
                    margin: 0, 
                    color: "#e11d48", 
                    fontWeight: "700", 
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase"
                  }}>
                    THURSDAY 24 APRIL
                  </p>
                  <h3 style={{ 
                      margin: 0,
                      fontSize: "1.5rem",
                    color: "#111827",
                    fontWeight: "700",
                    lineHeight: 1.3
                  }}>
                    DAY 02: SHAPING TOMORROW'S TECH FUTURE
                  </h3>
                  <div style={{
                    height: "120px",
                    background: "#f3f4f6",
                    borderRadius: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    fontWeight: "500"
                  }}>
                    Workshop Image Placeholder
                  </div>
                </div>
        </Card>
              <Card 
                padding={32}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 0,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  height: "4px", 
                  background: "#e11d48" 
                }} />
                <div style={{ display: "grid", gap: 16 }}>
                  <p style={{ 
                    margin: 0, 
                    color: "#e11d48", 
                    fontWeight: "700", 
                    fontSize: "0.875rem",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase"
                  }}>
                    FRIDAY 25 APRIL
                  </p>
                  <h3 style={{ 
                      margin: 0,
                      fontSize: "1.5rem",
                    color: "#111827",
                    fontWeight: "700",
                    lineHeight: 1.3
                  }}>
                    DAY 03: RESEARCH EXCELLENCE & FUTURE DIRECTIONS
                  </h3>
                  <div style={{
                    height: "120px",
                    background: "#f3f4f6",
                    borderRadius: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                    fontWeight: "500"
                  }}>
                    Awards Image Placeholder
                  </div>
                </div>
        </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Call for Papers */}
      <section style={{ 
        padding: "5rem 0", 
        background: "white",
        position: "relative"
      }}>
        <Container>
          <div style={{ display: "grid", gap: 48 }}>
            <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: "900",
                  color: "#e11d48",
                  letterSpacing: "-0.02em",
                  marginBottom: "1.5rem",
                }}
              >
                Call for Papers
              </h2>
              <p style={{ 
                margin: 0, 
                color: "#4b5563", 
                fontSize: "1.25rem", 
                lineHeight: 1.7,
                fontWeight: "400"
              }}>
                The 26th Philippine Computing Science Congress is organized by the Computing Society of the Philippines to
                enable local and neighboring computing educators, researchers, ICT professionals, and students to interact and share their work.
              </p>
            </div>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <Card 
                padding={48}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 0,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "grid", gap: 24 }}>
                  <div style={{
                    padding: "20px",
                    background: "white",
                    borderRadius: 0,
                    border: "2px solid #e11d48",
                    borderLeft: "6px solid #e11d48"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#9f1239", 
                      lineHeight: 1.8,
                      fontSize: "1.1rem"
                    }}>
                      <strong style={{ color: "#9f1239" }}>Submission Portal:</strong> 
                      <br />
                      <a 
                        href="https://cmt3.research.microsoft.com/PCSC2025" 
                        target="_blank" 
                        rel="noreferrer"
                        style={{
                          color: "#e11d48",
                          textDecoration: "none",
                          fontWeight: "600",
                          wordBreak: "break-all"
                        }}
                      >
                        https://cmt3.research.microsoft.com/PCSC2025
                      </a>
                    </p>
                  </div>
                  
                  <div style={{
                    padding: "20px",
                    background: "white",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#374151", 
                      lineHeight: 1.8,
                      fontSize: "1.1rem"
                    }}>
                      Papers should use the prescribed PCSC 2025 template and have a minimum of 6 pages and maximum of 8 pages, including references.
                    </p>
                  </div>

                  <div style={{
                    padding: "24px",
                    background: "white",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <h4 style={{ 
                      margin: "0 0 16px 0", 
                      color: "#111827", 
                      fontSize: "1.25rem",
                      fontWeight: "700"
                    }}>
                      Double-Blind Peer Review Guidelines:
                    </h4>
                    <ul style={{ 
                      margin: 0, 
                      paddingLeft: "1.5rem", 
                      color: "#4b5563", 
                      lineHeight: 1.8,
                      fontSize: "1.1rem"
                    }}>
                      <li style={{ marginBottom: "8px" }}>Name and affiliation of the Authors must be removed from the submitted manuscript.</li>
                      <li style={{ marginBottom: "8px" }}>Remove any citation and references that contain the Authors. Use [Anonymous, 2008] and blind the reference list.</li>
                      <li>Do not include acknowledgment and funding sources.</li>
                    </ul>
                  </div>

                  <div style={{
                    padding: "20px",
                    background: "white",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#374151", 
                      lineHeight: 1.8,
                      fontSize: "1.1rem"
                    }}>
                      Submitted papers must be original, and not submitted concurrently to a journal or another conference/symposium. Each submitted paper will be
                      peer-reviewed by at least two reviewers and must get an average positive rating for inclusion in the conference program and proceedings.
                    </p>
                  </div>

                  <div style={{ 
                    display: "flex", 
                    gap: 16, 
                    flexWrap: "wrap", 
                    marginTop: 16,
                    justifyContent: "center"
                  }}>
                    <Link to="/author-guidelines">
                      <Button 
                        variant="primary"
                        style={{
                          backgroundColor: "#e11d48",
                          color: "white",
                          border: "none",
                          fontWeight: "600",
                          fontSize: "16px",
                          padding: "12px 24px",
                          borderRadius: 0,
                          boxShadow: "0 4px 6px -1px rgba(225, 29, 72, 0.25)",
                        }}
                      >
                        Author Guidelines
                      </Button>
                    </Link>
                    <Link to="/srw">
                      <Button 
                        variant="secondary"
                        style={{
                          backgroundColor: "white",
                          color: "#e11d48",
                          border: "2px solid #e11d48",
                          fontWeight: "600",
                          fontSize: "16px",
                          padding: "10px 22px",
                          borderRadius: 0,
                        }}
                      >
                        Student Research Workshop
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Important Dates */}
      <section style={{ 
        padding: "5rem 0", 
        background: "#f9fafb",
        position: "relative"
      }}>
        <Container>
          <div style={{ display: "grid", gap: 48 }}>
            <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
              <h2 style={{ 
                margin: 0, 
                fontSize: "clamp(2rem, 4vw, 3rem)", 
                fontWeight: "900", 
                color: "#e11d48",
                letterSpacing: "-0.02em",
                marginBottom: "1rem"
              }}>
                Important Dates
              </h2>
              <p style={{ 
                margin: 0, 
                color: "#4b5563", 
                fontSize: "1.1rem",
                lineHeight: 1.6
              }}>
                Mark your calendars for these key deadlines
              </p>
            </div>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <Card 
                padding={40}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 0,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "grid", gap: 20 }}>
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr auto", 
                    alignItems: "center", 
                    gap: 24,
                    padding: "20px",
                    background: "#f9fafb",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#111827", 
                      fontSize: "1.1rem",
                      fontWeight: "500"
                    }}>
                      Deadline of Paper Submission for Main Conference and Student Research Workshop
                    </p>
                    <div style={{
                      background: "#e11d48",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 0,
                      fontWeight: "700",
                      fontSize: "1rem"
                    }}>
                      January 15, 2026
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr auto", 
                    alignItems: "center", 
                    gap: 24,
                    padding: "20px",
                    background: "#f9fafb",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#111827", 
                      fontSize: "1.1rem",
                      fontWeight: "500"
                    }}>
                      Author Notification for Main Conference and Student Research Workshop
                    </p>
                    <div style={{
                      background: "#e11d48",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 0,
                      fontWeight: "700",
                      fontSize: "1rem"
                    }}>
                      February 28, 2026
                    </div>
                  </div>

                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr auto", 
                    alignItems: "center", 
                    gap: 24,
                    padding: "20px",
                    background: "#f9fafb",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#111827", 
                      fontSize: "1.1rem",
                      fontWeight: "500"
                    }}>
                      Deadline of Camera-Ready Submission for Main Conference and Student Research Workshop
                    </p>
                    <div style={{
                      background: "#e11d48",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 0,
                      fontWeight: "700",
                      fontSize: "1rem"
                    }}>
                      March 15, 2026
                    </div>
                  </div>

                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr auto", 
                    alignItems: "center", 
                    gap: 24,
                    padding: "20px",
                    background: "#f9fafb",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#111827", 
                      fontSize: "1.1rem",
                      fontWeight: "500"
                    }}>
                      Early-Bird Registration Deadline
                    </p>
                    <div style={{
                      background: "#e11d48",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 0,
                      fontWeight: "700",
                      fontSize: "1rem"
                    }}>
                      March 31, 2026
                    </div>
                  </div>

                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr auto", 
                    alignItems: "center", 
                    gap: 24,
                    padding: "20px",
                    background: "#f9fafb",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#111827", 
                      fontSize: "1.1rem",
                      fontWeight: "500"
                    }}>
                      Author Registration Deadline
                    </p>
                    <div style={{
                      background: "#e11d48",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 0,
                      fontWeight: "700",
                      fontSize: "1rem"
                    }}>
                      March 31, 2026
                    </div>
                  </div>

                  <div style={{ 
                    display: "grid", 
                    gridTemplateColumns: "1fr auto", 
                    alignItems: "center", 
                    gap: 24,
                    padding: "20px",
                    background: "#f9fafb",
                    borderRadius: 0,
                    border: "2px solid #e11d48"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#111827", 
                      fontSize: "1.1rem",
                      fontWeight: "500"
                    }}>
                      Conference Date
                    </p>
                    <div style={{
                      background: "#e11d48",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: 0,
                      fontWeight: "700",
                      fontSize: "1rem"
                    }}>
                      April 23–25, 2026
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Areas of Interest */}
      <section style={{ 
        padding: "5rem 0", 
        background: "white",
        position: "relative"
      }}>
        <Container>
          <div style={{ display: "grid", gap: 48 }}>
            <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
              <h2 style={{ 
                margin: 0, 
                fontSize: "clamp(2rem, 4vw, 3rem)", 
                fontWeight: "900", 
                color: "#e11d48",
                letterSpacing: "-0.02em",
                marginBottom: "1rem"
              }}>
                Areas of Interest
              </h2>
              <p style={{ 
                margin: 0, 
                color: "#4b5563", 
                fontSize: "1.1rem",
                lineHeight: 1.6
              }}>
                Include (But are Not Limited to)
              </p>
            </div>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <Card 
                padding={48}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 0,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{
                display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: 24,
                  color: "#374151",
                  lineHeight: 1.8,
                }}>
                  <div style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb",
                    boxShadow: "none"
                  }}>
                    <ul style={{ 
                    margin: 0,
                      paddingLeft: "1.25rem",
                      fontSize: "1.1rem"
                    }}>
                      <li style={{ marginBottom: "12px" }}>Natural Language Processing</li>
                      <li style={{ marginBottom: "12px" }}>Intelligent Systems (AI and Computational Intelligence)</li>
                      <li style={{ marginBottom: "12px" }}>Affective and Empathic Computing</li>
                      <li style={{ marginBottom: "12px" }}>Computational Theory and Algorithms</li>
                      <li style={{ marginBottom: "12px" }}>Modeling and Simulation</li>
                      <li>Computer Networks</li>
                    </ul>
              </div>
                  <div style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb",
                    boxShadow: "none"
                  }}>
                    <ul style={{ 
                    margin: 0,
                      paddingLeft: "1.25rem",
                      fontSize: "1.1rem"
                    }}>
                      <li style={{ marginBottom: "12px" }}>Ubiquitous and Pervasive Computing</li>
                      <li style={{ marginBottom: "12px" }}>Software Engineering</li>
                      <li style={{ marginBottom: "12px" }}>Databases and Information</li>
                      <li style={{ marginBottom: "12px" }}>Databases and Information Retrieval Systems</li>
                      <li>Emerging Areas in Computing</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
              </div>
        </Container>
      </section>

      {/* Venue */}
      <section style={{ 
        padding: "5rem 0", 
        background: "#f9fafb",
        position: "relative"
      }}>
        <Container>
          <div style={{ display: "grid", gap: 48 }}>
            <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
              <h2 style={{ 
                margin: 0, 
                fontSize: "clamp(2rem, 4vw, 3rem)", 
                fontWeight: "900", 
                color: "#e11d48",
                letterSpacing: "-0.02em",
                marginBottom: "1rem"
              }}>
                Venue
              </h2>
              <p style={{ 
                margin: 0, 
                color: "#4b5563", 
                fontSize: "1.1rem",
                lineHeight: 1.6
              }}>
                Join us at the prestigious University of the Immaculate Conception
              </p>
            </div>
            <div style={{ maxWidth: 1000, margin: "0 auto" }}>
              <Card 
                padding={48}
                  style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 0,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ display: "grid", gap: 32 }}>
                  <div style={{
                    padding: "32px",
                    background: "#f9fafb",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: "#374151", 
                      lineHeight: 1.8,
                      fontSize: "1.1rem"
                    }}>
                      The <strong style={{ color: "#e11d48" }}>University of the Immaculate Conception (UIC)</strong> is a prestigious Catholic institution founded in 1905 by the Religious of the Virgin Mary (RVM). From its humble beginnings as "Escuela Catolica de San Pedro," UIC has evolved into a premier university, achieving university status in 1992. Today, it stands as a leader in science and technology education in Mindanao, with ISO 9001:2015 certification and multiple PAASCU-accredited programs. The university is committed to providing Quality Transformative Ignacian Marian Education (Q-TIME) and has established cutting-edge facilities including the Science Resource Center, Natural Language Processing Research Laboratory, and advanced IT development centers.
                    </p>
                  </div>

                  <div style={{
                    padding: "24px",
                    background: "#f9fafb",
                    borderRadius: 0,
                    border: "1px solid #e5e7eb"
                  }}>
                    <h4 style={{ 
                      margin: "0 0 16px 0", 
                      color: "#111827", 
                      fontSize: "1.25rem",
                      fontWeight: "700"
                    }}>
                      Location Details
                    </h4>
                    <div style={{ display: "grid", gap: 8 }}>
                      <p style={{ 
                        margin: 0, 
                        color: "#111827", 
                        fontSize: "1.1rem",
                        fontWeight: "600"
                      }}>
                        University of the Immaculate Conception - Bajada Campus
                      </p>
                      <p style={{ 
                        margin: 0, 
                        color: "#374151", 
                        fontSize: "1rem"
                      }}>
                        300 Margarita Village Rd, Buhangin, Davao City
                      </p>
                      <p style={{ 
                        margin: 0, 
                        color: "#374151", 
                        fontSize: "1rem"
                      }}>
                        Davao del Sur, Philippines
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: "20px",
                    background: "#fff1f2",
                    borderRadius: 0,
                    border: "1px solid #e11d48",
                    textAlign: "center"
                  }}>
                    <p style={{ 
                      margin: "0 0 20px 0", 
                      color: "#9f1239", 
                      fontSize: "1.1rem",
                      fontWeight: "600"
                    }}>
                      Find Us on the Map
                    </p>
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.2145412050313!2d125.61870867545751!3d7.101115792902179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96c4fc4bfbf1f%3A0x41426f341bce07d5!2sUniversity%20of%20the%20Immaculate%20Conception%20-%20Bajada%20Campus!5e0!3m2!1sen!2sph!4v1758216656780!5m2!1sen!2sph" 
                      width="100%" 
                      height="450" 
                      style={{border:0}} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
            </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


