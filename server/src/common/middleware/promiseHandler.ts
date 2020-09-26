export const promise = (query:any)=>{
   return query.then((data:any)=>[null,data]).catch((err:any)=>[err])
} 