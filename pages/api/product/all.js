import Products from "../../../models/product";
import { connectDB } from "../../../utils";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProducts(req, res);
      break;

    default:
      break;
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json({
      success: true,
      result: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
