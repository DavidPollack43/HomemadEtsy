json.product do 
    json.extract! @product, :title, :description, :price, :stock_quantity
    json.user do 
        json.id @product.user.id
        json.username @product.user.username
    end
    json.category do 
        json.id @product.category.id
        json.name @product.category.name
    end
end