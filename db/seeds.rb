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

    puts "Destorying products..."
    Product.destroy_all

    puts "Resetting primary keys for products..."
    ApplicationRecord.connection.reset_pk_sequence!('products')

    puts "Destorying Categories ..."
    Category.destroy_all

    puts "Resetting primary keys for categories..."
    ApplicationRecord.connection.reset_pk_sequence!("categories")

    puts "Creating users..."
    User.create!(
        username: 'Demo-lition', 
        email: 'demo@user.io', 
        password: 'password'
    )

    15.times do 
        User.create!({
            username: Faker::Internet.unique.username(specifier: 3..20),
            email: Faker::Internet.unique.email,
            password: 'password'
        })
    end

    categories = [
        { name: "Jewlery & Accessories" },
        { name: "Clothing & Shoes" },
        { name: "Home & Living" },
        { name: "Wedding & Party" },
        { name: "Craft Supplies" }
    ]

    categories.each do |category|
        Category.create!(category)
      end
      
    puts "#{Category.count} categories created!"

    puts "Seeding products ..."

    products = [
        # Jewlery & Accessories
        { title: "Silver Diamond Ring", description: "A stunning silver ring with a brilliant diamond centerpiece.", price: 150.00, stock_quantity: 5, user_id: 1, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Gold Earrings", description: "Elegant gold earrings perfect for any occasion.", price: 70.00, stock_quantity: 8, user_id: 2, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Leather Bracelet", description: "Handmade leather bracelet with intricate design.", price: 30.00, stock_quantity: 15, user_id: 3, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Emerald Pendant Necklace", description: "Elegant necklace featuring a luminous emerald pendant.", price: 90.00, stock_quantity: 10, user_id: 4, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Rose Gold Watch", description: "Stylish rose gold watch with a minimalist design.", price: 120.00, stock_quantity: 7, user_id: 5, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Crystal Drop Earrings", description: "Dangling earrings with beautiful crystal drops.", price: 60.00, stock_quantity: 12, user_id: 6, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Pearl Bracelet", description: "Classic pearl bracelet, perfect for formal occasions.", price: 50.00, stock_quantity: 20, user_id: 7, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Sapphire Brooch", description: "Stunning brooch with a sapphire centerpiece.", price: 85.00, stock_quantity: 6, user_id: 8, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Locket Necklace", description: "Vintage-style locket to keep your memories close to your heart.", price: 55.00, stock_quantity: 15, user_id: 8, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Cufflinks", description: "Elegant cufflinks for a refined look.", price: 45.00, stock_quantity: 18, user_id: 9, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Beaded Anklet", description: "Chic anklet adorned with colorful beads.", price: 25.00, stock_quantity: 25, user_id: 10, category: Category.find_by(name: "Jewlery & Accessories") },
        { title: "Turquoise Ring", description: "Handcrafted ring featuring a turquoise gemstone.", price: 65.00, stock_quantity: 10, user_id: 11, category: Category.find_by(name: "Jewlery & Accessories") },
    
        # Clothing & Shoes
        { title: "Summer Dress", description: "A light and colorful dress perfect for summer outings.", price: 40.00, stock_quantity: 20, user_id: 12, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Men's Leather Boots", description: "Sturdy and stylish boots for the modern man.", price: 80.00, stock_quantity: 10, user_id: 13, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Silk Scarf", description: "A luxurious silk scarf with a beautiful pattern.", price: 25.00, stock_quantity: 25, user_id: 14, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Denim Jacket", description: "A classic denim jacket perfect for any casual look.", price: 60.00, stock_quantity: 15, user_id: 15, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Ballet Flats", description: "Comfortable and chic ballet flats in a soft beige color.", price: 50.00, stock_quantity: 18, user_id: 1, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Woolen Sweater", description: "Warm and cozy woolen sweater for chilly days.", price: 55.00, stock_quantity: 20, user_id: 2, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Sports Sneakers", description: "High-performance sneakers ideal for running and sports.", price: 70.00, stock_quantity: 30, user_id: 3, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Leather Belt", description: "Durable leather belt with a sleek buckle.", price: 30.00, stock_quantity: 25, user_id: 4, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Linen Trousers", description: "Breathable and stylish trousers perfect for the summer season.", price: 45.00, stock_quantity: 15, user_id: 5, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Cashmere Shawl", description: "Soft and luxurious shawl made of 100% cashmere.", price: 85.00, stock_quantity: 10, user_id: 6, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Men's Suit", description: "A well-tailored suit for formal occasions.", price: 200.00, stock_quantity: 8, user_id: 7, category: Category.find_by(name: "Clothing & Shoes") },
        { title: "Pleated Skirt", description: "A trendy pleated skirt in a vibrant shade.", price: 40.00, stock_quantity: 20, user_id: 8, category: Category.find_by(name: "Clothing & Shoes") },
    
        # Home & Living
        { title: "Ceramic Vase", description: "Handcrafted ceramic vase with a rustic look.", price: 60.00, stock_quantity: 10, user_id: 9, category: Category.find_by(name: "Home & Living") },
        { title: "Wooden Coffee Table", description: "Solid wood coffee table with a modern design.", price: 180.00, stock_quantity: 5, user_id: 10, category: Category.find_by(name: "Home & Living") },
        { title: "Cotton Throw Blanket", description: "Soft and cozy throw blanket perfect for chilly evenings.", price: 45.00, stock_quantity: 20, user_id: 11, category: Category.find_by(name: "Home & Living") },
        { title: "Wall Mounted Clock", description: "Vintage style clock, perfect for any wall.", price: 50.00, stock_quantity: 15, user_id: 12, category: Category.find_by(name: "Home & Living") },
        { title: "Area Rug", description: "Woven area rug with intricate patterns.", price: 120.00, stock_quantity: 10, user_id: 13, category: Category.find_by(name: "Home & Living") },
        { title: "Desk Lamp", description: "Modern desk lamp with adjustable settings.", price: 40.00, stock_quantity: 20, user_id: 14, category: Category.find_by(name: "Home & Living") },
        { title: "Leather Sofa", description: "A comfortable leather sofa, seats three.", price: 600.00, stock_quantity: 3, user_id: 15, category: Category.find_by(name: "Home & Living") },
        { title: "Decorative Cushions", description: "Set of two cushions with embroidered designs.", price: 35.00, stock_quantity: 25, user_id: 1, category: Category.find_by(name: "Home & Living") },
        { title: "Framed Mirror", description: "Oval shaped mirror with a gold frame.", price: 80.00, stock_quantity: 10, user_id: 2, category: Category.find_by(name: "Home & Living") },
        { title: "Kitchen Island", description: "Wooden kitchen island with storage below.", price: 250.00, stock_quantity: 4, user_id: 3, category: Category.find_by(name: "Home & Living") },
        { title: "Bathroom Towel Set", description: "Premium cotton towel set, includes two bath towels.", price: 40.00, stock_quantity: 30, user_id: 4, category: Category.find_by(name: "Home & Living") },
        { title: "Candle Holder Set", description: "Metallic candle holders, set of three.", price: 30.00, stock_quantity: 25, user_id: 5, category: Category.find_by(name: "Home & Living") },
    
        # Wedding & Party
        { title: "Wedding Invitation Set", description: "Elegant wedding invitations with a floral theme.", price: 2.50, stock_quantity: 100, user_id: 6, category: Category.find_by(name: "Wedding & Party") },
        { title: "Birthday Party Kit", description: "Everything you need to throw a fantastic birthday party.", price: 30.00, stock_quantity: 15, user_id: 7, category: Category.find_by(name: "Wedding & Party") },
        { title: "Bridal Veil", description: "A delicate veil with intricate lace details.", price: 75.00, stock_quantity: 10, user_id: 8, category: Category.find_by(name: "Wedding & Party") },
        { title: "Table Centerpiece", description: "Elegant floral centerpiece for wedding tables.", price: 45.00, stock_quantity: 20, user_id: 9, category: Category.find_by(name: "Wedding & Party") },
        { title: "Bridesmaid Dresses", description: "Set of 4 matching bridesmaid dresses in lavender.", price: 200.00, stock_quantity: 6, user_id: 10, category: Category.find_by(name: "Wedding & Party") },
        { title: "Personalized Cake Topper", description: "Custom wooden cake topper with couple's names.", price: 25.00, stock_quantity: 30, user_id: 11, category: Category.find_by(name: "Wedding & Party") },
        { title: "Party Favors", description: "Pack of 50 assorted party favors for guests.", price: 40.00, stock_quantity: 25, user_id: 12, category: Category.find_by(name: "Wedding & Party") },
        { title: "Ballroom Dance Shoes", description: "Comfortable dance shoes for the reception.", price: 60.00, stock_quantity: 15, user_id: 13, category: Category.find_by(name: "Wedding & Party") },
        { title: "Wedding Photo Album", description: "Beautiful album to store your precious memories.", price: 50.00, stock_quantity: 20, user_id: 14, category: Category.find_by(name: "Wedding & Party") },
        { title: "Confetti Packs", description: "Pack of 100 colorful confetti pouches.", price: 10.00, stock_quantity: 50, user_id: 15, category: Category.find_by(name: "Wedding & Party") },
        { title: "Groomsmen Ties", description: "Set of 5 matching ties for groomsmen.", price: 80.00, stock_quantity: 10, user_id: 1, category: Category.find_by(name: "Wedding & Party") },
        { title: "Ring Bearer Pillow", description: "Soft pillow with lace for ring bearer.", price: 20.00, stock_quantity: 25, user_id: 2, category: Category.find_by(name: "Wedding & Party") },
    
        # Craft Supplies
        { title: "Knitting Kit", description: "All the essentials for beginners to start knitting.", price: 20.00, stock_quantity: 30, user_id: 1, category: Category.find_by(name: "Craft Supplies") },
        { title: "Watercolor Paint Set", description: "A set of vibrant watercolors for artists of all levels.", price: 25.00, stock_quantity: 20, user_id: 1, category: Category.find_by(name: "Craft Supplies") },
        { title: "Bead Collection", description: "A variety of beads for making jewelry and other crafts.", price: 15.00, stock_quantity: 40, user_id: 1, category: Category.find_by(name: "Craft Supplies") },
        { title: "Origami Paper Pack", description: "Assorted colors of high-quality origami paper.", price: 10.00, stock_quantity: 50, user_id: 2, category: Category.find_by(name: "Craft Supplies") },
        { title: "Crochet Hooks Set", description: "A set of various sizes of crochet hooks.", price: 15.00, stock_quantity: 20, user_id: 3, category: Category.find_by(name: "Craft Supplies") },
        { title: "Sewing Thread Collection", description: "Multiple spools of thread in different colors.", price: 18.00, stock_quantity: 30, user_id: 4, category: Category.find_by(name: "Craft Supplies") },
        { title: "Stencils Kit", description: "Various designs for all your crafting needs.", price: 12.00, stock_quantity: 40, user_id: 5, category: Category.find_by(name: "Craft Supplies") },
        { title: "Scrapbooking Supplies", description: "Assorted items for your scrapbooking projects.", price: 30.00, stock_quantity: 15, user_id: 6, category: Category.find_by(name: "Craft Supplies") },
        { title: "Clay Sculpting Tools", description: "Professional tools for clay modeling and sculpting.", price: 20.00, stock_quantity: 25, user_id: 7, category: Category.find_by(name: "Craft Supplies") },
        { title: "Acrylic Paint Tubes", description: "Set of 12 acrylic paint tubes for painting.", price: 28.00, stock_quantity: 20, user_id: 8, category: Category.find_by(name: "Craft Supplies") },
        { title: "Craft Glue", description: "Strong adhesive for various craft projects.", price: 5.00, stock_quantity: 60, user_id: 9, category: Category.find_by(name: "Craft Supplies") },
        { title: "DIY Candle Making Kit", description: "Everything you need to create your own scented candles.", price: 35.00, stock_quantity: 10, user_id: 10, category: Category.find_by(name: "Craft Supplies") }

    ]

    products.each do |product|
        Product.create!(product)
    end

    puts "#{products.length} products created!"


    puts "Done!"
end