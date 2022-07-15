class KycDetailController < ApplicationController
  
    def create
        begin
            @kyc = KycDetail.new(kyc_params)
            @kyc.user = current_user
            if @kyc.valid?
                @kyc.save
            else
                @errors = @kyc.errors.full_messages
                puts @errors
            end
        rescue Exception => e
            Rails.logger.warn "################## Exception while creating kyc detail ##################"
            Rails.logger.warn "ERROR: #{e.message}, PARAMS: #{params.inspect}"
            Rails.logger.warn $!.backtrace[0..20].join("\n")
            @errors = e.message
          end
    end

    def kyc_params
        params.require(:kyc_detail).permit(:name, :email_id, :address, :country, :mobile_no)
    end
    
  end