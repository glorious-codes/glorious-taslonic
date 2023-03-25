export const SUBMIT_BUTTON_TEXT = 'Submit';
export const ERROR_MESSAGES = {
  TOO_SHORT_NAME: 'Must have at least two chars',
  NOT_CITRIC_FRUIT: 'Must be citric',
  OFFENSIVE_BIO: 'Must be free of offensive words'
};
export const FIELD_LABELS = {
  NAME: 'Name',
  FRUIT: 'Fruit',
  BIO: 'Bio'
};
export const fruits = [
  { value: 'banana', text: 'Banana' },
  { value: 'lemmon', text: 'Lemmon' },
  { value: 'papaya', text: 'Papaya' }
];
export const customValidations = {
  name: [{ isValid: val => val.length > 1, errorMessage: ERROR_MESSAGES.TOO_SHORT_NAME }],
  fruit: [{ isValid: val => val == 'lemmon', errorMessage: ERROR_MESSAGES.NOT_CITRIC_FRUIT }],
  bio: [{ isValid: val => !val.includes('fuck'), errorMessage: ERROR_MESSAGES.OFFENSIVE_BIO }]
};
