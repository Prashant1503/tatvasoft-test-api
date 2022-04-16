const Blog = require("../models").Blogs;
const User = require("../models").User;


exports.getBlogs = function (whereClause, limit, offset) {
    return new Promise((resolve, reject) => {
        Blog.findAndCountAll({ where: whereClause, limit: limit, offset: offset, orderBy: ["id"] }).then((_blogs) => resolve(_blogs))
            .catch((err) => reject(err))
    })
}


exports.updateBlogById = function (data, whereClause) {
    return new Promise((resolve, reject) => {
        Blog.update(data, { where: whereClause }).then((_blog) => resolve(_blog))
            .catch((err) => reject(err))
    })
}



exports.deleteBlogById = function (whereClause) {
    return new Promise((resolve, reject) => {
        Blog.destroy({ where: whereClause }).then((_blog) => {
            resolve(_blog)
        })
            .catch((err) => reject(err))
    })
}


exports.saveBlog = function (_data) {
    return new Promise((resolve, reject) => {
        Blog.create(_data).then((_blog) => resolve(_blog))
            .catch((error) => reject(error))
    })
}