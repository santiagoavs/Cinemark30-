const logoutController = {};

logoutController.logout = async (req, res) => {

  res.clearCookie("authToken");

  return res.json({ message: "Sesión cerrada" });
};

export default logoutController;
