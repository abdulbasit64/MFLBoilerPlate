//////      ADMIN     //////
// User Management
export const statusFiltersConfig = [
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
export const notificationFilterOptions = [
  { value: "", label: "All" },
  { value: "0", label: "Read" },
  { value: "1", label: "Unread" },
];