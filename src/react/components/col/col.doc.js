const styles = `
[class*=t-col] p {
  margin: 0;
  padding: 15px;
  background-color: #E1E5FA;
  color: #6772FF;
  border-radius: 3px;
  box-sizing: border-box;
}`;

module.exports = {
  name: 'Column',
  description: 'Element used as immediate child of rows. A row can be divided up to 12 columns.',
  properties: [
    {
      name: 'xs',
      type: 'String, Number',
      values: '1-12'
    },
    {
      name: 'sm',
      type: 'String, Number',
      values: '1-12'
    },
    {
      name: 'md',
      type: 'String, Number',
      values: '1-12'
    },
    {
      name: 'lg',
      type: 'String, Number',
      values: '1-12'
    },
    {
      name: 'offsetXs',
      type: 'String, Number',
      values: '1-11'
    },
    {
      name: 'offsetSm',
      type: 'String, Number',
      values: '1-11'
    },
    {
      name: 'offsetMd',
      type: 'String, Number',
      values: '1-11'
    },
    {
      name: 'offsetLg',
      type: 'String, Number',
      values: '1-11'
    },
    {
      name: 'alignXs',
      type: 'String',
      values: 'center, right'
    },
    {
      name: 'alignSm',
      type: 'String',
      values: 'center, right'
    },
    {
      name: 'alignMd',
      type: 'String',
      values: 'center, right'
    },
    {
      name: 'alignLg',
      type: 'String',
      values: 'center, right'
    }
  ],
  examples: [
    {
      title: 'Default column',
      description: 'The default column behaves like a block covering the total size of a row.',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col>
                <p>Default Column</p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column size',
      description: 'The size of a column block can span from 1 to 12 columns.',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <>
              <Row>
                <Col xs="12"><p>12 cols</p></Col>
              </Row>
              <Row>
                <Col xs="6"><p>6 cols</p></Col>
                <Col xs="6"><p>6 cols</p></Col>
              </Row>
              <Row>
                <Col xs="3"><p>3 cols</p></Col>
                <Col xs="3"><p>3 cols</p></Col>
                <Col xs="3"><p>3 cols</p></Col>
                <Col xs="3"><p>3 cols</p></Col>
              </Row>
            </>
          );
        }
      },
      styles
    },
    {
      title: 'Column size in extra-small [xs] screens',
      description: `Targeting column size to extra-small screens implies in keeping that size on all screen sizes.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col xs="10">
                <p>
                  10 columns in all screens sizes.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column size for small [sm] screens and up',
      description: `You can optionally set a column size targeting only screens >= 768px. In smaller screens, the column behaves like block.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col sm="9">
                <p>
                  9 columns on screens >= 768px only.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column size for medium [md] screens and up',
      description: `You can optionally set a column size targeting only screens >= 992px. In smaller screens, the column behaves like block.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col md="8">
                <p>
                  8 columns on screens >= 992px only.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column size for large [lg] screens and up',
      description: `You can optionally set a column size targeting only screens >= 1200px. In smaller screens, the column behaves like block.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col lg="7">
                <p>
                  7 columns on screens >= 1200px only.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Colum with multiple sizes',
      description: 'One single column can have different sizes in different screen sizes (breakpoints).',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col md="10" lg="8">
                <p>
                  8 columns on large screens (>= 1200px). 10 on medium ones (>= 992px).
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column offset',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <>
              <Row>
                <Col xs="6" offsetXs="6"><p>6 cols offset</p></Col>
              </Row>
              <Row>
                <Col xs="6" offsetXs="3"><p>3 cols offset</p></Col>
              </Row>
              <Row>
                <Col xs="5" offsetXs="2"><p>2 cols offset</p></Col>
                <Col xs="4" offsetXs="1"><p>1 col offset</p></Col>
              </Row>
            </>
          );
        }
      },
      styles
    },
    {
      title: 'Column offset in extra-small [xs] screens',
      description: `Targeting column offset for extra-small screens will apply the offset in all screen sizes.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col xs="10" offsetXs="2">
                <p>
                  2 cols offset in all screens sizes.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column offset in small [sm] screens',
      description: `You can optionally target column offset for screens >= 768px only.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col sm="9" offsetSm="3">
                <p>
                  3 cols offset in screens >= 768px only.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column offset in medium [md] screens',
      description: `You can optionally target column offset for screens >= 992px only.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col md="8" offsetMd="4">
                <p>
                  4 cols offset in screens >= 992px only.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column offset in large [lg] screens',
      description: `You can optionally target column offset for screens >= 1200px only.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col lg="7" offsetLg="5">
                <p>
                  5 cols offset in screens >= 1200px only.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column with multiple offsets',
      description: 'One single column can have different offsets in different screen sizes (breakpoints).',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col md="11" lg="9" offsetMd="1" offsetLg="3">
                <p>
                  3 cols offset on large screens (>= 1200px). 1 col offset on medium ones (>= 992px).
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Colum alignment',
      description: 'The text content of a column can be aligned at left, center or right.',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <>
              <Row>
                <Col>
                  <p>
                    Left alignment
                  </p>
                </Col>
              </Row>
              <Row>
                <Col alignXs="center">
                  <p>
                    Center alignment
                  </p>
                </Col>
              </Row>
              <Row>
                <Col alignXs="right">
                  <p>
                    Right alignment
                  </p>
                </Col>
              </Row>
            </>
          );
        }
      },
      styles
    },
    {
      title: 'Column alignment in extra-small [xs] screens',
      description: `Targeting column alignment to extra-small screens implies in keeping that alignment in all screen sizes.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col alignXs="center">
                <p>
                  Center alignment in all screens sizes.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column alignment in small [sm] screens',
      description: `You can optionally target column alignment for screens >= 768px only.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col alignSm="center">
                <p>
                  Center alignment in screens >= 768px only.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column alignment in medium [md] screens',
      description: `You can optionally target column alignment for screens >= 992px only.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col alignMd="center">
                <p>
                  Center alignment in screens >= 992px only.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column alignment in large [lg] screens',
      description: `You can optionally target column alignment for screens >= 1200px only.`,
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col alignLg="center">
                <p>
                  Center alignment in screens >= 1200px only.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column with multiple alignments',
      description: 'One single column can have different alignments in different screen sizes (breakpoints).',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col alignMd="center" alignLg="right">
                <p>
                Right alignment on large screens (>= 1200px).<br />
                Center alignment on medium screens (>= 992px).<br />
                Left alignment in every screen else.
                </p>
              </Col>
            </Row>
          );
        }
      },
      styles
    },
    {
      title: 'Column nest',
      description: 'Columns can be nested inside other columns. Each nested column must still have a row as immediate parent.',
      controller: function(){
        const { Col, Row } = taslonicReact;

        return function(){
          return (
            <Row>
              <Col xs="6"><p>6 cols</p></Col>
              <Col xs="6">
                <Row>
                  <Col xs="8"><p>8 cols</p></Col>
                  <Col xs="4"><p>4 cols</p></Col>
                </Row>
                <Row>
                  <Col xs="4"><p>4 cols</p></Col>
                  <Col xs="4"><p>4 cols</p></Col>
                  <Col xs="4"><p>4 cols</p></Col>
                </Row>
              </Col>
            </Row>
          );
        }
      },
      styles
    }
  ]
};
