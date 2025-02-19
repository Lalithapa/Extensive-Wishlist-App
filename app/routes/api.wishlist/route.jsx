import { json } from '@remix-run/react';
import db from '../../db.server';
import { cors } from 'remix-utils/cors';

export async function loader(){
  const mainList = await db.wishlist.findMany({});
  return json(mainList);
}

export async function action({request}){
  const method = request.method;
  let data = await request.formData(); 
  data = Object.fromEntries(data); 
  const customerId = data.customerId;
  const productId = data.productId;
  const shop = data. shop;
  if(!customerId ||  !productId || !shop) {
  return json({message: "Missing data. Required data: customerId, productId, shop", method: method});
  }
  switch(method){
    case "POST":
      let wishlist = await db.wishlist.create({
        data: {
          customerId,
          productId,
          shop
        }
      }); 
     const response = json({message: 'Data Post successfully', status: 200 , method: method, wishlist:wishlist});
     return cors(request,response)
     case "GET":
      return json({message: 'Data Get successfully', status: 200 , method: method});
     case "PUT":
      return json({message: 'Data Put successfully', status: 200 , method: method});
    default:
      return json({message: 'Invalid request method', status: 400, method: method});
  }
}
