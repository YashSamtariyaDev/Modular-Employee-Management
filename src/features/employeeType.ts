export type Employee = { 
    id:number; 
    name:string; 
    email:string; 
    phone:string; 
    department:'HR'|'Engineering'|'Sales'|string; 
    company: { name: string };
    username: string;
};