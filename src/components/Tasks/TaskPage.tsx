import { Stack } from '@mui/material';
import { useTasks } from '../../../src/components/Tasks/hooks/useTasks';
import { ReactElement } from 'react';
import { TaskProvider } from './context/TaskPageContext';
import { TaskPaginationHero } from './TaskPaginationHero';
import { TaskGrid } from './TaskGrid';
import { TaskFloatButton } from './TaskFloatButton';
import { TaskAddForm } from './TaskAddForm';
import { TaskTimerClock } from './TaskTimerClock';


export function TasksPage ({ children }: { children: ReactElement | ReactElement[]; }): JSX.Element {

  const context = useTasks(5);

  return (
    <TaskProvider value={context}>
      <Stack direction="column" sx={{ borderRadius: '.8em' }}>
        {children}
      </Stack>
    </TaskProvider>
  );
}

TasksPage.PaginationHero = TaskPaginationHero;
TasksPage.Grid = TaskGrid;
TasksPage.FloatButton = TaskFloatButton;
TasksPage.AddForm = TaskAddForm;
TasksPage.TimerClock = TaskTimerClock;