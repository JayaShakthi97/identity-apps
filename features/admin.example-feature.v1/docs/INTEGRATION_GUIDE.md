# Integration Guide for Example Feature

This guide demonstrates how to integrate the example feature into the console application.

## Overview

After creating the feature module and translation files, you need to register the i18n namespace with the console application. This involves:

1. Adding i18n namespace constant to the i18n module
2. Registering the namespace in locale meta
3. Adding the namespace to console i18n constants
4. Adding the namespace to console app configuration

**Note**: Route configuration, side panel integration, and feature gates are covered in a separate guide.

## Step 1: Add i18n Namespace Constant

Register your feature's namespace constant in the i18n module and console configuration.

### 1.1. Add to i18n Module

**File**: `modules/i18n/src/constants.ts`

```typescript
/**
 * Example Feature namespace.
 */
public static readonly EXAMPLE_FEATURE_NAMESPACE: string = "exampleFeature";
```

Add this constant in the `I18nModuleConstants` class, following the pattern of other feature namespaces.

### 1.2. Add to Locale Meta

**File**: `modules/i18n/src/translations/en-US/meta.ts`

```typescript
export const meta: LocaleMeta = {
    // ... other properties
    namespaces: [
        // ... existing namespaces
        I18nModuleConstants.EXAMPLE_FEATURE_NAMESPACE
    ]
};
```

### 1.3. Add to Console i18n Constants

**File**: `features/admin.core.v1/constants/i18n-constants.ts`

```typescript
/**
 * Example Feature namespace.
 */
public static readonly EXAMPLE_FEATURE_NAMESPACE: string =
    I18nModuleConstants.EXAMPLE_FEATURE_NAMESPACE;
```

Also add to the `BUNDLE_NAMESPACE_DIRECTORIES` map:

```typescript
public static readonly BUNDLE_NAMESPACE_DIRECTORIES: Map<string, string> = new Map<string, string>([
    // ... existing entries
    [ I18nConstants.EXAMPLE_FEATURE_NAMESPACE, "portals" ]
]);
```

### 1.4. Add to Console App Configuration

**File**: `features/admin.core.v1/configs/app.ts`

In the `generateModuleInitOptions` method, add to the `ns` array:

```typescript
ns: [
    // ... existing namespaces
    I18nConstants.EXAMPLE_FEATURE_NAMESPACE
]
```

**Note**: The constant value (e.g., "exampleFeature") must match the key used when exporting your translations in the portals index file.

**Purpose**: These registrations ensure that:
- Translation resources are loaded at application startup
- The i18n module knows where to find translation files
- Type-safe namespace access is available throughout the console
- Dynamic namespace loading works correctly

**Example Usage in Console**:
```typescript
import { useTranslation } from "react-i18next";

// In your component
const MyComponent = () => {
    const { t } = useTranslation();
    const title = t("exampleFeature:page.title");

    return <h1>{title}</h1>;
};
```

---

## Summary

After completing these steps, your feature's translation namespace will be properly registered and available throughout the console application. The i18n module will automatically load your translation files when the application starts.

### Files Modified

1. ✅ `modules/i18n/src/constants.ts` - Added namespace constant
2. ✅ `modules/i18n/src/translations/en-US/meta.ts` - Registered namespace in locale
3. ✅ `features/admin.core.v1/constants/i18n-constants.ts` - Added console constant and bundle mapping
4. ✅ `features/admin.core.v1/configs/app.ts` - Added namespace to init options

### Next Steps

Once your translations are registered, you can:
- Add route configuration (separate guide)
- Create page components that use the translations
- Integrate with the console side panel (separate guide)
- Add feature gates and access control (separate guide)

### Common Issues

**Translations Not Loading?**
- Verify all 4 files are updated correctly
- Check that the namespace string matches in all locations
- Ensure the i18n module is rebuilt: `cd modules/i18n && pnpm build`
- Clear browser cache and restart dev server

**TypeScript Errors?**
- Ensure namespace interface is exported from `models/namespaces/index.ts`
- Verify translation file implements the namespace interface correctly
- Run `pnpm build` in the i18n module to regenerate types

**Namespace Not Found?**
- Check that translations are exported from `translations/en-US/portals/index.ts`
- Verify the export key matches the namespace constant value
- Ensure no typos in the namespace string across all files

---

**For route integration and console UI setup, refer to the separate routing integration guide.**

