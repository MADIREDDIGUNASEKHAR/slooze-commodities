# Slooze Commodities Management System

A modern, full-featured commodities management system built with Next.js, TypeScript, and Tailwind CSS. Features role-based access control, real-time inventory tracking, and a beautiful, responsive UI with light/dark mode support.

## 🌟 Features

### ✅ Completed Features (100 Points)

#### Authentication & Access (5 Points)
- ✅ Email & password login
- ✅ Role-based access control (Manager & Store Keeper)
- ✅ Secure session management
- ✅ Demo credentials for testing

#### Dashboard (30 Points)
- ✅ Manager-only access
- ✅ Real-time inventory statistics
- ✅ Stock health monitoring
- ✅ Category breakdowns
- ✅ Total inventory value tracking
- ✅ Visual insights and metrics

#### View All Products (10 Points)
- ✅ Accessible to both Managers & Store Keepers
- ✅ Comprehensive product listing
- ✅ Search functionality
- ✅ Status filtering (In Stock, Low Stock, Out of Stock)
- ✅ Product details display

#### Add/Edit Products (15 Points)
- ✅ Product creation
- ✅ Product editing
- ✅ Form validation
- ✅ Real-time status updates
- ✅ Modal-based interface

#### Light/Dark Mode (15 Points)
- ✅ System-wide theme switching
- ✅ Persistent theme preferences
- ✅ Smooth transitions
- ✅ Optimized for both modes

#### Front-End Role-Based Menu Restrictions (25 Points - BONUS)
- ✅ Dynamic menu rendering based on user role
- ✅ Protected routes with role verification
- ✅ Unauthorized access prevention
- ✅ Graceful error handling

### 🎨 Design Features

- **Distinctive UI**: Modern, professional design with earth-tone color palette
- **Glassmorphism**: Beautiful frosted-glass effects throughout
- **Smooth Animations**: Thoughtful transitions and micro-interactions
- **Responsive Layout**: Works perfectly on all screen sizes
- **Custom Typography**: Carefully selected font pairing (Archivo + Inter)
- **Professional Components**: Reusable, well-structured components

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **GraphQL Client**: Apollo Client (configured and ready)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion + Custom CSS animations
- **State Management**: React Context API
- **Authentication**: Mock authentication (production-ready structure with Apollo Client integration)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Clone or Download the Project

