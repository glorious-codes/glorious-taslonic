import { run } from '@base/tests/form';
import { customRender, screen, stringifyAttributes, waitFor, within } from '@vue/services/testing/testing';
import { tButton, tField, tForm, tInput, tSelect, tTextarea } from '@vue/';

async function mount({
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
  onFetch,
  onFetchSuccess,
  onFetchError,
  submitSuccessTitle,
  submitSuccessMessage,
  submitErrorMessage,
  fetchErrorMessage,
  ...rest
} = {}, testOptions){
  const { FIELDS, SUBMIT_BUTTON_TEXT } = testOptions;
  return customRender({
    components: { tButton, tField, tForm, tInput, tSelect, tTextarea },
    data(){
      return {
        props: {
          onSubmit,
          onSubmitSuccess,
          onSubmitError,
          onFetch,
          onFetchSuccess,
          onFetchError,
          submitSuccessTitle,
          submitSuccessMessage,
          submitErrorMessage,
          fetchErrorMessage
        },
        FIELDS: FIELDS,
        formData: {}
      };
    },
    methods: {
      handleRequestError(err = {}, errorMessageProp, onError = () => {}){
        if(!this.props[errorMessageProp]) {
          err.message && this.setProps({ ...this.props, [errorMessageProp]: err.message });
        }
        onError(err);
      },
      setProps(props){
        this.props = props;
      }
    },
    template: `
      <t-form
        :on-fetch="props.onFetch"
        :on-fetch-success="props.onFetchSuccess"
        :on-fetch-error="err => handleRequestError(err, 'fetchErrorMessage', props.onFetchError)"
        :on-submit="props.onSubmit"
        :on-submit-success="props.onSubmitSuccess"
        :on-submit-error="err => handleRequestError(err, 'submitErrorMessage', props.onSubmitError)"
        :fetch-error-message="props.fetchErrorMessage"
        :submit-error-message="props.submitErrorMessage"
        :submit-success-title="props.submitSuccessTitle"
        :submit-success-message="props.submitSuccessMessage"
        ${stringifyAttributes(rest)}
      >
          <t-field :label="FIELDS.NAME.LABEL">
            <t-input v-model="formData.name" :validations="FIELDS.NAME.VALIDATIONS" required />
          </t-field>
          <t-field :label="FIELDS.FRUIT.LABEL">
            <t-select v-model="formData.fruit" :validations="FIELDS.FRUIT.VALIDATIONS" required>
              <option value="">Select</option>
              ${FIELDS.FRUIT.OPTIONS.map(({ value, text }) => `<option value="${value}">${text}</option>`)}
            </t-select>
          </t-field>
          <t-field :label="FIELDS.BIO.LABEL">
            <t-textarea v-model="formData.bio" :validations="FIELDS.BIO.VALIDATIONS" required />
          </t-field>
          <t-button type="submit">${SUBMIT_BUTTON_TEXT}</t-button>
      </t-form>`
  });
}

run(mount, { screen, waitFor, within });
