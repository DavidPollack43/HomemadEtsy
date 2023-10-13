class Api::ProductsController < ApplicationController
  def index
    @products = Product.includes(:category, :user).all
    render :index
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      render :show
    else
      render json: @product.errors.full_messages, status: 422
    end
  end

  def show
    @product = Product.includes(:category, :user).find_by(id: params[:id])
    if @product
      render :show
    else
      render json: ["Product is not found"], status: 404
    end
  end

  def update
    @product = Product.find_by(id: params[:id])
    if @product && @product.update(product_params) 
      render :show
    else
      render json: @product.errors.full_messages, status: 422
    end
  end

  def destroy
    @product = Product.find_by(id: params[:id])
    if @product && @product.destroy
      render :index
    else
      render json: ["Product could not be deleted"], status: 422
    end
  end

  private
  def product_params
      params.require(:product).permit(:title, :price, :description, :stock_quantity, :category_id)
  end
end
