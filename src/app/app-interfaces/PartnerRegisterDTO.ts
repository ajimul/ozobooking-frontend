export interface ResidenceDistance {
  distanceFrom: string;
  distanceValue: string;
}

export interface Residence {
  // residenceId:number;
  residenceName: string;
  residenceType: string;
  residenceLocation: string;
  residenceAddress: string;
  distance: ResidenceDistance[];
}
//   this interface is used to add partner(User) partner-specific interface
export interface User {
  userName: string;
  email: string;
  phone: string;
  password: string;
  residence: Residence[];
}
