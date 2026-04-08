module Admin::PaginationHelper
  def admin_pagination_label(pagination, item_name)
    return "Aucun #{item_name}" if pagination[:total_count].zero?

    first_item = ((pagination[:page] - 1) * pagination[:per_page]) + 1
    last_item = [ pagination[:page] * pagination[:per_page], pagination[:total_count] ].min
    "#{first_item}-#{last_item} sur #{pagination[:total_count]} #{item_name}"
  end

  def admin_pagination_path(page)
    url_for(params.permit!.to_h.merge(page: page))
  end
end
