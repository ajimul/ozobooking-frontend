export interface Residence {
    residenceId: number;
    residenceUser_refId: number;
    residenceName: string | null;
    residenceType: string | null;
    residenceLocation: string | null;
    residenceAddress: string | null;
    residenceRating: number;
    isActive: boolean;
    residenceRooms: ResidenceRooms[];
    distance: Distance[];
    residenceImages: ResidenceImage[];
    residenceRatings: ResidenceRating[];
    residencceAmentities: ResidencceAmentities[];
  }
  
  export interface ResidenceRooms {
    roomId?: number;
    roomResidence_refId?: number;
    roomType: string;
    roomAvailability: string;
    roomBedType: string;
    roomPrice: number;
    roomTradingPrice: number;
    roomDiscount: number;
    roomDescription: string;
    roomIssueDate: string; // Assuming LocalDate is serialized as string
    roomBooking?: ResidenceRoomsBooking[];
    roomImages?: ResidenceRoomsImages[];
    roomAmentities?: ResidencceRoomAmentities[];
    roomCommant?: ResidenceRoomsCommants[];
    roomPolicies?: ResidenceRoomsPolicy[];
  }
  
  export interface ResidenceRoomsBooking {
    bookingId: number;
    bookingClient_refId: number;
    bookingRoom_refId: number;
    issueData: string; // Assuming LocalDate is serialized as string
    payments: ResidenceRoomsBookingPayments[];
  }
  
  export interface ResidenceRoomsBookingPayments {
    paymentId: number;
    paymentBooking_refId: number;
    status: string;
    transectionId: string;
    amount: number;
  }
  
  export interface ResidenceRoomsImages {
    imagId?: number;
    imagResidenceRoom_refId?: number;
    imgSrc: string;
  }
  
  export interface ResidencceRoomAmentities {
    roomAmenId?: number;
    roomAmen_refId?: number;
    roomAmenType: string;
    roomAmenGroupName: string;
    roomAmentitiesDetails: ResidencceRoomAmentitiesDetails[];
  }
  
  export interface ResidencceRoomAmentitiesDetails {
    roomAmenDetailId?: number;
    roomAmenDetail_refId?: number;
    roomAmenDetails: string;
  }
  
  export interface ResidenceRoomsCommants {
    commantId: number;
    commantResiRoom_refId: number;
    command: string;
  }
  
  export interface ResidenceRoomsPolicy {
    roomPolicyId?: number;
    roomPolicyRoom_refId?: number;
    roomPolicyName: string;
    roomsPolicyDetails: ResidenceRoomsPolicyDetails[];
  }
  
  export interface ResidenceRoomsPolicyDetails {
    roomPolicyDetailsId?: number;
    roomPolicyDetails_refId?: number;
    roomPolicyDescription: string;
  }
  
  
  export interface Distance {
    distanceId?: number;
    distanceResidence_refId?: number;
    distanceFrom: string;
    distanceValue: number | null;
  }
  
  export interface ResidenceImage {
    resImgId: number; 
    resImgResidence_refId: number;
    imgSrc: string; 
  }
  
  export interface ResidenceRating {
    ratingId: number; 
    ratingResidence_refId: number;
    ratingUser_refId: number;
    rateValue: string;
    command: string;
    commandDate: string;
  }
  // "Entertainment Amenities", "Security Features","Gym/Fitness Center", "Cardio Equipment", "Weightlifting Equipment", "Yoga Studio",
  export interface ResidencceAmentities {
    resiAmenId?: number; 
    resiAmen_refId?: number;
    resiAmenGroupName: string;
    reseAmentitiesDetails: ReseAmentitiesDetails[];  }
  
  export interface ReseAmentitiesDetails {
    resiAmenDetailId?: number; 
    resiAmenDetail_refId?: number;
    resiAmenDetails: string;
  }
  



  