/**
 * Copyright (c) 2021-2024, WSO2 LLC. (https://www.wso2.com).
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

import { FormValidation } from "@wso2is/validation";
import {
    CommonPluggableComponentMetaPropertyInterface,
    CommonPluggableComponentPropertyInterface,
    FederatedAuthenticatorMetaInterface,
    FederatedAuthenticatorWithMetaInterface
} from "../../models";

type SamlIdPListItemOption = {
    key: number;
    text: string;
    value: string;
};

export const supportedSchemes: string[] = [
    "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
    "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
    "urn:oasis:names:tc:SAML:2.0:nameid-format:entity",
    "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
    "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent",
    "urn:oasis:names:tc:SAML:2.0:nameid-format:encrypted",
    "urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName",
    "urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName",
    "urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos"
];

export const DEFAULT_NAME_ID_FORMAT: string = "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified";

/**
 * Returns the available nameid formats with the correct urn scheme.
 */
export const getAvailableNameIDFormats = (): Array<SamlIdPListItemOption> => {
    return supportedSchemes.map((scheme: string, index: number) => ({
        key: index, text: scheme, value: scheme
    }));
};

/**
 * Returns the supported protocol binding types.
 */
export const getAvailableProtocolBindingTypes = (): Array<SamlIdPListItemOption> => {
    return [
        { key: 1, text: "HTTP Redirect", value: "redirect" },
        { key: 2, text: "HTTP Post", value: "post" },
        { key: 3, text: "As Per Request", value: "as_request" }
    ];
};

export const DEFAULT_PROTOCOL_BINDING: string = "redirect";

/**
 * From this point onwards we have some metadata mapping functions.
 *
 * Why did we implement such methods at the first place? instead of
 * plugging the options as it is to the consumer? Good question!
 *
 * The reason is currently our metadata API does not receive proper
 * values for signature algorithms (only plain string) and some of
 * the application parts have inconsistencies because of this. So,
 * these methods simply does the mapping for us.
 *
 * This issue is currently tracking via:-
 * TODO: https://github.com/wso2/product-is/issues/12395
 */

/**
 * Returns the mapped signature algorithm value with readable string.
 * @param metadata - Metadata object.
 */
export const getSignatureAlgorithmOptionsMapped = (
    metadata: FederatedAuthenticatorMetaInterface
): Array<SamlIdPListItemOption> => {

    const property: CommonPluggableComponentMetaPropertyInterface = metadata.properties.find(
        ({ key }: CommonPluggableComponentMetaPropertyInterface) => key === "SignatureAlgorithm"
    );
    const displayNameMapper = (algorithmPlainString: string): string => {
        switch (algorithmPlainString) {
            case "DSA with SHA1":
                return "http://www.w3.org/2000/09/xmldsig#dsa-sha1";
            case "ECDSA with SHA1":
                return "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha1";
            case "ECDSA with SHA256":
                return "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha256";
            case "ECDSA with SHA384":
                return "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha384";
            case "ECDSA with SHA512":
                return "http://www.w3.org/2001/04/xmldsig-more#ecdsa-sha512";
            case "RSA with MD5":
                return "http://www.w3.org/2001/04/xmldsig-more#rsa-md5";
            case "RSA with RIPEMD160":
                return "http://www.w3.org/2001/04/xmldsig-more#rsa-ripemd160";
            case "RSA with SHA1":
                return "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
            case "RSA with SHA256":
                return "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
            case "RSA with SHA384":
                return "http://www.w3.org/2001/04/xmldsig-more#rsa-sha384";
            case "RSA with SHA512":
                return "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";
        }
    };

    if (property) {
        return property.options.map((option: string, index: number) => {
            return {
                key: index,
                text: displayNameMapper(option),
                value: option
            };
        });
    }

    return [];

};

/**
 * Returns the mapped digest algorithm values with readable string.
 * @param metadata - Metadata object.
 */
export const getDigestAlgorithmOptionsMapped = (
    metadata: FederatedAuthenticatorMetaInterface
): Array<SamlIdPListItemOption> => {

    const property: CommonPluggableComponentMetaPropertyInterface = metadata.properties.find(
        ({ key }: CommonPluggableComponentMetaPropertyInterface) => key === "DigestAlgorithm"
    );
    const displayNameMapper = (algorithmPlainString: string): string => {
        switch (algorithmPlainString) {
            case "MD5":
                return "http://www.w3.org/2001/04/xmldsig-more#md5";
            case "RIPEMD160":
                return "http://www.w3.org/2001/04/xmlenc#ripemd160";
            case "SHA1":
                return "http://www.w3.org/2000/09/xmldsig#sha1";
            case "SHA256":
                return "http://www.w3.org/2001/04/xmlenc#sha256";
            case "SHA384":
                return "http://www.w3.org/2001/04/xmldsig-more#sha384";
            case "SHA512":
                return "http://www.w3.org/2001/04/xmlenc#sha512";
        }
    };

    if (property) {
        return [ ...property.options.map((option: string, index: number) => {
            return {
                key: index,
                text: displayNameMapper(option),
                value: option
            };
        }), {
            key: -1,
            text: "",
            value: ""
        } ];
    }

    return [];

};

