export const ERROR_MESSAGES = {
  TOO_SHORT_NAME: 'Must have at least two chars',
  NOT_CITRIC_FRUIT: 'Must be citric',
  OFFENSIVE_BIO: 'Must be free of offensive words'
};

export const FIELDS = {
  NAME: {
    LABEL: "Name",
    NAME: "name",
    VALIDATIONS: [{ isValid: val => val.length > 1, errorMessage: ERROR_MESSAGES.TOO_SHORT_NAME }]
  },
  FRUIT: {
    LABEL: "Fruit",
    NAME: "fruit",
    OPTIONS: [
      { value: 'banana', text: 'Banana' },
      { value: 'lemmon', text: 'Lemmon' },
      { value: 'papaya', text: 'Papaya' }
    ],
    VALIDATIONS: [{ isValid: val => val == 'lemmon', errorMessage: ERROR_MESSAGES.NOT_CITRIC_FRUIT }]
  },
  BIO: {
    LABEL: "Bio",
    NAME: "bio",
    VALIDATIONS: [{ isValid: val => !val.includes('fuck'), errorMessage: ERROR_MESSAGES.OFFENSIVE_BIO }]
  }
}

export const SUBMIT_BUTTON_TEXT = 'Submit';
