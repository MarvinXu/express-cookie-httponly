import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  // Set HTTP-only cookie
  res.cookie('sessionId', '222', {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  res.send(`
    <h1>HTTP-Only Cookie Demo</h1>
    <p>A secure HTTP-only cookie has been set.</p>
    <p>Try accessing 'document.cookie' in the console - you won't see the httpOnly cookie!</p>
  `);
});

app.get('/check-cookie', (req, res) => {
  const sessionId = req.cookies.sessionId;
  res.send(`Cookie value (server-side): ${sessionId}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
