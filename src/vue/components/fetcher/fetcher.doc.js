module.exports = {
  name: 'Fetcher',
  description: 'A wrapper for async data that needs to be fetched.',
  properties: [
    {
      name: ':on-fetch',
      type: '<Promise> Function',
      values: 'Any',
      required: true
    },
    {
      name: ':on-fetch-success',
      type: 'Function',
      values: 'Any'
    },
    {
      name: ':on-fetch-error',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'fetch-error-message',
      type: 'String',
      values: 'Any'
    }
  ],
  examples: [
    {
      title: 'Default Fetcher',
      controller: {
        data(){
          return {
            data: {}
          };
        },
        methods: {
          onFetch(){
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({ greeting: 'Hello!' })
              }, 2000);
            });
          },
          onFetchSuccess(data){
            // onFetchSuccess receives the response sent by the server.
            this.data = data;
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="6">
          <t-card>
            <t-fetcher
              :on-fetch="onFetch"
              :on-fetch-success="onFetchSuccess">
              <span>{{ data.greeting }}</span>
            </t-fetcher>
          </t-card>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Handling fetch error',
      controller: {
        methods: {
          onFetch(){
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise((resolve, reject) => {
              setTimeout(() => reject(), 2000);
            });
          },
          onFetchError(err){
            // onFetchError receives the error sent by the server.
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="6">
          <t-fetcher
            :on-fetch="onFetch"
            :on-fetch-error="onFetchError">
            <span>Content to be shown on fetch success only.</span>
          </t-fetcher>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Custom fetch error message',
      description: 'You can optionally show a custom error message when fetch fails.',
      controller: {
        methods: {
          onFetch(){
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise((resolve, reject) => {
              setTimeout(() => reject(), 2000);
            });
          },
          onFetchError(err){
            // onFetchError receives the error sent by the server.
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="6">
          <t-fetcher
            :on-fetch="onFetch"
            :on-fetch-error="onFetchError"
            fetch-error-message="Ops, we're facing some issues. Please, try again.">
            <span>Content to be shown on fetch success only.</span>
          </t-fetcher>
        </t-col>
      </t-row>
      `
    }
  ]
};
