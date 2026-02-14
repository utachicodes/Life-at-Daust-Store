# Life at DAUST - Project Context

This document serves as the primary source of truth for the project's architecture, state, and history. It is designed to provide immediate context for any AI model or developer working on this codebase.

## 🚀 Project Overview
**Name:** Life at DAUST  
**Purpose:** Official campus merchandise store for the Dakar American University of Science and Technology (DAUST).  
**Status:** Feature Complete (Phase 4: Admin Panel Initialized)

## 🛠 Tech Stack
- **Frontend:** React 19 + Vite (Fast, modern, ESM-based)
- **Backend:** Convex (Serverless, real-time database, cloud functions, and file storage)
- **Styling:** TailwindCSS 4 (Modern utility-first CSS)
- **Routing:** React Router DOM v7
- **Icons:** Lucide React (Standardized project-wide)
- **Animations:** AOS (Animate On Scroll)
- **Testing Suite:**
  - **Runner:** Vitest
  - **Utilities:** React Testing Library + JSDOM
  - **Patterns:** Mocking Convex hooks (`useQuery`, `useMutation`) for integration tests
- **Environment:** Node.js with ESM (`"type": "module"`)

## 📁 Key Directories & Files
- `src/components/`: Reusable UI components.
  - `ui/`: Atomic components (Button, LoadingSpinner, Notification, etc.).
  - `admin/`: Admin-specific layout components (AdminLayout, Sidebar).
- `src/pages/`: Application routes.
  - `admin/`: Secured administrative pages (Dashboard, Products, Orders, Login).
- `src/context/`: Global state management.
  - `CartContext.jsx`: Client-side cart persistence via `localStorage`.
  - `AdminContext.jsx`: Session-based administrative authentication.
- `src/test/`: Testing utilities, setup, and integration tests.
- `convex/`: Full-stack backend logic.
  - `schema.ts`: Database definitions for `products`, `orders`, and `categories`.
  - `products.ts`: CRUD logic and image upload handlers.
  - `orders.ts`: Fulfillment tracking and checkout integration.
- `PROJECT_CONTEXT.md`: This document (Historical & Structural reference).

## 🧬 Patterns & Conventions
- **Institutional Premium Design:** A high-contrast aesthetic using `#0A192F` (Navy) and `#FF6B00` (Orange). Heavy focus on glassmorphism, 2rem corner radii, and black-weight typography.
- **Micro-interactivity:** All interactive elements use `transition-all` with hover states (scale, shadow, or color shifts).
- **Safe Storefront:** Global `ErrorBoundary` and pervasive loading states (Skeleton UI) ensure a polished user experience even during errors or slow fetches.
- **Admin Security:** Protected routes via `AdminLayout` wrapper. Authentication persists in `sessionStorage` with a 12-character token system (`daust_admin_2024`).
- **Data Integrity:** Checkout orders are saved synchronously to Convex. Legacy logic for Google Sheets sync is maintained as a redundant backup.
- **Modular Testing:** Every new UI component must have a corresponding `.test.jsx` file. Integration tests cover the path from Shop to Checkout.

## 📜 Project Change Log

### Phase 1: Foundation & Recovery (Feb 14, 2026)
- **Fixed Critical Build Error:** Resolved missing `react-feather` dependencies.
- **Standardized Icon Library:** Migrated entire project to `lucide-react`.
- **Verified Production Build:** Successfully tested `npm run build` for deployment readiness.

### Phase 2: UX & Robustness (Feb 14, 2026)
- **Implemented Error Boundaries:** Created global failure recovery UI.
- **Enhanced Loading States:** Added `ProductCardSkeleton` and `LoadingSpinner`.
- **Validation:** Implemented real-time form feedback for Checkout and Contact flows.
- **Navigation Fix:** Forced scroll-to-top on product views.

### Phase 3: Quality Assurance (Feb 14, 2026)
- **Testing Suite:** Set up Vitest/RTL environment.
- **Verification:** Implemented 33 passing unit tests and full-flow integration tests.
- **Bug Fix:** Resolved a critical issue where cart items failed to remove due to missing property arguments in `CartContext` calls.

### Phase 4: Admin Panel Implementation (Feb 14, 2026)
- **Infrastructure:** Built `AdminContext` and `AdminLayout` with protected routes.
- **Analytics:** Developed a live dashboard syncing stats (Revenue, Orders, Inventory) from Convex.
- **Catalog Control:** Implemented full Product CRUD with Convex image upload integration.
- **Order Fulfillment:** Built a management page for tracking student purchases and updating shipment statuses (Processing → Shipped → Delivered).
- **Backend Overhaul:** Added `orders` table to Convex schema and moved primary order persistence from Google Sheets to the database.

---
*Last Updated: February 14, 2026*

