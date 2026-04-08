module Admin
  module Paginatable
    private

    def paginate_scope(scope, per_page: 12)
      total_count = scope.count
      total_pages = [ (total_count.to_f / per_page).ceil, 1 ].max
      current_page = params.fetch(:page, 1).to_i
      current_page = 1 if current_page < 1
      current_page = total_pages if current_page > total_pages

      records = scope.offset((current_page - 1) * per_page).limit(per_page)

      [ records, {
        page: current_page,
        per_page: per_page,
        total_count: total_count,
        total_pages: total_pages,
        prev_page: current_page > 1 ? current_page - 1 : nil,
        next_page: current_page < total_pages ? current_page + 1 : nil
      } ]
    end
  end
end
