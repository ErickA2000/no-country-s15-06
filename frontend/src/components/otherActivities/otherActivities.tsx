// components/OtherActivities.tsx
"use client";
import React from 'react';
import { CgGym } from "react-icons/cg";
import { FaPersonSwimming } from "react-icons/fa6";
import { GiSoccerBall } from "react-icons/gi";
import { FaBasketballBall } from "react-icons/fa"; // Importing the basketball icon

interface Activity {
  icon: JSX.Element;
  title: string;
  path?: string; // You can provide the path later
}

const activities: Activity[] = [
  {
    icon: <CgGym />, // Using the gym icon
    title: 'Gym',
    path: '/activities/gym',
  },
  {
    icon: <FaPersonSwimming />, // Using the swimming icon
    title: 'Natación',
    path: '/activities/natacion',
  },
  {
    icon: <GiSoccerBall />, // Using the soccer icon
    title: 'Fútbol',
    path: '/activities/fútbol',
  },
  {
    icon: <FaBasketballBall />, // Using the basketball icon
    title: 'Básquetball',
    path: '/activities/básquetbol',
  },
];

const OtherActivities: React.FC = () => {
  return (
    <div className="">
      <h2 className="font-medium text-[#175F70] text-2xl mb-4 mt-4 md:mt-8">Otras Actividades del Club</h2>
      <div className="grid grid-cols-4 gap-4">
        {activities.map((activity, index) => (
          <button
            key={index}
            className="text-[#175F70] flex flex-col items-center bg-white p-4 rounded-lg shadow-md relative transform transition-transform duration-150 hover:scale-105 active:scale-95"
            onClick={() => window.location.href = activity.path || '#'} // Change the path to match your routing logic
          >
            <div className="text-4xl mb-2">{activity.icon}</div>
            <h3 className="text-md font-semibold">{activity.title}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OtherActivities;
