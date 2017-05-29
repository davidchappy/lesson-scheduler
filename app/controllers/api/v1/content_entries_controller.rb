class Api::V1::ContentEntriesController < Api::V1::BaseController

  def index
    @content_entries = ContentEntry.all.index_by(&:name)
    respond_with @content_entries, json: @content_entries
  end

  def update
    @content_entry = ContentEntry.find(params[:id])
    if @content_entry.update_attributes(content_entries_params)
      flash.now[:success] = "Setting Saved"
      respond_with @content_entry, json: @content_entry
    else
      message = "Sorry there was an error: "
      message += @content_entry.errors.full_messages.first
      flash[:danger] = message
      redirect_to root_url
    end
  end

  private

    def content_entries_params
      params.require(:content_entries).permit(:value)
    end

end
