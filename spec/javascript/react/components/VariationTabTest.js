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

  it('should have five spans', () => {
    expect(wrapper.find('span').length).toEqual(5)
  });

  it('should have an a source span', () => {
    expect(wrapper.find('span').at(0).text()).toBe("From: common knowledge");
  });

  it('should have an a make servings span', () => {
    expect(wrapper.find('span').at(1).text()).toBe("Makes: one glass");
  });

  it('the last span contains author and date', () => {
    expect(wrapper.find('span').last().text()).toBe(`Added on ${createDate} by Laura`);
  });

  it('should have two p tags', () => {
    expect(wrapper.find('p').length).toEqual(2);
  });

  it('should have the description in the first paragraph', () => {
    expect(wrapper.find('p').at(0).text()).toBe("Description: I'm a description");
  });

  it('should have the body in the last paragraph', () => {
    const bodyParagraph = wrapper.find('p').at(1);
    expect(bodyParagraph.find('span').at(0).text()).toBe("pour water into a glass ");
    expect(bodyParagraph.find('span').at(1).text()).toBe(" Add Ice");
  });

})
