import VariationTab from '../../../../app/javascript/react/components/VariationTab.js'

describe('VariationTab', () => {
  let wrapper;
  let testFunc = ()=>{
    return 4;
  }
  beforeEach(() => {
    wrapper = mount(
      <VariationTab
        id={2}
        onClick={testFunc}
        isSelected={true}
        title="Banana Bread"
      />
    )
  })

  it('should have an div with the recipe title as text', () => {
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div').text()).toBe("Banana Bread");
  });

  it('the div should have an id of 2', () => {
    expect(wrapper.props().id).toEqual(2);
  });

  it('should have an a selected class', () => {
    const wrapperDiv = wrapper.find('div');
    expect(wrapperDiv.hasClass("selected")).toEqual(true);
  });
  it('should have an div with the recipe title as text', () => {
    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div').text()).toBe("Banana Bread");
  });
})
