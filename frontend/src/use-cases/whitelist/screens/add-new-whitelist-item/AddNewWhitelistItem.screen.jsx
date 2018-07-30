import React from "react";
import { Fill, Center } from "../../../../common-ui/layout";
import EditWhitelistItem from "../common-views/edit-whitelist-item";

import GammaTranslations from "../../../../common/declaratives/gamma-translations";
import translations from "./AddNewWhitelistItem.screen.translations.json";

const AddNewWhitelistItem = ({ whitelistAdd }) => (
  <GammaTranslations
    translations={translations}
    uniquePath="Whitelist.Screen.AddNewWhitelistItem"
    render={text => (
      <Fill>
        <Center>
          <EditWhitelistItem
            onSubmit={(values, actions) => {
              console.log("hej");
              whitelistAdd(values)
                .then(response => {
                  console.log(response);
                  actions.resetForm();
                })
                .catch(error => {
                  console.log(error);
                });
            }}
            initialValues={{ cid: "" }}
            titleText={text.SaveCidToWhitelist}
            cidInputText={text.Cid}
            fieldRequiredText={text.FieldRequired}
            submitText={text.SaveCid}
          />
        </Center>
      </Fill>
    )}
  />
);

export default AddNewWhitelistItem;
