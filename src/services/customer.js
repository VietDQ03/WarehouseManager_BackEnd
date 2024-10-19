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
        // Tính toán số bản ghi cần bỏ qua dựa trên trang hiện tại và pageSize
        const skip = (current - 1) * pageSize;

        // Truy vấn danh sách khách hàng với phân trang
        const customers = await Customers.find({})
            .skip(skip) // Bỏ qua các bản ghi trước trang hiện tại
            .limit(pageSize) // Giới hạn số lượng bản ghi trên mỗi trang
            .exec();

        // Lấy tổng số khách hàng để tính tổng số trang
        const totalCustomers = await Customers.countDocuments({});
  
        // Tính tổng số trang
        const totalPages = Math.ceil(totalCustomers / pageSize);

        // Nếu người dùng thay đổi pageSize và trang hiện tại không hợp lệ (ví dụ: vượt quá totalPages), điều chỉnh current
        const adjustedCurrent = current > totalPages ? totalPages : current;

        return {
            data: {
                customers, // Dữ liệu khách hàng của trang hiện tại
                total: totalCustomers, // Tổng số khách hàng
                current: adjustedCurrent, // Trang hiện tại (đã điều chỉnh nếu cần)
                pageSize, // Số lượng khách hàng mỗi trang
                totalPages, // Tổng số trang
            },
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