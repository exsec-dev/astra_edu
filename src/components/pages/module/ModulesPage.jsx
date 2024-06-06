import React, { useState, useContext } from 'react';
import { UserContext } from '../../../context';
import { Box, Grid } from '@mui/material';
import PageWrapper from '../../ui/wrappers/PageWrapper';
import PageTitle from '../../ui/containers/PageTitle';
import Content from '../../ui/wrappers/Content';
import PageText from '../../ui/containers/PageText';
import ModuleFilters from './ModuleFilters';
import Module from './Module';

export const getModuleStatus = (moduleData) => {
  if (moduleData?.every?.(el => el?.status === 0 || el?.bonus)) {
    return 0;
  }
  if (moduleData?.some?.(el => el?.status === 1)) {
    return 1;
  }
  if (moduleData?.every?.(el => el?.status === 2 || el?.bonus)) {
    return 2;
  }
  return 0;
};

const filterModule = (status, currentFilter) => {
  if (currentFilter === "Все") {
    return true;
  }
  if (currentFilter === "Доступные мне") {
    return [1, 2].includes(status);
  }
  if (currentFilter === "Завершенные") {
    return 2 === status;
  }
  if (currentFilter === "Предстоящие") {
    return 0 === status;
  }
};

export default function ModulesPage() {
  const [currentFilter, setCurrentFilter] = useState('Все');
  const { userData, isAuthorized } = useContext(UserContext);

  const modulesData = [
    JSON.parse(userData?.["intro"] || "[]"),
    JSON.parse(userData?.["command_line"] || "[]"),
  ];

  const modules = Array.from({length: 9}, (_, i) => i)
  .filter(id => filterModule(getModuleStatus(modulesData?.[id]), currentFilter))
  .map((id) => {
    return <Module id={id} key={id} status={getModuleStatus(modulesData?.[id])} isAuthorized={isAuthorized}/>
  });

  return (
    <PageWrapper>
      <Content>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          <PageTitle value="Модули"/>
          <PageText value="Здесь вы найдете список всех разделов обучения. Каждый модуль представляет собой глубокое погружение в отдельную тему, покрывающую широкий спектр знаний, необходимых для понимания и работы с Astra Linux. Вы можете посмотреть, какой материал еще предстоит изучить, или повторить уже пройденное." />
        </Box>
        {
          isAuthorized && <ModuleFilters handleFilterChange={setCurrentFilter} currentFilter={currentFilter}/>
        }
        <Grid container sx={{ flexWrap: 'wrap', gap: '0.875rem 1.25rem', paddingTop: '0.375rem' }}>
          { 
            modules?.length ?
              modules
            :
              <Box
                display='flex' alignItems='center' justifyContent='center'
                width='100%' height='15.625rem'
                sx={{ opacity: '0.25' }}
              >
                Нет результатов
              </Box>
          }
        </Grid>
      </Content>
    </PageWrapper>
  );
}