import RecipeShowPane from '../../../../app/javascript/react/components/RecipeShowPane.js'

describe('RecipeShowPane', () => {
  let wrapper;
  let createDate = "February 8, 2018";
  let string = "pour water into a glass \u000A Add Ice"
  beforeEach(() => {
    wrapper = mount(
      <RecipeShowPane
        title="Water"
        servings="one glass"
        body={string}
        description="I'm a description"
        source="common knowledge"
        date={createDate}
        author="Laura"
      />
    )
  })

  it('should have an a title header', () => {
    expect(wrapper.find('h4').length).toEqual(1);
    expect(wrapper.find('h4').text()).toBe("Water");
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
