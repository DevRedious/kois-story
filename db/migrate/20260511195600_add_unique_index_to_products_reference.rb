class AddUniqueIndexToProductsReference < ActiveRecord::Migration[8.1]
  class ProductRecord < ActiveRecord::Base
    self.table_name = "products"
  end

  def up
    deduplicate_product_references
    add_index :products, :reference, unique: true unless index_exists?(:products, :reference, unique: true)
  end

  def down
    remove_index :products, :reference if index_exists?(:products, :reference)
  end

  private

  def deduplicate_product_references
    ProductRecord.reset_column_information
    existing_references = ProductRecord.where.not(reference: nil).pluck(:reference)

    duplicate_references.each do |reference|
      ProductRecord.where(reference: reference).order(:id).to_a.drop(1).each do |product|
        product.update_columns(reference: unique_reference(reference, product.id, existing_references))
      end
    end
  end

  def duplicate_references
    ProductRecord
      .where.not(reference: nil)
      .group(:reference)
      .having("COUNT(*) > 1")
      .pluck(:reference)
  end

  def unique_reference(reference, product_id, existing_references)
    base = reference.to_s.strip.empty? ? "product" : reference
    candidate = "#{base}-#{product_id}"
    suffix = 2

    while existing_references.include?(candidate)
      candidate = "#{base}-#{product_id}-#{suffix}"
      suffix += 1
    end

    existing_references << candidate
    candidate
  end
end
