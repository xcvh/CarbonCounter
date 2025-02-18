# CarbonCopy Project Setup Guide

## Prerequisites
- Node.js (recommended version 18.x or later)
- npm (comes with Node.js)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/xcvh/CarbonCounter
cd CarbonCounter
```

### 2. Install Dependencies
```bash
npm install
```
This command will install all the project dependencies defined in the `package.json` file, including:
- React
- Vite
- Tailwind CSS
- [daisyUI](https://daisyui.com/)
- [lucide-react](https://lucide.dev/icons/)
- [Classnames](https://github.com/JedWatson/classnames#readme)
- Express JS on the backend
- Other project-specific packages

### 3. Run the Development Server
```bash
npm run dev
```
This will start the Vite development server. By default, the app will be available at `http://localhost:5173`

### 4. Building for Production
```bash
npm run build
```
This command will create a production-ready build of your application in the `dist` folder.

### 5. Preview Production Build (Optional)
```bash
npm run preview
```
This will serve the production build locally for testing.

## Troubleshooting
- Ensure you have the correct Node.js version installed
- If you encounter dependency issues, try deleting the `node_modules` folder and running `npm install` again
- Check that your `.env` files (if any) are properly configured

## Development Tools
- This project uses Vite for fast development and building
- Tailwind CSS is integrated for styling
- ESLint is included for code linting

## Additional Notes
- Make sure to commit your `package.json` and `package-lock.json`
- Do not commit the `node_modules` folder
