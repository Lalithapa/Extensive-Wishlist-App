import { json } from '@remix-run/react'

export async function loader(){
  const mainList = {message: 'Data Get successfully', method: "GET"};
  return json(mainList);
}

export async function action({request}){
  const method = request.method;
  switch(method){
    case "POST":
     return json({message: 'Data Post successfully', status: 200 , method: method});
     case "GET":
      return json({message: 'Data Get successfully', status: 200 , method: method});
     case "PUT":
      return json({message: 'Data Put successfully', status: 200 , method: method});
    default:
      return json({message: 'Invalid request method', status: 400, method: method});
  }
}
