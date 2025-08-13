import db from '../models/index.js';
import {literal, Op } from 'sequelize';

export const fetchAllProducts = async (req, res) => {

    try {
        let { search, brand, category, color, sortBy, order, page, limit, price_min, price_max } = req.query;

        // Defaults
        sortBy = sortBy || "createdAt";
        order = order?.toUpperCase() === "ASC" ? "ASC" : "DESC";
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;

        let whereClause = {};

        if (brand) {
            const brandArray = Array.isArray(brand) ? brand : brand.split(",");
            whereClause.brand = { [Op.overlap]: brandArray };
        };

        if (category) {
            const categoryArray = Array.isArray(category) ? category : category.split(",");
            whereClause.categories = { [Op.overlap]: categoryArray };
        }
        if (color) {
            const colorArray = Array.isArray(color) ? color : color.split(",");
            whereClause.color = { [Op.overlap]: colorArray };
        }
        if (price_min || price_max) {
            whereClause.price = {};
            if (price_min) {
                whereClause.price[Op.gte] = parseFloat(price_min);
            }
            if (price_max) {
                whereClause.price[Op.lte] = parseFloat(price_max);
            }
        }
        // Full text search condition
        if (search) {
            const searchTerm = search.replace(/'/g, "''"); // escape quotes to avoid SQL injection
            whereClause[Op.and] = literal(`
                    to_tsvector('simple', coalesce("name",'') || ' ' || coalesce("description",'')) @@ to_tsquery('simple', '${searchTerm}:*')
                `);
        }

        // Main query
        const { rows: products, count: total } = await db.Product.findAndCountAll({
            where: whereClause,
            order: [[sortBy, order]],
            limit,
            offset,
        });

        // Fetch available filter lists
        const [brands, categories, colors] = await Promise.all([
            db.Product.aggregate("brand", "DISTINCT", { plain: false }),
            db.Product.aggregate("categories", "DISTINCT", { plain: false }),
            db.Product.aggregate("color", "DISTINCT", { plain: false }),
        ]);

        return res.json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            products,
            filters: {
                brands: brands.map(b => b.DISTINCT).flat(),
                categories: categories.map(c => c.DISTINCT).flat(),
                colors: colors.map(clr => clr.DISTINCT).flat(),
            },
        })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
