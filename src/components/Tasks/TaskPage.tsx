import { Stack } from '@mui/material';
import { useTasks } from '../../../src/components/Tasks/hooks/useTasks';
import { ReactElement } from 'react';
import { TaskProvider } from './context/TaskPageContext';
import { TaskPaginationHero } from './TaskPaginationHero';
import { TaskGrid } from './TaskGrid';
import { TaskFloatButton } from './TaskFloatButton';
import { TaskAddForm } from './TaskAddForm';
import { TaskEditForm } from './TaskEdit';
import { TaskTimerClock } from './TaskTimerClock';
import NotFoundPage from '../Layout/NotFoundPage';
import { Loading } from '../common/Loading';


export function TasksPage ({ children }: { children: ReactElement | ReactElement[]; }): JSX.Element {
  const context = useTasks();

  const { tasksState: { selectedDelivery, loading } } = context;

  if (!selectedDelivery) return <NotFoundPage />;

  if (loading) return <Loading called='task' />;

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
TasksPage.EditForm = TaskEditForm;
TasksPage.TimerClock = TaskTimerClock;