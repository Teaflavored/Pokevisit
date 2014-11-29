# == Schema Information
#
# Table name: reservations
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  listing_id :integer          not null
#  status     :string(255)      default("PENDING"), not null
#  start_date :datetime         not null
#  end_date   :datetime         not null
#  created_at :datetime
#  updated_at :datetime
#

class Reservation < ActiveRecord::Base
  STATUSES = ["PENDING", "APPROVED", "DENIED"]
  validates :user, :listing, :status, :start_date, :end_date, presence: true
  validates :status, inclusion: { in: STATUSES }
  validate :ensure_no_overlapping_approved_reservation
  validate :ensure_date_is_within_listing_dates
  validate :end_date_has_to_be_after_start

  belongs_to :listing
  belongs_to :user

  def self.order_by_start_date
    order(":start_date")
  end

  def approve!
    if self.overlapping_approved_reservations.length > 0
      return false;
    else

      Reservation.transaction do
        self.status = "APPROVED"
        self.save!
        overlapping_pending_reservations.each do |reservation|
          reservation.deny!
        end

        return true
      end
    end
  end

  def deny!
    self.status = "DENIED"
    self.save!

    return true
  end

  def overlapping_reservations
    query = <<-SQL
    ( (start_date BETWEEN '#{self.start_date}' AND '#{self.end_date}')
    OR
    (end_date BETWEEN '#{self.start_date}' AND '#{self.end_date}')
    OR
    (start_date >= '#{self.start_date}' AND end_date <= '#{self.end_date}')
    OR
    (start_date <= '#{self.start_date}' AND end_date >= '#{self.end_date}') )
    AND
    listing_id = '#{self.listing_id}'
    SQL

    Reservation.select('reservations.*').where(query).where('(:id IS NULL) OR (id != :id)', id: self.id)
  end

  def overlapping_pending_reservations
    self.overlapping_reservations.where("status = 'PENDING'")
  end

  def overlapping_approved_reservations
    self.overlapping_reservations.where("status = 'APPROVED'")
  end

  private

  def ensure_no_overlapping_approved_reservation
    if overlapping_approved_reservations.length > 0
      errors.add(:reservation, "can't be made")
    end
  end

  def ensure_date_is_within_listing_dates
    if self.start_date < self.listing.date_avail || self.start_date > self.listing.date_end || self.end_date > self.listing.date_end || self.end_date < self.listing.date_avail
      errors.add(:reservation, "invalid reservation")
    end
  end


  def end_date_has_to_be_after_start
    if self.end_date < self.start_date
      errors.add(:reservation, "invalid reservation")
    end
  end
end
