# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```





# Cheer Up! Website — React + TypeScript (Vite)

This repo contains the band site built with **React + TypeScript** using **Vite**.

---

## Quick Start (every time)

From the project folder:

```bash
npm run dev         # start dev server (prints a localhost URL)
npm run build       # production build to /dist
npm run preview     # serve the built /dist locally to test prod build
```

---

## First-Time Setup on a New Computer (Windows 11)

> Use **PowerShell**. These commands install Node LTS, set up policy for npm’s PowerShell shim, then run the app.

```powershell
# 1) Install Node.js LTS (includes npm)
winget install --id OpenJS.NodeJS.LTS -e --source winget

# 2) Refresh PATH for this PowerShell session (sometimes needed right after install)
$env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
            [Environment]::GetEnvironmentVariable("Path","User")

# 3) Allow npm’s PowerShell shim to run
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force

# 4) Get the code
cd C:\path\where\you\want\the\folder
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 5) Install dependencies
npm ci   # (or: npm install)

# 6) (Optional) If your project uses env vars, create .env
# copy .env.example .env   # then edit values

# 7) Run it
npm run dev
```

---

## Optional: Use Git Bash

If you prefer **Git Bash**, add Node to PATH once so Git Bash finds it:

```bash
echo 'export PATH="/c/Program Files/nodejs:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Then from your project folder:

```bash
npm run dev
```

---

## Optional: Use NVM for Windows (version switching)

If you want to manage Node versions instead of using `winget`:

```powershell
winget install CoreyButler.NVMforWindows
nvm install lts
nvm use lts

# If 'node' isn't found immediately, refresh PATH for this session:
$env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
            [Environment]::GetEnvironmentVariable("Path","User")
```

> Tip: Use **either** NVM or winget to install Node—not both—so PATH stays clean.

---

## Troubleshooting

- **`npm` not found in PowerShell**
  - Close and reopen PowerShell, then run:
    ```powershell
    $env:Path = [Environment]::GetEnvironmentVariable("Path","Machine") + ";" +
                [Environment]::GetEnvironmentVariable("Path","User")
    node -v
    npm -v
    ```

- **`npm` blocked by execution policy**
  - Run once:
    ```powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
    ```

- **Git Bash still can’t find Node**
  - Ensure the PATH line from the Git Bash section is present in `~/.bashrc`, then restart Git Bash.
  - Verify:
    ```bash
    which node
    which npm
    node -v
    npm -v
    ```

---

## Scripts (package.json)

Your `package.json` includes:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Notes

- This project uses **Vite** for lightning-fast dev and builds.
- No Tailwind—just vanilla CSS/your preferred styling approach.
- If you later try Rolldown/Vite alternatives, do it in a separate branch and compare `npm run build` times.
