import { Add } from '@mui/icons-material';
import { FloatButton } from '../../../src/components/common/FloatButton';
import { useContext } from 'react';
import { coursePageContext } from './context/courseContext';


export const CourseFloatButton = () => {
  const { dialogHandler: { onOpenCreate } } = useContext(coursePageContext);

  return (
    <FloatButton
      onAction={onOpenCreate}
      icon={<Add sx={{ fontSize: { md: '2.5em' } }} />}
      sxProps={{ position: 'fixed', bottom: 16, right: 16 }}
    />
  );
};