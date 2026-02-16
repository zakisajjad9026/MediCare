# MediCare Clinic Website

A modern, responsive single-page website for MediCare Clinic - a healthcare facility providing comprehensive medical services with appointment booking functionality.

![MediCare Clinic](https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=400&fit=crop)

## Features

### Core Features
- **Smooth Scrolling Navigation** - Seamless navigation between sections
- **Hero Section** - Eye-catching landing with clinic statistics
- **Services Section** - 6 medical services displayed in a responsive grid
- **Doctors Section** - 4 expert doctor profiles with booking buttons
- **Testimonials Carousel** - Auto-advancing patient reviews with ratings
- **Appointment Booking Form** - Full-featured form with:
  - Patient information inputs
  - Department selection
  - Dynamic doctor dropdown (changes based on department)
  - Date and time slot selection
  - Form validation
  - Success modal on submission
- **Mobile Responsive** - Fully responsive with hamburger menu
- **Scroll Animations** - Fade-in effects on scroll

### Additional Features
- Valid HTML5 markup
- CSS custom properties for theming
- Accessible form inputs
- Interactive hover effects
- Modern card-based design

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox & Grid
- **JavaScript (Vanilla)** - Interactive functionality
- **Font Awesome 6.4.0** - Icons
- **Google Fonts** - Playfair Display & Source Sans Pro

## Project Structure

```
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript functionality
├── SPEC.md         # Detailed specification document
└── README.md       # This file
```

## Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Code editor (VS Code, Sublime Text, etc.)

### Installation

1. **Clone or download the repository**
   
```
bash
   git clone <repository-url>
   cd medicare-clinic
   
```

2. **Open the project**
   - Simply open `index.html` in your browser
   - Or use a local development server:
     
```
bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     
```

3. **View the website**
   - Open `http://localhost:8000` in your browser

## Customization

### Colors
Edit the color variables in `styles.css`:
```
css
:root {
    --primary: #0077B6;
    --secondary: #00B4D8;
    --accent: #48CAE4;
    /* ... more variables */
}
```

### Content
- Edit service cards in the **Services Section** of `index.html`
- Modify doctor profiles in the **Doctors Section**
- Update testimonials in the **Testimonials Section**
- Change contact information in the **Footer**

### Adding More Services/Doctors
1. Copy an existing card element
2. Paste it within the appropriate grid container
3. Update the content (icon, name, description, etc.)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Form Functionality Note

This is a frontend-only implementation. The appointment form:
- Captures all user input
- Performs client-side validation
- Shows a success modal on submission
- Does NOT send data to any backend server

To make it functional, you would need to:
- Connect to a backend API
- Implement server-side validation
- Set up email notifications
- Store appointments in a database

## License

This project is for demonstration purposes.

## Credits

- Images: [Unsplash](https://unsplash.com)
- Icons: [Font Awesome](https://fontawesome.com)
- Fonts: [Google Fonts](https://fonts.google.com)

---

Built with ❤️ for quality healthcare
