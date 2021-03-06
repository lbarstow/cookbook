require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to be able to add a new recipe
  unauthenticated users should not be able to add recipes
} do
  scenario 'unauthenticated user cannot add recipe' do
    visit new_recipe_path
    expect(page).not_to have_current_path(new_recipe_path)
    expect(page).to have_current_path(new_user_session_path)
    expect(page).to have_content("You need to sign in or sign up before continuing.")
  end

  scenario 'authenticated user can add recipe with title and body' do
    user = FactoryBot.create(:user)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    visit new_recipe_path
    expect(page).to have_current_path(new_recipe_path)
    expect(page).to have_selector('form', count: 1)
    expect(page).to have_selector('textarea', count: 1)
    expect(page).to have_field('recipe_title')
    expect(page).to have_field('recipe_source')
    expect(page).to have_field('recipe_servings_made')
    expect(page).to have_field('recipe_description')
    expect(page).to have_button("Submit")
    expect(page).not_to have_content("Title can't be blank")
    expect(page).not_to have_content("Body can't be blank")

    fill_in 'Title', with: "My Recipe"
    fill_in 'Ingredients and Steps', with: "Recipe Body"
    click_button("Submit")
    expect(page).not_to have_current_path(new_recipe_path)
    expect(page).to have_content("Your recipe has been added.")

  end

  scenario 'unsuccessfully add recipe' do
    user = FactoryBot.create(:user)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    visit new_recipe_path

    click_button("Submit")
    expect(page).to have_selector('form', count: 1)
    expect(page).to have_content("Title can't be blank")
    expect(page).to have_content("Body can't be blank")
    fill_in 'Title', with: "My Recipe"
    click_button("Submit")
    expect(page).to have_selector('form', count: 1)
    expect(page).not_to have_content("Title can't be blank")
    expect(page).to have_content("Body can't be blank")

  end



end
