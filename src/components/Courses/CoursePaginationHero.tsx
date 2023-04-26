
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useContext } from 'react';
import { coursePageContext } from './context/courseContext';


export const CoursePaginationHero = () => {

  const {
    pagination: { actualPage, totalPages, handleChangePage },
    coursesState: { careerName }
  } = useContext(coursePageContext);

  return (
    <Box position='sticky' top={0} sx={{
      // backgroundColor: ({ palette }) => palette.secondary.main,
      zIndex: '10'
    }}>
      <Typography
        mt={1}
        align='center'
        variant='subtitle1'>
        {`${careerName}`}
      </Typography>
      <Grid container spacing={2} direction="row" justifyContent={'center'} alignItems='center'>
        <Grid item>
          <Pagination
            page={actualPage}
            sx={{
              width: "100%",
              py: 1
            }}
            size="small"
            count={totalPages}
            onChange={handleChangePage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
