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

ActiveRecord::Schema.define(version: 20141126010833) do

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
    t.integer  "user_id",     null: false
    t.string   "hometype",    null: false
    t.string   "roomtype",    null: false
    t.integer  "accomodates", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "lat",         null: false
    t.float    "lng",         null: false
    t.integer  "price",       null: false
  end

  add_index "listings", ["accomodates"], name: "index_listings_on_accomodates", using: :btree
  add_index "listings", ["hometype"], name: "index_listings_on_hometype", using: :btree
  add_index "listings", ["roomtype"], name: "index_listings_on_roomtype", using: :btree
  add_index "listings", ["user_id"], name: "index_listings_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