type FindPropValArgs<DefaultType> = { key: string; defaultValue: DefaultType; };
type FindPropValFunction = <Type>(args: FindPropValArgs<Type>) => Type;

type FindMetaArgs = { key: string };
type FindMetaFunction = (args: FindMetaArgs) => CommonPluggableComponentMetaPropertyInterface;

/**
 * TLDR: Pre computes idp metadata and data properties to find
 * and return values in constant time.
 *
 * Why? to do a faster search we need a constant access time data structure to
 * find the current value by key. This is because `data.properties` is a array of
 * object `{ key, value }` pairs which makes find operation exhaustive
 * when dealing with larger objects.
 *
 * Usage:
 *      const [ findPropVal, findMetaVal ] = fastSearch(authenticator);
 *      i.e., `findPropVal<string>({ defaultValue: "SHA1", key: "DigestAlgorithm" })`,
 *      i.e., `findMetaVal<number>({ key: "displayOrder" })`,
 *
 * @param authenticator - Authenticator object.
 */
export const fastSearch = (
    authenticator: FederatedAuthenticatorWithMetaInterface
): [ FindPropValFunction, FindMetaFunction ] => {

    const propertyMap: Map<string, any> = new Map<string, any>();

    authenticator.data?.properties.forEach(({ key, value }: CommonPluggableComponentPropertyInterface) =>
        propertyMap.set(key, value)
    );

    const metadataMap: Map<string, CommonPluggableComponentMetaPropertyInterface> = new Map<
        string,
        CommonPluggableComponentMetaPropertyInterface
    >();

    authenticator.meta?.properties.forEach((meta: CommonPluggableComponentMetaPropertyInterface) =>
        metadataMap.set(meta.key, meta)
    );

    return [
        /**
         * When you call it like below:
         *      `findPropVal<string>({ defaultValue: "SHA1", key: "DigestAlgorithm" })`;
         *
         * It will get the property value from {@link propertyMap}
         * If it's not in the property map then the {@link defaultValue}
         * will be returned instead.
         *
         * @param key - Key.
         * @param defaultValue - Default value.
         */<T>({ key, defaultValue }: FindPropValArgs<T>): T => {
            if (propertyMap.has(key)) {
                const value: string = propertyMap.get(key);

                if (metadataMap.get(key)?.type === "BOOLEAN" &&
                    booleanSentAsAStringValue(value)) {
                    return (castToBool(value) as unknown) as T;
                }
                if (!value)
                    return defaultValue;

                return value as T;
            }

            return defaultValue;
        },
        ({ key }: FindMetaArgs): CommonPluggableComponentMetaPropertyInterface | null => {
            if (metadataMap.has(key)) {
                return metadataMap.get(key);
            }

            return null;
        }
    ];

};

/**
 * For some reason the metadata API returns strings instead
 * booleans for boolean default values. Its good
 * if we can address them in the API with issue #4288.
 *
 * @param value - Value to cast.
 */
export const castToBool = (value: string): boolean => {
    if (!value) return false;
    if ("true" === value.toLowerCase()) return true;
    if ("false" === value.toLowerCase()) return false;
};

/**
 * Test for boolean toString value.
 * @param value - Value to test.
 */
export const booleanSentAsAStringValue = (value: any): boolean => {
    if (typeof value === "string") {
        return /true|false/g.test(value);
    }

    return false;
};

export type MinMaxLength = { max: number; min: number };
export type FormErrors = { [ key: string ]: string };

export const SERVICE_PROVIDER_ENTITY_ID_LENGTH: MinMaxLength = { max: 240, min: 3 };
export const SSO_URL_LENGTH: MinMaxLength = { max: 2048, min: 10 };
export const LOGOUT_URL_LENGTH: MinMaxLength = { max: 2048, min: 10 };
export const IDENTITY_PROVIDER_ENTITY_ID_LENGTH: MinMaxLength = { max: 2048, min: 5 };
export const IDENTITY_PROVIDER_NAME_LENGTH: MinMaxLength = { max: 120, min: 3 };
export const IDENTITY_PROVIDER_AUTHORIZED_REDIRECT_URL_LENGTH: MinMaxLength = { max: 2048, min: 10 };

/**
 * Given a {@link FormErrors} object, it will check whether
 * every key has a assigned truthy value. {@link Array.every}
 * will return `true` if one of the object member has
 * a truthy value. In other words, it will check a field has
 * a error message attached to it or not.
 *
 * @param errors - Form errors object.
 */
export const ifFieldsHave = (errors: FormErrors): boolean => {
    return !Object.keys(errors).every((k: string) => !errors[ k ]);
};

export const required = (value: string | any) => {
    if (!value) {
        return "This is a required field";
    }

    return undefined;
};

export const hasLength = (minMax: MinMaxLength) => (value: string) => {
    if (!value && minMax.min > 0) {
        return "You cannot leave this blank";
    }
    if (value?.length > minMax.max) {
        return `Cannot exceed more than ${ minMax.max } characters.`;
    }
    if (value?.length < minMax.min) {
        return `Should have at least ${ minMax.min } characters.`;
    }

    return undefined;
};

export const isUrl = (value: string): string => {
    return FormValidation.url(value)
        ? undefined
        : "This URL is invalid.";
};
