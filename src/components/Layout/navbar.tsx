import { logOut } from '@/helpers/local-storage';
import { useAppDispatch } from '@/redux';
import { onLogOut } from '@/redux/slices/auth/authSlice';
import { Login, Menu } from '@mui/icons-material';
import { AppBar, Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

interface NabvarProps {
  onOpen: () => void;
}

export function Navbar ({ onOpen }: NabvarProps): JSX.Element {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Ir a inicio de sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, iniciar sesión',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      dispatch(onLogOut());
      logOut();
      router.push('/auth/');
    }
  };

  return (
    <AppBar position='static' sx={{ p: 2 }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Stack direction={'row'} justifyContent={'start'} alignItems={'center'} gap={1.5}>
          <Button
            sx={{
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
            onClick={onOpen}
          >
            <Menu sx={{ fontSize: '2em', color: theme => theme.palette.text.secondary }} />
          </Button>
          <Typography variant="h4">
            UniPlanner
          </Typography>
        </Stack>
        <Button
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          onClick={handleLogOut}
        >
          <Login sx={{ fontSize: '2em', color: theme => theme.palette.text.secondary }} />
        </Button>
      </Stack>
    </AppBar>
  );
}