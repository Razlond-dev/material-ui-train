const KEYS: KeysType = {
  employees: "employees",
  employeeId: "employeeId",
};

type KeysType = {
  employees: string;
  employeeId: string;
};

export type EmployeeType = {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  gender: string;
  departmentId?: string;
  department?: string;
  hireDate: Date;
  isPermanent: boolean;
};

export type DepartmentsType = {
  id: '1' | '2' | '3' | '4'
  title: "Development" | "Marketing" | "Accounting" | "HR"
}

export const getDepartmentCollection = (): Array<DepartmentsType> => [
  { id: "1", title: "Development" },
  { id: "2", title: "Marketing" },
  { id: "3", title: "Accounting" },
  { id: "4", title: "HR" },
];

export function insertEmployee(data: EmployeeType) {
  let employees = getAllEmployees();
  data["id"] = generateEmployeeId();
  employees.push(data);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function updateEmployee(data: EmployeeType) {
  let employees = getAllEmployees();
  let recordIndex = employees.findIndex((x: EmployeeType) => x.id === data.id);
  employees[recordIndex] = { ...data };
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id: number) {
  let employees = getAllEmployees();
  employees = employees.filter((x: EmployeeType) => x.id !== id);
  localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function generateEmployeeId() {
  if (localStorage.getItem(KEYS.employeeId) === null) {
    localStorage.setItem(KEYS.employeeId, "0");
  }
  let id = parseInt(localStorage.getItem(KEYS.employeeId) as string);
  localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
}

export function getAllEmployees() {
  if (localStorage.getItem(KEYS.employees) === null) {
    localStorage.setItem(KEYS.employees, JSON.stringify([]));
  }
  let employees = JSON.parse(localStorage.getItem(KEYS.employees) as string);
  let departments = getDepartmentCollection();
  return employees.map((item: EmployeeType) => ({
    ...item,
    department: item.departmentId ? departments[+item.departmentId - 1].title : '',
  }));
}
