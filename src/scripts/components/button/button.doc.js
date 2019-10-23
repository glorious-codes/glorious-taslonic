module.exports = {
  name: 'Button',
  description: 'Abstraction of a native button.',
  attributes: [
    {
      name: 'display',
      type: 'String',
      values: 'block'
    },
    {
      name: 'theme',
      type: 'String',
      values: 'primary, secondary, danger'
    }
  ],
  methods: [
    {
      name: 'onClick (clickFn)',
      params: [
        {
          name: 'clickFn',
          type: 'Function',
          description: 'Function to be called on button click.',
          required: true
        }
      ]
    }
  ],
  examples: [
    {
      title: 'Default Button',
      template: `
        <tas-button>
          Default Button
        </tas-button>`
    },
    {
      title: 'Block Button',
      template: `
        <tas-button data-display="block">
          Block Button
        </tas-button>`
    },
    {
      title: 'Themed Button',
      template: `
        <tas-row>
          <tas-col data-size="4">
            <tas-button data-theme="primary" data-display="block">
              Primary Button
            </tas-button>
          </tas-col>
          <tas-col data-size="4">
            <tas-button data-theme="secondary" data-display="block">
              Secondary Button
            </tas-button>
          </tas-col>
          <tas-col data-size="4">
            <tas-button data-theme="danger" data-display="block">
              Danger Button
            </tas-button>
          </tas-col>
        </tas-row>`
    },
    {
      title: 'Button with a click listener',
      controller: function(element){
        let numberOfClicks;

        function init(){
          setNumberOfClicks(0);
          configButtonClickListener();
        }

        function configButtonClickListener(){
          const button = element.querySelector('tas-button');
          button.onClick(onButtonClick);
        }

        function onButtonClick(){
          setNumberOfClicks(++numberOfClicks);
          updateCounterElement(numberOfClicks);
        }

        function setNumberOfClicks(clicks){
          numberOfClicks = clicks;
        }

        function updateCounterElement(){
          const counter = element.querySelector('[data-counter]');
          counter.innerHTML = `Number of clicks: ${numberOfClicks}`;
        }

        init();
      },
      template: `
        <tas-row>
          <tas-col data-size="12">
            <tas-button>
              Click Here
            </tas-button>
          </tas-col>
        </tas-row>
        <tas-row>
          <tas-col data-size="12">
            <span data-counter></span>
          </tas-col>
        </tas-row>`
    }
  ]
};
