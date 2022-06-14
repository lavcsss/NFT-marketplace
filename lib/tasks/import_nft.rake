namespace :import_nft do
  desc '------------------Sync Import NFT---------------------'
  task update_users_nft: :environment do
    WorkerLog = Logger.new("#{Rails.root}/log/import_nft.log")
    WorkerLog.info "Starting the WORKER - #{Time.zone.now()} \n\n"
    delay = 1
    User.active.find_in_batches(batch_size: 100) do |group|
      group.each do |user|
        collections = user.imported_collections
        if collections.present?
          collections.each do |collection|
            if collection.valid_import?
              CollectionJob.perform_in(delay.minutes, collection.metadata_hash)
            end
          end
        end
      end
      delay +=1
    end
  end
end
