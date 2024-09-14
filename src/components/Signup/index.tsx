import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginData { 
  username:string;
  password:string;
}

const Signup = () => {

  const [loginData, setloginData] = useState<LoginData>({username:'', password:''});

  const navigate = useNavigate();

  const handleForm = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setloginData((prev)=>({...prev, [name]:value}))
  }

  const submit = async () =>{
    try {
      const res = await axios.post("https://api.cher1shrxd.me/auth/signup", loginData);
    if(res){
      alert("회원가입 성공");
      navigate("/login");
    }
    } catch (err:any) {
      if(err.response.data.status === 409){
        alert("이미 존재하는 아이디가 존재합니다.")
      }
      alert("네트워크 에러");
    }
  }


  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          fontStyle: "pretendard",
          fontSize: "1,7rem",
          fontWeight: "400",
        }}
      >
        회원가입
      </h1>
      <input
        type="text"
        placeholder="아이디"
        style={{ marginBottom: "20px" }}
        name="username"
        onChange={handleForm}
        value={loginData.username}
      />
      <input
        type="password"
        placeholder="비밀번호"
        name="password"
        style={{ marginBottom: "20px" }}
        onChange={handleForm}
        value={loginData.password}
      />
      <button onClick={submit}>회원가입</button>
    </div>
  );
};

export default Signup;
