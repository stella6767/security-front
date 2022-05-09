import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAction } from "../reducer/test";
import useUpdateEffect from "./../lib/useUpdateEffect";

const Check = memo(() => {
  const dispatch = useDispatch();

  const { data } = useSelector(({ test }) => ({
    data: test.data,
  }));

  //   useEffect(() => {
  //     console.log("check compnent 랜더링");
  //   }, []);

  useEffect(() => {
    console.log("check compnent 랜더링");
  }, [data]);

  useUpdateEffect(() => {
    console.log("data", data);
  }, [data]);

  const apiTest = () => {
    console.log("순서1");
    dispatch(checkAction());
  };

  return (
    <div>
      <h1>체크!!!</h1>
      <h1>{data}</h1>
      <button onClick={apiTest}> api test</button>
    </div>
  );
});

export default Check;
