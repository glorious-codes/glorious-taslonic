const styles = `
[class*=t-col] p {
  margin: 0;
  padding: 15px;
  background-color: #E1E5FA;
  color: #6772FF;
  border-radius: 3px;
  box-sizing: border-box;
}`;

const screens = {
  sm: '>= 768px',
  md: '>= 992px',
  lg: '>= 1200px'
};

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
      name: 'offset-xs',
      type: 'String, Number',
      values: '0-11'
    },
    {
      name: 'offset-sm',
      type: 'String, Number',
      values: '0-11'
    },
    {
      name: 'offset-md',
      type: 'String, Number',
      values: '0-11'
    },
    {
      name: 'offset-lg',
      type: 'String, Number',
      values: '0-11'
    },
    {
      name: 'align-xs',
      type: 'String',
      values: 'left, center, right'
    },
    {
      name: 'align-sm',
      type: 'String',
      values: 'left, center, right'
    },
    {
      name: 'align-md',
      type: 'String',
      values: 'left, center, right'
    },
    {
      name: 'align-lg',
      type: 'String',
      values: 'left, center, right'
    }
  ],
  examples: [
    {
      title: 'Default column',
      description: 'The default column behaves like a block covering the total size of a row.',
      template: `
      <t-row>
        <t-col>
          <p>Default Column</p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column size',
      description: 'The size of a column block can span from 1 to 12 columns.',
      template: `
      <div>
        <t-row>
          <t-col xs="12"><p>12 cols</p></t-col>
        </t-row>
        <t-row>
          <t-col xs="6"><p>6 cols</p></t-col>
          <t-col xs="6"><p>6 cols</p></t-col>
        </t-row>
        <t-row>
          <t-col xs="3"><p>3 cols</p></t-col>
          <t-col xs="3"><p>3 cols</p></t-col>
          <t-col xs="3"><p>3 cols</p></t-col>
          <t-col xs="3"><p>3 cols</p></t-col>
        </t-row>
      </div>
      `,
      styles
    },
    {
      title: 'Column size in extra-small [xs] screens',
      description: `Targeting column size to extra-small screens implies in keeping that size on all screen sizes.`,
      template: `
      <t-row>
        <t-col xs="10">
          <p>
            10 columns in all screens sizes.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column size for small [sm] screens and up',
      description: `You can optionally set a column size targeting only screens ${screens.sm}. In smaller screens, the column behaves like block.`,
      template: `
      <t-row>
        <t-col sm="9">
          <p>
            9 columns on screens ${screens.sm} only.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column size for medium [md] screens and up',
      description: `You can optionally set a column size targeting only screens ${screens.md}. In smaller screens, the column behaves like block.`,
      template: `
      <t-row>
        <t-col md="8">
          <p>
            8 columns on screens ${screens.md} only.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column size for large [lg] screens and up',
      description: `You can optionally set a column size targeting only screens ${screens.lg}. In smaller screens, the column behaves like block.`,
      template: `
      <t-row>
        <t-col lg="7">
          <p>
            7 columns on screens ${screens.lg} only.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Colum with multiple sizes',
      description: 'One single column can have different sizes in different screen sizes (breakpoints).',
      template: `
      <t-row>
        <t-col md="10" lg="8">
          <p>
            8 columns on large screens (${screens.lg}). 10 on medium ones (${screens.md}).
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column offset',
      template:`
      <div>
        <t-row>
          <t-col xs="6" offset-xs="6"><p>6 cols offset</p></t-col>
        </t-row>
        <t-row>
          <t-col xs="6" offset-xs="3"><p>3 cols offset</p></t-col>
        </t-row>
        <t-row>
          <t-col xs="5" offset-xs="2"><p>2 cols offset</p></t-col>
          <t-col xs="4" offset-xs="1"><p>1 col offset</p></t-col>
        </t-row>
      </div>
      `,
      styles
    },
    {
      title: 'Column offset in extra-small [xs] screens',
      description: `Targeting column offset for extra-small screens will apply the offset in all screen sizes.`,
      template: `
      <t-row>
        <t-col xs="10" offset-xs="2">
          <p>
            2 cols offset in all screens sizes.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column offset in small [sm] screens',
      description: `You can optionally target column offset for screens ${screens.sm} only.`,
      template: `
      <t-row>
        <t-col sm="9" offset-sm="3">
          <p>
            3 cols offset in screens ${screens.sm} only.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column offset in medium [md] screens',
      description: `You can optionally target column offset for screens ${screens.md} only.`,
      template: `
      <t-row>
        <t-col md="8" offset-md="4">
          <p>
            4 cols offset in screens ${screens.md} only.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column offset in large [lg] screens',
      description: `You can optionally target column offset for screens ${screens.lg} only.`,
      template: `
      <t-row>
        <t-col lg="7" offset-lg="5">
          <p>
            5 cols offset in screens ${screens.lg} only.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column with multiple offsets',
      description: 'One single column can have different offsets in different screen sizes (breakpoints).',
      template: `
      <t-row>
        <t-col md="11" lg="9" offset-md="1" offset-lg="3">
          <p>
            3 cols offset on large screens (${screens.lg}). 1 col offset on medium ones (${screens.md}).
          </p>
        </t-col>
      </t-row>
      `,
    },
    {
      title: 'Colum alignment',
      description: 'The text content of a column can be aligned at left, center or right.',
      template: `
      <div>
        <t-row>
          <t-col>
            <p>
              Left alignment
            </p>
          </t-col>
        </t-row>
        <t-row>
          <t-col align-xs="center">
            <p>
              Center alignment
            </p>
          </t-col>
        </t-row>
        <t-row>
          <t-col align-xs="right">
            <p>
              Right alignment
            </p>
          </t-col>
        </t-row>
      </div>
      `,
    },
    {
      title: 'Column alignment in extra-small [xs] screens',
      description: `Targeting column alignment to extra-small screens implies in keeping that alignment in all screen sizes.`,
      template: `
      <t-row>
        <t-col align-xs="center">
          <p>
            Center alignment in all screens sizes.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column alignment in small [sm] screens',
      description: `You can optionally target column alignment for screens ${screens.sm} only.`,
      template: `
      <t-row>
        <t-col align-sm="center">
          <p>
            Center alignment in screens ${screens.sm} only.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column alignment in medium [md] screens',
      description: `You can optionally target column alignment for screens ${screens.md} only.`,
      template: `
      <t-row>
        <t-col align-md="center">
          <p>
            Center alignment in screens ${screens.md} only.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column alignment in large [lg] screens',
      description: `You can optionally target column alignment for screens ${screens.lg} only.`,
      template: `
      <t-row>
        <t-col align-lg="center">
          <p>
            Center alignment in screens ${screens.lg} only.
          </p>
        </t-col>
      </t-row>
      `,
      styles
    },
    {
      title: 'Column with multiple alignments',
      description: 'One single column can have different alignments in different screen sizes (breakpoints).',
      template: `
      <t-row>
        <t-col align-md="center" align-lg="right">
          <p>
            Right alignment on large screens (${screens.lg}).<br />
            Center alignment on medium screens (${screens.md}).<br />
            Left alignment in every screen else.
          </p>
        </t-col>
      </t-row>
      `,
    },
    {
      title: 'Column nest',
      description: 'Columns can be nested inside other columns. Each nested column must still have a row as immediate parent.',
      template: `
      <t-row>
        <t-col xs="6"><p>6 cols</p></t-col>
        <t-col xs="6">
          <t-row>
            <t-col xs="8"><p>8 cols</p></t-col>
            <t-col xs="4"><p>4 cols</p></t-col>
          </t-row>
          <t-row>
            <t-col xs="4"><p>4 cols</p></t-col>
            <t-col xs="4"><p>4 cols</p></t-col>
            <t-col xs="4"><p>4 cols</p></t-col>
          </t-row>
        </t-col>
      </t-row>
      `,
      styles
    }
  ]
};
