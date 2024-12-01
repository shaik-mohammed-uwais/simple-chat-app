import { useState, useEffect } from "react";

function Toggleswitch() {
  const [mode, setmode] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  const toggleTheme = () => {
    setmode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <button onClick={toggleTheme} className="toggle-button">
        {mode === "light" ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              id="sun"
            >
              <g
                id="Page-1"
                fill="none"
                stroke="none"
                // stroke-linecap="round"
                // stroke-linejoin="round"
                // stroke-width="1"
              >
                <g
                  id="Artboard"
                  stroke="#000"
                  stroke-width="2"
                  transform="translate(-919 -2066)"
                >
                  <g id="sun" transform="translate(920 2067)">
                    <circle id="Oval" cx="11" cy="11" r="5"></circle>
                    <path
                      id="Shape"
                      d="M11 0v2M11 20v2M3.22 3.22l1.42 1.42M17.36 17.36l1.42 1.42M0 11h2M20 11h2M3.22 18.78l1.42-1.42M17.36 4.64l1.42-1.42"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              id="moon"
            >
              <path
                fill="none"
                stroke="#fff"
                // stroke-linecap="round"
                // stroke-linejoin="round"
                // stroke-width="2"
                d="M19 10.79A9 9 0 1 1 9.21 1 7 7 0 0 0 19 10.79z"
              ></path>
            </svg>
          </>
        )}
      </button>
    </>
  );
}
export default Toggleswitch;
