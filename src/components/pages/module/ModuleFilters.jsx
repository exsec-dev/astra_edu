import React from 'react';
import { Stack } from '@mui/material';
import FilterButton from './FilterButton';


export default function ModuleFilters({ handleFilterChange, currentFilter, disabled=false }) {
  return (
    <Stack direction='row' sx={{ gap: '0.75rem' }}>
      <FilterButton label='Все' isClicked={currentFilter === 'Все'} handleClick={() => handleFilterChange('Все')}/>
      <FilterButton disabled={disabled} label='Доступные мне' isClicked={currentFilter === 'Доступные мне'} handleClick={() => handleFilterChange('Доступные мне')}/>
      <FilterButton disabled={disabled} label='Завершенные' isClicked={currentFilter === 'Завершенные'} handleClick={() => handleFilterChange('Завершенные')}/>
      <FilterButton disabled={disabled} label='Предстоящие' isClicked={currentFilter === 'Предстоящие'} handleClick={() => handleFilterChange('Предстоящие')}/>
    </Stack>
  );
}