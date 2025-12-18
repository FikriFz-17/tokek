// src/pages/Login.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api";

const Login: React.FC = () => {
  // State Input
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  
  // State UI
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ambil fungsi login dari AuthContext
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Panggil API ke Backend (FastAPI)
      const data = await loginUser(identifier, password);
      
      // 2. Jika sukses, panggil fungsi login dari context
      // Context akan menangani redirect sesuai role (Admin -> Admin Dashboard, User -> Dashboard)
      login({
        identifier: data.identifier,
        role: data.role,
        nama_lengkap: data.identifier // Gunakan identifier jika nama belum tersedia
      });

    } catch (err: any) {
      setError(err.message || "Login gagal. Periksa NIM/NIP dan Password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* Gambar Background (Hidden di Mobile) */}
      <div
        className="hidden flex-1 bg-cover bg-center bg-no-repeat md:flex"
        style={{
          backgroundImage: "url('/bg_telkom.png')",
        }}></div>

      {/* Form Login */}
      <div className="flex w-full flex-col justify-center bg-white p-6 md:w-[35%] md:p-8 lg:p-10">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-900 lg:text-3xl">
              Tel-U Reporting
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Layanan pelaporan resmi Telkom University
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Input Identifier */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="identifier">
                NIM / NIP
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-gray-900 focus:border-red-600 focus:bg-white focus:ring-red-600 sm:text-sm transition duration-200 outline-none"
                  placeholder="Masukkan NIM atau NIP"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 pr-10 text-gray-900 focus:border-red-600 focus:bg-white focus:ring-red-600 sm:text-sm transition duration-200 outline-none"
                  placeholder="Masukkan password"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button type="button" onClick={togglePasswordVisibility} className="text-gray-400 hover:text-gray-600 focus:outline-none">
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-6 flex w-full justify-center rounded-lg bg-red-900 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 
                ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-red-800 hover:shadow-xl"} 
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-12 text-center text-xs text-gray-400">
            &copy; 2025 Telkom University
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;