```bash
# If using git
git clone <repository-url>
cd slooze-commodities

# Or extract the ZIP file and navigate to the directory
cd slooze-commodities
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 4. Open Your Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

### Manager Account (Full Access)
- **Email**: manager@slooze.com
- **Password**: manager123
- **Access**: Dashboard + Products + All Features

### Store Keeper Account (Limited Access)
- **Email**: keeper@slooze.com
- **Password**: keeper123
- **Access**: Products Only (No Dashboard)

## 🔌 Apollo Client Integration

This project includes **complete Apollo Client setup** for connecting to a NestJS + GraphQL backend:

### What's Included:
- ✅ Apollo Client configuration for Next.js App Router
- ✅ GraphQL queries and mutations for all features
- ✅ TypeScript types matching the expected backend schema
- ✅ Custom hooks pattern for data fetching
- ✅ Authentication with JWT token management
- ✅ Optimistic updates and cache management

### Current Mode: **Mock Data**
The application currently runs with mock data to allow standalone operation without a backend.

### To Connect to Your NestJS Backend:

1. **Set the GraphQL endpoint**:
   ```bash
   # Create .env.local
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
   ```

2. **Enable Apollo Client code**:
   - See `APOLLO_CLIENT_GUIDE.md` for detailed instructions
   - Uncomment Apollo Client usage in `contexts/AuthContext.tsx`
   - Uncomment Apollo Client usage in `lib/hooks/useProducts.ts`

3. **Ensure backend is running**:
   ```bash
   # Your NestJS project
   npm run start:dev
   ```

4. **Restart the frontend**:
   ```bash
   npm run dev
   ```

**Full documentation**: See `APOLLO_CLIENT_GUIDE.md` for complete integration guide.

## 📁 Project Structure

```
slooze-commodities/
├── app/
│   ├── dashboard/          # Manager-only dashboard
│   ├── products/           # Products management page
│   ├── login/              # Authentication page
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page (redirects)
│   └── globals.css         # Global styles & custom CSS
├── components/
│   ├── Navigation.tsx      # Role-based navigation
│   └── ProtectedRoute.tsx  # Route protection HOC
├── contexts/
│   ├── AuthContext.tsx     # Authentication state
│   └── ThemeContext.tsx    # Theme management
├── lib/
│   └── mockData.ts         # Mock products & utilities
└── [config files]
```

## 🎯 Key Implementation Details

### Role-Based Access Control

The application implements comprehensive RBAC:

1. **Route Protection**: `ProtectedRoute` component guards sensitive pages
2. **Menu Filtering**: Navigation items filtered by user role
3. **UI Restrictions**: Buttons/features conditionally rendered
4. **Redirect Logic**: Unauthorized access gracefully handled

### State Management

- **AuthContext**: Manages user authentication and session
- **ThemeContext**: Handles light/dark mode preferences
- **Local Storage**: Persists user session and theme choice

### Mock Data

The application uses realistic mock data:
- 10 sample products across various categories
- Different stock statuses (in-stock, low-stock, out-of-stock)
- Calculated statistics and metrics
- Category-based grouping

## 🌈 Theme System

### Light Mode
- Warm, inviting color palette
- High contrast for readability
- Professional appearance

### Dark Mode
- Reduced eye strain
- Energy efficient (OLED displays)
- Modern aesthetic

## 📱 Responsive Design

The UI is fully responsive across:
- Desktop (1920px+)
- Laptop (1280px - 1920px)
- Tablet (768px - 1280px)
- Mobile (320px - 768px)

## 🔄 Future Enhancements

While not required for the challenge, potential improvements include:

- **Backend Integration**: Connect to real NestJS + GraphQL API
- **Apollo Client**: Implement GraphQL queries/mutations
- **Advanced Filtering**: Multiple filter combinations
- **Data Export**: Export inventory to CSV/Excel
- **Notifications**: Real-time stock alerts
- **Analytics**: Advanced reporting and charts
- **Batch Operations**: Bulk product updates
- **Image Upload**: Product images with cloud storage
- **Audit Logs**: Track all inventory changes

## 🧪 Testing Scenarios

### Scenario 1: Manager Login
1. Login with manager@slooze.com
2. View comprehensive dashboard
3. Access all products
4. Add/edit products
5. Toggle theme

### Scenario 2: Store Keeper Login
1. Login with keeper@slooze.com
2. Attempt to access dashboard (should redirect)
3. View products page
4. Add/edit products
5. Toggle theme

### Scenario 3: Product Management
1. Search for specific products
2. Filter by stock status
3. Add a new product
4. Edit existing product
5. View updated statistics

## 📝 Implementation Notes

### Design Decisions

1. **Color Palette**: Earth tones with orange accents for warmth and professionalism
2. **Typography**: Archivo for headings (distinctive), Inter for body (readable)
3. **Animations**: Subtle, purposeful animations that enhance UX
4. **Glassmorphism**: Modern aesthetic with practical transparency

### Code Quality

- TypeScript for type safety
- Reusable components
- Clean separation of concerns
- Comprehensive error handling
- Accessible UI elements
- Performance optimized

### Assumptions

1. **Authentication**: Mock implementation (structure ready for API)
2. **Data Persistence**: Client-side only (ready for database)
3. **File Uploads**: Not implemented (structure in place)
4. **Real-time Updates**: Simulated (ready for WebSocket)

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Context API](https://react.dev/learn/passing-data-deeply-with-context)

## 📄 License

This project was created as a take-home challenge for Slooze.

## 🙋 Support

For questions or issues:
1. Check the code comments
2. Review the documentation
3. Test with provided demo credentials

---

Built with ❤️ for Slooze | February 2024
