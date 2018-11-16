import React from "react";
import PropTypes from "prop-types";

import { ButtonNavLink } from "./EmailHasBeenSent.view.styles";

import GammaButton from "../../../../common/elements/gamma-button";

import { Center } from "../../../../common-ui/layout";
import {
  GammaCard,
  GammaCardBody,
  GammaCardButtons,
  GammaCardTitle
} from "../../../../common-ui/design";
import { Text } from "../../../../common-ui/text";

import GammaTranslations from "../../../../common/declaratives/gamma-translations";
import translations from "./EmailHasBeenSent.view.translations.json";

const EmailHasBeenSent = ({}) => (
  <GammaTranslations
    translations={translations}
    uniquePath="CreateAccount.View.EmailHasBeenSent"
    render={text => (
      <Center>
        <GammaCard minWidth="300px" maxWidth="500px">
          <GammaCardTitle text={text.AnEmailShouldBeSent} />
          <GammaCardBody>
            <Text text={text.AnEmailShouldBeSentDescription} />
          </GammaCardBody>
          <GammaCardButtons leftRight reverseDirection>
            <ButtonNavLink to="/create-account/input">
              <GammaButton
                primary
                raised
                onClick={() => {}}
                text={text.HaveRecievedACode}
              />
            </ButtonNavLink>
            <ButtonNavLink to="/create-account">
              <GammaButton raised onClick={() => {}} text={text.Back} />
            </ButtonNavLink>
          </GammaCardButtons>
        </GammaCard>
      </Center>
    )}
  />
);

EmailHasBeenSent.propTypes = {};

export default EmailHasBeenSent;