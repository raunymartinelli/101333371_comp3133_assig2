export interface Employee {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    gender: 'male' | 'female' | 'other';
    salary: number;
}
