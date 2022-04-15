module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        moyTsvet: '#ff4800',
        blue: {
          450: '#5F99F7',
        },
      },
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... } 
  
      'md': '768px',
      // => @media (min-width: 768px) { ... }
  
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
  
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    }
  },
  plugins: [require('@tailwindcss/forms')],
};
