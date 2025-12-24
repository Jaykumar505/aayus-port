# Ayush Kumar - Developer Portfolio

A modern, responsive developer portfolio built with Next.js 16, React, and Tailwind CSS. Features a dark theme with animated particle effects and smooth scrolling navigation.

## Features

- 🎨 Modern dark theme with cyan-purple gradient accents
- ✨ Animated particle background effects
- 📱 Fully responsive design
- 🚀 Built with Next.js 16 and React 19
- 💅 Styled with Tailwind CSS v4
- 🎯 Smooth scrolling navigation
- 📧 Direct Gmail integration for contact

## Technologies Used

- **Framework**: Next.js 16
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Typography**: Geist Sans & Geist Mono fonts

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone or download the project files

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio.

### Building for Production

```bash
npm run build
npm start
```

## Customization

To customize the portfolio with your own information:

1. **Personal Information**: Edit `app/page.tsx`
   - Update name, title, and bio in the hero section
   - Modify the email address in contact links
   - Update LinkedIn profile URL

2. **Projects**: In `app/page.tsx`, update the projects array with your own projects

3. **Skills**: Modify the skills array with your technical skills

4. **Experience**: Update the experience section with your work history

5. **Education**: Change education details to match your background

6. **Color Scheme**: Modify colors in `app/globals.css` to match your brand

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

Vercel will automatically detect Next.js and configure the build settings.

### Other Platforms

The portfolio can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Digital Ocean

## Project Structure

```
├── app/
│   ├── page.tsx          # Main portfolio page
│   ├── layout.tsx        # Root layout with fonts
│   └── globals.css       # Global styles and theme
├── public/               # Static assets
└── README.md            # This file
```

## Contact

Ayush Kumar - [ayushkumar07012005@gmail.com](mailto:ayushkumar07012005@gmail.com)

LinkedIn - [ayush-kumar2005](https://linkedin.com/in/ayush-kumar2005)

## License

This project is open source and available for personal use.
