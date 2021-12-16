import "./App.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { googleAction, loginAction } from "./reducer/auth";
import { useState } from "react";
import GoogleLogin from "react-google-login";

//통신 준비 끝나거고, 구조 다 잡혔으니까, 여기서 5분만 쉬고 진행해도 도;ㄹ
//저 왔습니다.
//그 전에 revers proxy 방식이랑.. 그냥 하는 거 차이점을 알아볼게요.

//이렇게 jwT를 리턴받았잖아요.

//일단은 리덕스 개념은 다 아시고 있으시죠? 짤막하게 설명할게요.

//스프링부트에서 applicationContext. IOC 컨테이너, 그거랑 비슷한 개념이라고 생각하면 되요.

//쿠키 JWT , 웹 스토리지 이런 거 말씀드렸잖아요.
//JWT 를 발급을 하면, 우리가 지금 은 웹 스토리지에 저장을 했어요.  딱 봐도 뭔가 보안에 위험할 것 같죠.
//그래서 옆의 친구가 본인 브라우저에서 토큰을 복사 붙여넣기 하면 이제 그 친구도 인증과 권한을 획득한 거에요.
//그래서 보통 보안을 이유로 JWT Token은 유효기간을 짧게 잡아요.
//1시간이라고 치면 1시간이 지나면 세션이 풀리는 거잖아요. 세션 같은 경우에는 사용자가 요청을 세션 시간을 1시간으로 잡아도 그 안에 10분전에 동일 세션 사용자로부터 요청이 오면 다시 1시간이 연장된단 말이에요.
//근데 JWT는 얄짤 없어요. 무조건 기간 지나면 만료되요.만료되면 다시 로그인해야겠죠. 근데 이러면 사용자 경험, UX 측면에서 경험이 안 좋아요. 근데 UX 를 위해서, 토큰 유효기간을 길게 잡으면 보안에 취약하단 말이요
//근데 우리가 보통 구글 같은 경우에 로그인하면, 내일 아침에 일어나서 접속해도 여전히 접속중인 상태잖아요. \

function App() {
  //dispath 선언
  const dispatch = useDispatch();

  const clientId =
    "65042798307-j7fa7o7d22m1nthjh32jh5blfg4551p5.apps.googleusercontent.com";

  const { principal } = useSelector(({ auth }) => ({
    principal: auth.principal,
  }));

  const googleLogin = (response) => {
    console.log("??");
    dispatch(googleAction(response));
  };

  const [random, setRendom] = useState(null); // 저희가 컴포넌트 내부에서 상태를 선언한 거죠?

  //react는 기본적으로 데이터원웨이 바인딩이에요. 한 방향으로만 흘러요. 데이터가, 그래서 자식이 부모에게 데이터를 넘겨주거나,
  //형제 컴포넌트에게 넘겨주는 걸 할 수가 없어요.

  const onFinish = (values) => {
    console.log("Success:", values);

    dispatch(loginAction(values)); //다 갖다 쓸 수 있다.
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div>{principal == null ? "ss" : principal.username}</div>

      <GoogleLogin
        clientId={clientId}
        buttonText="Google Login"
        onSuccess={googleLogin}
        onFailure={googleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}

export default App;
