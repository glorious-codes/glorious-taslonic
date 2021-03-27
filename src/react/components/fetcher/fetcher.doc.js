module.exports = {
  name: 'Fetcher',
  description: 'A wrapper for async data that needs to be fetched.',
  properties: [
    {
      name: 'onFetch',
      type: '<Promise> Function',
      values: 'Any',
      required: true
    },
    {
      name: 'onFetchSuccess',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'onFetchError',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'onMount',
      type: 'Function',
      values: 'Any'
    },
    {
      name: 'fetchErrorMessage',
      type: 'String',
      values: 'Any'
    }
  ],
  examples: [
    {
      title: 'Default Fetcher',
      controller: function(){
        const { useState } = React;
        const { Col, Row, Card, Fetcher } = taslonicReact;

        return function(){
          const [data, setData] = useState({});
          const onFetch = () => {
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise(resolve => {
              setTimeout(() => {
                resolve({ greeting: 'Hello!' })
              }, 2000);
            });
          }
          const onFetchSuccess = data => {
            // onFetchSuccess receives the response sent by the server.
            setData(data);
          }

          return (
            <Row align="center">
              <Col md="6">
                <Card>
                  <Fetcher
                    onFetch={onFetch}
                    onFetchSuccess={onFetchSuccess}
                  >
                    <span>{ data.greeting }</span>
                  </Fetcher>
                </Card>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Handling fetch error',
      controller: function(){
        const { Col, Row, Fetcher } = taslonicReact;

        return function(){
          const onFetch = () => {
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise((resolve, reject) => {
              setTimeout(() => reject(), 2000);
            });
          }
          const onFetchError = err => {
            // onFetchError receives the error sent by the server.
          }

          return (
            <Row align="center">
              <Col md="6">
                <Fetcher onFetch={onFetch} onFetchError={onFetchError}>
                  <span>Content to be shown on fetch success only.</span>
                </Fetcher>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Custom fetch error message',
      description: 'You can optionally show a custom error message when fetch fails.',
      controller: function(){
        const { Col, Row, Fetcher } = taslonicReact;

        return function(){
          const onFetch = () => {
            // Here's a request simulation.
            // onFetch must return a Promise.
            return new Promise((resolve, reject) => {
              setTimeout(() => reject(), 2000);
            });
          }
          const onFetchError = err => {
            // onFetchError receives the error sent by the server.
          }

          return (
            <Row align="center">
              <Col md="6">
                <Fetcher
                  onFetch={onFetch}
                  onFetchError={onFetchError}
                  fetchErrorMessage="Ops, we're facing some issues. Please, try again."
                >
                  <span>Content to be shown on fetch success only.</span>
                </Fetcher>
              </Col>
            </Row>
          )
        }
      }
    },
    {
      title: 'Fetching programmatically',
      description: 'You can receive the fetcher instance to re-fetch data when your context changes.',
      controller: function(){
        const { useState, useEffect } = React;
        const { Col, Row, Card, Fetcher, Field, Select } = taslonicReact;

        return function(){
          const [artists, setArtists] = useState([]);
          const [selectedArtist, setSelectedArtist] = useState({});
          const [selectedArtistId, setSelectedArtistId] = useState('');
          const [fetcher, setFetcher] = useState();
          const onFetchArtists = () => {
            return axios.get(`external/dist/data/artists.json`);
          }
          const onFetchArtistsSuccess = ({ data }) => setArtists(data);
          const onFetcherMount = fetcher => setFetcher(fetcher);
          const onFetch = () => {
            if(selectedArtistId) {
              return axios.get(`external/dist/data/${selectedArtistId}.json`);
            }
          }
          const onFetchSuccess = ({ data }) => setSelectedArtist(data);
          const onArtistChange = ({ target: { value } }) => {
            setSelectedArtistId(value);
          }

          useEffect(() => {
            if(selectedArtistId) fetcher.fetch();
          }, [selectedArtistId])

          return (
            <Fetcher
              onFetch={onFetchArtists}
              onFetchSuccess={onFetchArtistsSuccess}>
              <Row align="center">
                <Col sm="5">
                  <Field label="Brazilian Artist" block>
                    <Select
                      name="artist"
                      placeholder="Select"
                      onChange={onArtistChange}
                      block>
                      {
                        artists.map(artist => (
                          <option value={artist.id} key={artist.id}>
                            {artist.name}
                          </option>
                        ))
                      }
                    </Select>
                  </Field>
                </Col>
              </Row>
              <Row align="center" style={{ display: selectedArtistId ? 'flex': 'none' }}>
                <Col sm="5">
                  <Card>
                    <Fetcher
                      onFetch={onFetch}
                      onMount={onFetcherMount}
                      onFetchSuccess={onFetchSuccess}>
                      <div className="artist-card-content">
                        {
                          selectedArtist.avatarUrl &&
                          <img
                            src={`external/dist/${selectedArtist.avatarUrl}`}
                            alt={`${selectedArtist.name}'s avatar`}
                            width="100px"
                            height="100px" />
                        }
                        <h1>{selectedArtist.name}</h1>
                        <div className="artist-card-content-profession">
                          {selectedArtist.profession}
                        </div>
                        {
                          selectedArtist.intro &&
                          <p>
                            {`${selectedArtist.intro.substring(0, 270)}...`}
                          </p>
                        }
                        <a
                          href={selectedArtist.source}
                          rel="noreferrer"
                          target="_blank">
                          Learn More
                        </a>
                      </div>
                    </Fetcher>
                  </Card>
                </Col>
              </Row>
            </Fetcher>
          )
        }
      },
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
    }
  ]
};
