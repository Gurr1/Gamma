import { getTranslate } from "react-localize-redux";
import common from "../translations/CommonTranslations.json";
import _ from "lodash";

/*
 * Also loads in common by default
 * baseUrl must contain a dot at the end.
 */
export default function loadTranslations(localize, translations, baseUrl) {
    if (translations == null && baseUrl == null) {
        return _loadCommonTranslations(localize);
    }

    const translate = textId => getTranslate(localize)(baseUrl + "." + textId);

    const textsToTranslate = _.keys(_.at(translations, baseUrl)[0]);

    const texts = _.merge(
        {},
        _.zipObjectDeep(
            textsToTranslate,
            _.map(textsToTranslate, text => translate(text))
        ),
        _loadCommonTranslations(localize)
    );
    return texts;
}

function _loadCommonTranslations(localize) {
    const baseUrl = "Common.";

    const translate = textId => getTranslate(localize)(baseUrl + textId);

    const textsToTranslate = _.keys(common.Common);

    return _.zipObject(
        textsToTranslate,
        _.map(textsToTranslate, text => translate(text))
    );
}
