# PR: Add Example Feature Module - Developer Reference Guide

## 🎯 Purpose

This PR serves as a **reference implementation** for developers who need to add new features to the WSO2 Identity Server console. It demonstrates:

1. ✅ How to create a feature module under the `features/` folder
2. ✅ How to add translation files to the `modules/i18n` package
3. ✅ How to define constants and integrate i18n namespace into the console
4. ✅ Best practices and file structure patterns

**⚠️ Note**: This is a dummy PR for reference purposes only. The example feature is non-functional and demonstrates structure, not business logic.

**🔀 Scope**: This PR focuses on feature module structure and i18n/translation setup. Route configuration and console UI integration will be covered in a **separate PR** for clarity.

---

## 📁 What's Included

### 1. New Feature Module: `admin.example-feature.v1`

**Location**: `features/admin.example-feature.v1/`

A minimal feature module showcasing the required file structure:

```
admin.example-feature.v1/
├── constants/
│   └── example-feature-constants.ts    # Feature constants & feature flags
├── docs/                               # Documentation files
│   ├── ARCHITECTURE.md                 # Visual architecture diagrams
│   ├── INDEX.md                        # Documentation navigation
│   ├── INTEGRATION_GUIDE.md            # Step-by-step integration instructions
│   ├── QUICK_START.md                  # Quick start guide
│   └── README.md                       # Feature documentation
├── models/
│   └── example-feature.ts              # TypeScript interfaces
├── pages/
│   └── example-feature-page.tsx        # Main page component
├── package.json                        # Dependencies & scripts
├── rollup.config.cjs                   # Build configuration
└── tsconfig.json                       # TypeScript configuration
```

#### Key Files:

- **`constants/example-feature-constants.ts`**: Demonstrates how to define feature-specific constants and feature dictionaries for permission mappings
- **`models/example-feature.ts`**: Shows TypeScript interface patterns for data models
- **`pages/example-feature-page.tsx`**: Minimal page component example using `PageLayout`
- **`docs/README.md`**: Comprehensive documentation on feature structure and development guidelines
- **`docs/INTEGRATION_GUIDE.md`**: Detailed step-by-step guide for i18n namespace registration (route configuration covered in separate PR)

### 2. Translation Files in `modules/i18n`

**Files Modified/Created**:

1. **Namespace Interface**: `modules/i18n/src/models/namespaces/example-feature-ns.ts`
   - Defines TypeScript interface for translation keys
   - Ensures type safety for i18n usage

2. **Translation File**: `modules/i18n/src/translations/en-US/portals/example-feature.ts`
   - Contains actual translation strings
   - Structured to match the namespace interface

3. **Index Exports**:
   - Updated `modules/i18n/src/models/namespaces/index.ts`
   - Updated `modules/i18n/src/translations/en-US/portals/index.ts`

4. **Namespace Constant**: `modules/i18n/src/constants.ts`
   - Added `EXAMPLE_FEATURE_NAMESPACE` constant
   - Used for referencing the namespace in console integration

5. **Locale Meta Registration**: `modules/i18n/src/translations/en-US/meta.ts`
   - Added namespace to the locale's namespace array
   - Required for i18next to discover the namespace

6. **Console i18n Constants**: `features/admin.core.v1/constants/i18n-constants.ts`
   - Added namespace constant referencing i18n module constant
   - Added bundle directory mapping for resource discovery

7. **Console App Configuration**: `features/admin.core.v1/configs/app.ts`
   - Added namespace to i18n initialization options
   - Enables console to load the feature's translations

#### Translation Structure:

```typescript
exampleFeature: {
    page: { title, description, breadcrumb },
    buttons: { create, edit, delete, cancel, save },
    fields: { name, description, status },
    notifications: { success, error },
    confirmations: { delete }
}
```

### 3. Integration Documentation

**`docs/INTEGRATION_GUIDE.md`** provides complete instructions for i18n namespace registration:

