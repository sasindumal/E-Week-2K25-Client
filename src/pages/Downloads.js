import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import {
  Download,
  Smartphone,
  Monitor,
  Apple,
  Shield,
  CheckCircle,
} from "lucide-react";

const Downloads = () => {
  const [activeTab, setActiveTab] = useState("android");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);


  const platforms = [
    {
      id: "android",
      name: "Android",
      icon: <Smartphone className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      version: "v2.1.0",
      size: "45.2 MB",
      requirements: "Android 8.0+",
      features: [
        "Real-time event notifications",
        "Offline score tracking",
        "Instant leaderboard updates",
        "Team collaboration tools",
        "Photo sharing capabilities",
      ],
      downloadUrl: "#",
    },
    {
      id: "ios",
      name: "IOS",
      icon: <Apple className="w-8 h-8" />,
      color: "from-gray-500 to-gray-600",
      version: "v2.1.0",
      size: "89.7 MB",
      requirements: "macOS 11.0+",
      features: [
        "Native desktop experience",
        "Advanced analytics dashboard",
        "Multi-window support",
        "Keyboard shortcuts",
        "System integration",
      ],
      downloadUrl: "#",
    },

  ];

  const activePlatform = platforms.find((p) => p.id === activeTab);

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

  return (
    <Layout>
      <div className="downloads-page animate-slide-up">
        {/* Hero Section */}
        <section className="downloads-hero" ref={heroRef}>
          {/* Animated Background like Events page */}
          <div className="hero-background-events" style={{ zIndex: 0, position: 'absolute', inset: 0 }} />
          <div className="downloads-hero-bg">
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
            <div className="downloads-hero-content">
              <div
                className="downloads-hero-icon"
                style={{
                  transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.x * 0.01}deg)`,
                }}
              >
                <Download className="w-16 h-16" />
                <div className="logo-glow"></div>
              </div>
              <h1 className="downloads-hero-title hero-title-events">Download E-Week 2025</h1>
              <p className="downloads-hero-subtitle hero-subtitle-events">
                Get the official E-Week 2025 app on your favorite platform
              </p>
            </div>
          </div>
        </section>

        {/* Platform Selection */}
        <section className="platform-selection">
          <div className="container">
            <div className="platform-tabs">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  className={`platform-tab ${activeTab === platform.id ? "active" : ""}`}
                  onClick={() => setActiveTab(platform.id)}
                >
                  <div className="platform-tab-icon">{platform.icon}</div>
                  <span className="platform-tab-name">{platform.name}</span>

                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="download-section">
          <div className="container">
            <div className="download-content">
              <div className="download-info">
                <div className="platform-header">
                  <div
                    className={`platform-icon bg-gradient-to-r ${activePlatform.color}`}
                  >
                    {activePlatform.icon}
                  </div>
                  <div className="platform-details">
                    <h2 className="platform-name">{activePlatform.name}</h2>
                    <div className="platform-meta">
                      <span className="version">{activePlatform.version}</span>
                      <span className="size">{activePlatform.size}</span>
                      <span className="requirements">
                        {activePlatform.requirements}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="platform-features">
                  <h3 className="features-title">Key Features</h3>
                  <ul className="features-list">
                    {activePlatform.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <CheckCircle className="w-5 h-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="security-info">
                  <div className="security-badge">
                    <Shield className="w-6 h-6" />
                    <div className="security-text">
                      <span className="security-title">Secure Download</span>
                      <span className="security-subtitle">
                        Verified and virus-free
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="download-action">
                <div className="download-card">
                  <div className="download-preview">
                    <div className="device-mockup">
                      <div
                        className={`device-screen bg-gradient-to-br ${activePlatform.color}`}
                      >
                        <div className="app-interface">
                          <div className="interface-header"></div>
                          <div className="interface-content">
                            <div className="content-bar"></div>
                            <div className="content-bar short"></div>
                            <div className="content-bar medium"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="download-cta">
                    <button className="download-btn primary">
                      <Download className="w-6 h-6" />
                      Download for {activePlatform.name}
                    </button>
                    <button className="download-btn secondary">
                      View Release Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section className="system-requirements">
          <div className="container">
            <h2 className="section-title">System Requirements</h2>
            <div className="requirements-grid">
              {platforms.map((platform) => (
                <div key={platform.id} className="requirement-card">
                  <div className="requirement-header">
                    <div
                      className={`requirement-icon bg-gradient-to-r ${platform.color}`}
                    >
                      {platform.icon}
                    </div>
                    <h3>{platform.name}</h3>
                  </div>
                  <div className="requirement-details">
                    <div className="requirement-item">
                      <span className="label">Version:</span>
                      <span className="value">{platform.version}</span>
                    </div>
                    <div className="requirement-item">
                      <span className="label">Size:</span>
                      <span className="value">{platform.size}</span>
                    </div>
                    <div className="requirement-item">
                      <span className="label">OS:</span>
                      <span className="value">{platform.requirements}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="support-section">
          <div className="container">
            <div className="support-content">
              <h2 className="support-title">Need Help?</h2>
              <p className="support-subtitle">
                Our support team is here to help you get the most out of E-Week
                2025
              </p>
              <div className="support-actions">
                <button className="support-btn">Contact Support</button>
                <button className="support-btn outline">View FAQ</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Downloads;
