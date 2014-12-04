# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141204015428) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "listing_images", force: true do |t|
    t.string   "url",        null: false
    t.integer  "listing_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "listing_images", ["listing_id"], name: "index_listing_images_on_listing_id", using: :btree

  create_table "listings", force: true do |t|
    t.integer  "user_id",                                                     null: false
    t.string   "hometype",                                                    null: false
    t.string   "roomtype",                                                    null: false
    t.integer  "accomodates",                                                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "lat",                                                         null: false
    t.float    "lng",                                                         null: false
    t.integer  "price",                                                       null: false
    t.datetime "date_avail"
    t.datetime "date_end"
    t.string   "address"
    t.text     "description",         default: "What a great place to live!"
    t.string   "checkintime"
    t.string   "checkouttime"
    t.text     "description_summary"
    t.float    "avg_rating"
  end

  add_index "listings", ["accomodates"], name: "index_listings_on_accomodates", using: :btree
  add_index "listings", ["hometype"], name: "index_listings_on_hometype", using: :btree
  add_index "listings", ["roomtype"], name: "index_listings_on_roomtype", using: :btree
  add_index "listings", ["user_id"], name: "index_listings_on_user_id", using: :btree

  create_table "reservations", force: true do |t|
    t.integer  "user_id",                        null: false
    t.integer  "listing_id",                     null: false
    t.string   "status",     default: "PENDING", null: false
    t.datetime "start_date",                     null: false
    t.datetime "end_date",                       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "guests"
  end

  add_index "reservations", ["listing_id"], name: "index_reservations_on_listing_id", using: :btree
  add_index "reservations", ["user_id"], name: "index_reservations_on_user_id", using: :btree

  create_table "reviews", force: true do |t|
    t.integer  "listing_id",  null: false
    t.integer  "user_id",     null: false
    t.integer  "rating",      null: false
    t.text     "review_text", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "reviews", ["listing_id"], name: "index_reviews_on_listing_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "user_images", force: true do |t|
    t.integer  "user_id",                                             null: false
    t.string   "url",        default: "/assets/default_user_pic.jpg", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_images", ["user_id"], name: "index_user_images_on_user_id", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                                                    null: false
    t.string   "password_digest",                                          null: false
    t.string   "session_token",                                            null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "image_url",       default: "/assets/default_user_pic.jpg"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
