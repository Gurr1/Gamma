import React from "react";
import * as yup from "yup";
import translations from "./WebsiteForm.view.translations.json";

import {
    NAME,
    PRETTY_NAME
} from "../../../../../api/websites/props.websites.api";

import {
    DigitTranslations,
    DigitTextField,
    DigitEditData
} from "@cthit/react-digit-components";

function generateValidationSchema(text) {
    const schema = {};

    schema[NAME] = yup.string().required(text.FieldRequired);
    schema[PRETTY_NAME] = yup.string().required(text.FieldRequired);

    return yup.object().shape(schema);
}

function generateEditComponentData(text) {
    const componentData = {};

    componentData[NAME] = {
        component: DigitTextField,
        componentProps: {
            upperLabel: text.Name,
            filled: true
        }
    };

    componentData[PRETTY_NAME] = {
        component: DigitTextField,
        componentProps: {
            upperLabel: text.PrettyName,
            filled: true
        }
    };

    return componentData;
}

const WebsiteForm = ({
    initialValues,
    onSubmit,
    titleText,
    submitText,
    backButtonTo
}) => (
    <DigitTranslations
        translations={translations}
        render={text => (
            <DigitEditData
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={generateValidationSchema(text)}
                titleText={titleText}
                submitText={submitText}
                keysOrder={[NAME, PRETTY_NAME]}
                keysComponentData={generateEditComponentData(text)}
                extraButton={{
                    text: text.Cancel
                }}
                extraButtonTo={backButtonTo}
            />
        )}
    />
);

export default WebsiteForm;
