import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const shippingAddressSchema = Schema({
  address: {
    required: true,
    type: String,
  },
  postalCode: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  country: {
    required: true,
    type: String,
  },
});

const cartItemSchema = Schema({
  quantity: {
    required: true,
    type: Number,
    default: 0,
  },
  price: {
    required: true,
    type: Number,
    default: 0,
  },
  name: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
});

const orderSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingAddress: {
      required: true,
      type: shippingAddressSchema,
    },
    cartItems: {
      type: [cartItemSchema],
      required: true,
    },
    paymentMethod: {
      required: true,
      type: String,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
      name: { type: String },
    },
    subTotal: {
      required: true,
      type: Number,
      default: 0,
    },
    orderTotal: {
      required: true,
      type: Number,
      default: 0,
    },
    taxCost: {
      required: true,
      type: Number,
      default: 0,
    },
    shippingCost: {
      required: true,
      type: Number,
      default: 0,
    },
    isPaid: {
      required: true,
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      required: true,
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongoosePaginate);

const order = mongoose.model("Order", orderSchema);

export default order;
