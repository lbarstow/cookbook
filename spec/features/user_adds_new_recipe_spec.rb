require 'rails_helper'

feature 'user signs in', %Q{
  As a signed up user
  I want to be able to add a new recipe
} do
  scenario 'unauthenticated user cannot add recipe' do
    visit new_recipe_path
    expect(page).not_to have_current_path(new_recipe_path)
    expect(page).to have_current_path(new_user_session_path)
    expect(page).to have_content("You need to sign in or sign up before continuing.")
  end

  scenario 'authenticated user can add recipe' do
    user = FactoryBot.create(:user)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    visit new_recipe_path
    expect(page).to have_current_path(new_recipe_path)

    expect(page).to have_button("Submit")
  end

end
