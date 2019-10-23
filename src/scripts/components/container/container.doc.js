const styles = `
.tas-container p {
  padding: 20px 0;
  text-align: center;
  border: 1px dashed #D6D6D6;
  border-radius: 6px;
}
`;

module.exports = {
  name: 'Container',
  description: 'A general container to set the widest limit for some content.',
  examples: [
    {
      title: 'Default Container',
      template: `
      <tas-container>
        <p>This content stretches up to 1200px.</p>
      </tas-container>`,
      styles
    }
  ],
};
