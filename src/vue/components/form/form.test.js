import { run } from '@base/tests/form';
import { customRender, screen, waitFor, within } from '@vue/services/testing/testing';
import { tButton, tField, tForm, tInput, tSelect, tTextarea } from '@vue/';

async function mount(props = {}, testOptions){
  const { FIELD_LABELS, SUBMIT_BUTTON_TEXT, customValidations, fruits } = testOptions;
  return customRender({
    components: { tButton, tField, tForm, tInput, tSelect, tTextarea },
    data(){
      return {
        props,
        customValidations,
        formData: {}
      };
    },
    template: `
      <t-form
        :on-fetch="props.onFetch"
        :on-fetch-success="props.onFetchSuccess"
        :on-fetch-error="props.onFetchError"
        :on-submit="props.onSubmit"
        :on-submit-success="props.onSubmitSuccess"
        :on-submit-error="props.onSubmitError"
        :fetch-error-message="props.fetchErrorMessage"
        :submit-error-message="props.submitErrorMessage"
        :submit-success-title="props.submitSuccessTitle"
        :submit-success-message="props.submitSuccessMessage">
          <t-field label="${FIELD_LABELS.NAME}">
            <t-input v-model="formData.name" :validations="customValidations.name" required />
          </t-field>
          <t-field label="${FIELD_LABELS.FRUIT}">
            <t-select v-model="formData.fruit" :validations="customValidations.fruit" required>
              <option value="">Select</option>
              ${fruits.map(({ value, text }) => `<option value="${value}">${text}</option>`)}
            </t-select>
          </t-field>
          <t-field label="${FIELD_LABELS.BIO}">
            <t-textarea v-model="formData.bio" :validations="customValidations.bio" required />
          </t-field>
          <t-button type="submit">${SUBMIT_BUTTON_TEXT}</t-button>
      </t-form>`
  });
}

run(mount, { screen, waitFor, within });
