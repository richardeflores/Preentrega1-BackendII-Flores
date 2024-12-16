class UserDTO {
  constructor(user) {
    this.userID = user.userID;
    this.userName = user.userName;
    this.email = user.email;
    this.role = user.role;
    this.cartID = user.cartID;
    this.isAdmin = user.role === "admin";
  }
}

export default UserDTO;
