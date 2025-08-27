import React, { useState,useEffect } from "react";
import Layout from "../components/Layout";

import {
  Trophy, Hammer, Award, Users, Star, Briefcase ,
 
  Medal,
  
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  
  Target,
  Zap,
  BarChart3,
  Activity,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  X,
} from "lucide-react";

const Leaderboard = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [eventSearchTerm, setEventSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [live, setLive] = useState(true);
  const [showPastEvents, setShowPastEvents] = useState([]);
  const[upcomingEvents, setUpcomingEvents] = useState(true);
 const [leaderBoardRows, setLeaderBoardRows] = useState([]);
  let i=0;
  let j=0;
const logos = [
  "/e21.jpg", // E21 logo
  "/e22.png", // E22 logo
  "/e23.png", // E23 logo
  "/e24.png"  // E24 logo
];

let batchmemenbers = [
    185 ,
    180 ,
    210  ,
    200 ,
];
  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/createEvents/UpcomingEvents`);
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming events");
      }
      const data = await response.json();
      setUpcomingEvents(data);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };


  const fetchLiveEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/createEvents/LiveEvents`);
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming events");
      }
      const data = await response.json();
      setLive(data);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };

   const fetchFinishedEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/createEvents/FinishedEvents`);
      if (!response.ok) {
        throw new Error("Failed to fetch upcoming events");
      }
      const data = await response.json();
      setShowPastEvents(data);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };
    

useEffect(() => {
  fetchUpcomingEvents();
  fetchLiveEvents();
  fetchFinishedEvents();
   fetchLeaderBoard();
    
}, []);  



      const fetchLeaderBoard = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/leaderboard/getLeaderBoard`);
    if (!response.ok) throw new Error("Failed to fetch leaderboard data");
    const data = await response.json();

    const teams = ["E21", "E22", "E23", "E24"];
    const events = data.EventName || []; // all events are common for all teams

    const teamData = teams.map((team) => {
      const rankArray = data[`${team}Rank`] || [];

      // pair event with rank
      const achievements = events.map((event, idx) => ({
        event,
        rank: rankArray[idx],
      }));

      // filter notable achievements (winners + podiums)
      const notableAchievements = achievements.filter(
        (a) =>
          a.rank &&
          ["winners", "firstrunnerup", ].includes(
            a.rank.toLowerCase()
          )
      );

      // last 4 recent achievements (most recent first)
      const recentAchievements = notableAchievements.slice(-4).reverse();

      const totalWonEvents = rankArray.filter(
        (rank) => rank && rank.toLowerCase() === "winners"
      ).length;

      const members = Math.floor(Math.random() * 10) + 40;

      return {
        team,
        members,
        points: data[`${team}Points`] || 0,
        totalWonEvents,
        podiums: rankArray.filter(
          (rank) =>
            rank &&
            ["winners", "firstrunnerup", "secondrunnerup"].includes(
              rank.toLowerCase()
            )
        ).length,
        improvement: data[`${team}Improvement`] || 0,

        // 🎉 new field
        recentAchievements,
      };
    });

    const sortedTeams = teamData.sort((a, b) => b.points - a.points);
    setLeaderBoardRows(sortedTeams);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
};

 

  



  
 

