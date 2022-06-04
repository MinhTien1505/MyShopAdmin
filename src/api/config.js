const getConfigHeaderAPI = () => {
  let token = JSON.parse(sessionStorage.getItem("admin_login"));
  return {
    headers: { Authorization: "bearer " + token },
  };
};

export default getConfigHeaderAPI;