- Creating namespace interface and translation files
- Exporting from index files
- Adding namespace constants in 4 required locations:
  1. `modules/i18n/src/constants.ts`
  2. `modules/i18n/src/translations/en-US/meta.ts`
  3. `features/admin.core.v1/constants/i18n-constants.ts`
  4. `features/admin.core.v1/configs/app.ts`
- Testing translations
- Troubleshooting common issues

**Note**: Route configuration (path constants, route definitions, side panel menu items) will be covered in a separate routing integration guide.

---

## 🔑 Key Concepts Demonstrated

### Feature Module Structure

1. **Self-Contained**: Features are modular and self-contained
2. **TypeScript First**: All code uses proper TypeScript types
3. **Minimal Dependencies**: Only essential dependencies included
4. **Build Configuration**: Uses shared rollup config for consistency

### Translation Management

1. **Type-Safe**: Namespace interfaces ensure compile-time checking
2. **Hierarchical**: Organized structure for easy maintenance
3. **Centralized**: All translations in `modules/i18n` package
4. **Exportable**: Properly exported for use across features

### Constants & Feature Flags

1. **Feature Dictionary**: Map feature flags to permission identifiers
2. **Static Constants**: Use class with static readonly properties
3. **Centralized**: Keep all feature constants in one place

---

## 📋 How to Use This Reference

### For Creating a New Feature:

1. **Copy the Structure**:
   ```bash
   cd features/
   cp -r admin.example-feature.v1 admin.your-feature.v1
   ```

2. **Update Package Info**:
   - Modify `package.json` (name, description, version)
   - Update `CHANGELOG.md`
   - Customize `docs/README.md`

3. **Implement Your Logic**:
   - Add API integration (`api/` folder)
   - Add React hooks (`hooks/` folder)
   - Add UI components (`components/` folder)
   - Implement pages with real functionality

4. **Add Translations**:
   - Create namespace interface in `modules/i18n/src/models/namespaces/`
   - Add translation file in `modules/i18n/src/translations/en-US/portals/`
   - Export from both index files
   - Add namespace constant in `modules/i18n/src/constants.ts`

5. **Integrate to Console**:
   - Follow `docs/INTEGRATION_GUIDE.md` step-by-step
   - Add routes, paths, and menu items
   - Test thoroughly

### For Understanding the Architecture:

1. **Read the README**: Start with `admin.example-feature.v1/docs/README.md`
2. **Study the Structure**: Examine the file organization and naming conventions
3. **Review the Code**: Look at how constants, models, and pages are structured
4. **Check Real Examples**: Compare with existing features like `admin.agents.v1` or `admin.actions.v1`

---

## 🗂️ Files Changed

### New Files Created:

**Feature Module** (`features/admin.example-feature.v1/`):
- ✨ `package.json`
- ✨ `tsconfig.json`
- ✨ `rollup.config.cjs`
- ✨ `CHANGELOG.md`
- ✨ `docs/README.md`
- ✨ `docs/INTEGRATION_GUIDE.md`
- ✨ `docs/QUICK_START.md`
- ✨ `docs/ARCHITECTURE.md`
- ✨ `docs/INDEX.md`
- ✨ `constants/example-feature-constants.ts`
- ✨ `models/example-feature.ts`
- ✨ `pages/example-feature-page.tsx`

**i18n Module** (`modules/i18n/`):
- ✨ `src/models/namespaces/example-feature-ns.ts`
- ✨ `src/translations/en-US/portals/example-feature.ts`

### Modified Files:

**i18n Module** (`modules/i18n/`):
- 📝 `src/models/namespaces/index.ts` - Added export for example-feature-ns
- 📝 `src/translations/en-US/portals/index.ts` - Added export for example-feature
- 📝 `src/constants.ts` - Added EXAMPLE_FEATURE_NAMESPACE constant
- 📝 `src/translations/en-US/meta.ts` - Added namespace to locale meta

