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

/**
 * Example feature constants.
 * This file contains all the constants used in the example feature.
 */
export class ExampleFeatureConstants {
    /**
     * Private constructor to avoid object instantiation from outside the class.
     */
    private constructor() { }

    /**
     * Example feature identifier.
     */
    public static readonly EXAMPLE_FEATURE_IDENTIFIER: string = "example-feature";

    /**
     * Example feature display name.
     */
    public static readonly EXAMPLE_FEATURE_DISPLAY_NAME: string = "Example Feature";

    /**
     * Example feature description.
     */
    public static readonly EXAMPLE_FEATURE_DESCRIPTION: string =
        "This is an example feature module created as a reference for developers.";
}

/**
 * Example feature dictionary mapping feature flags to their identifiers.
 */
export const EXAMPLE_FEATURE_DICTIONARY: Map<string, string> = new Map()
    .set("EXAMPLE_FEATURE_VIEW", "example-feature.view")
    .set("EXAMPLE_FEATURE_EDIT", "example-feature.edit")
    .set("EXAMPLE_FEATURE_DELETE", "example-feature.delete");
