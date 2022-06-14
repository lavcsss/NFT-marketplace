class CollectionJob #< ApplicationJob
  include Sidekiq::Worker
  sidekiq_options queue: 'high'

  def perform(metadata_hash)
    logger = Logger.new("#{Rails.root}/log/import_nft.log")
    collection = Collection.unscoped.find_by(metadata_hash: metadata_hash)
    begin
      collection.update_imported_nft
    rescue StandardError => e
      logger.info "----- Error Log --------#{e}--\n"
    end
  end
end