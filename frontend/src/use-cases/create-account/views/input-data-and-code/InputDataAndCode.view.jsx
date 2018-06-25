import React from "react";
import {
  AcceptUserAgreementInput,
  AttendanceYearInput,
  ConfirmCidInput,
  ConfirmationCodeInput,
  CreateAccountButton,
  FirstnameInput,
  LastnameInput,
  NickInput,
  PasswordConfirmationInput,
  PasswordInput
} from "./InputDataAndCode.view.styles";
import { Center, Spacing } from "../../../../common-ui/layout";
import {
  GammaCard,
  GammaCardBody,
  GammaCardButtons,
  GammaCardSubTitle,
  GammaCardTitle
} from "../../../../common-ui/design";

class InputDataAndCode extends React.Component {
  state = {
    errors: {
      cid: false,
      code: false,
      nick: false,
      password: false,
      passwordConfirmation: false,
      firstName: false,
      lastName: false,
      userAgreement: false
    },
    user: {
      code: "",
      whitelist: {
        cid: ""
      },
      nick: "",
      firstName: "",
      lastName: "",
      attendanceYear: this._getCurrentYear(),
      password: "",
      passwordConfirmation: "",
      userAgreement: false
    }
  };

  constructor() {
    super();

    this.cidInputRef = React.createRef();
    this.codeInputRef = React.createRef();
    this.nickInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.passwordConfirmInputRef = React.createRef();
    this.firstNameInputRef = React.createRef();
    this.lastNameInputRef = React.createRef();
  }

  render() {
    return (
      <Center>
        <GammaCard minWidth="300px" maxWidth="600px" hasSubTitle>
          <GammaCardTitle>{this.props.text.CompleteCreation}</GammaCardTitle>
          <GammaCardSubTitle>
            {this.props.text.CompleteCreationDescription}
          </GammaCardSubTitle>
          <GammaCardBody>
            <Center>
              <ConfirmCidInput
                validate={value => this._inputCheckErrorAndReset("cid")}
                innerRef={this.cidInputRef}
                upperLabel={this.props.text.YourCid}
                maxLength={10}
                lowerLabelReflectLength
                onChange={value => {
                  this.setState({
                    ...this.state,
                    user: {
                      ...this.state.user,
                      whitelist: {
                        cid: value
                      }
                    }
                  });
                }}
              />
              <ConfirmationCodeInput
                validate={value => this._inputCheckErrorAndReset("code")}
                innerRef={this.codeInputRef}
                upperLabel={this.props.text.CodeFromYourStudentEmail}
                maxLength={10}
                lowerLabelReflectLength
                onChange={value => this._handleInputChange(value, "code")}
              />
              <Spacing />
              <NickInput
                validate={value => this._inputCheckErrorAndReset("nick")}
                innerRef={this.nickInputRef}
                upperLabel={this.props.text.Nick}
                maxLength={20}
                lowerLabelReflectLength
                onChange={value => this._handleInputChange(value, "nick")}
              />
              <Spacing />
              <PasswordInput
                validate={value => this._inputCheckErrorAndReset("password")}
                innerRef={this.passwordInputRef}
                upperLabel={this.props.text.Password}
                password
                onChange={value => this._handleInputChange(value, "password")}
              />
              <Spacing />
              <PasswordConfirmationInput
                validate={value =>
                  this._inputCheckErrorAndReset("passwordConfirmation")
                }
                innerRef={this.passwordConfirmInputRef}
                upperLabel={this.props.text.ConfirmPassword}
                password
                onChange={value =>
                  this._handleInputChange(value, "passwordConfirmation")
                }
              />
              <Spacing />
              <FirstnameInput
                validate={value => this._inputCheckErrorAndReset("firstName")}
                innerRef={this.firstNameInputRef}
                upperLabel={this.props.text.FirstName}
                maxLength={20}
                lowerLabelReflectLength
                onChange={value => this._handleInputChange(value, "firstName")}
              />
              <Spacing />
              <LastnameInput
                validate={value => this._inputCheckErrorAndReset("lastName")}
                innerRef={this.lastNameInputRef}
                upperLabel={this.props.text.LastName}
                maxLength={20}
                lowerLabelReflectLength
                onChange={value => this._handleInputChange(value, "lastName")}
              />
              <Spacing />
              <AttendanceYearInput
                reverse
                upperLabel={this.props.text.WhichYearDidYouStart}
                startValue={"" + this._getCurrentYear()}
                valueToTextMap={this._generateAttendanceYears()}
                onChange={value =>
                  this._handleInputChange(value, "attendanceYear")
                }
              />
              <Spacing />
              <AcceptUserAgreementInput
                error={this.state.errors.userAgreement}
                primary
                label={this.props.text.AcceptUserAgreement}
                onChange={checked =>
                  this.setState({
                    ...this.state,
                    user: {
                      ...this.state.user,
                      userAgreement: checked
                    },
                    errors: {
                      ...this.state.errors,
                      userAgreement: false
                    }
                  })
                }
              />
            </Center>
          </GammaCardBody>
          <GammaCardButtons leftRight reverseDirection>
            <CreateAccountButton
              onClick={() => this._handleSendDataAndCode()}
              text={this.props.text.CreateAccount}
              primary
              raised
            />
            <Spacing />
          </GammaCardButtons>
        </GammaCard>
      </Center>
    );
  }

