import React from "react";
import StatisticWidget from "../components/Widget/Statistic.jsx";
import AchievementWidget from "../components/Widget/Achievment.jsx";
import DashboardHeader from "../components/Other/DashboardHeader.jsx";
import ScrolledCard from "../components/Widget/ScrolledCard.jsx";
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const avatar =
    "";

  const dataOS = [
    {
      title: "Nombre d'inscrit",
      date: "23/Avril/2024",
      os: "4.886.760",
      gs: "18.032.473",
      percentage: 27.09,
      color: "cardInfo",
    },
    {
      title: "Nombre de parrains Recus",
      date: "23/Avril/2024",
      os: "1.235.567 ",
      gs: "4.886.473",
      percentage: 25.28,
      color: "cardWarning",
    },
    {
      title: "Nombre de parrainnages invalides",
      date: "23/Avril/2024",
      os: "12.342",
      gs: "1.235.567",
      percentage: 0.99,
      color: "cardDanger",
    },
  ];

  const [sidebarToggle] = useOutletContext();

  return (
    <>
      <main className="h-full">
        {/* Welcome Header */}
        <DashboardHeader
          toggle={sidebarToggle}
          avatar={avatar}
          user={{ name: "Tahirou Sarr" }}
        />

        {/* Laba */}
        <div className="px-2 mx-auto mainCard">
          <div className="w-full overflow-hidden text-slate-700 md:grid gap-4 grid md:grid-cols-6">
            <StatisticWidget className="col-span-4 col-start-1 bg-white" />

          </div>
        </div>

        {}
        <div className="px-2 mx-auto mainCard">
          <h1 className="text-slate-500 pb-3 text-base md:text-lg">
            Stats
          </h1>

          <div className="flex flex-row gap-x-4 overflow-hidden overflow-x-auto justify-between no-scrollbar">
            {dataOS?.map((data, index) => (
              <ScrolledCard key={index} data={data} />
            ))}
          </div>

          <div className="lg:w-full w-[1024px] overflow-hidden flex flex-row justify-between text-slate-700 gap-2 lg:max-h-screen overflow-x-auto whitespace-nowrap"></div>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
