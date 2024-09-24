import { useEffect, useState } from "react";
import {
  checkToken,
  deleteUserById,
  editAdminById,
  getUsers,
} from "../../../scripts/auth-api";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import "./AllUsers.scss";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [cookies] = useCookies(["token"]);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idForDeleting, setIdForDeleting] = useState(null);
  const [nicknameForDeleting, setNicknameForDeleting] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const availableRoles = ["user", "admin", "super-admin"];

  const validateToken = async () => {
    const { user } = await checkToken(cookies.token);
    setIsSuperAdmin(user.role === "super-admin" ? true : false);
    user.role === "super-admin"
      ? setFilteredUsers(users.filter((u) => u._id !== user.id))
      : setFilteredUsers(users.filter((user) => user.role === "user"));
  };

  const handleDelete = async (userId) => {
    try {
      const response = await deleteUserById(userId, cookies?.token);
      if (response) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        toast.error("The user was removed");
      }
    } catch (error) {
      toast.error("The user was not removed");

      console.error("Failed to delete user:", error);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await editAdminById(userId, newRole, cookies?.token);
      if (response) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        toast.success("User role updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update user role");
      console.error("Failed to update user role:", error);
    }
  };

  useEffect(() => {
    if (cookies.token) {
      validateToken();
    }
  }, [cookies.token, users]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getUsers(cookies?.token);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="all-users">
      <h1>All Users</h1>
      {filteredUsers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Nickname</th>
              <th>Email</th>
              <th>Actions</th>
              {isSuperAdmin && <th>Role</th>}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td data-label="First Name">{user.firstName}</td>
                <td data-label="Last Name">{user.lastName}</td>
                <td data-label="Nickname">{user.nickName}</td>
                <td data-label="Email">{user.email}</td>
                {isSuperAdmin && (
                  <td data-label="Role">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                    >
                      <option value={user.role}>{user.role}</option>
                      {availableRoles
                        .filter((role) => role !== user.role)
                        .map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                    </select>
                  </td>
                )}
                <td data-label="Actions">
                  <AiOutlineDelete
                    size={20}
                    onClick={() => {
                      setIsOpenDelete(true);
                      setIdForDeleting(user._id);
                      setNicknameForDeleting(user.nickName);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
      {isOpenDelete && idForDeleting && (
        <DeleteModal
          setIsOpen={setIsOpenDelete}
          id={idForDeleting}
          onClick={handleDelete}
          title={nicknameForDeleting}
        />
      )}
    </div>
  );
};

export default AllUsers;
