require 'rails_helper'

feature 'splash page', %Q{
  As a user visiting i will see a splash page when i visit the website
} do
  # Acceptance Criteria
  # * If I'm signed in, I have an option to add a new recipe


  scenario 'unauthenticated user goes root' do
    visit root_path

    expect(page).to have_content('Welcome to My Cookbook')
    expect(page).to have_content('View Recipes')
    expect(page).not_to have_content('Add A New Recipe')

    click_link("View Recipes")
    expect(page).to have_current_path(recipes_path)
  end

  scenario 'authenticated user goes root' do
    user = FactoryBot.create(:user)
    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    visit root_path

    expect(page).to have_content('Welcome to My Cookbook')
    expect(page).to have_content('View Recipes')
    expect(page).to have_content('Add A New Recipe')

  end



end
