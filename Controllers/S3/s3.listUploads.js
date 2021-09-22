import File from "../../Models/File.js";

// export default async function listUploads(req, res) {
//   const { firebaseId, page = 1, limit = 10 } = req.body;
//   try {
//     const files = await File.find({ firebaseId }).sort({ createdAt: -1 });

//     if (files.length === 0) {
//       return res.status(404).json({ error: "Root is empty, No files found" });
//     }
//     return res.status(200).json(files);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }

export default async function listUploads(req, res) {
  const { firebaseId, page = 1, limit = 10 } = req.body;
  try {
    const files = await File.find({ firebaseId })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .exec();

    // const count = await File.countDocuments();

    if (files.length === 0) {
      return res.status(404).json({ error: "Root is empty, No files found" });
    }
    return res.status(200).json(files);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// export default async function listUploads(req, res) {
//   const { firebaseId, page = 1, limit = 10 } = req.body;
//   try {
//     const files = await File.updateMany(
//       {},
//       { $unset: { downloads: 1 } },
//       { multi: true }
//     );

//     const count = await File.countDocuments({ fileSize: { $gte: 0 } });

//     if (files.length === 0) {
//       return res.status(404).json({ error: "Root is empty, No files found" });
//     }
//     return res.status(200).json({
//       files,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//     });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// }
