import {
    DigitEditData,
    DigitSelect,
    DigitTextField,
    DigitTranslations
} from "@cthit/react-digit-components";
import React from "react";
import * as yup from "yup";
import {
    ACCEPTANCE_YEAR,
    CID,
    EMAIL,
    FIRST_NAME,
    LAST_NAME,
    NICK,
    PASSWORD,
    WEBSITES
} from "../../../../../api/users/props.users.api";
import EditWebsites from "../../../../../common/views/edit-websites";
import translations from "./UserForm.view.translations.json";

function _getCurrentYear() {
    return new Date().getFullYear() + "";
}

function _generateAcceptanceYears() {
    const output = {};
    const startYear = 2001;
    const currentYear = _getCurrentYear();
    for (var i = currentYear; i >= startYear; i--) {
        output[i] = i;
    }

    return output;
}

function generateValidationSchema(text, includeCidAndPassword) {
    const schema = {};
    schema[FIRST_NAME] = yup.string().required(text.FieldRequired);
    schema[LAST_NAME] = yup.string().required(text.FieldRequired);
    schema[NICK] = yup.string().required(text.FieldRequired);
    schema[EMAIL] = yup.string().required(text.FieldRequired);
    schema[ACCEPTANCE_YEAR] = yup.number().required(text.FieldRequired);
    schema[WEBSITES] = yup.array().of(yup.object());

    if (includeCidAndPassword) {
        schema[CID] = yup.string().required(text.FieldRequired);
        schema[PASSWORD] = yup.string().required(text.FieldRequired);
    }

    return yup.object().shape(schema);
}

function generateEditComponentData(
    text,
    availableWebsites,
    includeCidAndPassword
) {
    const componentData = {};

    componentData[FIRST_NAME] = {
        component: DigitTextField,
        componentProps: {
            upperLabel: text.FirstName,
            outlined: true
        }
    };

    componentData[LAST_NAME] = {
        component: DigitTextField,
        componentProps: {
            upperLabel: text.LastName,
            outlined: true
        }
    };

    componentData[NICK] = {
        component: DigitTextField,
        componentProps: {
            upperLabel: text.Nick,
            outlined: true
        }
    };

    componentData[EMAIL] = {
        component: DigitTextField,
        componentProps: {
            upperLabel: text.Email,
            outlined: true
        }
    };

    componentData[ACCEPTANCE_YEAR] = {
        component: DigitSelect,
        componentProps: {
            upperLabel: text.AcceptanceYear,
            valueToTextMap: _generateAcceptanceYears(),
            reverse: true,
            outlined: true
        }
    };

    componentData[WEBSITES] = {
        array: true,
        component: EditWebsites,
        componentProps: {
            availableWebsites: availableWebsites
        }
    };

    if (includeCidAndPassword) {
        componentData[CID] = {
            component: DigitTextField,
            componentProps: {
                upperLabel: text.Cid,
                outlined: true
            }
        };

        componentData[PASSWORD] = {
            component: DigitTextField,
            componentProps: {
                upperLabel: text.Password,
                outlined: true
            }
        };
    }
    return componentData;
}

function getKeysOrder(includeCidAndPassword) {
    const output = [
        FIRST_NAME,
        LAST_NAME,
        NICK,
        EMAIL,
        ACCEPTANCE_YEAR,
        WEBSITES
    ];

    if (includeCidAndPassword) {
        output.push(CID);
        output.push(PASSWORD);
    }

    return output;
}

const UserForm = ({
    initialValues,
    includeCidAndPassword,
    onSubmit,
    titleText,
    submitText,
    availableWebsites
}) => (
    <DigitTranslations
        translations={translations}
        render={text => (
            <DigitEditData
                titleText={titleText}
                submitText={submitText}
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(false);
                    onSubmit(values, actions);
                }}
                validationSchema={generateValidationSchema(
                    text,
                    includeCidAndPassword
                )}
                keysOrder={getKeysOrder(includeCidAndPassword)}
                keysComponentData={generateEditComponentData(
                    text,
                    availableWebsites,
                    includeCidAndPassword
                )}
            />
        )}
    />
);

export default UserForm;
