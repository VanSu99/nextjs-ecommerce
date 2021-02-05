import { connectDB } from '../../../utils';
import Users from '../../../models/user';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      await updateRole(req, res);
      break;

    case 'DELETE':
      await deleteUserRole(req, res);
      break;
  }
};

const updateRole = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin' || !result.root) return res.status(400).json({ err: 'Authentication is not valid' });

    const { id } = req.query;
    const { role } = req.body;

    await Users.findOneAndUpdate({ _id: id }, { role });
    res.json({ msg: 'Cập nhật thành công!' });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteUserRole = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin' || !result.root) return res.status(400).json({ err: 'Authentication is not valid' });

    const { id } = req.query;

    await Users.findByIdAndRemove(id);
    res.json({ msg: 'Xóa thành công!' });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
