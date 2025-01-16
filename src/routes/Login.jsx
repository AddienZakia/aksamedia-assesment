import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/cookies";
import { useAuthStore } from "../store/useStore";

const {
  VITE_EMAIL: EMAIL,
  VITE_PASSWORD: PASSWORD,
  VITE_TOKEN: TOKEN,
  VITE_NAME: NAME,
} = import.meta.env;

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // static email & password, check README file
    if (formData.email === EMAIL && formData.password === PASSWORD) {
      setToken(TOKEN);
      setUser({
        name: NAME,
        email: EMAIL,
      });
      navigate("/admin", {
        replace: true,
      });
    }
  };

  return (
    <section className="flex items-center justify-center w-full min-h-screen bg-lightBlue dark:bg-darkMode-main dark:text-darkMode-typo">
      <div className="w-[90%] md:w-[50%] lg:w-[35%] 2xl:w-[25%] bg-white rounded-2xl p-6 md:py-8 dark:bg-darkMode-surface">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-darkBlue-main">Login</h1>
          <p className="text-base font-medium">
            Silahkan login ke akun anda terlebih dahulu
          </p>
        </div>

        <form className="mt-3 space-y-6 md:mt-6" onSubmit={onSubmit}>
          <div className="space-y-3 md:space-y-6">
            <div className="space-y-1">
              <p className="font-medium">
                Email<span className="text-red-500">*</span>
              </p>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Silahkan masukkan email anda"
                className="w-full p-3 text-base truncate rounded-md bg-slate-100 dark:bg-darkMode-hover"
                required
                onChange={onValueChange}
              />
            </div>

            <div className="space-y-1">
              <p className="font-medium">
                Password<span className="text-red-500">*</span>
              </p>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Silahkan masukkan password anda"
                className="w-full p-3 text-base truncate rounded-md bg-slate-100 dark:bg-darkMode-hover"
                required
                onChange={onValueChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <button
              type="submit"
              className="w-full p-2 text-center transition-all duration-200 rounded-md bg-darkBlue-main text-lightBlue hover:bg-darkBlue-hover"
            >
              Login
            </button>
            <p className="font-medium text-center">
              Blum punya akun?{" "}
              <span className="text-darkBlue-main">
                <a href="">Sign Up</a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
