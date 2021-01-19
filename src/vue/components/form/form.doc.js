module.exports = {
  name: 'Form',
  description: 'Abstration of a native form.',
  properties: [
    {
      name: ':on-submit',
      type: '<Promise> Function',
      values: 'Any',
      required: true
    },
    {
      name: ':on-submit-success',
      type: 'Function',
      values: 'Any'
    },
    {
      name: ':on-submit-error',
      type: 'Function',
      values: 'Any'
    },
    {
      name: ':on-fetch',
      type: '<Promise> Function',
      values: 'Any'
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
      name: 'submit-success-message',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'submit-success-title',
      type: 'String',
      values: 'Any'
    },
    {
      name: 'submit-error-message',
      type: 'String',
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
      title: 'Default Form',
      controller: {
        data(){
          return {
            data: {}
          };
        },
        methods: {
          onSubmit(){
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise(resolve => setTimeout(() => resolve({ status: 'OK' }), 2000));
          },
          onSubmitSuccess(response){
            // onSubmitSuccess receives the response sent by the server.
            this.data = { name: '', surname: '' }
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="4">
          <t-form
            :on-submit="onSubmit"
            :on-submit-success="onSubmitSuccess"
            submit-success-title="Good job!"
            submit-success-message="Form successfully sent.">
            <t-row>
              <t-col>
                <t-field label="Name" block>
                  <t-input v-model="data.name" block required />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-field label="Surname" block>
                  <t-input v-model="data.surname" block />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-button type="submit" theme="primary" block>
                  Send
                </t-button>
              </t-col>
            </t-row>
          </t-form>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Handling with submit sucess',
      description: 'By default, submit success fires a toast. You can optionally set a custom submit feedback by not passing a submit success message.',
      controller: {
        data(){
          return {
            data: {},
            isSuccessBannerVisible: false
          };
        },
        methods: {
          onSubmit(){
            this.setSuccessBannerVisibility(false);
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise(resolve => setTimeout(() => {
              resolve({ statusCode: 200 });
            }, 2000));
          },
          onSubmitSuccess(response){
            // onSubmitSuccess receives the response sent by the server.
            this.setSuccessBannerVisibility(true);
          },
          setSuccessBannerVisibility(isVisible){
            this.isSuccessBannerVisible = isVisible;
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="4">
          <t-form
            :on-submit="onSubmit"
            :on-submit-success="onSubmitSuccess">
            <t-row v-if="isSuccessBannerVisible">
              <t-col>
                <t-banner theme="success" :on-close="() => setSuccessBannerVisibility(false)">
                  Form successfully sent!
                </t-banner>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-field label="Name" block>
                  <t-input v-model="data.name" block required />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-field label="Surname" block>
                  <t-input v-model="data.surname" block />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-button type="submit" theme="primary" block>
                  Send
                </t-button>
              </t-col>
            </t-row>
          </t-form>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Handling with submit error',
      description: 'You can optionally set a submit error message.',
      controller: {
        data(){
          return {
            data: {}
          };
        },
        methods: {
          onSubmit(){
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise((resolve, reject) => setTimeout(() => {
              reject({ statusCode: 503 })
            }, 2000));
          },
          onSubmitError(err){
            // onSubmitError receives the error sent by the server.
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="4">
          <t-form
            :on-submit="onSubmit"
            :on-submit-error="onSubmitError"
            submit-error-message="Sorry, we could not reach the server. Please try again.">
            <t-row>
              <t-col>
                <t-field label="Name" block>
                  <t-input v-model="data.name" block required />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-field label="Surname" block>
                  <t-input v-model="data.surname" block />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-button type="submit" theme="primary" block>
                  Send
                </t-button>
              </t-col>
            </t-row>
          </t-form>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Handling with fetch success',
      description: 'For the cases in which form is editing an existing resource, you can fetch it using the fetch properties.',
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
              setTimeout(() => resolve({
                data: {
                  name: 'John',
                  surname: 'Duo'
                }
              }), 2000);
            });
          },
          onFetchSuccess({ data }){
            // onFetchSuccess receives the response sent by the server.
            this.data = data
          },
          onSubmit(){
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise(resolve => setTimeout(() => resolve({ statusCode: 200 }), 2000));
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="4">
          <t-form
            :on-fetch="onFetch"
            :on-fetch-success="onFetchSuccess"
            :on-submit="onSubmit"
            submit-success-title="Good job!"
            submit-success-message="Form successfully sent.">
            <t-row>
              <t-col>
                <t-field label="Name" block>
                  <t-input v-model="data.name" block required />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-field label="Surname" block>
                  <t-input v-model="data.surname" block />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-button type="submit" theme="primary" block>
                  Send
                </t-button>
              </t-col>
            </t-row>
          </t-form>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Handling with fetch error',
      description: 'You can optionally set a fetch error message.',
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
            return new Promise((resolve, reject) => setTimeout(() => {
              reject({ some: 'err' })
            }, 2000));
          },
          onFetchError(err){
            // onFetchError receives the error sent by the server.
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="4">
          <t-form
            :on-fetch="onFetch"
            :on-fetch-error="onFetchError"
            fetch-error-message="We had some trouble fetching data. Please try again.">
            <t-row>
              <t-col>
                <t-field label="Name" block>
                  <t-input v-model="data.name" block required />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-field label="Surname" block>
                  <t-input v-model="data.surname" block />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-button type="submit" theme="primary" block>
                  Send
                </t-button>
              </t-col>
            </t-row>
          </t-form>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Handling dynamic Form Controls',
      description: 'When a form control is removed from a form, its validation errors are automatically cleared.',
      controller: {
        data(){
          return {
            data: {},
            shouldOmitSurname: false,
            validations: [{
              isValid(value){
                return value.length >= 3;
              },
              errorMessage: 'Surname must be at least 3 chars long.'
            }]
          };
        },
        methods: {
          onSubmit(){
            // Here's a request simulation.
            // onSubmit must return a Promise.
            return new Promise(resolve => setTimeout(() => resolve({ status: 'OK' }), 2000));
          },
          onSubmitSuccess(response){
            // onSubmitSuccess receives the response sent by the server.
            this.data = { name: '', surname: '' }
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="4">
          <t-form
            :on-submit="onSubmit"
            :on-submit-success="onSubmitSuccess"
            submit-success-title="Good job!"
            submit-success-message="Form successfully sent.">
            <t-row>
              <t-col>
                <t-field label="Name" block>
                  <t-input v-model="data.name" block required />
                </t-field>
              </t-col>
            </t-row>
            <t-row v-if="!shouldOmitSurname">
              <t-col>
                <t-field label="Surname" block>
                  <t-input v-model="data.surname" :validations="validations" block required />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <input type="checkbox" v-model="shouldOmitSurname" id="surname-omission" />
                <label for="surname-omission">Omit surname</label>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-button type="submit" theme="primary" block>
                  Send
                </t-button>
              </t-col>
            </t-row>
          </t-form>
        </t-col>
      </t-row>
      `
    },
    {
      title: 'Handling very specific validations',
      description: 'If submit listener does not return a Promise, nothing is gonna happen. So you can put very specific validations in there.',
      controller: {
        data(){
          return {
            data: {},
            banner: null
          };
        },
        methods: {
          onSubmit(){
            const errors = this.getFormErros();
            if(errors.length) {
              this.setBanner({ theme: 'danger', message: errors[0] })
            } else {
              // Make the request and returns its Promise.
            }
          },
          getFormErros(){
            const errors = [];
            if(this.isLateSubmission()) errors.push(this.buildLateSubmissionErrorMessage())
            return errors;
          },
          isLateSubmission(){
            // Forcing an invalid situation for documentation purposes.
            return new Date().getTime() > this.buildYesterdayDate().getTime();
          },
          buildLateSubmissionErrorMessage(){
            const [weekDay, day, month, year] = this.buildYesterdayDate().toUTCString().split(' ');
            const dateString = [weekDay, day, month, year].join(' ');
            return `Sorry, we have stopped accepting submissions on ${dateString}.`
          },
          buildYesterdayDate(){
            return new Date(new Date().getTime() - 86400000);
          },
          setBanner(banner){
            this.banner = banner;
          }
        }
      },
      template: `
      <t-row align="center">
        <t-col md="4">
          <t-form :on-submit="onSubmit">
            <t-row v-if="banner">
              <t-col>
                <t-banner :theme="banner.theme" :on-close="() => setBanner(null)">
                  {{ banner.message }}
                </t-banner>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-field label="Name" block>
                  <t-input v-model="data.name" block required />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-field label="Surname" block>
                  <t-input v-model="data.surname" block />
                </t-field>
              </t-col>
            </t-row>
            <t-row>
              <t-col>
                <t-button type="submit" theme="primary" block>
                  Send
                </t-button>
              </t-col>
            </t-row>
          </t-form>
        </t-col>
      </t-row>
      `
    }
  ]
};
