import { call, delay, put } from "redux-saga/effects";

export const createRequestActionTypes = (type) => {
  const REQUEST = `${type}_REQUEST`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return [REQUEST, SUCCESS, FAILURE];
};

export function createRequestSaga(type, request) {
  const SUCCESS = type.replace(/REQUEST/g, "SUCCESS");
  const FAILURE = type.replace(/REQUEST/g, "FAILURE");

  //SUCCESS = LOGIN_SUCCEESS //

  return function* (action) {
    //* 붙은 게 제너레이터 문법이라고 해가지고, 계속 감시할 수 있어요. 액션을 감지할
    //yield put

    try {
      const response = yield call(request, action.payload); //call 은 사가 문법인데,
      //async await 랑 같다고 생각하면 되요.  저희 시큐리티 서버가 주는 response 를 받아와요.

      console.log("여기서 직접 확인", response);

      const token = response.headers.authorization;
      console.log("token", token);

      localStorage.setItem("jwt", token);

      yield put({
        //사가 문법 중의 액션 타입을 실행시켜줘요.
        type: SUCCESS,
        payload: response.data.data,
      });
    } catch (e) {
      const errorData = e.response.data;

      console.error("error data", errorData);

      yield put({
        type: FAILURE,
        payload: errorData,
        error: true,
      });
    }
  };
}
