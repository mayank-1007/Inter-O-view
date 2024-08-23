"use client";
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

interface BasicDetails {
  Name: string;
  SkillsNeeded: string[];
  Vacancy: string;
}

interface InterviewSummary {
  NegativePoints: string;
  PositivePoints: string;
}

interface Scores {
  EducationalBackgroundScore: number;
  Experience: number;
  InterpersonalCommunication: number;
  OverallScore: number;
  TechnicalKnowledge: number;
}

interface DashboardData {
  summary: {
    BasicDetails: BasicDetails;
    InterviewSummary: InterviewSummary;
    Scores: Scores;
  };
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  // const [notes, setNotes] = useState('');

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://127.0.0.1:5000/end_interview')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: DashboardData) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { BasicDetails, InterviewSummary, Scores } = data.summary;

  const strengths = [
    { label: 'Technical Knowledge', value: 10*Scores.TechnicalKnowledge, color: '#292D32' },
    { label: 'Experience', value: 10*Scores.Experience, color: '#3172a1' },
    // Add more as needed
  ];

  const weaknesses = [
    { label: 'Educational Background', value: 10*Scores.EducationalBackgroundScore, color: '#6393b8' },
    { label: 'Interpersonal Communication', value: 10*Scores.InterpersonalCommunication, color: '#97b6d6' },
    // Add more as needed
  ];

  return (
    <div className="app-container">
      <div className="left-container">
        <div className="header">
          <div className="icons">
            <div className="home-icon">
              <i className="fas fa-home"></i>
            </div>
            <div className="list-icon">
              <i className="fas fa-list-ul"></i>
            </div>
            <div className="chat-icon">
              <i className="fas fa-comments"></i>
            </div>
            <div className="document-icon">
              <i className="fas fa-file-alt"></i>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-wrapper">
              <svg height="200" width="200">
                <g>
                  {/* Example Chart */}
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="overview">
          <h2>Overview</h2>
          <div className="interview-summary-container">
          <h2>Interview Summary</h2>
          <div className="interview-summary">
            <div className="interview-summary-negative">
              <h3>Negative Points</h3>
              <p>{InterviewSummary.NegativePoints}</p>
            </div>
            <div className="interview-summary-positive">
              <h3>Positive Points</h3>
              <p>{InterviewSummary.PositivePoints}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="right-container">
        <div className="profile-container">
          <div className="profile-image">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="profile-name">{BasicDetails.Name}</div>
        </div>
        <div className="overall-score-container">
          <div className="overall-score-circle">
            <div className="overall-score-text">
              Overall Score
              <span>{Scores.OverallScore}</span>
            </div>
          </div>
          <div className="vacancy-container">
            <div className="vacancy-label">Vacancy:</div>
            <div className="vacancy-value">{BasicDetails.Vacancy}</div>
          </div>
        </div>
        <div className="strengths-weaknesses-container">
          <div className="strengths-container">
            <h2>Strengths</h2>
            {strengths.map((item, index) => (
              <div key={index} className="strength-item">
                <div className="strength-label">{item.label}</div>
                <div className="strength-bar">
                  <div
                    className="strength-bar-fill"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  ></div>
                </div>
                <div className="strength-value">{item.value}%</div>
              </div>
            ))}
          </div>
          <div className="weaknesses-container">
            <h2>Weaknesses</h2>
            {weaknesses.map((item, index) => (
              <div key={index} className="weakness-item">
                <div className="weakness-label">{item.label}</div>
                <div className="weakness-bar">
                  <div
                    className="weakness-bar-fill"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  ></div>
                </div>
                <div className="weakness-value">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
