import { createAction, handleActions } from "redux-actions";
import {
  createRequestActionTypes,
  createRequestSaga,
} from "../lib/createRequestSaga";
import * as authApi from "../lib/api/auth";
import { takeLatest } from "@redux-saga/core/effects";

//api 요청 할 때 액션타입은 무조건 이 3개 만든다고 생각하면 되요.

//액션 타입 생성
const [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("LOGIN");

const [GOOGLE_REQUEST, GOOGLE_SUCCESS, GOOGLE_FAILURE] =
  createRequestActionTypes("GOOGLE");

//액션 생성함수
export const loginAction = createAction(LOGIN_REQUEST, (data) => data);
export const googleAction = createAction(GOOGLE_REQUEST, (data) => data);

//사가 생성
const loginSaga = createRequestSaga(LOGIN_REQUEST, authApi.login);
const googleSaga = createRequestSaga(GOOGLE_REQUEST, authApi.sociaLogin);

export function* authSaga() {
  //제너레이터 문법인데, 이벤트리스너 랑 비슷하다고

  console.log("감시자");

  yield takeLatest(LOGIN_REQUEST, loginSaga); //버튼을 여러번 누르잖아요. 그러면 마지막에 누른 것만 포착해서 실행시켜줘요.
  yield takeLatest(GOOGLE_REQUEST, googleSaga); //버튼을 여러번 누르잖아요. 그러면 마지막에 누른 것만 포착해서 실행시켜줘요.
}

// 초기 상태 선언
const initialState = {
  loginRequest: false, //이 상태값들은 전역변수, 어떤 위치의 컴포넌트도 다 가져서 쓸 수가 있어요.
  loginDone: false,
  loginError: null,

  googleRequest: false, //이 상태값들은 전역변수, 어떤 위치의 컴포넌트도 다 가져서 쓸 수가 있어요.
  googleDone: false,
  googleError: null,

  principal: null,
};

const auth = handleActions(
  {
    [LOGIN_REQUEST]: (state, { payload: data }) => ({
      ...state,
      loginRequest: true,
    }),

    [LOGIN_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      loginDone: true,
      principal: data,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      loginError: error,
    }),

    [GOOGLE_REQUEST]: (state, { payload: data }) => ({
      ...state,
      googleRequest: true,
    }),

    [GOOGLE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      googleDone: true,
      principal: data,
    }),
    [GOOGLE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      googleError: error,
    }),
  },
  initialState
);

export default auth;
