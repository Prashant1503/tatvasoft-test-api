var blogService = require("../service/blogService");
var authService = require("../service/authService");
var { Op, Sequelize, where } = require("sequelize");
var constants = require("../constants/constants");
var Category = require("../models").Category;


/** @function : Get all blogs */
exports.getAllBlogs = async (req, res) => {
    const limit = constants.ROW_LIMIT;
    const offset = constants.OFFSET
    const page = constants.PAGE;

    let whereClause = {}

    if (req.role != "Admin") {
        whereClause["author"] = { [Op.eq]: req.userId }
    }

    if (req.query.filter) {
        let filter = req.query.filter;

        whereClause = {
            [Op.or]: {
                "published_date": filter.published_date,
                "author": filter.author,

            }
        }

    }


    req.query.perPage ? limit = req.query.perPage : constants.ROW_LIMIT;
    req.query.page ? offset = req.query.page * limit : constants.OFFSET;


    console.log(whereClause)
    await blogService.getBlogs(whereClause, limit, offset)
        .then((_blogs) => {
            res.send({ perPage: limit, page: offset, data: _blogs });
        })
        .catch((error) => {
            console.log(error)
            res.send({ msg: error.message })
        })

}

/** @function : Update blog  by id*/
exports.updateBlogById = async (req, res) => {
    var whereClause = {
        id: req.params.blogId
    };

    if (req.role != "Admin") {
        whereClause = { author: req.userId, id: req.params.blogId }

    }

    await blogService.updateBlogById(req.body, whereClause)
        .then((_updated) => {
            res.send({ msg: "Blog Updated success", data: _updated })

        })
        .catch((err) => {
            console.log("Blog update err ::" + err)
            res.send({ msg: "Blog Update failed!" });
        })
}

/** @function : Delete blog by id */
exports.deleteBlogById = (req, res) => {
    var whereClause = {
        id: req.params.blogId
    };

    if (req.role != "Admin") {
        whereClause = { author: req.userId, id: req.params.blogId }

    }

    blogService.deleteBlogById(whereClause)
        .then((_deleted) => {
            return res.send({ msg: "Blog Deleted success" });
        })
        .catch((error) => {
            return res.send({ msg: error.message })
        })
}

/** @function : Create blog */
exports.createBlog = async (req, res) => {
    req.body.author = req.userId;
    req.body.modify_date = Date.now();
    req.body.published_date = Date.now();

    req.body.status == null ? constants.BLOG_STATUS : req.body.status

    await blogService.saveBlog(req.body).then(async (_saved) => {
        console.log(_saved)
        let categoryData = {
            blogId: _saved.id,
            categoryName: _saved.category,
            createdBy: req.userId,
            updatedBy: req.userId
        }

        try {
            await Category.create(categoryData);
            return res.send(_saved)
        } catch (error) {
            return res.send({ msg: error.message })
        }
    })
        .catch((error) => {
            res.send(error.message)
        })
}