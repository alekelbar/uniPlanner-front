import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Career } from "../../interfaces/career.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { useAppDispatch } from "../../redux/hooks";
import { setSelectedCareer } from "../../redux/slices/Career/careerSlice";
import { startRemoveCareer } from "../../redux/thunks/careers-thunks";
import { useContext } from "react";
import { globalContext } from "../Layout/types/GlobalContext";
import { confirmWithSweetAlert } from "@/helpers/swalConfirm";

interface CareerCardProps {
  career: Career;
}

export const CareerCard = function CareerCard({
  career,
}: CareerCardProps): JSX.Element {
  const { handleShowSnack } = useContext(globalContext);

  const { name, _id } = career;
  const dispatch = useAppDispatch();

  const router = useRouter();
  const {
    query: { user },
  } = router;

  const handleRemove = async () => {
    const confirmation = await confirmWithSweetAlert();
    if (confirmation.isConfirmed) {
      const response = await dispatch(startRemoveCareer(user as string, _id));
      if (response !== RESPONSES.SUCCESS) {
        handleShowSnack(response);
      }
    }
  };

  const handleSelectedCareer = () => {
    dispatch(setSelectedCareer(career));
    router.push(`/schedule/courses/list/${career.name}/${career._id}/${user}`);
  };

  return (
    <Card
      variant="elevation"
      data-testid="career-card"
      sx={{
        p: 2,
      }}
    >
      <CardHeader title={name} />
      <CardContent>
        <CardActions>
          <Button color="secondary" onClick={handleSelectedCareer}>
            Cursos
          </Button>
          <Button color="warning" onClick={handleRemove}>
            inhabilitar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
