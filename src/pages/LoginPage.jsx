import React, { useState } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import log from "../assets/log.png";
import { loginUser, registerUser, verify } from "../services/user";

const InputField = ({ label, type, placeholder, value, onChange }) => (
  <div>
    <label className="block text-brown-900 font-medium mb-1">
      {label} <span className="text-red-600">*</span>
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-brown-600"
      required
    />
  </div>
);

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    // Gửi yêu cầu reset mật khẩu đến API 
    try {
      // Thay thế 'http://localhost:3005/users/forgot-password' bằng endpoint reset mật khẩu thực tế
      const response = await axios.post('http://localhost:3005/users/forgot-password', { email });
      // Xử lý phản hồi từ API 
      console.log(response.data.message); // Hiển thị thông báo thành công hoặc lỗi
    } catch (error) {
      console.error(error); // Xử lý lỗi
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <img src={log} alt="log" className="mb-4" />

      <div className="flex items-center space-x-2 text-brown-800 mb-6">
        <FaHome className="text-lg" />
        <span onClick={() => navigate("/")} className="cursor-pointer hover:underline">
          Trang chủ
        </span>
        <span className="text-gray-500">/</span>
        <span className="font-semibold">Đăng nhập tài khoản</span>
      </div>

      <div className="w-full max-w-md">
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <h2 className="text-2xl font-semibold text-brown-900 mb-4">
          {showPasswordReset ? "Quên mật khẩu?" : "Đăng nhập tài khoản"}
        </h2>

        <form onSubmit={showPasswordReset ? handlePasswordReset : handleLogin} className="space-y-4">
          {!showPasswordReset && (
            <>
              <InputField
                label="Email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                label="Mật khẩu"
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          {showPasswordReset && (
            <InputField
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <button
            type="submit"
            className="bg-[#2c1200] text-white px-6 py-2 rounded-md hover:bg-brown-900"
          >
            {showPasswordReset ? "Lấy lại mật khẩu" : "Đăng nhập"}
          </button>

          {!showPasswordReset && (
            <p className="text-brown-700 mb-6">
              Nếu bạn đã có tài khoản, đăng nhập tại đây.
            </p>
          )}

          {showPasswordReset && (
            <p className="text-brown-700 mb-6">
              Nhập địa chỉ email để lấy lại mật khẩu qua email.
            </p>
          )}
        </form>

        {!showPasswordReset && (
          <p className="text-brown-800 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            Đăng ký
          </p>
        )}

        {showPasswordReset && (
          <p className="text-brown-800 cursor-pointer hover:underline" onClick={() => setShowPasswordReset(false)}>
            Quay lại đăng nhập
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginForm;