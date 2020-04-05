export const saveJobsList = (data) => {
  localStorage.setItem("JOBS_LIST", JSON.stringify(data));
};
export const getJobsList = () => {
  let list = localStorage.getItem("JOBS_LIST");
  return JSON.parse(list);
};
