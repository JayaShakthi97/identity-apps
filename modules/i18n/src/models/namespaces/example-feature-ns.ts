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
 * Namespace for Example Feature translations.
 * This interface defines the structure of translation keys for the example feature.
 */
export interface ExampleFeatureNS {
    /**
     * Page-level translations.
     */
    page: {
        /**
         * Page title.
         */
        title: string;
        /**
         * Page description.
         */
        description: string;
        /**
         * Breadcrumb text.
         */
        breadcrumb: string;
    };
    /**
     * Button translations.
     */
    buttons: {
        /**
         * Create new item button.
         */
        create: string;
        /**
         * Edit item button.
         */
        edit: string;
        /**
         * Delete item button.
         */
        delete: string;
        /**
         * Cancel button.
         */
        cancel: string;
        /**
         * Save button.
         */
        save: string;
    };
    /**
     * Form field translations.
     */
    fields: {
        /**
         * Name field.
         */
        name: {
            label: string;
            placeholder: string;
            validations: {
                empty: string;
                invalid: string;
            };
        };
        /**
         * Description field.
         */
        description: {
            label: string;
            placeholder: string;
        };
        /**
         * Status field.
         */
        status: {
            label: string;
            active: string;
            inactive: string;
        };
    };
    /**
     * Notification messages.
     */
    notifications: {
        /**
         * Success notifications.
         */
        success: {
            create: {
                message: string;
                description: string;
            };
            update: {
                message: string;
                description: string;
            };
            delete: {
                message: string;
                description: string;
            };
        };
        /**
         * Error notifications.
         */
        error: {
            create: {
                message: string;
                description: string;
            };
            update: {
                message: string;
                description: string;
            };
            delete: {
                message: string;
                description: string;
            };
            fetch: {
                message: string;
                description: string;
            };
        };
    };
    /**
     * Confirmation dialog translations.
     */
    confirmations: {
        delete: {
            header: string;
            message: string;
            content: string;
            assertionHint: string;
        };
    };
}
