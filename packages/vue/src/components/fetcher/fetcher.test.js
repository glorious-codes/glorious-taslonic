import { run } from '@base/tests/fetcher';
import { customRender, screen, waitFor, within } from '@vue/services/testing/testing';
import { tFetcher } from '@vue/';

function mount(props = {}){
  return customRender({
    components: { tFetcher },
    data(){
      return {
        props
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
      >
        <p>Some content</p>
      </t-fetcher>`
  });
}

run(mount, { screen, waitFor, within });
