import { CLOSE_BUTTON_ARIA_LABEL } from '@base/constants/banner';
import { TRIGGER_TEXT } from '@base/constants/fetcher';
import { tBanner } from '@vue/components/banner/banner';
import { tLoader } from '@vue/components/loader/loader';
import fetcherService from '@base/services/fetcher/fetcher';
import template from './fetcher.html';

export const tFetcher = {
  name: 't-fetcher',
  components: { tBanner, tLoader },
  props: [
    'onFetch',
    'onFetchSuccess',
    'onFetchError',
    'onMount',
    'fetchErrorMessage'
  ],
  data(){
    return {
      fetcher: null,
      fetchStatus: {},
      banner: null,
      closeButtonAriaLabel: CLOSE_BUTTON_ARIA_LABEL,
      triggerText: TRIGGER_TEXT
    };
  },
  created(){
    const fetcher = fetcherService.build({
      onFetch: () => this.handleCallbackProp(this.onFetch),
      onFetchSuccess: response => this.handleCallbackProp(this.onFetchSuccess, response),
      onFetchError: err => this.handleFetchError(this.onFetchError, err),
      onProcessChange: this.handleProccess
    });
    this.setFetcher(fetcher);
    this.handleCallbackProp(this.onMount, fetcher);
    fetcher.init();
  },
  methods: {
    handleProccess({ isFetching, fetchFailed, fetchSucceeded }){
      this.setFetchStatus({ isFetching, fetchFailed, fetchSucceeded });
    },
    handleFetchError(callback, err){
      this.setBanner({ onTriggerClick: () => this.fetcher.fetch() });
      this.handleCallbackProp(callback, err);
    },
    handleCallbackProp(callback, data){
      return callback && callback(data);
    },
    setFetcher(fetcher){
      this.fetcher = fetcher;
    },
    setFetchStatus({ isFetching, fetchFailed, fetchSucceeded }){
      this.fetchStatus = { isFetching, fetchFailed, fetchSucceeded };
    },
    setBanner(banner){
      this.banner = banner;
    }
  },
  computed: {
    classes(){
      const { isFetching, fetchFailed } = this.fetchStatus;
      return fetcherService.buildCssClasses({ isFetching, fetchFailed });
    },
    isBusy(){
      return this.fetchStatus.isFetching ? 'true' : 'false';
    },
    bannerMessage(){
      return this.fetchErrorMessage || fetcherService.getMessage('FETCH_ERROR_MESSAGE');
    }
  },
  template
};