**Console Core** (`features/admin.core.v1/`):
- 📝 `constants/i18n-constants.ts` - Added EXAMPLE_FEATURE_NAMESPACE constant and bundle directory mapping
- 📝 `configs/app.ts` - Added namespace to i18n init options

---

## 🏗️ File Structure Overview

```
identity-apps/
├── features/
│   ├── admin.example-feature.v1/          # 👈 NEW: Example feature module
│   │   ├── constants/
│   │   │   └── example-feature-constants.ts
│   │   ├── models/
│   │   │   └── example-feature.ts
│   │   ├── pages/
│   │   │   └── example-feature-page.tsx
│   │   ├── CHANGELOG.md
│   │   ├── docs/                          # 📚 Documentation files
│   │   │   ├── ARCHITECTURE.md           # Visual architecture diagrams
│   │   │   ├── INDEX.md                  # Documentation navigation
│   │   │   ├── INTEGRATION_GUIDE.md      # Integration instructions
│   │   │   ├── QUICK_START.md            # Quick start guide
│   │   │   └── README.md                 # Feature documentation
│   │   ├── package.json
│   │   ├── rollup.config.cjs
│   │   └── tsconfig.json
│   │
│   └── admin.core.v1/                      # 📝 MODIFIED: Console core
│       ├── configs/
│       │   └── app.ts                      # 📝 MODIFIED: Added namespace to i18n init
│       └── constants/
│           └── i18n-constants.ts           # 📝 MODIFIED: Added namespace constant
│
└── modules/
    └── i18n/
        └── src/
            ├── models/
            │   └── namespaces/
            │       ├── example-feature-ns.ts     # 👈 NEW: Namespace interface
            │       └── index.ts                  # 📝 MODIFIED: Added export
            ├── constants.ts                      # 📝 MODIFIED: Added namespace constant
            └── translations/
                └── en-US/
                    ├── meta.ts                   # 📝 MODIFIED: Added to locale meta
                    └── portals/
                        ├── example-feature.ts    # 👈 NEW: Translations
                        └── index.ts              # 📝 MODIFIED: Added export
```

---

## 📚 Additional Documentation

All documentation is self-contained within the feature module:

1. **`docs/README.md`**: Complete feature documentation
   - File structure explanation
   - Component descriptions
   - Integration steps
   - Development guidelines
   - Best practices
   - References to real features

2. **`docs/INTEGRATION_GUIDE.md`**: Step-by-step integration guide
   - Route configuration
   - Path constants
   - Side panel configuration
   - Feature gates
   - Testing procedures
   - Troubleshooting

---

## ✅ Checklist for New Features

When creating a new feature, ensure you have:

### Feature Module:
- [ ] Created feature folder following naming convention `admin.[feature-name].v1`
- [ ] Added `package.json` with correct name, version, and dependencies
- [ ] Added `tsconfig.json` with proper TypeScript configuration
- [ ] Added `rollup.config.cjs` for build configuration
- [ ] Created `constants/` folder with feature constants
- [ ] Created `models/` folder with TypeScript interfaces
- [ ] Created `pages/` folder with page components
- [ ] Added `CHANGELOG.md` for version tracking
- [ ] Added comprehensive documentation in `docs/` folder

### i18n & Translation Setup:
- [ ] Created namespace interface in `models/namespaces/[feature]-ns.ts`
- [ ] Created translation file in `translations/en-US/portals/[feature].ts`
- [ ] Exported namespace from `models/namespaces/index.ts`
- [ ] Exported translations from `translations/en-US/portals/index.ts`
- [ ] Added namespace constant in `src/constants.ts` (e.g., `MY_FEATURE_NAMESPACE`)
- [ ] Added namespace to locale meta in `translations/en-US/meta.ts`
- [ ] Added namespace constant to `features/admin.core.v1/constants/i18n-constants.ts`
- [ ] Added namespace to bundle directories map in `i18n-constants.ts`
- [ ] Added namespace to i18n init options in `features/admin.core.v1/configs/app.ts`
- [ ] Verified TypeScript types match between namespace and translations
- [ ] Rebuild i18n module after changes

