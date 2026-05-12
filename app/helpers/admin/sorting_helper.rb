module Admin::SortingHelper
  def admin_sort_link(label, column)
    active = params[:sort] == column.to_s
    next_direction = active && params[:direction] != "desc" ? "desc" : "asc"
    indicator = active ? (params[:direction] == "desc" ? " ↓" : " ↑") : ""

    link_to(
      "#{label}#{indicator}",
      url_for(admin_sort_query_params.merge(sort: column, direction: next_direction, page: nil)),
      class: "sort-link#{' sort-link--active' if active}"
    )
  end

  private

  def admin_sort_query_params
    params.permit(:direction, :page, :per_page, :query, :sort, :status).to_h
  end
end
