import { run } from '@base/tests/fetcher';
import { customRender, screen, stringifyAttributes, waitFor, within } from '@vue/services/testing/testing';
import { tFetcher } from '@vue/';

function mount({
  onFetch,
  onFetchSuccess,
  onFetchError,
  fetchErrorMessage,
  onMount,
  ...rest
} = {}){
  return customRender({
    components: { tFetcher },
    data(){
      return {
        props: {
          onFetch,
          onFetchSuccess,
          onFetchError,
          fetchErrorMessage,
          onMount
        }
      };
    },
    methods: {
      handleFetchError(err = {}, onFetchError = () => {}){
        if(!this.props.fetchErrorMessage) {
          err.message && this.setProps({ ...this.props, fetchErrorMessage: err.message });
        }
        onFetchError(err);
      },
      setProps(props){
        this.props = props;
      }
    },
    template: `
      <t-fetcher
        :on-fetch="props.onFetch"
        :on-fetch-success="props.onFetchSuccess"
        :on-fetch-error="err => handleFetchError(err, props.onFetchError)"
        :on-mount="props.onMount"
        :fetch-error-message="props.fetchErrorMessage"
        ${stringifyAttributes(rest)}
      >
        <p>Some content</p>
      </t-fetcher>`
  });
}

run(mount, { screen, waitFor, within });
