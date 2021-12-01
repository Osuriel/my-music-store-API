const isAdmin = (req) => {
  // TODO: Implement this function
  return true;
};

const PermissionService = {
  isAdmin,
}

module.exports = PermissionService;