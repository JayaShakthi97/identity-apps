/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { IdentifiableComponentInterface } from "@wso2is/core/models";
import { PageLayout } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { ExampleFeatureConstants } from "../constants/example-feature-constants";

/**
 * Props interface of {@link ExampleFeaturePage}
 */
type ExampleFeaturePageInterface = IdentifiableComponentInterface;

/**
 * Example Feature Page.
 *
 * This is a minimal example of a feature page component.
 * In a real implementation, this would contain:
 * - List views with tables or cards
 * - Action buttons (Add, Edit, Delete)
 * - Search and filter functionality
 * - Integration with API hooks for data fetching
 *
 * @param props - Props injected to the component.
 * @returns Example Feature Page component.
 */
const ExampleFeaturePage: FunctionComponent<ExampleFeaturePageInterface> = ({
    "data-componentid": componentId = "example-feature-page"
}: ExampleFeaturePageInterface): ReactElement => {
    const { t } = useTranslation();

    return (
        <PageLayout
            title={ t("exampleFeature:page.title") }
            description={ t("exampleFeature:page.description") }
            data-componentid={ componentId }
        >
            <div className="example-feature-content">
                <h2>{ ExampleFeatureConstants.EXAMPLE_FEATURE_DISPLAY_NAME }</h2>
                <p>{ ExampleFeatureConstants.EXAMPLE_FEATURE_DESCRIPTION }</p>

                <div className="example-feature-info">
                    <h3>How to use this reference:</h3>
                    <ol>
                        <li>
                            <strong>Feature Structure:</strong> Check the file structure of this
                            feature module (admin.example-feature.v1) to understand the minimal
                            required files and folders.
                        </li>
                        <li>
                            <strong>Translations:</strong> See how translations are defined in
                            modules/i18n package with namespace interfaces and translation files.
                        </li>
                        <li>
                            <strong>Constants:</strong> Review the constants folder for defining
                            feature-specific constants and feature dictionaries.
                        </li>
                        <li>
                            <strong>Models:</strong> Review the models folder for TypeScript
                            interfaces defining data structures.
                        </li>
                        <li>
                            <strong>Integration:</strong> Follow the INTEGRATION_GUIDE.md to see
                            how to register translations and integrate your feature.
                        </li>
                    </ol>
                </div>

                <div className="example-feature-note">
                    <p>
                        <strong>Note:</strong> This is a reference implementation. Real features
                        would include API integration, components, hooks, and comprehensive error handling.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
};

export default ExampleFeaturePage;
