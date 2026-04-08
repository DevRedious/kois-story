module Admin::SortingHelper
  def admin_sort_link(label, column)
    active = params[:sort] == column.to_s
    next_direction = active && params[:direction] != "desc" ? "desc" : "asc"
    indicator = active ? (params[:direction] == "desc" ? " ↓" : " ↑") : ""

    link_to(
      "#{label}#{indicator}",
      url_for(params.permit!.to_h.merge(sort: column, direction: next_direction, page: nil)),
      class: "sort-link#{' sort-link--active' if active}"
    )
  end
end
