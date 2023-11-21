@reviews.each do |review|
    json.extract! review, :id, :content, :rating
    json.user do 
        json.id review.user.id
        json.username review.user.username
    end
end