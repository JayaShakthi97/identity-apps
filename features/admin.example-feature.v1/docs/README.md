# Example Feature Module

This is a **reference implementation** demonstrating how to create a new feature module in the WSO2 Identity Server console.

## Purpose

This module serves as a template and guide for developers who need to add new features to the console. It showcases the minimal file structure and integration points required.

## File Structure

```
admin.example-feature.v1/
├── constants/
│   └── example-feature-constants.ts    # Feature-specific constants and feature flags
├── models/
│   └── example-feature.ts              # TypeScript interfaces for data models
├── pages/
│   └── example-feature-page.tsx        # Main page component for the feature
├── CHANGELOG.md                        # Version history and changes
├── package.json                        # Package dependencies and metadata
├── rollup.config.cjs                   # Rollup build configuration
├── tsconfig.json                       # TypeScript compiler configuration
└── README.md                           # This file
```

## Key Components

### 1. Constants (`constants/`)
- Define feature-specific constants, identifiers, and feature dictionaries
- Use for feature flags, API endpoints, and static configuration values
- Example: `EXAMPLE_FEATURE_DICTIONARY` for permission mappings

### 2. Models (`models/`)
- Define TypeScript interfaces for data structures
- Include interfaces for API requests, responses, and internal data models
- Example: `ExampleFeatureItemInterface`, `CreateExampleFeatureItemInterface`

### 3. Pages (`pages/`)
- React components representing full pages in the console
- Typically include list views, detail views, and edit pages
- Use `PageLayout` from `@wso2is/react-components` for consistent layout

### 4. API Integration (Optional)
- Add `api/` folder for API client functions
- Add `hooks/` folder for React hooks wrapping API calls
- Use React Query or similar for data fetching and caching

### 5. Components (Optional)
- Add `components/` folder for reusable UI components specific to the feature
- Examples: forms, wizards, lists, cards, modals

### 6. Configuration Files
- **package.json**: Dependencies, scripts, and package metadata
- **tsconfig.json**: TypeScript compiler options
- **rollup.config.cjs**: Build configuration extending common rollup config

## Integration Steps

### Step 1: Create i18n Translations

1. Create namespace interface in `modules/i18n/src/models/namespaces/`:
   ```typescript
   // example-feature-ns.ts
   export interface ExampleFeatureNS {
       page: {
           title: string;
           description: string;
       };
       // ... more translation keys
   }
   ```

2. Create translation file in `modules/i18n/src/translations/en-US/portals/`:
   ```typescript
   // example-feature.ts
   import { ExampleFeatureNS } from "../../../models/namespaces/example-feature-ns";

   export const exampleFeature: ExampleFeatureNS = {
       page: {
           title: "Example Feature",
           description: "Example feature for demonstration"
       }
   };
   ```

3. Export from index files:
   - `modules/i18n/src/models/namespaces/index.ts`
   - `modules/i18n/src/translations/en-US/portals/index.ts`

4. Add namespace constant in `modules/i18n/src/constants.ts`:
   ```typescript
   /**
    * Example Feature namespace.
    */
   public static readonly EXAMPLE_FEATURE_NAMESPACE: string = "exampleFeature";
   ```

5. Register the namespace in multiple locations:
   - Add to locale meta: `modules/i18n/src/translations/en-US/meta.ts`
   - Add to console constants: `features/admin.core.v1/constants/i18n-constants.ts`
   - Add to bundle directories map in the same file
   - Add to i18n init options: `features/admin.core.v1/configs/app.ts`

   See [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) for detailed steps.

**Note**: For route configuration and console UI integration, refer to the separate routing integration guide.

## Development Guidelines

### Naming Conventions
- Feature folder: `admin.[feature-name].v1` (use kebab-case)
- Package name: `@wso2is/admin.[feature-name].v1`
- Constants class: `[FeatureName]Constants` (use PascalCase)
- Interfaces: `[Entity]Interface` (use PascalCase with Interface suffix)
- Translation namespace: `[featureName]NS` (use camelCase)

### Best Practices
1. **Modular Design**: Keep features self-contained with minimal dependencies
2. **TypeScript**: Always define proper types and interfaces
3. **Translations**: Use i18n for all user-facing text
4. **Access Control**: Implement feature flags and permission checks
5. **Error Handling**: Include proper error boundaries and user feedback
6. **Testing**: Add unit tests for components and integration tests for flows

## What's Next?

To create a production-ready feature, you'll typically add:

1. **API Layer** (`api/` folder)
   - API client functions
   - Request/response type definitions
   - Error handling

2. **Hooks** (`hooks/` folder)
   - Custom React hooks for data fetching
   - State management hooks
   - Side effect handling

3. **Components** (`components/` folder)
   - Reusable UI components
   - Forms and wizards
   - List and detail views

4. **Configurations** (`configs/` folder)
   - API endpoints
   - Feature-specific configurations
   - Default values

5. **Utilities** (`utils/` folder)
   - Helper functions
   - Data transformers
   - Validators

## References

Look at these existing features for real-world examples:
- `admin.agents.v1` - Simple feature with CRUD operations
- `admin.actions.v1` - Complex feature with multiple views
- `admin.applications.v1` - Comprehensive feature with extensive functionality

## License

Apache-2.0
