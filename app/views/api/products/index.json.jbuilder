@products.each do |product|
    json.set! product.id do 
        json.extract! product, :id, :title, :description, :price, :stock_quantity
        json.user do 
            json.id product.user.id
            json.username product.user.username
        end
        json.category do 
            json.id product.category.id
            json.name product.category.name
        end
    end
end