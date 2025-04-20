import React, { useContext } from 'react';
import { UserContext } from '../../../context';
import { Box } from '@mui/material';
import PageWrapper from '../../ui/wrappers/PageWrapper';
import PageTitle from '../../ui/containers/PageTitle';
import LoadingPage from '../../ui/containers/LoadingPage';
import Content from '../../ui/wrappers/Content';
import FullWidthBanner from '../../ui/containers/FullWidthBanner';
import ModuleBanner from './widgets/ModuleBanner';
import MasterpieceBanner from './widgets/MasterpieceBanner';
import StatBanner from './widgets/StatBanner';
import Leaderboard from './widgets/Leaderboard';
import LevelBanner from './widgets/LevelBanner';
import { getModuleStatus } from '../module/ModulesPage';
import { moduleMap } from '../module/Module';

const getModulePercentage = (moduleData, chapterCount) => {
  return Math.round(moduleData?.filter?.(el => el?.status === 2)?.length * 100 / chapterCount) || 0;
};

export const levelMap = [
  {
    level: "1",
    levelPoints: "5",
    points: "0"
  },
  {
    level: "2",
    levelPoints: "10",
    points: "5"
  },
  {
    level: "3",
    levelPoints: "15",
    points: "15"
  },
  {
    level: "4",
    levelPoints: "20",
    points: "30"
  },
  {
    level: "5",
    levelPoints: "25",
    points: "50"
  },
  {
    level: "6",
    levelPoints: "30",
    points: "75"
  },
  {
    level: "7",
    levelPoints: "35",
    points: "105"
  },
  {
    level: "8",
    levelPoints: "40",
    points: "140"
  },
  {
    level: "9",
    levelPoints: "45",
    points: "180"
  },
  {
    level: "10",
    levelPoints: "50",
    points: "225"
  },
  {
    level: "11",
    levelPoints: "55",
    points: "275"
  },
];

export default function Dashboard() {
  const { userData, isLoading } = useContext(UserContext);
  const modulesData = [
    userData?.["intro"],
    userData?.["command_line"],
    userData?.["file_system"],
  ];

  const currentModuleData = modulesData?.find(el => getModuleStatus(el) === 1 && el) || {};
  const currentModuleIndex = modulesData?.findIndex(el => getModuleStatus(el) === 1);
  const currentModuleTitle = moduleMap?.[currentModuleIndex]?.title || moduleMap?.[3]?.title;
  const currentModuleStatus = getModuleStatus(currentModuleData);
  const currentModuleProgress = currentModuleData?.reduce?.((prev, cur) => prev + cur?.progress, 0) || 0;
  const currentModulePercentage = getModulePercentage(currentModuleData, currentModuleData?.length);

  const lvl = levelMap.findLast(el => el.points <= userData?.points);
  const points = userData?.points - lvl?.points;
  const level = lvl?.level;
  const levelPoints = lvl?.levelPoints;

  const modules = modulesData?.filter?.(el => getModuleStatus(el) === 2)?.length || 0;
  const achievements = userData?.achievements?.length || 0;

  return (
    <PageWrapper>
      { isLoading ?
          <LoadingPage />
        :
          <Content>
            <PageTitle value="Мое обучение"/>
            <FullWidthBanner />
            <Box
              display='flex' flexDirection='row'
              gap='1.5rem' height='8.5rem' width='100%'
            >
              <ModuleBanner
                data={currentModuleData}
                index={currentModuleIndex}
                title={currentModuleTitle}
                status={currentModuleStatus}
                progress={currentModuleProgress}
                percentage={currentModulePercentage}
              />
              <LevelBanner
                level={level}
                levelPoints={levelPoints}
                points={points}
              />
            </Box>
            <Box
              display='flex' flexDirection='row'
              gap='1.5rem' height='8.5rem' width='100%'
            >
              <MasterpieceBanner value={userData?.points}/>
              <StatBanner
                levels={level}
                modules={modules}
                achievements={achievements}
              />
            </Box>
            <Leaderboard userData={userData}/>
          </Content>
      }
    </PageWrapper>
  );
}