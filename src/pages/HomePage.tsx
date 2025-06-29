import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { Paths } from '../routes/paths';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page-wrapper">
      <div className="home-content">
        <h1>ברוכה הבאה לאתר הדיאטה 🍏</h1>
        <p>הזיני את הרגלי האכילה שלך – ותקבלי דיאטה מותאמת אישית!</p>

        <button
          className="home-button start-btn"
          onClick={() => alert('כאן יופיע תהליך התאמה בעתיד')}
        >
          התחילי התאמה
        </button>

        <button
          className="home-button track-btn"
          onClick={() => navigate(`/${Paths.weeklyTracking}`)}
        >
          למעקב השבועי
        </button>
      </div>
    </div>
  );
};
