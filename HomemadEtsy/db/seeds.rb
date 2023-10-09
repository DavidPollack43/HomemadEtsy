# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
    puts "Destroying users..."
    User.destroy_all

    puts "Resetting primary keys for users..."
    ApplicationRecord.connection.reset_pk_sequence!('users')

    puts "Creating users..."
    User.create!(
        username: "HomemadEtsyDemoUser",
        email: 'homemadEtsy@user.io',
        password: 'password'
    )

    10.times do 
        User.create!({
            username: Faker::Internet.unique.username(specifier: 3..20),
            email: Faker::Internet.unique.email,
            password: 'password'
        })
    end

    puts "Done!"
end