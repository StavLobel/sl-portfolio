# PROJECT RULES & GUIDELINES

This document establishes the coding standards, conventions, and guidelines for the Stav Lobel Portfolio Website project.

---

## 📋 **General Project Rules**

### 1. **Code Quality Standards**
- ✅ All code must pass ESLint with zero warnings
- ✅ Use TypeScript for all new files (no `.js` files)
- ✅ Maintain 100% type safety - no `any` types
- ✅ Follow React best practices and hooks guidelines
- ✅ Write self-documenting code with clear variable/function names

### 2. **Git & Version Control**
- ✅ Use conventional commit messages: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`
- ✅ Keep commits atomic (one logical change per commit)
- ✅ Always test locally before pushing
- ✅ Never commit sensitive data (API keys, tokens, passwords)
- ✅ Update PROJECT_TASKS.md when completing tasks

### 3. **File Organization**
- ✅ Components in `src/components/` with PascalCase naming
- ✅ Utilities in `src/lib/` with camelCase naming
- ✅ Types/interfaces in same file as component or `src/types/`
- ✅ Assets in `src/assets/` with descriptive names
- ✅ No unused files - clean up regularly

---

## 🎨 **Frontend Rules**

### 1. **React Components**
- ✅ Use functional components with hooks only
- ✅ Export components as `const ComponentName = () => {}`
- ✅ Props interface must be defined: `interface ComponentNameProps {}`
- ✅ Use default exports for components
- ✅ Keep components under 200 lines (split if larger)

### 2. **Styling Rules**
- ✅ Use Tailwind CSS classes only - no custom CSS unless absolutely necessary
- ✅ Follow mobile-first responsive design (`sm:`, `md:`, `lg:`, `xl:`)
- ✅ Use consistent spacing scale (4, 8, 12, 16, 20, 24, 32, etc.)
- ✅ Leverage shadcn-ui components when possible
- ✅ Maintain dark/light mode compatibility

### 3. **State Management**
- ✅ Use React hooks (`useState`, `useEffect`, `useContext`) for state
- ✅ Prefer local state over global state when possible
- ✅ Use React Query for API data fetching and caching
- ✅ Store user preferences in localStorage

---

## 🔧 **GitHub API Integration Rules**

### 1. **API Security**
- ✅ Never hardcode API tokens - use environment variables only
- ✅ Use `VITE_` prefix for frontend environment variables
- ✅ Implement proper error handling for API failures
- ✅ Rate limit awareness - respect GitHub API limits

### 2. **Data Handling**
- ✅ Cache API responses to minimize calls
- ✅ Implement loading states for all API calls
- ✅ Handle edge cases (empty repos, private repos, API errors)
- ✅ Type all API responses with TypeScript interfaces

### 3. **Repository Processing**
- ✅ Filter out forked repositories by default
- ✅ Exclude repositories listed in `VITE_GITHUB_EXCLUDE_REPOS`
- ✅ Sort repositories by last updated or stars
- ✅ Implement technology detection based on languages + dependencies

---

## 📱 **UI/UX Rules**

### 1. **Design Consistency**
- ✅ Use Slytherin-green (#22c55e) as primary accent color
- ✅ Maintain consistent spacing and typography scale
- ✅ Ensure 4.5:1 color contrast ratio for accessibility
- ✅ Use consistent button styles and hover states
- ✅ Follow the established design system

### 2. **Responsive Design**
- ✅ Test on mobile (375px), tablet (768px), and desktop (1024px+)
- ✅ Use responsive images with appropriate breakpoints
- ✅ Ensure touch targets are minimum 44x44px
- ✅ Optimize for both portrait and landscape orientations

### 3. **Performance**
- ✅ Optimize images (WebP format when possible)
- ✅ Lazy load images and components when appropriate
- ✅ Keep bundle size under 500KB gzipped
- ✅ Achieve Lighthouse score >90 for all metrics

---

## 🧪 **Testing Rules**

### 1. **Code Quality**
- ✅ Write unit tests for utility functions
- ✅ Test API integration with mock data
- ✅ Test responsive design on multiple screen sizes
- ✅ Validate accessibility with screen readers

### 2. **Manual Testing**
- ✅ Test all navigation links and smooth scrolling
- ✅ Verify dark/light mode toggle functionality
- ✅ Test GitHub API integration with real data
- ✅ Validate contact information and resume download

---

## 🚀 **Deployment Rules**

### 1. **Environment Management**
- ✅ Use separate environment files for development/production
- ✅ Never commit `.env` files to version control
- ✅ Document all required environment variables in `.env.example`
- ✅ Validate environment variables on build

### 2. **Build Process**
- ✅ Ensure build passes with zero errors/warnings
- ✅ Test production build locally before deployment
- ✅ Optimize assets during build process
- ✅ Generate source maps for debugging

---

## 📚 **Documentation Rules**

### 1. **Code Documentation**
- ✅ Document complex functions with JSDoc comments
- ✅ Keep README.md up to date with current features
- ✅ Update PROJECT_TASKS.md as tasks are completed
- ✅ Document any breaking changes in commit messages

### 2. **API Documentation**
- ✅ Document GitHub API endpoints used
- ✅ Document rate limits and caching strategies
- ✅ Provide examples of API response structures
- ✅ Document error handling approaches

---

## 🚫 **What NOT to Do**

### ❌ **Code Anti-Patterns**
- Don't use `any` type in TypeScript
- Don't write inline styles (use Tailwind classes)
- Don't create unused components or files
- Don't ignore ESLint warnings
- Don't use deprecated React patterns (class components, etc.)

### ❌ **Security Anti-Patterns**
- Don't commit API keys or sensitive data
- Don't expose internal API endpoints
- Don't trust user input without validation
- Don't use HTTP for production (HTTPS only)

### ❌ **Performance Anti-Patterns**
- Don't load unnecessary dependencies
- Don't create memory leaks with uncleaned effects
- Don't block the main thread with heavy computations
- Don't ignore bundle size optimization

---

## ✅ **Definition of Done**

A task is considered complete when:
- ✅ Code passes all linting rules
- ✅ TypeScript compilation succeeds with no errors
- ✅ Component is responsive on all screen sizes
- ✅ Dark/light mode compatibility is maintained
- ✅ Manual testing confirms functionality
- ✅ Changes are committed with proper commit message
- ✅ PROJECT_TASKS.md is updated

---

## 🎯 **Review Checklist**

Before any major commit, verify:
- [ ] All new code follows established patterns
- [ ] No console.log statements in production code
- [ ] Environment variables are properly configured
- [ ] Responsive design works on all breakpoints
- [ ] Dark/light mode toggle works correctly
- [ ] GitHub API integration handles errors gracefully
- [ ] Performance metrics remain within acceptable ranges

---

*Last Updated: Project Setup Phase*
*Next Review: After GitHub API Integration* 