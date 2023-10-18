class Api::SessionsController < ApplicationController

  def show
    @user = current_user
    if @user
      render 'api/users/show'
    else
      render json: {user: nil}
    end
  end

  def create
    @user = User.find_by_credentials(params[:session][:credential], params[:session][:password])
    # debugger
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: {errors: ['Invalid credentials']}, status: 422
    end
  end

  def destroy
    userId = current_user.id
    logout!
    # render json: {userId: userId}
    render json: {message: ['Successfully logged out!']}
  end
end
