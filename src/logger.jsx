// logger.js — client-side logger saved to localStorage (for demonstration)

const LOG_KEY = "url_shortener_logs_v1";

export function loadLogs() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  } catch {
    return [];
  }
}

export function pushLog(evt) {
  const logs = loadLogs();
  logs.push({ ts: Date.now(), ...evt });
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

// Basic hook to expose logs to components
import { useState, useEffect } from "react";
export function useLogs() {
  const [logs, setLogs] = useState(loadLogs());
  useEffect(() => {
    function onStorage() {
      setLogs(loadLogs());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return { logs, pushLog: (e) => { pushLog(e); setLogs(loadLogs()); } };
}
