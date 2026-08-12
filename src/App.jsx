import React, { useState, useRef, useEffect } from "react";

const ERRORS = {
  letters: [
    "bestie this is a calculator not a spelling bee 💅",
    "the alphabet?? in MY calculator?? it's giving illiterate 😭",
    "letters don't math. that's the whole rule, periodt.",
    "ok but WHY are there letters rn 🧠❌ this a math app not English class",
  ],
  zero: [
    "dividing by zero?? you tryna break the universe rn 🌌 not today",
    "nah that's a whole no from me chief, zero said no 💀",
    "the math gods said absolutely not to that one 🚫",
  ],
  syntax: [
    "that expression said 💀 it's not mathing bestie",
    "girl that equation is NOT it, try again 🙏",
    "big fat error energy rn, fix ur numbers babe ✨",
  ],
};

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const BTN =
  "rounded-2xl font-semibold text-lg transition-all duration-150 active:scale-90 select-none";

export default function App() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");
  const [msg, setMsg] = useState("");
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (shake) {
      const t = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(t);
    }
  }, [shake]);

  const fireError = (kind) => {
    setMsg(pick(ERRORS[kind]));
    setResult("");
    setShake(true);
  };

  const press = (val) => {
    setMsg("");
    setExpr((e) => e + val);
  };

  const clearAll = () => {
    setExpr("");
    setResult("");
    setMsg("");
  };

  const del = () => {
    setMsg("");
    setExpr((e) => e.slice(0, -1));
  };

  const equals = () => {
    if (!expr.trim()) return;
    if (/[a-zA-Z]/.test(expr)) {
      fireError("letters");
      return;
    }
    if (!/^[0-9+\-*/.%() ]+$/.test(expr)) {
      fireError("syntax");
      return;
    }
    try {
      // eslint-disable-next-line no-new-func
      const val = Function(
        '"use strict"; return (' + expr.replace(/%/g, "/100*") + ")"
      )();
      if (val === Infinity || val === -Infinity) {
        fireError("zero");
        return;
      }
      if (typeof val !== "number" || Number.isNaN(val)) {
        fireError("syntax");
        return;
      }
      const rounded = Math.round(val * 1e10) / 1e10;
      setResult(String(rounded));
      setMsg("");
    } catch (e) {
      fireError("syntax");
    }
  };

  const handleKeyChange = (e) => {
    setMsg("");
    setExpr(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") equals();
  };

  const opBtns = ["(", ")", "%", "/"];
  const rows = [
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
  ];

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #FFE1F0 0%, #E8D5FF 45%, #2A1B3D 100%)",
      }}
    >
      <span
        className="sparkle"
        style={{ top: "8%", left: "10%", fontSize: 28, animationDelay: "0s" }}
      >
        ✨
      </span>
      <span
        className="sparkle"
        style={{ top: "18%", right: "12%", fontSize: 22, animationDelay: "1.2s" }}
      >
        💖
      </span>
      <span
        className="sparkle"
        style={{ bottom: "12%", left: "8%", fontSize: 26, animationDelay: "2s" }}
      >
        🎀
      </span>
      <span
        className="sparkle"
        style={{ bottom: "20%", right: "10%", fontSize: 24, animationDelay: "0.6s" }}
      >
        💅
      </span>

      <div className="relative z-10 w-[340px] rounded-[36px] p-1 holo-border shadow-2xl">
        <div
          className="rounded-[32px] p-5 backdrop-blur-xl"
          style={{ background: "rgba(255,255,255,0.85)" }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span style={{ color: "#FF5FA2", fontSize: 20 }}>✨</span>
            <h1
              className="font-display text-xl font-bold"
              style={{ color: "#3B1E54" }}
            >
              girlie calc
            </h1>
            <span style={{ color: "#FF5FA2", fontSize: 20 }}>✨</span>
          </div>

          <div
            className={`rounded-2xl p-4 mb-4 ${shake ? "shake-anim" : ""}`}
            style={{
              background: "linear-gradient(135deg, #FFE1F0, #E8D5FF)",
              border: msg ? "2px solid #FF5FA2" : "2px solid transparent",
              minHeight: 84,
            }}
          >
            <input
              ref={inputRef}
              value={expr}
              onChange={handleKeyChange}
              onKeyDown={handleKeyDown}
              placeholder="type something cute 🧮"
              className="w-full bg-transparent outline-none text-right font-body text-lg"
              style={{ color: "#3B1E54" }}
            />
            <div
              className="text-right font-display text-3xl font-bold mt-1 truncate"
              style={{ color: "#7C3AED" }}
            >
              {msg ? "😭" : result || "\u00A0"}
            </div>
          </div>

          <div
            className="min-h-[38px] flex items-center justify-center text-center px-2 mb-3 font-body font-medium text-sm transition-opacity duration-200"
            style={{ color: "#FF5FA2", opacity: msg ? 1 : 0 }}
          >
            {msg || "placeholder"}
          </div>

          <div className="grid grid-cols-4 gap-2 mb-2">
            {opBtns.map((b) => (
              <button
                key={b}
                onClick={() => press(b)}
                className={`${BTN} font-body py-3`}
                style={{ background: "#E8D5FF", color: "#7C3AED" }}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={clearAll}
              className={`${BTN} font-body py-3`}
              style={{ background: "#FFB3C6", color: "#fff" }}
            >
              AC
            </button>
            {rows[0].map((b) => (
              <button
                key={b}
                onClick={() => press(b)}
                className={`${BTN} font-display py-3`}
                style={{
                  background: /[0-9]/.test(b) ? "#FFF6FB" : "#C9A7FF",
                  color: /[0-9]/.test(b) ? "#3B1E54" : "#fff",
                }}
              >
                {b}
              </button>
            ))}

            <button
              onClick={del}
              className={`${BTN} py-3 flex items-center justify-center`}
              style={{ background: "#FFB3C6", color: "#fff" }}
            >
              ⌫
            </button>
            {rows[1].map((b) => (
              <button
                key={b}
                onClick={() => press(b)}
                className={`${BTN} font-display py-3`}
                style={{
                  background: /[0-9]/.test(b) ? "#FFF6FB" : "#C9A7FF",
                  color: /[0-9]/.test(b) ? "#3B1E54" : "#fff",
                }}
              >
                {b}
              </button>
            ))}

            <button
              onClick={() => press(".")}
              className={`${BTN} font-display py-3`}
              style={{ background: "#FFF6FB", color: "#3B1E54" }}
            >
              .
            </button>
            {rows[2].map((b) => (
              <button
                key={b}
                onClick={() => press(b)}
                className={`${BTN} font-display py-3`}
                style={{
                  background: /[0-9]/.test(b) ? "#FFF6FB" : "#C9A7FF",
                  color: /[0-9]/.test(b) ? "#3B1E54" : "#fff",
                }}
              >
                {b}
              </button>
            ))}

            <button
              onClick={() => press("0")}
              className={`${BTN} font-display py-3`}
              style={{ background: "#FFF6FB", color: "#3B1E54" }}
            >
              0
            </button>
            <button
              onClick={equals}
              className={`${BTN} font-display py-3 col-span-2`}
              style={{
                background: "linear-gradient(135deg, #FF5FA2, #C9A7FF)",
                color: "#fff",
              }}
            >
              =
            </button>
            <button
              onClick={() => press("00")}
              className={`${BTN} font-body py-3`}
              style={{ background: "#FFF6FB", color: "#3B1E54" }}
            >
              00
            </button>
          </div>

          <p
            className="text-center font-body text-xs mt-4"
            style={{ color: "#9C7EBF" }}
          >
            type letters + hit = and see what happens 👀
          </p>
        </div>
      </div>
    </div>
  );
}
