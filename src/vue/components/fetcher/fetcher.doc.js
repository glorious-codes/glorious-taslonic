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
      name: ':on-mount',
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
    },
    {
      title: 'Fetching programmatically',
      description: 'You can receive the fetcher instance to re-fetch data when your context changes.',
      controller: {
        data(){
          return {
            artists: [],
            selectedArtist: {},
            fetcher: null,
            selectedArtistId: ''
          };
        },
        methods: {
          onFetchArtists(){
            return axios.get(`external/dist/data/artists.json`);
          },
          onFetchArtistsSuccess({ data }){
            this.artists = data;
          },
          onFetch(){
            if(this.selectedArtistId) return axios.get(`external/dist/data/${this.selectedArtistId}.json`);
          },
          onFetcherMount(fetcher){
            this.fetcher = fetcher;
          },
          onFetchSuccess({ data }){
            this.selectedArtist = data;
          },
          onArtistChange(){
            if(this.selectedArtistId) this.fetcher.fetch();
          },
          buildFullAvatarUrl(url){
            return url ? `external/dist/${url}` : '';
          },
          buildAvatarAltText(artistName){
            return `${artistName}'s avatar`;
          },
          parseIntro(intro){
            return intro ? `${intro.substring(0, 270)}...` : '';
          }
        }
      },
      template: `
      <t-fetcher
        :on-fetch="onFetchArtists"
        :on-fetch-success="onFetchArtistsSuccess">
        <t-row align="center">
          <t-col sm="5">
            <t-field label="Brazilian Artist" block>
              <t-select
                v-model="selectedArtistId"
                placeholder="Select"
                @change="onArtistChange"
                block>
                <option v-for="artist in artists" :value="artist.id">
                  {{ artist.name }}
                </option>
              </t-select>
            </t-field>
          </t-col>
        </t-row>
        <t-row align="center" v-show="selectedArtistId">
          <t-col sm="5">
            <t-card>
              <t-fetcher
                :on-fetch="onFetch"
                :on-mount="onFetcherMount"
                :on-fetch-success="onFetchSuccess">
                <div class="artist-card-content">
                  <img
                    :src="buildFullAvatarUrl(selectedArtist.avatarUrl)"
                    :alt="buildAvatarAltText(selectedArtist.name)"
                    width="100px"
                    height="100px" />
                  <h1>{{selectedArtist.name}}</h1>
                  <div class="artist-card-content-profession">
                    {{selectedArtist.profession}}
                  </div>
                  <p>{{ parseIntro(selectedArtist.intro) }}</p>
                  <a :href="selectedArtist.source" rel="noreferrer" target="_blank">
                    Learn More
                  </a>
                </div>
              </t-fetcher>
            </t-card>
          </t-col>
        </t-row>
      </t-fetcher>
      `,
      styles: `
      .artist-card-content {
        padding: 20px 0;
        text-align: center;
      }

      .artist-card-content img {
        width: 100px;
        border-radius: 50px;
        overflow: hidden;
      }

      .artist-card-content h1 {
        margin: 0;
        letter-spacing: -1px;
      }

      .artist-card-content-profession {
        margin-bottom: 10px;
        color: #C4CDD5;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
      }

      .artist-card-content a {
        display: block;
        font-size: 14px;
        color: #627380;
        text-decoration: none;
      }

      .artist-card-content a:hover,
      .artist-card-content a:focus,
      .artist-card-content a:active {
        color: #3282E1;
        text-decoration: underline;
      }
`
    },

  ]
};
