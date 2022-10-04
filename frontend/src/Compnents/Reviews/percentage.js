
export const percentge=(allreview, value)=>{

    let result=[]
  result = allreview?.filter((aa) => (aa.rating === value));
  console.log((result?.length/allreview?.length)*100);
  const val=(result?.length/allreview?.length)*100
  return val+`%`
}