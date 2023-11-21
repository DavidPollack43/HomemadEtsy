json.extract! @product, :id, :title, :description, :price, :stock_quantity
json.average_rating @product.average_rating
json.photoUrl @product.photo.attached? ? @product.photo.url : nil
json.user do 
    json.id @product.user.id
    json.username @product.user.username
end
json.category do 
    json.id @product.category.id
    json.name @product.category.name
end