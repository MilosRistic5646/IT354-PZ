import React from "react";
import LoginForm from "@/assets/components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-gray-100 shadow-md rounded-lg"> {/* Prošireno */}
          <LoginForm />
        </div>
      </main>
      </div>
  );
};

export default Login;
