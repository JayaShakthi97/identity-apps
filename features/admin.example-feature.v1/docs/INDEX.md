# Example Feature - Documentation Index

Welcome to the Example Feature reference implementation! This serves as a comprehensive guide for developers adding new features to the WSO2 Identity Server console.

## 📚 Documentation Overview

This reference includes multiple documentation files, each serving a specific purpose:

### 1. [QUICK_START.md](./QUICK_START.md) 🚀 START HERE
**Purpose**: Fast-track guide to creating a feature

**What you'll find**:
- Step-by-step quick instructions
- Minimal code examples
- Essential files only
- i18n namespace registration
- Troubleshooting tips

**Best for**: Getting started quickly

**Note**: Focuses on feature structure and i18n setup. Route configuration covered separately.

---

### 2. [README.md](./README.md) 📖 COMPREHENSIVE GUIDE
**Purpose**: Complete feature development guide with detailed explanations

**What you'll find**:
- File structure breakdown
- Detailed component descriptions
- Integration steps
- Development guidelines
- Best practices
- References to real features

**Best for**: Understanding the complete feature development process and best practices

---

### 3. [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) 🔌 I18N INTEGRATION
**Purpose**: Detailed step-by-step guide for i18n namespace registration

**What you'll find**:
- i18n namespace creation
- Translation file setup
- Namespace registration in 4 locations
- Testing procedures
- Common issues and solutions

**Best for**: Learning how to set up translations for your feature

**Note**: Route configuration (paths, routes, side panel) covered in separate routing guide.

---

### 4. [ARCHITECTURE.md](./ARCHITECTURE.md) 🏗️ VISUAL OVERVIEW
**Purpose**: Visual architecture diagrams and flow charts

**What you'll find**:
- Component relationship diagrams
- Data flow visualizations
- Routing flow charts
- Build process diagrams
- Directory structure overview

**Best for**: Understanding how all the pieces fit together visually

---

## 📁 File Structure Reference

### Documentation Files (What you're reading)
```
admin.example-feature.v1/
└── docs/                     # Documentation files
    ├── ARCHITECTURE.md       # Visual diagrams
    ├── INDEX.md              # This file
    ├── INTEGRATION_GUIDE.md  # Integration steps
    ├── QUICK_START.md        # Fast-track guide
    └── README.md             # Comprehensive guide
```

### Implementation Files (The actual code)
```
admin.example-feature.v1/
├── constants/
│   └── example-feature-constants.ts    # Constants & feature flags
├── models/
│   └── example-feature.ts              # TypeScript interfaces
├── pages/
│   └── example-feature-page.tsx        # Main page component
├── package.json                        # Dependencies
├── tsconfig.json                       # TypeScript config
└── rollup.config.cjs                   # Build config
```

### i18n Files (Translations)
```
modules/i18n/src/
├── models/namespaces/
│   ├── example-feature-ns.ts           # Namespace interface
│   └── index.ts                        # Export namespace
└── translations/en-US/portals/
    ├── example-feature.ts              # Translation strings
    └── index.ts                        # Export translations
```

---

## 🎯 Learning Paths

Choose your path based on your experience and needs:

### Path 1: Quick Implementation
1. Read [QUICK_START.md](./QUICK_START.md)
2. Copy the example files
3. Modify for your feature
4. Follow [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) steps 1-4
5. Build and test

---

### Path 2: Comprehensive Learning
1. Study [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand the architecture
2. Read [README.md](./README.md) - Learn the details
3. Review example code in implementation files
4. Follow [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Step-by-step integration
5. Reference [QUICK_START.md](./QUICK_START.md) - Quick patterns

---

### Path 3: Reference-Based
Use this as a reference when you need to:
- Add a new constant → See `constants/example-feature-constants.ts`
- Define a model → See `models/example-feature.ts`
- Create a page → See `pages/example-feature-page.tsx`
- Add translations → See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) Step 1

---

## 🔍 Quick Reference by Task

### "I want to add a new feature"
→ Start with [QUICK_START.md](./QUICK_START.md)

### "I want to understand the architecture"
→ Read [ARCHITECTURE.md](./ARCHITECTURE.md)

### "I want to know all implementation details"
→ Read [README.md](./README.md)

### "I want to integrate my feature to console"
→ Follow [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

### "I want to navigate the documentation"
→ Use this [INDEX.md](./INDEX.md) file

### "I want to understand translations"
→ See [README.md](./README.md) Step 1 and [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

### "I want to add routes and console navigation"
→ Refer to separate routing integration guide (covered in different PR)

### "I want example code"
→ Look at implementation files in `constants/`, `models/`, `pages/`

---

## 📊 Documentation Comparison

| Document | Length | Detail Level | Best For |
|----------|--------|--------------|----------|
| **QUICK_START.md** | Short | Basic | Getting started fast |
| **README.md** | Long | Comprehensive | Complete understanding |
| **INTEGRATION_GUIDE.md** | Medium | Detailed | Console integration |
| **ARCHITECTURE.md** | Medium | Visual | Understanding structure |
| **INDEX.md** | Short | Navigation | Finding docs |

---

## 🎓 Real Feature Examples

After reviewing this reference, study these real features:

### For Simple CRUD Features
→ **`admin.agents.v1`**
- Basic list/create/edit/delete
- Simple API integration
- Good starting point

### For Complex Forms & Wizards
→ **`admin.actions.v1`**
- Multi-step wizards
- Complex form validation
- Advanced state management

### For Large-Scale Features
→ **`admin.applications.v1`**
- Extensive component library
- Complex routing
- Advanced patterns

---

## ✅ Checklist: Using This Reference

When creating a new feature:

- [ ] Read the appropriate documentation (see Learning Paths above)
- [ ] Create feature folder structure
- [ ] Copy and modify essential files
- [ ] Add TypeScript interfaces in models/
- [ ] Add constants and feature flags
- [ ] Create i18n namespace and translations
- [ ] Export from i18n index files
- [ ] Register namespace in 4 locations
- [ ] Build and test i18n module

**For route integration**: Refer to separate routing guide.

---

## 🆘 Getting Help

If you're stuck:

1. **Check documentation** - Use the reference table above
2. **Review examples** - Look at real features
3. **Check troubleshooting** - See [QUICK_START.md](./QUICK_START.md) Troubleshooting section
4. **Ask for help** - Reach out to the team

---

## 📝 Updating This Reference

This reference should be kept up-to-date with:
- New architectural patterns
- Updated dependencies
- New tools and libraries
- Developer feedback
- Best practice changes

If you find improvements, please update the relevant documentation!

---

## 🔗 External Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router](https://reactrouter.com/)
- [Oxygen UI Components](https://github.com/wso2/oxygen-ui)

---

## 📞 Document Map

```
Start Here
    │
    ├── Quick Implementation?
    │   └──► QUICK_START.md ──► INTEGRATION_GUIDE.md ──► Done!
    │
    ├── Learning the System?
    │   └──► ARCHITECTURE.md ──► README.md ──► INTEGRATION_GUIDE.md ──► Done!
    │
    └── Need Reference?
        └──► INDEX.md (this file) ──► Specific doc based on need
```

---

## 🎉 Ready to Start?

**Recommended**: Start with [QUICK_START.md](./QUICK_START.md)

**Happy Coding!** 🚀

---

**Last Updated**: February 2026
**Version**: 1.0.0
**Maintainer**: WSO2 Identity Apps Team
