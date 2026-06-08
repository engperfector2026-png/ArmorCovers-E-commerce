import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          phone: phoneNumber,
          password,
          role,
        }
      );

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">

      <div className="bg-white rounded-3xl shadow-xl border border-orange-200 p-8 w-full max-w-lg">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-900">
            Join ArmorCovers
          </h1>

          <p className="text-slate-600 mt-2">
            Create your marketplace account
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <div>

            <label className="block text-slate-700 font-semibold mb-2">
              Account Type
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="buyer">
                Buyer Account
              </option>

              <option value="seller">
                Seller Account
              </option>
            </select>

          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;