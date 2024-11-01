//////      ADMIN     //////
// User Management
export const userManagementFiltersConfig = [
  {
    name: "status",
    label: "Status",
    options: [
      { value: "", label: "All" },
      { value: "1", label: "Active" },
      { value: "0", label: "Inactive" },
    ],
  },
];
export const reportsManagementFiltersConfig = [
  {
    name: "status",
    label: "Status",
    options: [
      { value: "", label: "All" },
      { value: "1", label: "Active" },
      { value: "0", label: "Inactive" },
    ],
  },
];
export const queryManagementFiltersConfig = [
  {
    name: "usertype",
    label: "User Type",
    options: [
      { value: "", label: "All" },
      { value: "1", label: "User" },
      { value: "0", label: "Guest" },
    ],
  },
];
export const notificationFilterOptions = [
  { value: "", label: "All" },
  { value: "0", label: "Read" },
  { value: "1", label: "Unread" },
];