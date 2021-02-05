import Products from "../../../models/product";
import { connectDB } from "../../../utils";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;

    default:
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const {id} = req.query;
    const product = await Products.findById(id);
    if(!product) return res.status(400).json({err: 'Sản phẩm không tồn tại.'})
    
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