### Console Routing & UI Integration:
**Note**: Route configuration will be covered in a separate reference PR.
- [ ] Added path constants
- [ ] Added route configuration
- [ ] Added side panel menu items (if applicable)
- [ ] Added icons (if applicable)
- [ ] Configured feature gates (if applicable)
- [ ] Tested routes and navigation
- [ ] Tested authentication and authorization

### Code Quality:
- [ ] All code follows TypeScript best practices
- [ ] Proper error handling implemented
- [ ] Components are properly typed
- [ ] No TypeScript errors or warnings
- [ ] Code follows existing patterns and conventions

---

## 🎓 Learning Resources

### Related Features to Study:

1. **Simple Feature**: `admin.agents.v1`
   - Good for understanding basic CRUD operations
   - Shows API integration patterns
   - Demonstrates hooks usage

2. **Complex Feature**: `admin.actions.v1`
   - Advanced form handling
   - Complex state management
   - Multi-step wizards

3. **Comprehensive Feature**: `admin.applications.v1`
   - Large-scale feature organization
   - Advanced routing
   - Extensive component library

### Documentation:

- [Architecture Guide](../../docs/ARCHITECTURE.md)
- [Developer Guide](../../docs/DEVELOPER.md)
- [Style Guide](../../docs/STYLE-GUIDE.md)
- [Build and Run Guide](../../docs/BUILD_AND_RUN.md)

---

## 🤝 Contributing

This reference implementation should be kept up-to-date with:

1. **Current best practices** from the codebase
2. **Latest architectural patterns** being used
3. **New tools and libraries** adopted by the project
4. **Feedback from developers** using this reference

If you find improvements or missing information, please update the documentation accordingly.

---

## 📝 Notes

- **Non-Functional**: The example feature does not implement real business logic
- **Reference Only**: Use as a template and guide, not a production feature
- **Keep Updated**: Maintain this as the codebase evolves
- **Feedback Welcome**: Improve based on developer experience

---

## 🔗 Quick Navigation

- **Feature Module**: [features/admin.example-feature.v1/](./admin.example-feature.v1/)
- **Feature README**: [features/admin.example-feature.v1/docs/README.md](./features/admin.example-feature.v1/docs/README.md)
- **Integration Guide**: [features/admin.example-feature.v1/docs/INTEGRATION_GUIDE.md](./features/admin.example-feature.v1/docs/INTEGRATION_GUIDE.md)
- **Quick Start**: [features/admin.example-feature.v1/docs/QUICK_START.md](./features/admin.example-feature.v1/docs/QUICK_START.md)
- **Architecture**: [features/admin.example-feature.v1/docs/ARCHITECTURE.md](./features/admin.example-feature.v1/docs/ARCHITECTURE.md)
- **Constants**: [features/admin.example-feature.v1/constants/example-feature-constants.ts](./admin.example-feature.v1/constants/example-feature-constants.ts)
- **Models**: [features/admin.example-feature.v1/models/example-feature.ts](./admin.example-feature.v1/models/example-feature.ts)
- **Page Component**: [features/admin.example-feature.v1/pages/example-feature-page.tsx](./admin.example-feature.v1/pages/example-feature-page.tsx)
- **i18n Namespace**: [modules/i18n/src/models/namespaces/example-feature-ns.ts](../../modules/i18n/src/models/namespaces/example-feature-ns.ts)
- **i18n Translations**: [modules/i18n/src/translations/en-US/portals/example-feature.ts](../../modules/i18n/src/translations/en-US/portals/example-feature.ts)

---

**Happy Coding! 🚀**
