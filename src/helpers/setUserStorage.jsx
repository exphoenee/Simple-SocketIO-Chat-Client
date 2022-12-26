const setUserStorage = (data) =>
  localStorage.setItem("userdata", JSON.stringify(data));

export default setUserStorage;
