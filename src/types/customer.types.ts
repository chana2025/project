export type customer = {
    CustomerId: number,
    FullName: string,
    Gender: eGender
    Phone:string,
    Email:string,
    Heigth: number,
    Weigth: string,
   Password:string
   DietId:number,
   Role:eRole,
   ImageUrl?: string,
   ImagePath?: string 

}

export enum eGender{
MALE,FEMAIL
}
export enum eRole{
    ADMIN,WORKER,USER
    }