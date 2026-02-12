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

import { ExampleFeatureNS } from "../../../models/namespaces/example-feature-ns";

/**
 * Example Feature translations for en-US locale.
 */
export const exampleFeature: ExampleFeatureNS = {
    buttons: {
        cancel: "Cancel",
        create: "Create New",
        delete: "Delete",
        edit: "Edit",
        save: "Save"
    },
    confirmations: {
        delete: {
            assertionHint: "Please confirm your action.",
            content: "If you delete this item, it cannot be recovered. Please proceed with caution.",
            header: "Are you sure?",
            message: "This action is irreversible and will permanently delete the item."
        }
    },
    fields: {
        description: {
            label: "Description",
            placeholder: "Enter a description"
        },
        name: {
            label: "Name",
            placeholder: "Enter a name",
            validations: {
                empty: "Name is required.",
                invalid: "Please enter a valid name."
            }
        },
        status: {
            active: "Active",
            inactive: "Inactive",
            label: "Status"
        }
    },
    notifications: {
        error: {
            create: {
                description: "An error occurred while creating the item. Please try again.",
                message: "Error creating item"
            },
            delete: {
                description: "An error occurred while deleting the item. Please try again.",
                message: "Error deleting item"
            },
            fetch: {
                description: "An error occurred while fetching the data. Please try again.",
                message: "Error fetching data"
            },
            update: {
                description: "An error occurred while updating the item. Please try again.",
                message: "Error updating item"
            }
        },
        success: {
            create: {
                description: "The item has been created successfully.",
                message: "Item created successfully"
            },
            delete: {
                description: "The item has been deleted successfully.",
                message: "Item deleted successfully"
            },
            update: {
                description: "The item has been updated successfully.",
                message: "Item updated successfully"
            }
        }
    },
    page: {
        breadcrumb: "Example Feature",
        description: "This is an example feature module created as a reference for developers. " +
            "It demonstrates the minimal structure required to add a new feature to the console.",
        title: "Example Feature"
    }
};
