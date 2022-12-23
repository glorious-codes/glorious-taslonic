import { run } from '@base/tests/fetcher';
import { customRender, screen, waitFor } from '@vue/services/testing/testing';
import { tFetcher } from '@vue/';

function mount(props){
  return customRender({
    components: { tFetcher },
    data(){
      return {
        props
      };
    },
    template: `
      <t-fetcher
        :on-fetch="props.onFetch"
        :on-fetch-success="props.onFetchSuccess"
        :on-fetch-error="props.onFetchError"
        :on-mount="props.onMount"
        :fetch-error-message="props.fetchErrorMessage"
      >
        <p>Content Mock</p>
      </t-fetcher>`
  });
}

run(mount, { screen, waitFor });
