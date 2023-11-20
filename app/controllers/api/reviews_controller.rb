class Api::ReviewsController < ApplicationController
    def index
        @product = Product.find(params[:product_id])
        @reviews = @product.reviews
        render :index
    end

    def create
        @product = Product.find(params[:product_id])
        @review = @product.reviews.new(review_params)
        @review.user = current_user

        if @review.save
            render :show
        else
            render json: @review.errors.full_messages, status: 422
        end
    end

    def show
        @review = Review.find_by(id: params[:id])
        if @review 
            render :show
        else
            render json: ["Review is not found"], status: 404
        end
    end

    def update
        @review = Review.find_by(id: params[:id])
        if @review && @review.update(review_params)
            render :show
        else
            render json: @review.errors.full_messages, status: 422
        end
    end

    def destroy
        @review = Review.find_by(id: params[:id])
        if @review && @review.destroy
            render json: ["Review deleted succesfully"]
        else
            render json: ["Review could not be deleted"], status: 422
        end
    end

    private
    def review_params 
        params.require(:review).permit(:context, :rating)
    end
end