  _getCurrentYear() {
    return new Date().getFullYear();
  }

  _generateAttendanceYears() {
    const output = {};
    const startYear = 2001;
    const currentYear = this._getCurrentYear();
    for (var i = currentYear; i >= startYear; i--) {
      output[i] = i;
    }
    return output;
  }

  _handleSendDataAndCode() {
    if (this._validate()) {
      console.log(this.state.user);
      this.props.sendDataAndCode(this.state.user);
    } else {
      this.props.showError("Du har inte skrivit klart allting ännu");
    }
  }

  _handleInputChange(newValue, prop) {
    const newState = this.state;
    newState.user[prop] = newValue;
    this.setState(newState);
  }

  _error(errorProp) {
    const errors = this.state.errors;
    errors[errorProp] = true;

    this.setState({
      ...this.state,
      errors: errors
    });
  }

  _inputCheckErrorAndReset(errorProp) {
    const isValid = !this.state.errors[errorProp];

    if (!isValid) {
      const errors = this.state.errors;
      errors[errorProp] = false;

      this.setState({
        ...this.state,
        errors: errors
      });
    }

    return isValid;
  }

  _validate() {
    const validCid = this._validateCid();
    const validCode = this._validateCode();
    const validNick = this._validateNick();
    const validPassword = this._validatePassword();
    const validFirstName = this._validateFirstName();
    const validLastName = this._validateLastName();
    const userAgreementAccepted = this._validateUserAgreement();

    return (
      validCid &&
      validCode &&
      validNick &&
      validPassword &&
      validFirstName &&
      validLastName &&
      userAgreementAccepted
    );
  }

  _invalidateIfEmpty(errorName, value, element) {
    const empty = this._checkIfEmpty(value);

    if (empty) {
      this._invalidate([errorName], [element]);
    }

    return !empty;
  }

  _invalidate(errors, elements, resetText = false) {
    for (var i in errors) {
      this._error(errors[i]);
    }

    for (var j in elements) {
      elements[j].invalidate(resetText);
    }
  }

  _checkIfEmpty(value) {
    return value == null || value.length === 0;
  }

  _validateCid() {
    return this._invalidateIfEmpty(
      "cid",
      this.state.user.whitelist.cid,
      this.cidInputRef.current
    );
  }

  _validateCode() {
    return this._invalidateIfEmpty(
      "code",
      this.state.user.code,
      this.codeInputRef.current
    );
  }

  _validateNick() {
    return this._invalidateIfEmpty(
      "nick",
      this.state.user.nick,
      this.nickInputRef.current
    );
  }

  _validatePassword() {
    const valid =
      !this._checkIfEmpty(this.state.user.password) &&
      this.state.user.password === this.state.user.passwordConfirmation;

    if (!valid) {
      this._invalidate(
        ["password", "passwordConfirmation"],
        [this.passwordInputRef.current, this.passwordConfirmInputRef.current],
        true
      );
    }

    return valid;
  }

  _validateFirstName() {
    return this._invalidateIfEmpty(
      "firstName",
      this.state.user.firstName,
      this.firstNameInputRef.current
    );
  }

  _validateLastName() {
    return this._invalidateIfEmpty(
      "lastName",
      this.state.user.lastName,
      this.lastNameInputRef.current
    );
  }

  _validateUserAgreement() {
    if (!this.state.user.userAgreement) {
      this.setState({
        ...this.state,
        errors: {
          ...this.errors,
          userAgreement: true
        }
      });
    }
    return this.state.user.userAgreement;
  }
}

export default InputDataAndCode;
