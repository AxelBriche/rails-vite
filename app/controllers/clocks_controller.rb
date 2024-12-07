# frozen_string_literal: true

class ClocksController < ApplicationController
  def new; end

  def create
    respond_to do |format|
      format.html
      format.turbo_stream
    end
  end
end
