json.quantity @cart_item.quantity
json.id @cart_item.id
json.product do 
    json.username @cart_item.product.user.username
    json.productId @cart_item.product.id
    json.title @cart_item.product.title
    json.description @cart_item.product.description
    json.price @cart_item.product.price
    json.stock_quantity @cart_item.product.stock_quantity
    json.photoUrl @cart_item.product.photo.attached? ? @cart_item.product.photo.url : nil 
end