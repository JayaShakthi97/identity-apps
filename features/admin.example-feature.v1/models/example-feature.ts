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
 * Interface for Example Feature Item.
 */
export interface ExampleFeatureItemInterface {
    /**
     * Unique identifier for the item.
     */
    id: string;
    /**
     * Name of the item.
     */
    name: string;
    /**
     * Description of the item.
     */
    description?: string;
    /**
     * Status of the item.
     */
    status: "ACTIVE" | "INACTIVE";
    /**
     * Creation timestamp.
     */
    createdAt?: string;
    /**
     * Last modified timestamp.
     */
    modifiedAt?: string;
}

/**
 * Interface for creating a new Example Feature Item.
 */
export interface CreateExampleFeatureItemInterface {
    /**
     * Name of the item.
     */
    name: string;
    /**
     * Description of the item.
     */
    description?: string;
}

/**
 * Interface for updating an existing Example Feature Item.
 */
export interface UpdateExampleFeatureItemInterface {
    /**
     * Updated name of the item.
     */
    name?: string;
    /**
     * Updated description of the item.
     */
    description?: string;
    /**
     * Updated status of the item.
     */
    status?: "ACTIVE" | "INACTIVE";
}
