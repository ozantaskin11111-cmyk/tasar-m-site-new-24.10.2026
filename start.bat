@echo off
echo Starting Xentora Portfolio...
cd /d "%~dp0"
start http://localhost:5173
npx vite preview --port 5173
pause
