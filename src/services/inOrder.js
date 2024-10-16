import inOrders from "../models/inOrder.js";
const create = async ({
    product,
    supplier,
    in_price,
    quantity_real,
    quantity_doc,
    staff, 
    deliver,
    invoice

  }) => {
    try {
      // Create new outOrder
      const newinOrder = await inOrders.create({
        product,
        supplier,
        in_price,
        quantity_real,
        quantity_doc,
        staff, 
        deliver,
        invoice,
      });
      // Return newoutOrder object
      return newinOrder._doc;
    } catch (error) {
      throw new Error(error.toString());
    }
  };
  
  // Get all
  const list = async () => {
    try {
      return await inOrders.find({})
      .populate("product")
      .populate("supplier")
      .exec();
    } catch (error) {
      throw new Error(error.toString());
    }
  };
  
  // Get single outOrder by Id
  const getById = async (id) => {
    try {
      return await inOrders.findOne({ _id: id })
      .populate("product")
      .populate("supplier")
      
      .exec();
    } catch (error) {
      throw new Error(error.toString());
    }
  };
  
  
  const edit = async (
    id,
    {
       
        in_price,
        quantity_real,
        quantity_doc,
         
        
    }
  ) => {
    try {
      return await inOrders.findByIdAndUpdate(
        id,
        {
       
        in_price,
        quantity_real,
        quantity_doc,
        
        },
        { new: true }
      );
    } catch (error) {
      throw new Error(error.toString());
    }
  };
  
  const del = async (id) => {
    try {
      return await inOrders.findByIdAndDelete({ _id: id });
    } catch (error) {
      throw new Error(error.toString());
    }
  };
  const getByProductId = async (productId) => {
    try {
      return await inOrders.findMany({ product: productId })
        .populate("product")
        .populate("supplier")
        
        
        .exec();
    } catch (error) {
      throw new Error(error.toString());
    }
  };
  const getByInvoice = async (invoice) => {
    try {
      return await outOrders.findMany({ invoice: invoice })
      .populate("product")
      .populate("supplier")
     
      
        .exec();
    } catch (error) {
      throw new Error(error.toString());
    }
  };
  const getBySupplier = async (supplier) => {
    try {
      return await inOrders.findMany({ supplier: supplier })
      .populate("product")
      .populate("supplier")
   
      
        .exec();
    } catch (error) {
      throw new Error(error.toString());
    }
  };
  const getByDate = async (date) => {
    try {
        // Calculate the start and end date of the specific day
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0); // Start from 00:00:00
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999); // End at 23:59:59.999

        // Get out orders within the range from startDate to endDate
        return await inOrders.find({
            createdAt: { $gte: startDate, $lte: endDate } // Use $gte and $lte to get orders within this time range
        }).exec();
    } catch (error) {
        throw new Error(error.toString());
    }
};
const getByMonth = async (year, month) => {
  try {
      // Calculate the start and end date of the specific month
      const startDate = new Date(year, month - 1, 1); // Tháng bắt đầu từ 0
      const endDate = new Date(year, month, 0); // Lấy ngày cuối cùng của tháng

      // Get out orders within the range from startDate to endDate
      return await inOrders.find({
          createdAt: { $gte: startDate, $lte: endDate }
      }).exec();
  } catch (error) {
      throw new Error(error.toString());
  }
};
  export default {
    create,
    list,
    getById,
    edit,
    del,
    getByProductId,
    getByInvoice,
    getBySupplier,
    getByDate,
    getByMonth,
  };