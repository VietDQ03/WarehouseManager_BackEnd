import Customers from '../models/customer.js';

const createCustomer = async ({
    name,
    phone,
    email,
    address,
}) =>{
    try{
        const newCustomer = await Customers.create({
            name,
            phone,
            email,
            address,
        });
        return newCustomer._doc;
    }catch(error){
        throw new Error(error.toString());
}
};

const listCustomer = async (current = 1, pageSize = 10) => {
    try {
        const skip = (current - 1) * pageSize; // Tính số bản ghi cần bỏ qua
        const customers = await Customers.find({})
            .skip(skip) // Bỏ qua các bản ghi trước trang hiện tại
            .limit(pageSize) // Giới hạn số lượng bản ghi
            .exec();

        // Lấy tổng số khách hàng để tính tổng số trang
        const totalCustomers = await Customers.countDocuments({});

        return {
            data: customers, // Dữ liệu khách hàng
            total: totalCustomers, // Tổng số khách hàng
            current, // Trang hiện tại
            pageSize, // Số lượng khách hàng mỗi trang
        };
    } catch (error) {
        throw new Error(error.toString());
    }
};


const getById = async (id) => {
    try {
        return await Customers.findOne({_id: id}).exec();
    } catch (error) {
        throw new Error(error.toString());
    }
};

const edit = async (
    id,
    {
        name,
        phone,
        email,
        address,
    }
) => {
    try {
        return await Customers.findByIdAndUpdate(
            {_id: id},
            {
                name,
                phone, 
                email,
                address,
            },
            {new : true}
        );
    } catch (error) {
        throw new Error(error.toString());
    }
};
const deleteCustomer = async (id) => {
    try {
        return await Customers.findByIdAndDelete({_id : id});
    }
    catch(error){
        throw new Error(error.toString());
    }
};

export default {
     createCustomer,
     listCustomer,
     getById,
     edit,
     deleteCustomer,
};