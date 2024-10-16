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

const listCustomer = async () => {
    try {
        return await Customers.find({}).exec();
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