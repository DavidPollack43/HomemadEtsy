class Api::ReviewsController < ApplicationController
    before_action :require_ownership, only: [:update, :destroy]

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
            Rails.logger.info @review.errors.full_messages.to_sentence
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
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
        @review = Review.find(params[:id])

        if @review.user != current_user
            render json: { error: 'You are not authorized to edit this review' }, status: :unauthorized
            return
        end
      
        if @review.update(review_params)
            render :show
        else
            render json: @review.errors.full_messages, status: :unprocessable_entity
        end
    end

    def destroy
        @review = Review.find(params[:id])

        if @review.user != current_user
            render json: { error: 'You are not authorized to delete this review' }, status: :unauthorized
            return
        end

        if @review && @review.destroy
            render json: { message: 'Review deleted successfully' }
        else
            render json: { error: 'Review could not be deleted' }, status: :unprocessable_entity
        end
    end

    private

    def require_ownership
        @review = Review.find_by(id: params[:id])
        unless @review && @review.user == current_user
          render json: { error: "You are not authorized to perform this action" }, status: :unauthorized
        end
    end

    def review_params 
        params.require(:review).permit(:content, :rating)
    end
end
