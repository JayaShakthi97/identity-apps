# Quick Start: Adding a New Feature to Console

Follow these steps to add a new feature to the console. For detailed information, see the [feature README](./README.md).

---

## 🚀 Steps

### 1. Create Feature Module

```bash
# Navigate to features directory
cd features/

# Create your feature folder (use kebab-case)
mkdir admin.my-feature.v1
cd admin.my-feature.v1

# Create required folders
mkdir constants models pages

# Copy template files from example feature
# Or create them manually following the example
```

### 2. Essential Files Needed

#### `package.json`
```json
{
  "name": "@wso2is/admin.my-feature.v1",
  "version": "1.0.0",
  "dependencies": {
    "@wso2is/admin.core.v1": "^2.50.2",
    "@wso2is/core": "^2.12.7",
    "@wso2is/i18n": "^2.32.1",
    "@wso2is/react-components": "^2.9.25",
    "react": "^18.2.0"
  }
}
```

#### `tsconfig.json`
Copy from `admin.example-feature.v1/tsconfig.json`

#### `constants/my-feature-constants.ts`
```typescript
export class MyFeatureConstants {
    private constructor() { }

    public static readonly FEATURE_ID: string = "my-feature";
}
```

#### `models/my-feature.ts`
```typescript
export interface MyFeatureInterface {
    id: string;
    name: string;
}
```

#### `pages/my-feature-page.tsx`
```typescript
import { IdentifiableComponentInterface } from "@wso2is/core/models";
import { PageLayout } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";

/**
 * Props interface of {@link MyFeaturePage}
 */
type MyFeaturePageInterface = IdentifiableComponentInterface;

/**
 * My Feature Page.
 *
 * @param props - Props injected to the component.
 * @returns My Feature Page component.
 */
const MyFeaturePage: FunctionComponent<MyFeaturePageInterface> = ({
    "data-componentid": componentId = "my-feature-page"
}: MyFeaturePageInterface): ReactElement => {
    const { t } = useTranslation();

    return (
        <PageLayout
            title={ t("myFeature:page.title") }
            description={ t("myFeature:page.description") }
            data-componentid={ componentId }
        >
            {/* Your content here */}
        </PageLayout>
    );
};

export default MyFeaturePage;
```

### 3. Add i18n Translations

#### Create `modules/i18n/src/models/namespaces/my-feature-ns.ts`
```typescript
export interface MyFeatureNS {
    page: {
        title: string;
        description: string;
    };
}
```

#### Create `modules/i18n/src/translations/en-US/portals/my-feature.ts`
```typescript
import { MyFeatureNS } from "../../../models/namespaces/my-feature-ns";

export const myFeature: MyFeatureNS = {
    page: {
        title: "My Feature",
        description: "My feature description"
    }
};
```

#### Update index files
Add to `modules/i18n/src/models/namespaces/index.ts`:
```typescript
export * from "./my-feature-ns";
```

Add to `modules/i18n/src/translations/en-US/portals/index.ts`:
```typescript
export * from "./my-feature";
```

#### Add namespace constant in `modules/i18n/src/constants.ts`
```typescript
/**
 * My Feature namespace.
 */
public static readonly MY_FEATURE_NAMESPACE: string = "myFeature";
```

#### Register in locale meta `modules/i18n/src/translations/en-US/meta.ts`
```typescript
namespaces: [
    // ... existing namespaces
    I18nModuleConstants.MY_FEATURE_NAMESPACE
]
```

#### Add to console i18n `features/admin.core.v1/constants/i18n-constants.ts`
```typescript
// Add constant
public static readonly MY_FEATURE_NAMESPACE: string =
    I18nModuleConstants.MY_FEATURE_NAMESPACE;

// Add to BUNDLE_NAMESPACE_DIRECTORIES map
[ I18nConstants.MY_FEATURE_NAMESPACE, "portals" ]
```

#### Add to app config `features/admin.core.v1/configs/app.ts`
```typescript
// In generateModuleInitOptions, add to ns array:
I18nConstants.MY_FEATURE_NAMESPACE
```

### 4. Build & Test

```bash
# Install dependencies
pnpm install

# Build the i18n module
cd modules/i18n
pnpm build

# Build the feature
cd ../../features/admin.my-feature.v1
pnpm build
```

**Note**: For route integration and console UI setup, refer to the separate routing integration guide.

---

## 📁 Minimal File Structure

```
admin.my-feature.v1/
├── constants/
│   └── my-feature-constants.ts
├── models/
│   └── my-feature.ts
├── pages/
│   └── my-feature-page.tsx
├── package.json
├── tsconfig.json
└── rollup.config.cjs
```

---

## 🎯 Common Patterns

### Feature Dictionary (for permissions)
```typescript
export const MY_FEATURE_DICTIONARY: Map<string, string> = new Map()
    .set("VIEW", "my-feature.view")
    .set("EDIT", "my-feature.edit")
    .set("DELETE", "my-feature.delete");
```

### TypeScript Interfaces
```typescript
// For API response
export interface MyFeatureInterface {
    id: string;
    name: string;
    status: "ACTIVE" | "INACTIVE";
}

// For API request
export interface CreateMyFeatureInterface {
    name: string;
}
```

### Using Translations
```typescript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
    const { t } = useTranslation();

    return <h1>{t("myFeature:page.title")}</h1>;
};
```

---

## 🔄 Next Steps (Optional)

Once basic structure is ready, you can add:

1. **API Integration** (`api/` folder)
   ```typescript
   // api/my-feature.ts
   export const getMyFeature = (id: string) => {
       return axios.get(`/api/my-feature/${id}`);
   };
   ```

2. **React Hooks** (`hooks/` folder)
   ```typescript
   // hooks/use-my-feature.ts
   export const useMyFeature = (id: string) => {
       return useQuery(['my-feature', id], () => getMyFeature(id));
   };
   ```

3. **Components** (`components/` folder)
   - Forms
   - Lists
   - Cards
   - Modals

4. **Configs** (`configs/` folder)
   - Endpoints
   - Default values

---

## ⚡ Pro Tips

1. **Copy from Example**: Use `admin.example-feature.v1` as a template
2. **Study Real Features**: Check `admin.agents.v1` for a simple real example
3. **Type Safety**: Always define TypeScript interfaces for translations
4. **Translation Keys**: Use hierarchical structure (`feature:section.item`)
5. **Namespace Consistency**: Ensure the namespace string matches exactly in all 4 registration files

---

## 🆘 Troubleshooting

**Build Errors?**
```bash
# Clean and rebuild
pnpm clean
pnpm build
```

**Translations Missing?**
- Rebuild i18n module
- Check namespace is exported from index files
- Verify translation key path
- Ensure namespace is registered in all 4 files (constants.ts, meta.ts, i18n-constants.ts, app.ts)

---

## 📚 Full Documentation

For detailed information, see:
- [Feature README](./README.md) - Complete feature documentation
- [Integration Guide](./INTEGRATION_GUIDE.md) - Detailed integration steps
- [INDEX](./INDEX.md) - Documentation navigation

---

**Time to Complete**: ~10 minutes for i18n setup

**Difficulty**: ⭐⭐☆☆☆ (Intermediate)

**Note**: This guide covers i18n/translation setup only. For route configuration, refer to the separate routing integration guide.

Good luck! 🎉
