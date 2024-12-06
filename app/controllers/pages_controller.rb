# frozen_string_literal: true

# Pages controller
class PagesController < ApplicationController
  def hello; end

  def say_hello
    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end
end
