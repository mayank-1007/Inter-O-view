"use client"
import React from 'react';
import { useState } from 'react';
import './Dashboard.css';

interface DataItem {
  label: string;
  value: number;
  color: string;
}

const data: DataItem[] = [
  { label: '% education', value: 10, color: '#292D32' },
  { label: '% experience', value: 20, color: '#3172a1' },
  { label: '% interpersonal communication', value: 30, color: '#6393b8' },
  { label: '% education', value: 40, color: '#97b6d6' },
];

interface Props {
  name: string;
  overallScore: number;
  vacancy: string;
}

const Dashboard: React.FC<Props> = ({ name, overallScore, vacancy }) => {
  const [notes, setNotes] = useState('');

  const strengths: DataItem[] = [
    { label: 'xyz', value: 70, color: '#292D32' },
    { label: 'xyz', value: 80, color: '#3172a1' },
    { label: 'xyz', value: 60, color: '#6393b8' },
    { label: 'xyz', value: 50, color: '#97b6d6' },
  ];

  const weaknesses: DataItem[] = [
    { label: 'xyz', value: 30, color: '#292D32' },
    { label: 'xyz', value: 40, color: '#3172a1' },
    { label: 'xyz', value: 50, color: '#6393b8' },
    { label: 'xyz', value: 60, color: '#97b6d6' },
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
                  {data.map((item, index) => (
                    <circle
                      key={index}
                      cx="100"
                      cy="100"
                      r={90 - index * 15}
                      fill={item.color}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="overview">
          <h2>overview</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="notes-textarea"
            placeholder="notes/remarks-"
          />
        </div>
      </div>
      <div className="right-container">
        <div className="profile-container">
          <div className="profile-image">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="profile-name">{name}</div>
        </div>
        <div className="overall-score-container">
          <div className="overall-score-circle">
            <div className="overall-score-text">
              overall score
              <span>{overallScore}</span>
            </div>
          </div>
          <div className="vacancy-container">
            <div className="vacancy-label">vacancy-</div>
            <div className="vacancy-value">{vacancy}</div>
          </div>
        </div>
        <div className="strengths-weaknesses-container">
          <div className="strengths-container">
            <h2>strengths</h2>
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
            <h2>weaknesses</h2>
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