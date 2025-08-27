import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import {
  Lightbulb,
  Users,
  Target,
  Rocket,
  Zap,
  Award,
  Globe,
  Heart,
  Brain,
  Code,
  Wrench,
  Star,
  TrendingUp,
  Calendar,
  ArrowRight,
  Play,
  Sparkles,
  Trophy,
  BookOpen,
  Droplets,
  Gamepad2,
  School,
} from "lucide-react";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  const appDevelopers = [
    {
      name: "Sasindu Malhara",
      role:
        "Full-Stack App Developer & AI/ML Engineer | Computer Engineering Student specializing in Mobile Applications, Electronics Integration, and Machine Learning Solutions",
      image: "/sasindu.jpeg",
      linkedin:
        "https://www.linkedin.com/in/sasindu-malhara-a87ab4236/",
    },
    {
      name: "Aakil Ahamed",
      role:
        "Software Engineer & Cloud Computing Specialist | Passionate about AI, Machine Learning, Deep Learning, and Embedded Systems Development",
      image: "/Aakil.jpeg",
      linkedin: "https://www.linkedin.com/in/aakil-ahamed-29a519311/",
    },
  ];

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Track mouse for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Major Events Data
  const majorEvents = [
    {
      title: "Q-FIESTA",
      subtitle: "Inter-School Quiz Competition",
      description: "A quiz contest held in honor of Prof. Thurairajah among students in districts of Jaffna, Kilinochchi, Vavuniya, Mannar, Mullaitivu, Trincomalee, Batticaloa, Ampara, and Nuwara-Eliya to encourage schoolchildren to actively participate in their learning activities.",
      icon: <Brain className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Workshops",
      subtitle: "For Students and Visitors",
      description: "Technical workshops conducted for school students under each department, organized by Engineering students to enhance knowledge and skills in various engineering disciplines.",
      icon: <Wrench className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Seminars",
      subtitle: "For School Children",
      description: "Educational seminars conducted for school children in the local vicinity of the faculty to improve their educational interests and expose them to engineering concepts.",
      icon: <School className="w-8 h-8" />,
      color: "from-green-500 to-teal-500",
    },
    {
      title: "Blood Donation Camp",
      subtitle: "Community Service",
      description: "A blood donation camp planned to be held at the Kilinochchi premises of the University of Jaffna as part of our social responsibility initiatives.",
      icon: <Droplets className="w-8 h-8" />,
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Sports Activities",
      subtitle: "Team Building & Competition",
      description: "Sports activities including team sports, individual sports, and e-sports to develop unity among students and staff of our faculty and neighboring faculties.",
      icon: <Gamepad2 className="w-8 h-8" />,
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Finale & Talent Show",
      subtitle: "Grand Celebration",
      description: "The awarding ceremony for all winners and a talent show featuring faculty members, planned for the last day of E-Week as a grand celebration of achievements.",
      icon: <Star className="w-8 h-8" />,
      color: "from-indigo-500 to-purple-500",
    },
  ];

  // Benefits for Sponsors/Partners
  const partnerBenefits = [
    {
      title: "Brand Visibility",
      description: "Reach over 5,000 attendees including students, professionals, and academics",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Marketing Opportunities",
      description: "Access to schools, universities, and local institutions across multiple districts",
      icon: <Target className="w-6 h-6" />,
    },
    {
      title: "Regional Development",
      description: "Contribute to regional development while supporting youth-led innovation",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <Layout>
      <div className="about-page animate-slide-up">
        {/* Hero Section */}
        <section className="about-hero" ref={heroRef}>
          {/* Animated Background */}
          <div className="hero-background-events" style={{ zIndex: 0, position: 'absolute', inset: 0 }} />
          <div className="about-hero-bg">
            {/* Enhanced Floating Shapes */}
            <div className="floating-shapes">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
              <div className="shape shape-4"></div>
              <div className="shape shape-5"></div>
            </div>

            {/* Enhanced Particle Effect */}
            <div className="particles">
              {[...Array(20)].map((_, i) => (
                <div key={i} className={`particle particle-${i}`}></div>
              ))}
            </div>
          </div>

          <div className="container">
            <div className="about-hero-content">
              <div
                className="about-hero-icon"
                style={{
                  transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.x * 0.01}deg)`,
                }}
              >
                <Rocket className="w-20 h-20" />
                <div className="logo-glow"></div>
              </div>
              <h1 className="about-hero-title hero-title-events">E-Week 2K25</h1>
              <p className="about-hero-subtitle hero-subtitle-events">
                "Engineering a better tomorrow through innovation and community engagement."
              </p>

              <div className="hero-mission-statement hero-stats-events">
                <div className="mission-card stat-card-events">
                  <Heart className="w-8 h-8" />
                  <div className="mission-content">
                    <h3>8th Annual Engineering Week</h3>
                    <p>
                      Faculty of Engineering, University of Jaffna at Kilinochchi premises, 
                      Ariviyal Nagar | August 30 - September 5, 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About E-Week 2K25 */}
        <section className="about-app">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                About E-Week 2K25
                <Zap className="title-icon" />
              </h2>
            </div>
            <div className="about-app-content">
              <p className="section-subtitle">
                The 8th Annual Engineering Week (E-Week) aims to bridge the gap between engineering knowledge and societal development.
              </p>
              <p className="section-subtitle">
                Our mission is to empower undergraduates to channel their technical and creative abilities toward meaningful contributions, addressing community challenges with sustainable and impactful solutions. This week-long celebration will bring together over 5,000 attendees, including students, professionals, and academics from across multiple districts.
              </p>
              <p className="section-subtitle">
                E-Week 2K25 represents a transformative journey where engineering innovation meets community engagement, creating lasting impact through education, collaboration, and social responsibility.
              </p>
            </div>
          </div>
        </section>

        {/* Major Events Section */}
        <section className="special-features">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Major Events at E-Week 2K25
                <Calendar className="title-icon" />
              </h2>
              <p className="section-subtitle">
                A diverse range of events designed to inspire, educate, and unite the engineering community
              </p>
            </div>

            <div className="features-grid">
              {majorEvents.map((event, index) => (
                <div
                  key={index}
                  className={`special-feature-card bg-gradient-to-br ${event.color}`}
                >
                  <div className="feature-icon">{event.icon}</div>
                  <h3 className="feature-title">{event.title}</h3>
                  <h4 className="feature-subtitle" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                    {event.subtitle}
                  </h4>
                  <p className="feature-description">{event.description}</p>
                  <div className="feature-overlay"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

       

        {/* Developer Team */}
        <section className="developers-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Developer Team
                <Code className="title-icon" />
              </h2>
              <p className="section-subtitle">
                Meet the talented developers who created the E-Week 2K25 mobile application
              </p>
            </div>
            <div className="values-grid">
              {appDevelopers.map((dev) => (
                <div key={dev.name} className="value-card expanded">
                  <div className="value-header">
                    <div className="value-icon">
                      <img src={dev.image} alt={dev.name} style={{ width: 64, height: 64, borderRadius: 32 }} />
                    </div>
                    <div className="value-content">
                      <h3 className="value-title">{dev.name}</h3>
                      <p className="value-description">{dev.role}</p>
                    </div>
                  </div>
                  <div className="value-details">
                    <button className="btn btn-primary" onClick={() => openInNewTab(dev.linkedin)}>
                      View LinkedIn <ExternalLink className="inline-icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="contact-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Contact Us
                <Mail className="title-icon" />
              </h2>
              <p className="section-subtitle">
                Get in touch with the E-Week 2K25 organizing committee
              </p>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon"><MapPin className="w-6 h-6" /></div>
                <div className="stat-content">
                  <h4 className="stat-label">Venue</h4>
                  <p className="stat-description">Faculty of Engineering, University of Jaffna, Kilinochchi premises, Ariviyal Nagar</p>
                </div>
              </div>
              <a className="stat-card" href="mailto:eweek2k25@gmail.com">
                <div className="stat-icon"><Mail className="w-6 h-6" /></div>
                <div className="stat-content">
                  <h4 className="stat-label">Email</h4>
                  <p className="stat-description">eweek2k25@gmail.com</p>
                </div>
              </a>
              <a className="stat-card" href="tel:+94761031853">
                <div className="stat-icon"><Phone className="w-6 h-6" /></div>
                <div className="stat-content">
                  <h4 className="stat-label">Phone</h4>
                  <p className="stat-description">+94 76 103 1853</p>
                </div>
              </a>
              <div className="stat-card">
                <div className="stat-icon"><Calendar className="w-6 h-6" /></div>
                <div className="stat-content">
                  <h4 className="stat-label">Event Dates</h4>
                  <p className="stat-description">August 30 - September 5, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="future-vision">
          <div className="container">
            <div className="vision-content">
              <div className="vision-header">
                <h2 className="vision-title">
                  A Transformative Journey
                  <Sparkles className="title-icon" />
                </h2>
                <p className="vision-subtitle">
                  The Faculty of Engineering warmly invites you to be a part of this transformative journey. 
                  Let's make E-Week 2K25 not just an event, but a milestone in engineering and community advancement.
                </p>
              </div>

              <div className="vision-goals">
                <div className="goal-card">
                  <div className="goal-icon">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <h3>Innovation</h3>
                  <p>
                    Fostering creative solutions to community challenges through 
                    engineering expertise and technical innovation.
                  </p>
                </div>
                <div className="goal-card">
                  <div className="goal-icon">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3>Community Engagement</h3>
                  <p>
                    Building bridges between academic knowledge and societal needs 
                    through meaningful community interactions.
                  </p>
                </div>
                <div className="goal-card">
                  <div className="goal-icon">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h3>Excellence</h3>
                  <p>
                    Empowering undergraduates to channel their abilities toward 
                    sustainable and impactful solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* App Info */}
        <section className="app-info-section">
          <div className="container" style={{ textAlign: "center" }}>
            <h4>E-Week 2K25 Web App</h4>
            <p>
              Developed by the E-Week Technical Team
              <br />© 2025 Faculty of Engineering, University of Jaffna
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;