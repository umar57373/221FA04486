import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useParams,
  useNavigate
} from "react-router-dom";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Box
} from "@mui/material";
import {
  generateShortcode,
  addOrUpdateEntry,
  findEntry
} from "./storage";

/* ---------------- Shortener Form ---------------- */
function Shortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleShorten = () => {
    setError("");
    setShortUrl("");

    // Basic validation
    try {
      const u = new URL(url);
      if (!["http:", "https:"].includes(u.protocol)) {
        throw new Error();
      }
    } catch {
      setError("Enter a valid URL (http:// or https://)");
      return;
    }

    // Create shortcode
    const code = generateShortcode(6);
    const entry = {
      shortcode: code,
      longUrl: url,
      createdAt: Date.now(),
      expiresAt: null,
      clicks: []
    };
    addOrUpdateEntry(entry);
    setShortUrl(`${window.location.origin}/${code}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Simple URL Shortener
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button variant="contained" onClick={handleShorten}>
            Shorten
          </Button>
        </Box>
        {shortUrl && (
          <Typography sx={{ mt: 3, wordBreak: "break-all" }}>
            Your short link:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

/* ---------------- Redirector ---------------- */
function Redirector() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const entry = findEntry(code);
    if (!entry) {
      alert("Short link not found");
      navigate("/");
      return;
    }
    window.location.href = entry.longUrl; // redirect
  }, [code, navigate]);

  return (
    <Container sx={{ mt: 10 }}>
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography>Redirecting...</Typography>
      </Paper>
    </Container>
  );
}

/* ---------------- App ---------------- */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Shortener />} />
      <Route path="/:code" element={<Redirector />} />
    </Routes>
  );
}
