"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
const Table = dynamic(() => import("./Table"), { ssr: false });
const ResponsiveTable = dynamic(() => import("./ResponsiveTable"), { ssr: false });

const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
    margin: "2rem auto",
    backgroundColor: "#f9f9f9"
}

const buttonStyle = {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s"
}

const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    boxSizing: "border-box"
}

const StaticTable = ({ view, days, hours }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault()
        const fixedPassword = "ver"; // Contraseña fija solo para no mostrar mis datos estaticos a cualquiera xd
        if (password === fixedPassword) {
            setIsAuthenticated(true);
        } else {
            alert("Contraseña incorrecta");
        }
    };

    return (
        <div>
            {!isAuthenticated ? (
                <form onSubmit={handleLogin} style={formStyle}>
                    <input
                        type="password"
                        placeholder="Ingresa la contraseña"
                        autoComplete="none"
                        name="fakeDataStatic"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                    />
                    <button style={buttonStyle}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                    >
                        Acceder
                    </button>
                </form>
            ) : (
                <>
                    {view === "escritorio" && <Table days={days} hours={hours} />}
                    {view === "celular" && <ResponsiveTable days={days} hours={hours} />}
                </>
            )}
        </div>
    );
};

export default StaticTable;