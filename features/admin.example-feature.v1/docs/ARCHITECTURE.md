# Feature Development Architecture Overview

This document provides a visual overview of how features are structured and integrated in the WSO2 Identity Server console.

**Note**: This architecture guide covers feature module structure and i18n/translation flows. Route configuration and console UI integration (routing flow, side panel, access control) are covered in a separate routing integration guide.

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           WSO2 Identity Server Console                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                        ┌─────────────┴──────────────┐
                        │                            │
                        ▼                            ▼
        ┌───────────────────────────┐   ┌──────────────────────────┐
        │   Apps (Console/MyAccount)│   │   Modules (Shared)       │
        │                           │   │                          │
        │  - Routes Configuration   │   │  - i18n Translations     │
        │  - Path Constants         │   │  - Core Components       │
        │  - Side Panel Config      │   │  - Utilities             │
        │  - Feature Gates          │   │  - React Components      │
        └───────────────┬───────────┘   └───────────┬──────────────┘
                        │                           │
                        │    ┌──────────────────────┘
                        │    │
                        ▼    ▼
        ┌────────────────────────────────────────────────────────┐
        │              Features (Feature Modules)                │
        │                                                        │
        │  admin.example-feature.v1/                            │
        │  ├── constants/     (Feature-specific constants)      │
        │  ├── models/        (TypeScript interfaces)           │
        │  ├── pages/         (Page components)                 │
        │  ├── components/    (UI components)                   │
        │  ├── api/           (API client functions)            │
        │  ├── hooks/         (React hooks)                     │
        │  └── configs/       (Configuration files)             │
        │                                                        │
        │  Each feature is self-contained and modular           │
        └────────────────────────────────────────────────────────┘
```

## 📦 Component Relationships

```
┌──────────────────────────────────────────────────────────────────┐
│                        Feature Module                            │
│  @wso2is/admin.example-feature.v1                               │
└───────────┬──────────────────────────────────────────────────────┘
            │
            │ depends on
            │
            ├─────► @wso2is/i18n                (Translations)
            ├─────► @wso2is/admin.core.v1       (Core functionality)
            ├─────► @wso2is/react-components    (UI components)
            ├─────► @wso2is/access-control      (Permissions)
            └─────► @oxygen-ui/react            (Design system)
```

## 🔄 Feature Integration Flow

```
1. Developer Creates Feature
   └─► features/admin.my-feature.v1/
       ├── constants/
       ├── models/
       └── pages/

2. Add Translations
   └─► modules/i18n/
       ├── models/namespaces/my-feature-ns.ts
       └── translations/en-US/portals/my-feature.ts

3. Register i18n Namespace
   └─► Register in 4 locations:
       ├── modules/i18n/src/constants.ts
       ├── modules/i18n/src/translations/en-US/meta.ts
       ├── features/admin.core.v1/constants/i18n-constants.ts
       └── features/admin.core.v1/configs/app.ts

4. Build & Test
   └─► pnpm build (feature and i18n module)

Note: Route integration (Step 5) covered in separate routing guide
```

## 📋 File Dependencies Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    Feature Page Component                       │
│              (my-feature-page.tsx)                              │
└────────┬────────────────────────────────────────────────────────┘
         │
         │ imports
         │
         ├──► Constants        (./constants/my-feature-constants.ts)
         ├──► Models           (./models/my-feature.ts)
         ├──► Components       (./components/*)
         ├──► Hooks            (./hooks/use-my-feature.ts)
         ├──► API              (./api/my-feature.ts)
         ├──► Translations     (@wso2is/i18n)
         └──► UI Components    (@wso2is/react-components)
```

## 🌐 i18n Translation Flow

```
┌────────────────────────────────────────────────────────────┐
│  Namespace Interface (TypeScript Definition)               │
│  modules/i18n/src/models/namespaces/my-feature-ns.ts      │
│                                                            │
│  export interface MyFeatureNS {                           │
│      page: { title: string; description: string; }        │
│  }                                                         │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       │ implements
                       │
┌──────────────────────▼─────────────────────────────────────┐
│  Translation File (Actual Strings)                         │
│  modules/i18n/src/translations/en-US/portals/my-feature.ts│
│                                                            │
│  export const myFeature: MyFeatureNS = {                  │
│      page: {                                              │
│          title: "My Feature",                             │
│          description: "Feature description"               │
│      }                                                     │
│  }                                                         │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       │ exported via
                       │
┌──────────────────────▼─────────────────────────────────────┐
│  Index Files (Module Exports)                             │
│  - models/namespaces/index.ts                             │
│  - translations/en-US/portals/index.ts                    │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       │ used by
                       │
┌──────────────────────▼─────────────────────────────────────┐
│  Feature Components                                        │
│  const { t } = useTranslation();                          │
│  <h1>{t("myFeature:page.title")}</h1>                     │
└────────────────────────────────────────────────────────────┘
```
