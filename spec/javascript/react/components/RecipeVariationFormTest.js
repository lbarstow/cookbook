import RecipeVariationForm from '../../../../app/javascript/react/components/RecipeVariationForm.js'
describe('RecipeVariationForm', () => {
  let wrapper;
  let createDate = "February 8, 2018";
  let string = "pour water into a glass \u000A Add Ice"
  beforeEach(() => {
    wrapper = mount(
      <RecipeVariationForm
        title="Water"
        servings="one glass"
        body={string}
        description="I'm a description"
        source="common knowledge"

      />
    )
  })
  it('has a form element', () => {
    expect(wrapper.find('form').length).toEqual(1)
  })

  it('should have four input tags', () => {
    expect(wrapper.find('input').length).toEqual(4);
  });

  it('should have the title in the first input', () => {
    expect(wrapper.find('input').at(0).node.value).toBe("Water");
    expect(wrapper.find('input').at(0).node.placeholder).toBe("Title");
    expect(wrapper.find('input').at(0).node.name).toBe("title");
  });
  it('should have the serving size in the second input', () => {
    expect(wrapper.find('input').at(1).node.value).toBe("one glass");
    expect(wrapper.find('input').at(1).node.placeholder).toBe("Add Servings Made");
    expect(wrapper.find('input').at(1).node.name).toBe("servings_made");
  });
  it('should have the source in the third input', () => {
    expect(wrapper.find('input').at(2).node.value).toBe("common knowledge");
    expect(wrapper.find('input').at(2).node.placeholder).toBe("Add A Source");
    expect(wrapper.find('input').at(2).node.name).toBe("source");
  });

  it('should have the description in the fourth input', () => {
    expect(wrapper.find('input').at(3).node.value).toBe("I'm a description");
    expect(wrapper.find('input').at(3).node.placeholder).toBe("Add a Description");
    expect(wrapper.find('input').at(3).node.name).toBe("description");
  });

  it('should have the body textarea', () => {
    const bodyParagraph = wrapper.find('textarea').at(0);
    expect(bodyParagraph.text()).toBe("pour water into a glass \u000A Add Ice");
  });

})
