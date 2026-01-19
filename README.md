# SplendShopV2 - Modern E-commerce Application

A modern, elegant e-commerce application built with Next.js 14, TypeScript, Tailwind CSS, GSAP, and Framer Motion. This is a complete rebuild of the original SplendShop with enhanced UI/UX, smooth animations, and professional design.

## Features

- 🛍️ **Product Catalog**: Browse products with advanced filtering (category, gender, size, color)
- 🔍 **Search Functionality**: Real-time product search with debounced input
- 🛒 **Shopping Cart**: Add to cart, update quantities, and manage items
- 💳 **Checkout Flow**: Complete checkout with address management and order summary
- 👤 **User Authentication**: Firebase authentication with sign in/sign up
- ❤️ **Favorites**: Save favorite products for quick access
- 📦 **Order History**: View past orders with detailed information
- 🎨 **Modern UI**: Elegant design with gradient accents and smooth animations
- 📱 **Responsive Design**: Mobile-first approach with full responsive support
- ⚡ **Performance**: Optimized images, code splitting, and lazy loading

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP & Framer Motion
- **Authentication**: Firebase Auth
- **State Management**: React Context API
- **Icons**: Lucide React
- **Form Handling**: React Hook Form (ready for integration)

## Project Structure

```
splendshopv2/
├── app/                    # Next.js app router pages
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Homepage
│   ├── signup/             # Authentication page
│   ├── products/[id]/     # Product detail page
│   ├── checkout/           # Checkout page
│   └── profile/             # User profile page
├── components/             # React components
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── products/           # Product-related components
│   ├── filters/            # Filter sidebar
│   ├── checkout/           # Checkout components
│   ├── profile/            # Profile components
│   ├── ui/                 # Reusable UI components
│   └── animations/         # Animation components
├── context/                # React Context providers
│   ├── AuthContext.tsx     # Authentication context
│   ├── CartContext.tsx     # Shopping cart context
│   └── FilterContext.tsx   # Filter context
├── lib/                    # Utility functions
│   ├── firebase.ts         # Firebase configuration
│   ├── utils.ts            # Helper functions
│   └── constants.ts        # Product data and constants
└── types/                  # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd splendshopv2
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Key Features Implementation

### Homepage
- Hero carousel with auto-rotating slides (GSAP animations)
- Product grid with stagger animations (Framer Motion)
- Advanced filtering sidebar (category, gender, size, color)
- Search functionality
- Pagination (12 items per page)

### Product Detail Page
- Image gallery with thumbnails
- Color selector
- Add to cart functionality
- Related products section
- Smooth transitions and animations

### Shopping Cart & Checkout
- Cart management with quantity controls
- Address management (add/edit/select)
- Order summary with real-time calculations
- Form validation

### Authentication
- Sign in/Sign up forms
- Password reset functionality
- Firebase integration
- Smooth form transitions

### User Profile
- Tabbed interface (Profile, Favorites, Orders)
- Profile settings form
- Favorites grid
- Order history with expandable details

## Design System

### Color Palette
- Primary: Gradient from Indigo (#6366f1) to Purple (#8b5cf6)
- Secondary: Purple (#8b5cf6)
- Accent: Pink (#ec4899)
- Success: Green (#10b981)
- Error: Red (#ef4444)

### Typography
- Font: Inter (via Next.js Google Fonts)
- Responsive font sizing with Tailwind

### Animations
- **GSAP**: Page transitions, scroll animations, complex sequences
- **Framer Motion**: Component animations, hover effects, list animations
- **Micro-interactions**: Button clicks, cart additions, form submissions

## Firebase Configuration

The app uses the same Firebase configuration as the original SplendShop project. The configuration is located in `lib/firebase.ts`.

## Local Storage

The app uses localStorage for:
- Shopping cart items
- Favorite products
- User addresses
- Order history
- Profile settings

## Performance Optimizations

- Next.js Image component for optimized images
- Code splitting with Next.js App Router
- Lazy loading for components
- Scroll reveal animations with intersection observer
- Debounced search input

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Notes

- This is a frontend-only implementation
- Cart and favorites are stored in localStorage
- Orders are stored in localStorage (not persisted to a backend)
- Firebase is used only for authentication
# SplendShopV2
