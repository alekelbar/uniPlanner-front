import { RESPONSES } from "../../interfaces/response-messages";
import { CreateSession, Session } from "../../interfaces/session-interface";
import { SessionService } from "../../services/Sessions/session-service";
import {
  addSession,
  loadSessions,
  removeSession,
  startLoadingSession,
  stopLoadingSession,
} from "../slices";
import { AppDispatch } from "../store";

export const startLoadSession = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingSession());

    const response = await new SessionService().getAll(userId);

    const { data } = response;

    if (response.status !== 200) {
      dispatch(stopLoadingSession());
      return response;
    }

    dispatch(loadSessions(data));
    dispatch(stopLoadingSession());
    return RESPONSES.SUCCESS;
  };
};

export const startcreateSession = (
  user: string,
  createSession: CreateSession
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingSession());
    const response = await new SessionService().createSessions({
      ...createSession,
      user,
    });

    if (response.status !== 201) {
      dispatch(stopLoadingSession());
      return response;
    }

    const { data } = response;
    dispatch(addSession(data));
    dispatch(stopLoadingSession());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveSession = (delSession: Session) => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingSession());
    const response = await new SessionService().removeSessions(delSession);

    const { data } = response;
    if (response.status !== 200) {
      dispatch(stopLoadingSession());
      return response;
    }

    dispatch(removeSession(data));
    dispatch(stopLoadingSession());
    return RESPONSES.SUCCESS;
  };
};
