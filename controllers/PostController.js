import PostModel from '../models/Post.js'

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec()
    res.json(posts)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: ' Can not get the posts',
    })
  }
}

// export const getOne = async (req, res) => {
//   try {
//     const postId = req.params.id

//     PostModel.findOneAndUpdate(
//       {
//         _id: postId,
//       },
//       {
//         $inc: { viewsCount: 1 },
//       },
//       {
//         returnDocument: 'after',
//       }

//       (err, doc) => {
//         if (err) {
//           console.log(err)
//           return res.status(500).json({
//             message: 'Can not get the post',
//           })
//         }
//         if (!doc) {
//           return res.status(404).json({
//             message: 'post not found',
//           })
//         }
//         res.json(doc)
//       },
//     )
//   } catch (err) {
//     console.log(err)
//     res.status(404).json({
//       message: 'smth get wrong',
//     })
//   }
// }
export const getOne = async (req, res) => {
  try {
    const postId = req.params.id

    const updatedDoc = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
    ).exec()

    if (!updatedDoc) {
      return res.status(404).json({
        message: 'post not found',
      })
    }

    res.json(updatedDoc)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'An error occurred while getting the post',
    })
  }
}

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    })

    const post = await doc.save()

    res.json(post)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: ' The post did not create',
    })
  }
}

export const remove = async (req, res) => {
  try {
    const postId = req.params.id
    const deletedDoc = await PostModel.findOneAndDelete({ _id: postId }).exec()

    if (!deletedDoc) {
      return res.status(404).json({
        message: 'The post not found',
      })
    }

    res.json({
      success: true,
      message: 'Post was Deleted',
    })
    // PostModel.findOneAndDelete(
    //   {
    //     _id: postId,
    //   },
    //   (err, doc) => {
    //     if (err) {
    //       console.log(err)
    //       return res.status(500).json({
    //         message: 'error during the deleting',
    //       })
    //     }
    //     if(!doc){
    //         return res.status(404).json({
    //             message: "the post not found"
    //         })
    //     }
    //     res.json({
    //         success: true
    //     })
    //   },
    // )
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Unsuccessfull deleting',
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id
    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      },
    )
    res.json({
      success: true,
      message: ' updated',
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: ' error in update',
    })
  }
}