const getTrendIcon = (trend) => {
  if (trend > 0) {
    return <TrendingUp className="w-5 h-5 text-green-400" />;
  } else if (trend < 0) {
    return <TrendingDown className="w-5 h-5 text-red-400" />;
  } else {
    return <Minus className="w-5 h-5 text-gray-400" />;
  }
};


  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-8 h-8 text-yellow-400" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Award className="w-8 h-8 text-orange-400" />;
      default:
        return <Star className="w-8 h-8 text-blue-400" />;
    }
  };

  const getRankChange = (current, previous) => {
    if (current < previous) {
      return { type: "up", value: previous - current };
    } else if (current > previous) {
      return { type: "down", value: current - previous };
    }
    return { type: "stable", value: 0 };
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technical: "from-blue-500 to-cyan-500",
      Engineering: "from-green-500 to-teal-500",
      Innovation: "from-purple-500 to-pink-500",
      Security: "from-red-500 to-orange-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  // Filter and sort past events
  const filteredPastEvents = showPastEvents
    .filter((event) => {
      const matchesSearch =
        eventSearchTerm === "" ||
        event.title.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(eventSearchTerm.toLowerCase())
        event.winners.toLowerCase().includes(eventSearchTerm.toLowerCase()) 

      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;
     
      const matchesBatch =
        selectedBatch === "all" || event.winners === selectedBatch;
      return matchesSearch && matchesCategory && matchesBatch;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "date":
          comparison = new Date(b.date) - new Date(a.date);
          break;
        case "participants":
          comparison = b.participants - a.participants;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? -comparison : comparison;
    });

  return (
    <Layout>
      <div className="leaderboard-page">
        {/* Hero Section */}
        <section className="leaderboard-hero">
          <div className="hero-background-pattern"></div>
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Live Leaderboard
                <BarChart3 className="title-icon" size={48} />
              </h1>
              <p className="hero-subtitle">
                Real-time rankings and performance analytics for E-Week 2K25
                competitions
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">4</span>
                  <span className="stat-label">Active Batches</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{showPastEvents.length}+</span>
                  <span className="stat-label">Completed Events</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Participants</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: Batch Rankings */}
        <section className="batch-rankings-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Batch Rankings
                <Trophy className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle">
                Live standings based on total earned points across all events
              </p>
            </div>
            <div className="mt-8"></div>

            <div className="rankings-grid">
              {leaderBoardRows.map((batch, _id) => {
                 i=i+1;
                return (
                  <div
                    key={batch.team}
                    className={`ranking-card ${i <= 3 ? "podium" : ""}`}
                    style={{
                      animationDelay: `${i * 150}ms`,
                      boxShadow: `0 0 40px black`,
                    }}
                  >
                    <div
                      className={`card-gradient bg-gradient-to-br yellow-400`}
                    >
                      {/* Rank Badge */}
                      <div className="rank-badge">
                        <span className="rank-number">#{i}</span>
                       
                      </div>

                      {/* Avatar and Batch */}
                      <div className="batch-info">
                        <div className="batch-avatar">
                         <img
                     src={
                         batch.team === "E21"
                          ? logos[0]
                          : batch.team === "E22"
                          ? logos[1]
                          : batch.team === "E23"
                          ? logos[2]
                          : logos[3]
                            }
                          alt={`${batch.team} logo`}
                           style={{
                          width: "100px",
                         height: "auto",
                           transition: "transform 0.3s ease, box-shadow 0.3s ease",
                          cursor: "pointer"
                            }}
                           onMouseEnter={(e) => {
                           e.currentTarget.style.transform = "scale(1.1)";
                           e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.3)";
                             }}
                             onMouseLeave={(e) => {
                             e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "none";
                          }}
                           />
                        </div>
                        <h3 className="batch-name">{batch.team}</h3>
                        <div className="batch-members">
                          <Users className="w-4 h-4" />
                          <span>{batch.team==="E21"?batchmemenbers[0] 
                                 :batch.team==="E22"? batchmemenbers[1]
                                : batch.team==="E23"?batchmemenbers[2]
                                :batchmemenbers[3]} members</span>
                        </div>
                      </div>

                      {/* Main Stats */}
                      <div className="main-stats">
                        <div className="primary-stat">
                          <span className="stat-value">
                            {batch.points.toLocaleString()}
                          </span>
                          <span className="stat-label">Total Points</span>
                        </div>

                        <div className="weekly-gain">
                          <div className="gain-indicator">
                            {getTrendIcon(batch.improvement)}
                            <span
                              className={`gain-value ${
                                batch.improvement > 0
                                  ? "text-green-400"
                                  : batch.improvement < 0
                                    ? "text-red-400"
                                    : "text-gray-400"
                              }`}
                            >
                              {batch.improvement > 0 ? "+" : ""}
                              {batch.improvement}%
                            </span>
                          </div>
                          <span className="gain-label">Today</span>
                        </div>
                      </div>

                      {/* Performance Grid */}
                      <div className="performance-grid">
                        <div className="perf-item">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="perf-value">{batch.totalWonEvents}</span>
                          <span className="perf-label">Wins</span>
                        </div>
                        <div className="perf-item">
                          <Medal className="w-4 h-4 text-orange-400" />
                          <span className="perf-value">
                            {batch.podiums}
                          </span>
                          <span className="perf-label">Podiums</span>
                        </div>

                      </div>

                      {/* Recent Highlights */}
                      <div className="highlights-section">
                        <h4 className="highlights-title">Recent Highlights</h4>
                        <div className="highlights-list">
                         {batch.recentAchievements.map((achievement, idx) => (
                        <div key={idx} className="highlight-item flex items-center gap-2">
                           {/* Icon depending on rank */}
                         {achievement.rank.toLowerCase() === "winners" && (
                         <Star
                        style={{
                        width: "20px",   // equivalent to w-3
                        height: "20px",  // equivalent to h-3
                        color: "#facc15", // yellow
                        fill: "currentColor",
                        stroke: "none",
                       }}
                      />
                       )}

                        {achievement.rank.toLowerCase() === "firstrunnerup" && (
                          <Star
                            style={{
                              width: "20px",
                              height: "20px",
                              color: "#9ca3af", // gray
                              fill: "currentColor",
                              stroke: "none",
                            }}
                          />
                        )}



                               {/* Event + Rank */}
                                <span>
                                {achievement.event} – {achievement.rank}
                                 </span>
                               </div>
                             ))}
                              
                        </div>
                      </div>


                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default Leaderboard;
