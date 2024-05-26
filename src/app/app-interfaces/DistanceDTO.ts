export interface DistanceDTO{
    distanceId?: number;
    distanceResidence_refId?: number;
    distanceFrom: string;
    distanceValue: number | null;
    errorMessage?:string
}