export interface  ResidenceRoomsDTO{
roomId?: number;
roomResidence_refId?: number;
roomType: string;
roomAvailability: string;
roomBedType: string;
roomPrice: number;
roomTradingPrice: number;
roomDiscount: number;
roomDescription: string;
roomIssueDate: string; 
errorMessage?:string;
}