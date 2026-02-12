# Reference PR Part 1: Feature Structure & i18n Setup

## 🎯 Purpose

This PR adds a **reference implementation** for developers who need to add new features to the WSO2 Identity Server console. It demonstrates the minimal file structure and i18n/translation setup required.

**Part of Reference PR Series:**
- ✅ **Part 1** (This PR): Feature structure + i18n/translation setup
- 🔜 Part 2: Routing & navigation integration
- 🔜 Part 3: API integration patterns
- 🔜 Part 4+: Additional patterns as needed

## 📦 What's Included

### Example Feature Module: `admin.example-feature.v1`
- Minimal feature module structure with essential files
- Constants, models, and page components
- TypeScript interfaces and type safety patterns
- Build configuration (Rollup, TypeScript)

### i18n Translation Setup
- Namespace interface for type-safe translations
- Translation files with complete examples
- **4-point namespace registration** (critical for i18n loading):
  1. `modules/i18n/src/constants.ts`
  2. `modules/i18n/src/translations/en-US/meta.ts`
  3. `features/admin.core.v1/constants/i18n-constants.ts`
  4. `features/admin.core.v1/configs/app.ts`

### Comprehensive Documentation
- 📘 **[README.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/features/admin.example-feature.v1/docs/README.md)** - Complete feature development guide
- 🚀 **[QUICK_START.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/features/admin.example-feature.v1/docs/QUICK_START.md)** - 10-minute setup guide
- 🔌 **[INTEGRATION_GUIDE.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/features/admin.example-feature.v1/docs/INTEGRATION_GUIDE.md)** - Step-by-step i18n integration
- 🏗️ **[ARCHITECTURE.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/features/admin.example-feature.v1/docs/ARCHITECTURE.md)** - Visual architecture diagrams
- 📚 **[INDEX.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/features/admin.example-feature.v1/docs/INDEX.md)** - Documentation navigation guide
- 📋 **[PR_DESCRIPTION.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/PR_DESCRIPTION.md)** - Detailed PR overview and checklist


## 🚀 Quick Start for Developers

1. **Read the overview**: Start with [PR_DESCRIPTION.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/PR_DESCRIPTION.md)
2. **Fast implementation**: Follow [QUICK_START.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/features/admin.example-feature.v1/docs/QUICK_START.md) (~10 min)
3. **Deep dive**: Read [README.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/features/admin.example-feature.v1/docs/README.md) for complete understanding
4. **Step-by-step**: Use [INTEGRATION_GUIDE.md](https://github.com/JayaShakthi97/identity-apps/blob/reference/01-feature-with-i18n/features/admin.example-feature.v1/docs/INTEGRATION_GUIDE.md) for i18n setup

## ⚠️ Scope

**This PR covers:**
- ✅ Feature module structure
- ✅ i18n/translation setup
- ✅ TypeScript interfaces and types
- ✅ Build configuration

**Not in this PR (covered in Part 2):**
- ❌ Route configuration
- ❌ Side panel integration
- ❌ Navigation setup

---

**Note**: This is a reference implementation only. The example feature is non-functional and demonstrates structure, not business logic.
